'use client';

import { useRef, useState } from 'react';

import classes from './ModbusDeviceTool.module.css';
import { buildModbusDeviceComment } from './modbusDeviceTool';

const PORT_OPTIONS = [3, 4, 5, 6, 7, 8, 9, 10];

export default function ModbusDeviceToolClient() {
  const [source, setSource] = useState('');
  const [filterSource, setFilterSource] = useState('');
  const [port, setPort] = useState('6');
  const [address, setAddress] = useState('1');
  const [ipAddress, setIpAddress] = useState('10.100.1.97');
  const [ipPort, setIpPort] = useState('10001');
  const [sections, setSections] = useState([]);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [warnings, setWarnings] = useState([]);
  const [copiedLabel, setCopiedLabel] = useState('');
  const [copyHint, setCopyHint] = useState('');
  const outputRefs = useRef({});

  const showIpSettings = Number.parseInt(port, 10) >= 6;

  function selectOutput(sectionKey) {
    const element = outputRefs.current[sectionKey];

    if (!element) {
      return false;
    }

    element.focus();
    element.select();
    element.setSelectionRange(0, element.value.length);
    return true;
  }

  function handleGenerate() {
    setCopiedLabel('');
    setCopyHint('');

    try {
      const result = buildModbusDeviceComment(source, {
        filterSource,
        port,
        address,
        ipAddress,
        ipPort,
      });

      setSections(result.sections);
      setSummary(result.summary);
      setWarnings(result.warnings);
      setError('');
    } catch (nextError) {
      setSections([]);
      setSummary('');
      setWarnings([]);
      setCopyHint('');
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'Modbus-laitelistan luonti epäonnistui.'
      );
    }
  }

  async function handleCopy(sectionKey, value, label) {
    if (!value) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const selected = selectOutput(sectionKey);

        if (!selected || !document.execCommand('copy')) {
          throw new Error('fallback-copy-failed');
        }
      }

      setCopiedLabel(label);
      setError('');
      setCopyHint('');
    } catch {
      setCopiedLabel('');
      selectOutput(sectionKey);
      setError('Tulosteen kopiointi epäonnistui selaimessa.');
      setCopyHint(
        'Valitse tulostekentän sisältö käsin ja kopioi se näppäimillä Ctrl+C tai Cmd+C.'
      );
    }
  }

  return (
    <div className={classes.ToolShell}>
      <div className={classes.ToolGrid}>
        <section className={classes.Panel}>
          <h2 className={classes.PanelTitle}>Lähdekoodi</h2>
          <p className={classes.PanelText}>
            Liitä Modbus -funktiolohko tähän. Työkalu luo modbuslaitteiden listat.
          </p>

          <textarea
            className={[classes.Textarea, classes.SourceTextarea].join(' ')}
            value={source}
            onChange={(event) => setSource(event.target.value)}
            placeholder="Liitä Modbus FB tähän"
            spellCheck={false}
          />

          <p className={classes.PanelText}>
            Valinnainen kutsukoodi: Jos liität alle modbus-kutsun, työkalu erittelee
            tarvittavat modbus-laitteet sekä kaikki FB:stä löytyvät modbuslaitteet.
          </p>

          <textarea
            className={[classes.Textarea, classes.FilterTextarea].join(' ')}
            value={filterSource}
            onChange={(event) => setFilterSource(event.target.value)}
            placeholder="Liitä funktiolohkon kutsu tähän, jos haluat eritellä tarvittavat modbuslaitteet"
            spellCheck={false}
          />

          <div className={classes.FieldGrid}>
            <label className={classes.Field}>
              <span className={classes.FieldLabel}>Portti</span>
              <select
                className={classes.Input}
                value={port}
                onChange={(event) => setPort(event.target.value)}
              >
                {PORT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label className={classes.Field}>
              <span className={classes.FieldLabel}>Osoite</span>
              <input
                className={classes.Input}
                type="number"
                min="1"
                max="247"
                step="1"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
            </label>

            {showIpSettings ? (
              <>
                <label className={classes.Field}>
                  <span className={classes.FieldLabel}>IP-osoite</span>
                  <input
                    className={classes.Input}
                    type="text"
                    value={ipAddress}
                    onChange={(event) => setIpAddress(event.target.value)}
                    placeholder="0.0.0.0"
                    spellCheck={false}
                  />
                </label>

                <label className={classes.Field}>
                  <span className={classes.FieldLabel}>IP-portti</span>
                  <input
                    className={classes.Input}
                    type="number"
                    min="0"
                    max="65535"
                    step="1"
                    value={ipPort}
                    onChange={(event) => setIpPort(event.target.value)}
                  />
                </label>
              </>
            ) : null}
          </div>

          <div className={classes.Actions}>
            <button
              className={classes.PrimaryButton}
              type="button"
              onClick={handleGenerate}
            >
              Luo Modbus-laitteet ja XML
            </button>
          </div>
        </section>

        <section className={classes.Panel}>
          <div className={classes.OutputHeader}>
            <div>
              <h2 className={classes.PanelTitle}>Tulosteet</h2>
              <p className={classes.PanelText}>Kopioi tarvitsemasi tiedot alta.</p>
            </div>
          </div>

          {sections.length > 0 ? (
            <div className={classes.OutputStack}>
              {sections.map((section) => (
                <div key={section.key} className={classes.OutputBlock}>
                  <div className={classes.SectionHeader}>
                    <h3 className={classes.SectionTitle}>{section.title}</h3>
                    <button
                      className={classes.SecondaryButton}
                      type="button"
                      onClick={() =>
                        handleCopy(section.key, section.value, section.title)
                      }
                    >
                      Kopioi
                    </button>
                  </div>

                  <textarea
                    ref={(element) => {
                      if (element) {
                        outputRefs.current[section.key] = element;
                      } else {
                        delete outputRefs.current[section.key];
                      }
                    }}
                    className={[classes.Textarea, classes.OutputTextarea].join(' ')}
                    value={section.value}
                    readOnly
                    spellCheck={false}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className={classes.EmptyState}>
              Tulosteet ilmestyvät tähän, kun ne on generoitu.
            </p>
          )}

          <div className={classes.StatusArea} aria-live="polite">
            {summary ? <p className={classes.Summary}>{summary}</p> : null}
            {copiedLabel ? (
              <p className={classes.Success}>{copiedLabel} kopioitu leikepöydälle.</p>
            ) : null}
            {error ? <p className={classes.Error}>{error}</p> : null}
            {copyHint ? <p className={classes.Hint}>{copyHint}</p> : null}
            {warnings.length > 0 ? (
              <ul className={classes.WarningList}>
                {warnings.map((warning) => (
                  <li key={warning}>{warning}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </section>
      </div>

      <section className={classes.InfoPanel}>
        <h2 className={classes.PanelTitle}>Huomiot</h2>
        <ul className={classes.NoteList}>
          <li>Tuetut rekisterityypit ovat COIL, DISCRETE, INPUT ja HOLDING</li>
          <li>
            Tarvittavat modbuslaitteet suodattaa kokonaisia laiterivejä pois, mutta ei
            pienennä niiden Count-arvoa.
          </li>
        </ul>
      </section>
    </div>
  );
}
