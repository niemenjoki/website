'use client';

import { useEffect, useState } from 'react';

import compressorActiveImage from '@/public/images/content/DhwPidSimulator/Kompressori-aktiivinen.avif';
import compressorImage from '@/public/images/content/DhwPidSimulator/Kompressori.avif';
import boxBlack from '@/public/images/content/DhwPidSimulator/Laatikko-Musta.avif';
import boxRedDark from '@/public/images/content/DhwPidSimulator/Laatikko-Punainen-Tumma.avif';
import boxRed from '@/public/images/content/DhwPidSimulator/Laatikko-Punainen.avif';
import tankImage from '@/public/images/content/DhwPidSimulator/Lamminvesivaraaja.avif';
import arrowRedRight from '@/public/images/content/DhwPidSimulator/Nuoli-Punainen-Oikea.avif';
import arrowRedDarkLeft from '@/public/images/content/DhwPidSimulator/Nuoli-Punainen-Tumma-Vasen.avif';
import dot from '@/public/images/content/DhwPidSimulator/Pallo.avif';
import pumpActiveImage from '@/public/images/content/DhwPidSimulator/Pumppu-aktiivinen.avif';
import backgroundPanel from '@/public/images/content/DhwPidSimulator/Tausta.avif';
import valveImage from '@/public/images/content/DhwPidSimulator/Venttiili.avif';

import classes from './DhwPidSimulator.module.css';
import simulationStep from './sim/simulationStep';
import Img from './ui/Img';
import Label from './ui/Label';
import PointInput from './ui/PointInput';

/* =========================
   Helpers
   ========================= */

function formatValue(value, unit) {
  return `${value.toFixed(1)} ${unit}`;
}

function emptyUpdate() {
  return {};
}

function parseNumberOrFallback(value, fallback) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export default function DomesticHotWaterPidSimulator() {
  /* =========================
     Numeric state (no units)
     ========================= */

  const [simulationState, setSimulationState] = useState({
    compressorState: 1,
    tankTemperature: 62.8,
    preValveTemperature: 63.3,
    setpointTemperature: 58.0,
    inletTemperature: 48.6,
    outletTemperature: 47.3,
    valveCommand: 54.6,
    hotWaterDemandFlow: 0.0,
  });

  const [proportionalBand, setProportionalBand] = useState(200);
  const [integrationTime, setIntegrationTime] = useState(0);
  const [derivativeTime, setDerivativeTime] = useState(0);
  const [inletDelayMode, setInletDelayMode] = useState('near');

  const {
    compressorState,
    tankTemperature,
    preValveTemperature,
    setpointTemperature,
    inletTemperature,
    outletTemperature,
    valveCommand,
    hotWaterDemandFlow,
  } = simulationState;
  const pidSettings = { proportionalBand, integrationTime, derivativeTime };
  const inletDelaySeconds = inletDelayMode === 'far' ? 60 : 3;
  const simulationSettings = { inletDelaySeconds };

  const setSimulationValue = (key) => (value) => {
    setSimulationState((prev) => ({
      ...prev,
      [key]: parseNumberOrFallback(value, prev[key]),
    }));
  };

  const setPidSettingValue = (setter) => (value) => {
    setter((prev) => parseNumberOrFallback(value, prev));
  };

  const applySimulationStep = (updateFn = emptyUpdate) => {
    setSimulationState((prev) => {
      const patch = updateFn(prev, pidSettings, simulationSettings);
      if (!patch || typeof patch !== 'object') {
        return prev;
      }
      return { ...prev, ...patch };
    });
  };

  useEffect(() => {
    const deltaSeconds = 1;
    const intervalId = setInterval(() => {
      applySimulationStep((state) =>
        simulationStep(state, deltaSeconds, pidSettings, simulationSettings)
      );
    }, 1000);

    return () => clearInterval(intervalId);
  }, [proportionalBand, integrationTime, derivativeTime, inletDelayMode]);

  const compressorDisplayImage =
    compressorState === 1 ? compressorActiveImage : compressorImage;

  return (
    <div className={classes.Graphic}>
      <div style={{ position: 'relative', width: 600, height: 380 }}>
        <Img src={boxRedDark} left={100} top={110} width={95} height={4} />
        <Img src={boxRedDark} left={105} top={240} width={85} height={4} />
        <Img src={boxRedDark} left={205} top={230} width={335} height={4} />
        <Img src={boxRedDark} left={427} top={110} width={4} height={120} />
        <Img src={boxRed} left={242} top={92} width={175} height={4} />
        <Img src={boxRed} left={437} top={92} width={105} height={4} />
        <Img src={boxBlack} left={356} top={73} width={2} height={22} />
        <Img src={boxBlack} left={496} top={73} width={2} height={22} />
        <Img src={boxBlack} left={496} top={211} width={2} height={22} />
        <Img src={tankImage} left={175} top={40} width={135} height={280} />
        <Img src={backgroundPanel} left={30} top={100} width={114} height={157} />
        <Img src={backgroundPanel} left={185} top={58} width={115} height={245} />
        <Img src={dot} left={352} top={89} width={10} height={10} />
        <Img src={dot} left={492} top={89} width={10} height={10} />
        <Img src={dot} left={492} top={227} width={10} height={10} />

        <Img src={arrowRedRight} left={537} top={87} width={11} height={13} />
        <Img src={arrowRedDarkLeft} left={534} top={226} width={11} height={13} />

        <Label
          text={`Käyttöveden kulutus: ${hotWaterDemandFlow.toFixed(1)} l/s`}
          left={440}
          top={150}
        />
        <button
          type="button"
          onClick={() => setInletDelayMode((prev) => (prev === 'far' ? 'near' : 'far'))}
          style={{
            position: 'absolute',
            left: 340,
            top: 370,
            fontSize: 12,
            width: 230,
            fontWeight: 'bold',
            padding: '2px 6px',
            borderRadius: 4,
            border: '1px solid #333333',
            background: '#f2f2f2',
            cursor: 'pointer',
          }}
        >
          Menovesianturi:{' '}
          {inletDelayMode === 'far' ? 'Kaukana venttiilistä' : 'Lähellä venttiiliä'}
        </button>

        {/* Devices */}
        <Img src={compressorDisplayImage} left={69} top={151} width={35} height={35} />
        <Img src={pumpActiveImage} left={440} top={220} width={25} height={25} />
        <Img src={valveImage} left={416} top={67} width={27} height={43} />

        {/* Tank measurement */}
        <PointInput
          className={[classes.PointValue, classes.Measurement].join(' ')}
          left={213}
          top={106}
          value={formatValue(tankTemperature, '°C')}
          onChange={setSimulationValue('tankTemperature')}
          editable={false}
        />
        <Label text="Lämpötila" left={217} top={93} />

        {/* PreValve measurement */}
        <PointInput
          className={[classes.PointValue, classes.Measurement].join(' ')}
          left={328}
          top={71}
          value={formatValue(preValveTemperature, '°C')}
          onChange={setSimulationValue('preValveTemperature')}
          editable={false}
        />

        {/* Setpoint */}
        <PointInput
          className={[classes.PointValue, classes.Setpoint].join(' ')}
          left={468}
          top={49}
          value={formatValue(setpointTemperature, '°C')}
          onChange={setSimulationValue('setpointTemperature')}
          editable={true}
        />

        {/* Inlet measurement */}
        <PointInput
          className={[classes.PointValue, classes.Measurement].join(' ')}
          left={468}
          top={71}
          value={formatValue(inletTemperature, '°C')}
          onChange={setSimulationValue('inletTemperature')}
          editable={false}
        />

        {/* Outlet measurement */}
        <PointInput
          className={[classes.PointValue, classes.Measurement].join(' ')}
          left={468}
          top={209}
          value={formatValue(outletTemperature, '°C')}
          onChange={setSimulationValue('outletTemperature')}
          editable={false}
        />

        {/* Valve command */}
        <PointInput
          className={[classes.PointValue, classes.ControlSignal].join(' ')}
          left={400}
          top={60}
          value={formatValue(valveCommand, '%')}
          onChange={setSimulationValue('valveCommand')}
          editable={false}
        />

        {/* Labels */}
        <Label text="Lämpöpumppu" left={47} top={229} />
        <Label text="Käyttövesivaraaja" left={198} top={285} />

        {/* PID tuning */}
        <Label text="Suhdealue" left={340} top={280} />
        <PointInput
          className={[classes.PointValue, classes.OnOffControl].join(' ')}
          left={430}
          top={275}
          value={proportionalBand.toFixed(0)}
          onChange={setPidSettingValue(setProportionalBand)}
          editable={true}
        />

        <Label text="Integrointiaika" left={340} top={310} />
        <PointInput
          className={[classes.PointValue, classes.OnOffControl].join(' ')}
          left={430}
          top={305}
          value={integrationTime.toFixed(0)}
          onChange={setPidSettingValue(setIntegrationTime)}
          editable={true}
        />

        <Label text="Derivointiaika" left={340} top={340} />
        <PointInput
          className={[classes.PointValue, classes.OnOffControl].join(' ')}
          left={430}
          top={335}
          value={derivativeTime.toFixed(0)}
          onChange={setPidSettingValue(setDerivativeTime)}
          editable={true}
        />
      </div>
    </div>
  );
}
