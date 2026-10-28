'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';

import classes from './CompressorRotationDemo.module.css';
import {
  COMPRESSOR_COUNT,
  COMPRESSOR_NAMES,
  HISTORY_MINUTES,
  MIN_REST_DISTORTION_H,
  MIN_REST_MINUTES,
  MIN_RUN_DISTORTION_H,
  MIN_RUN_MINUTES,
  RUNNING_DISTORTION_H,
  createWorld,
  getCompressorStats,
  getDistortedRuntime,
  getSystemStats,
  stepWorld,
} from './sim';

/* Päivitys 5 kertaa sekunnissa, simuloitu tunti kestää sekunnin. */
const TICK_MS = 200;
const MINUTES_PER_TICK = 12;
/* Esiajo puolitoista vuorokautta, jotta aikajanat ja 24 h tilastot ovat heti täynnä. */
const WARMUP_MINUTES = 36 * 60;

/* =========================
   Apufunktiot
   ========================= */

function formatNumber(value, fractionDigits = 1) {
  return value.toLocaleString('fi-FI', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

function formatDuration(minutes) {
  if (minutes === null) return '-';
  const rounded = Math.round(minutes);
  return `${Math.floor(rounded / 60)}:${String(rounded % 60).padStart(2, '0')}`;
}

function formatSimTime(minute) {
  const day = Math.floor(minute / 1440) + 1;
  const hours = Math.floor((minute % 1440) / 60);
  const minutes = minute % 60;
  return `vrk ${day}, klo ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function subscribeReducedMotion(callback) {
  const query = window.matchMedia?.(REDUCED_MOTION_QUERY);
  query?.addEventListener('change', callback);
  return () => query?.removeEventListener('change', callback);
}

function getReducedMotion() {
  return window.matchMedia?.(REDUCED_MOTION_QUERY).matches ?? false;
}

function getServerReducedMotion() {
  return false;
}

function createWarmWorld() {
  const world = createWorld();
  for (let i = 0; i < WARMUP_MINUTES; i++) stepWorld(world);
  return world;
}

/* Muutetaan minuuttihistoria yhtenäisiksi palkeiksi. Avaimena on palkin alkuminuutti,
   jotta React ei luo palkkeja uudelleen joka päivityksellä. */
function toSegments(history, currentMinute) {
  const segments = [];
  const offset = HISTORY_MINUTES - history.length;
  const firstMinute = currentMinute - history.length;
  let start = 0;

  for (let i = 1; i <= history.length; i++) {
    if (i === history.length || history[i] !== history[start]) {
      if (history[start] === 1) {
        segments.push({ key: firstMinute + start, x: offset + start, width: i - start });
      }
      start = i;
    }
  }
  return segments;
}

/* =========================
   UI-osat
   ========================= */

const ROW_HEIGHT = 14;
const ROW_GAP = 6;

function Timeline({ system, label, currentMinute }) {
  const height = COMPRESSOR_COUNT * (ROW_HEIGHT + ROW_GAP);

  return (
    <svg
      className={classes.Timeline}
      viewBox={`0 0 ${HISTORY_MINUTES} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label={`${label}: kompressorien käynti viimeisen 12 tunnin ajalta`}
    >
      {system.history.map((history, index) => {
        const y = index * (ROW_HEIGHT + ROW_GAP);
        return (
          <g key={COMPRESSOR_NAMES[index]}>
            <rect
              className={classes.TimelineTrack}
              x={0}
              y={y}
              width={HISTORY_MINUTES}
              height={ROW_HEIGHT}
            />
            {toSegments(history, currentMinute).map((segment) => (
              <rect
                key={segment.key}
                className={classes.TimelineRunning}
                x={segment.x}
                y={y}
                width={segment.width}
                height={ROW_HEIGHT}
              />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

function RequestChart({ requestHistory }) {
  const height = 48;
  const scale = (value) => height - 4 - (value / COMPRESSOR_COUNT) * (height - 8);
  const offset = HISTORY_MINUTES - requestHistory.length;

  let path = '';
  requestHistory.forEach((value, index) => {
    const x = offset + index;
    const y = scale(value);
    if (index === 0) path = `M ${x} ${y}`;
    else if (value !== requestHistory[index - 1]) path += ` H ${x} V ${y}`;
  });
  if (requestHistory.length > 0) path += ` H ${HISTORY_MINUTES}`;

  return (
    <svg
      className={classes.RequestChart}
      viewBox={`0 0 ${HISTORY_MINUTES} ${height}`}
      preserveAspectRatio="none"
      role="img"
      aria-label="Pyyntiportaat viimeisen 12 tunnin ajalta"
    >
      {[0, 1, 2, 3, 4].map((value) => (
        <line
          key={value}
          className={classes.GridLine}
          x1={0}
          x2={HISTORY_MINUTES}
          y1={scale(value)}
          y2={scale(value)}
        />
      ))}
      <path className={classes.RequestLine} d={path} />
    </svg>
  );
}

function SystemPanel({ title, description, system, currentMinute, showDistortion }) {
  const stats = getCompressorStats(system);

  return (
    <section className={classes.Panel} aria-label={title}>
      <div className={classes.PanelTitle}>{title}</div>
      <div className={classes.PanelDescription}>{description}</div>

      <div className={classes.TimelineWrapper}>
        <div className={classes.TimelineLabels} aria-hidden="true">
          {COMPRESSOR_NAMES.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
        <Timeline system={system} label={title} currentMinute={currentMinute} />
      </div>
      <div className={classes.AxisLabels} aria-hidden="true">
        <span>−12 h</span>
        <span>nyt</span>
      </div>

      <table
        className={`${classes.Table} ${showDistortion ? classes.TableWide : classes.TableNarrow}`}
      >
        <thead>
          <tr>
            <th>
              <span className={classes.VisuallyHidden}>Kompressori</span>
            </th>
            <th>Tila</th>
            <th className={classes.Number}>{'Käynti­aika h'}</th>
            {showDistortion && <th className={classes.Number}>{'Vääris­tetty h'}</th>}
            <th className={classes.Number}>Ka. jakso</th>
          </tr>
        </thead>
        <tbody>
          {system.compressors.map((compressor, index) => (
            <tr key={COMPRESSOR_NAMES[index]}>
              <td className={classes.Name}>{COMPRESSOR_NAMES[index]}</td>
              <td>
                <span
                  className={`${classes.Status} ${
                    compressor.running ? classes.StatusRunning : classes.StatusStopped
                  }`}
                >
                  {compressor.running ? 'Käy' : 'Seis'}
                </span>
              </td>
              <td className={classes.Number}>{formatNumber(compressor.runtimeHours)}</td>
              {showDistortion && (
                <td className={classes.Number}>
                  {formatNumber(getDistortedRuntime(compressor), 0)}
                </td>
              )}
              <td className={classes.Number}>
                {formatDuration(stats[index].averageMinutes)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

function ComparisonTable({ dynamicStats, fixedStats }) {
  const rows = [
    [
      'Käynnistyksiä 24 h, vilkkain kompressori',
      dynamicStats.busiestCycles,
      fixedStats.busiestCycles,
    ],
    [
      'Käynnistyksiä 24 h, hiljaisin kompressori',
      dynamicStats.quietestCycles,
      fixedStats.quietestCycles,
    ],
    [
      'Lyhin ka. käyntijakso (24 h)',
      formatDuration(dynamicStats.shortestAverageMinutes),
      formatDuration(fixedStats.shortestAverageMinutes),
    ],
  ];

  return (
    <table className={classes.Comparison}>
      <caption>Vertailu</caption>
      <thead>
        <tr>
          <th></th>
          <th className={classes.Number}>Vääristetty käyntiaika</th>
          <th className={classes.Number}>Kiinteä järjestys</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, dynamicValue, fixedValue]) => (
          <tr key={label}>
            <th scope="row">{label}</th>
            <td className={classes.Number}>{dynamicValue}</td>
            <td className={classes.Number}>{fixedValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

/* =========================
   Pääkomponentti
   ========================= */

export default function CompressorRotationDemo() {
  const containerRef = useRef(null);
  const [world, setWorld] = useState(createWarmWorld);
  const [, setFrame] = useState(0);
  const [userPaused, setUserPaused] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotion,
    getServerReducedMotion
  );
  const isPaused = userPaused ?? prefersReducedMotion;

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return undefined;
    const observer = new IntersectionObserver(([entry]) =>
      setIsVisible(entry.isIntersecting)
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isPaused || !isVisible) return undefined;
    const timer = setInterval(() => {
      for (let i = 0; i < MINUTES_PER_TICK; i++) stepWorld(world);
      setFrame((frame) => frame + 1);
    }, TICK_MS);
    return () => clearInterval(timer);
  }, [isPaused, isVisible, world]);

  const handleRestart = () => setWorld(createWarmWorld());

  return (
    <div className={classes.Demo} ref={containerRef}>
      <div className={classes.Header}>
        <div className={classes.Clock}>
          <span>{formatSimTime(world.minute)}</span>
          <span className={classes.Request}>
            Pyynti: <strong>{world.request}</strong> / {COMPRESSOR_COUNT}
          </span>
        </div>
        <div className={classes.Buttons}>
          <button type="button" onClick={() => setUserPaused(!isPaused)}>
            {isPaused ? 'Jatka' : 'Pysäytä'}
          </button>
          <button type="button" onClick={handleRestart}>
            Aloita alusta
          </button>
        </div>
      </div>

      <div className={classes.RequestWrapper}>
        <span className={classes.RequestLabel}>Pyynti 0-4</span>
        <RequestChart requestHistory={world.requestHistory} />
      </div>

      <div className={classes.Panels}>
        <SystemPanel
          title="Vääristetty käyntiaika"
          description="Järjestys lasketaan uudelleen, kun pyynti muuttuu."
          system={world.dynamic}
          currentMinute={world.minute}
          showDistortion
        />
        <SystemPanel
          title="Kiinteä järjestys"
          description="Johtava kompressori vaihtuu viikon välein, käyviä ei pysäytetä."
          system={world.fixed}
          currentMinute={world.minute}
          showDistortion={false}
        />
      </div>

      <ComparisonTable
        dynamicStats={getSystemStats(world.dynamic)}
        fixedStats={getSystemStats(world.fixed)}
      />

      <p className={classes.Legend}>
        Käyntijakso on yhtäjaksoinen käynti käynnistyksestä pysähtymiseen. Ka. jakso on
        viimeisen vuorokauden aikana päättyneiden jaksojen keskimääräinen pituus (h:min).
        Vääristykset: käynnissä {formatNumber(RUNNING_DISTORTION_H, 0)} h,
        minimikäyntiaika ({MIN_RUN_MINUTES} min) {formatNumber(MIN_RUN_DISTORTION_H, 0)}{' '}
        h, minimilepoaika ({MIN_REST_MINUTES} min) +
        {formatNumber(MIN_REST_DISTORTION_H, 0)} h. Molemmat ohjaustavat saavat saman
        pyynnin.
      </p>
    </div>
  );
}
