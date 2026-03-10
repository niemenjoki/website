'use client';

import { useRef, useState } from 'react';

import classes from './AlarmPageTool.module.css';
import {
  DEFAULT_LIMIT_NUMBERS,
  LIMIT_OPTIONS,
  buildOutputHtml,
  parsePointDatabase,
} from './alarmPageTool';

export default function AlarmPageToolClient() {
  const [source, setSource] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyHint, setCopyHint] = useState('');
  const [limitNumbers, setLimitNumbers] = useState(DEFAULT_LIMIT_NUMBERS);
  const outputRef = useRef(null);

  function selectOutput() {
    const element = outputRef.current;

    if (!element) {
      return false;
    }

    element.focus();
    element.select();
    element.setSelectionRange(0, element.value.length);
    return true;
  }

  function handleParse() {
    setCopied(false);
    setCopyHint('');

    try {
      const {
        rows,
        measurementCount,
        limitNumbers: appliedLimitNumbers,
      } = parsePointDatabase(source, limitNumbers);

      if (rows.length === 0) {
        setOutput('');
        setError('');
        setCopyHint('');
        setSummary(
          `Kelvollisia rivejä ei löytynyt. Tarkistettuja mittauspisteitä: ${measurementCount}. Käytetyt limitit: ${appliedLimitNumbers.low}, ${appliedLimitNumbers.high}, ${appliedLimitNumbers.control}.`
        );
        return;
      }

      setOutput(buildOutputHtml(rows));
      setError('');
      setCopyHint('');
      setSummary(
        `Löytyi ${rows.length} tulostettavaa riviä ${measurementCount} mittauspisteestä. Käytetyt limitit: ${appliedLimitNumbers.low}, ${appliedLimitNumbers.high}, ${appliedLimitNumbers.control}.`
      );
    } catch (nextError) {
      setOutput('');
      setSummary('');
      setCopyHint('');
      setError(
        nextError instanceof Error ? nextError.message : 'Jäsentäminen epäonnistui.'
      );
    }
  }

  function updateLimitNumber(field, value) {
    setLimitNumbers((currentLimitNumbers) => ({
      ...currentLimitNumbers,
      [field]: Number(value),
    }));
  }

  async function handleCopy() {
    if (!output) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(output);
      } else {
        const selected = selectOutput();

        if (!selected || !document.execCommand('copy')) {
          throw new Error('fallback-copy-failed');
        }
      }

      setCopied(true);
      setError('');
      setCopyHint('');
    } catch {
      setCopied(false);
      selectOutput();
      setError('HTML-koodin kopiointi epäonnistui selaimessa.');
      setCopyHint(
        'Valitse HTML tulostekentästä käsin ja kopioi se näppäimillä Ctrl+C tai Cmd+C.'
      );
    }
  }

  return (
    <div className={classes.ToolShell}>
      <div className={classes.ToolGrid}>
        <section className={classes.Panel}>
          <h2 className={classes.PanelTitle}>Lähdedata</h2>
          <p className={classes.PanelText}>
            Liitä FX-Editorista kopioitu pistekanta XML-muodossa. Työkalu huomioi vain
            mittauspisteet, joiden tunnus päättyy muotoon _M tai _FM ja joilla on
            vähintään yksi niihin liittyvä ARH- tai YRH-päätteinen rajahälytys tai
            _C-päätteinen asetusarvo sekä SVH-päätteinen säätövikahälytys. Limitit voi
            valita väliltä 1-8 ennen generointia.
          </p>

          <div className={classes.LimitSettings}>
            <label className={classes.Field}>
              <span className={classes.FieldLabel}>Alaraja</span>
              <select
                className={classes.FieldSelect}
                value={limitNumbers.low}
                onChange={(event) => updateLimitNumber('low', event.target.value)}
              >
                {LIMIT_OPTIONS.map((limitNumber) => (
                  <option key={`low-${limitNumber}`} value={limitNumber}>
                    {limitNumber}
                  </option>
                ))}
              </select>
            </label>

            <label className={classes.Field}>
              <span className={classes.FieldLabel}>Yläraja</span>
              <select
                className={classes.FieldSelect}
                value={limitNumbers.high}
                onChange={(event) => updateLimitNumber('high', event.target.value)}
              >
                {LIMIT_OPTIONS.map((limitNumber) => (
                  <option key={`high-${limitNumber}`} value={limitNumber}>
                    {limitNumber}
                  </option>
                ))}
              </select>
            </label>

            <label className={classes.Field}>
              <span className={classes.FieldLabel}>Säätövika</span>
              <select
                className={classes.FieldSelect}
                value={limitNumbers.control}
                onChange={(event) => updateLimitNumber('control', event.target.value)}
              >
                {LIMIT_OPTIONS.map((limitNumber) => (
                  <option key={`control-${limitNumber}`} value={limitNumber}>
                    {limitNumber}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <textarea
            className={[classes.Textarea, classes.SourceTextarea].join(' ')}
            value={source}
            onChange={(event) => setSource(event.target.value)}
            placeholder="Liitä pisteet editorista tähän"
            spellCheck={false}
          />

          <div className={classes.Actions}>
            <button className={classes.PrimaryButton} type="button" onClick={handleParse}>
              Luo HTML-sivu
            </button>
          </div>
        </section>

        <section className={classes.Panel}>
          <div className={classes.OutputHeader}>
            <div>
              <h2 className={classes.PanelTitle}>Tuloste</h2>
              <p className={classes.PanelText}>
                Liitä tähän generoitu HTML editorin grafiikkasivulle.
              </p>
            </div>

            <button
              className={classes.SecondaryButton}
              type="button"
              onClick={handleCopy}
              disabled={!output}
            >
              Kopioi
            </button>
          </div>

          <textarea
            ref={outputRef}
            className={[classes.Textarea, classes.OutputTextarea].join(' ')}
            value={output}
            readOnly
            spellCheck={false}
          />

          <div className={classes.StatusArea} aria-live="polite">
            {summary ? <p className={classes.Summary}>{summary}</p> : null}
            {copied ? (
              <p className={classes.Success}>HTML-koodi kopioitu leikepöydälle.</p>
            ) : null}
            {error ? <p className={classes.Error}>{error}</p> : null}
            {copyHint ? <p className={classes.Hint}>{copyHint}</p> : null}
          </div>
        </section>
      </div>

      <section className={classes.InfoPanel}>
        <h2 className={classes.PanelTitle}>Huomiot</h2>
        <ul className={classes.RuleList}>
          <li>Seliteteksti kopioidaan sellaisenaa mittauspisteen selitteestä.</li>
          <li>
            Pistetunnuksesta poistetaan ensimmäinen ja viimeinen osa, alaviivat korvataan
            väliviivoilla.
          </li>
          <li>Alaraja käyttää limittiä {limitNumbers.low}</li>
          <li>Yläraja käyttää limittiä {limitNumbers.high}</li>
          <li>Säätövika käyttää limittiä {limitNumbers.control}</li>
          <li>Säätöarvon piste käyttää edelleen tunnusta _C:2</li>
        </ul>
      </section>
    </div>
  );
}
