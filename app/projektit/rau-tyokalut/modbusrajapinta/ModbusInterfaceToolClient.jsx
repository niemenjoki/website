'use client';

import { useRef, useState } from 'react';

import classes from './ModbusInterfaceTool.module.css';
import {
  ACCESS_MODE_OPTIONS,
  BATCH_LIMIT_OPTIONS,
  DATA_TYPE_OPTIONS,
  FORCE_OPTIONS,
  REGISTER_TYPE_OPTIONS,
  RELEASE_OVERRIDE_OPTIONS,
  WORD_ORDER_OPTIONS,
  buildModbusInterfaceOutputs,
  createEmptyRegister,
  normalizeEditableRegister,
} from './modbusInterfaceTool';

function isBooleanRegisterType(registerType) {
  return registerType === 'coil' || registerType === 'discrete';
}

function isThirtyTwoBitDataType(dataType) {
  return dataType === 'DINT' || dataType === 'UDINT' || dataType === 'FLOAT';
}

function shouldShowForceControls(register) {
  const canWrite =
    register.registerType === 'coil' || register.registerType === 'holding';
  const isThirtyTwoBit =
    !isBooleanRegisterType(register.registerType) &&
    isThirtyTwoBitDataType(register.dataType);

  return canWrite && !isThirtyTwoBit && register.accessMode === 'readwrite';
}

export default function ModbusInterfaceToolClient() {
  const [deviceName, setDeviceName] = useState('');
  const [batchLimit, setBatchLimit] = useState('16');
  const [registers, setRegisters] = useState([createEmptyRegister()]);
  const [sections, setSections] = useState([]);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [warnings, setWarnings] = useState([]);
  const [copiedLabel, setCopiedLabel] = useState('');
  const [copyHint, setCopyHint] = useState('');
  const outputRefs = useRef({});
  const showForceHelp = registers.some((register) => shouldShowForceControls(register));

  function resetGeneratedState() {
    setSections([]);
    setSummary('');
    setWarnings([]);
    setCopiedLabel('');
    setCopyHint('');
    setError('');
  }

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

  function updateRegister(registerId, field, value) {
    resetGeneratedState();
    setRegisters((currentRegisters) =>
      currentRegisters.map((register) => {
        if (register.id !== registerId) {
          return register;
        }

        return normalizeEditableRegister({
          ...register,
          [field]: value,
        });
      })
    );
  }

  function addRegister() {
    resetGeneratedState();
    setRegisters((currentRegisters) => [...currentRegisters, createEmptyRegister()]);
  }

  function removeRegister(registerId) {
    resetGeneratedState();
    setRegisters((currentRegisters) => {
      const nextRegisters = currentRegisters.filter(
        (register) => register.id !== registerId
      );

      if (nextRegisters.length > 0) {
        return nextRegisters;
      }

      return [createEmptyRegister()];
    });
  }

  function handleDeviceNameChange(value) {
    resetGeneratedState();
    setDeviceName(value);
  }

  function handleBatchLimitChange(value) {
    resetGeneratedState();
    setBatchLimit(value);
  }

  function handleGenerate() {
    setCopiedLabel('');
    setCopyHint('');

    try {
      const result = buildModbusInterfaceOutputs(registers, {
        batchLimit,
        deviceName,
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
          : 'Modbus-rajapinnan generointi epäonnistui.'
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
      <section className={classes.Panel}>
        <h2 className={classes.PanelTitle}>Vaihe 1: Perustiedot ja rekisterit</h2>
        <p className={classes.PanelText}>Anna laitteen nimi ja lisää rekisterit.</p>

        <div className={classes.FieldGrid}>
          <label className={classes.Field}>
            <span className={classes.FieldLabel}>Laitteen nimi</span>
            <input
              className={classes.Input}
              type="text"
              value={deviceName}
              onChange={(event) => handleDeviceNameChange(event.target.value)}
              placeholder="Esim. Gebwell Taurus"
              spellCheck={false}
            />
            <span className={classes.HelpText}>
              Nimestä muodostetaan automaattisesti funktiolohkon nimi, versionumero ja
              ohjelman nimi.
            </span>
          </label>
        </div>

        <div className={classes.RegisterList}>
          {registers.map((register, index) => {
            const isBooleanRegister = isBooleanRegisterType(register.registerType);
            const canWrite =
              register.registerType === 'coil' || register.registerType === 'holding';
            const isThirtyTwoBit =
              !isBooleanRegister && isThirtyTwoBitDataType(register.dataType);
            const writeDisabled = register.registerType === 'holding' && isThirtyTwoBit;
            const showForceControls = shouldShowForceControls(register);

            return (
              <article key={register.id} className={classes.RegisterCard}>
                <div className={classes.RegisterHeader}>
                  <h3 className={classes.RegisterTitle}>Rekisteri {index + 1}</h3>
                  <button
                    className={classes.RemoveButton}
                    type="button"
                    onClick={() => removeRegister(register.id)}
                    disabled={registers.length === 1}
                  >
                    Poista
                  </button>
                </div>

                <div className={classes.RegisterGrid}>
                  <label className={classes.Field}>
                    <span className={classes.FieldLabel}>Rekisterinumero</span>
                    <input
                      className={classes.Input}
                      type="number"
                      min="0"
                      max="65535"
                      step="1"
                      value={register.registerNumber}
                      onChange={(event) =>
                        updateRegister(register.id, 'registerNumber', event.target.value)
                      }
                    />
                  </label>

                  <label className={classes.Field}>
                    <span className={classes.FieldLabel}>Rekisterityyppi</span>
                    <select
                      className={classes.Input}
                      value={register.registerType}
                      onChange={(event) =>
                        updateRegister(register.id, 'registerType', event.target.value)
                      }
                    >
                      {REGISTER_TYPE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className={classes.Field}>
                    <span className={classes.FieldLabel}>Kuvaus</span>
                    <input
                      className={classes.Input}
                      type="text"
                      value={register.description}
                      onChange={(event) =>
                        updateRegister(register.id, 'description', event.target.value)
                      }
                      placeholder="Esim. Menoveden lämpötila"
                      spellCheck={false}
                    />
                  </label>

                  <label className={classes.Field}>
                    <span className={classes.FieldLabel}>Kerroin</span>
                    <input
                      className={classes.Input}
                      type="text"
                      value={isBooleanRegister ? '1' : register.multiplier}
                      onChange={(event) =>
                        updateRegister(register.id, 'multiplier', event.target.value)
                      }
                      disabled={isBooleanRegister}
                      spellCheck={false}
                    />
                    <span className={classes.HelpText}>
                      {isBooleanRegister
                        ? 'BOOL-rekistereillä kerrointa ei käytetä.'
                        : 'Syötä mittausarvon jakaja, esimerkiksi 10 tai 1000.'}
                    </span>
                  </label>

                  {!isBooleanRegister ? (
                    <label className={classes.Field}>
                      <span className={classes.FieldLabel}>Tietotyyppi</span>
                      <select
                        className={classes.Input}
                        value={register.dataType}
                        onChange={(event) =>
                          updateRegister(register.id, 'dataType', event.target.value)
                        }
                      >
                        {DATA_TYPE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}

                  {isThirtyTwoBit ? (
                    <label className={classes.Field}>
                      <span className={classes.FieldLabel}>
                        32-bittinen sanajärjestys
                      </span>
                      <select
                        className={classes.Input}
                        value={register.wordOrder}
                        onChange={(event) =>
                          updateRegister(register.id, 'wordOrder', event.target.value)
                        }
                      >
                        {WORD_ORDER_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </label>
                  ) : null}

                  {canWrite ? (
                    <label className={classes.Field}>
                      <span className={classes.FieldLabel}>Käyttö</span>
                      <select
                        className={classes.Input}
                        value={writeDisabled ? 'read' : register.accessMode}
                        onChange={(event) =>
                          updateRegister(register.id, 'accessMode', event.target.value)
                        }
                        disabled={writeDisabled}
                      >
                        {ACCESS_MODE_OPTIONS.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <span className={classes.HelpText}>
                        {writeDisabled
                          ? 'Työkalu tukee 32-bittisille holding-rekistereille vain lukukoodin generointia.'
                          : 'Kirjoittavat coil- ja holding-rekisterit erotellaan omiin modbuslaitteisiinsa.'}
                      </span>
                    </label>
                  ) : null}

                  {showForceControls ? (
                    <>
                      <label className={classes.Field}>
                        <span className={classes.FieldLabel}>Force</span>
                        <select
                          className={classes.Input}
                          value={register.force}
                          onChange={(event) =>
                            updateRegister(register.id, 'force', event.target.value)
                          }
                        >
                          {FORCE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>

                      <label className={classes.Field}>
                        <span className={classes.FieldLabel}>ReleaseOverride</span>
                        <select
                          className={classes.Input}
                          value={register.releaseOverride}
                          onChange={(event) =>
                            updateRegister(
                              register.id,
                              'releaseOverride',
                              event.target.value
                            )
                          }
                        >
                          {RELEASE_OVERRIDE_OPTIONS.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </label>
                    </>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>

        <div className={classes.Actions}>
          <button className={classes.SecondaryButton} type="button" onClick={addRegister}>
            Lisää rekisteri
          </button>
        </div>

        {showForceHelp ? (
          <div className={classes.CompactHelp}>
            <p className={classes.CompactHelpText}>
              <strong>Force:</strong> FALSE: Modbus-laitteen arvo luetaan oletuksena
              ala-asemaan TRUE = Ala-aseman arvo kirjoitetaan oletuksena
              modbus-laitteeseen.
            </p>
            <p className={classes.CompactHelpText}>
              <strong>ReleaseOverride:</strong> TRUE = Käsiohjaus poistuu, kun ala-aseman
              ja modbus-laitteen arvot täsmäävät. False = Käsiohjaus pysyy aktiivisena
            </p>
          </div>
        ) : null}
      </section>

      <section className={classes.Panel}>
        <h2 className={classes.PanelTitle}>
          Vaihe 2: Rekistereiden maksimimäärä modbuslaitteessa
        </h2>
        <p className={classes.PanelText}>
          Valitse, kuinka monta rekisteriä yksi modbuslaitenippu saa enintään sisältää.
          Useimmat laitteet tukee 16 rekisterin lukemista kerralla. Jos laite tukee sitä,
          64 rekisterin käyttö vähentää ala-asemaan lisättävien modbuslaitteiden määrää.
          Joiltakin laitteilta kaikki arvot on luettava yksitellen.
        </p>

        <div className={classes.SimpleRadioGroup}>
          {BATCH_LIMIT_OPTIONS.map((option) => (
            <label key={option.value} className={classes.SimpleRadioLabel}>
              <input
                className={classes.RadioInput}
                type="radio"
                name="batch-limit"
                value={option.value}
                checked={batchLimit === option.value}
                onChange={(event) => handleBatchLimitChange(event.target.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      </section>

      <section className={classes.Panel}>
        <div className={classes.OutputHeader}>
          <div>
            <h2 className={classes.PanelTitle}>Vaihe 3: Tulosteet</h2>
            <p className={classes.PanelText}>
              Generoi funktiolohko, ohjelmakutsu ja käytettyjen apufunktioiden lista.
            </p>
          </div>

          <button
            className={classes.PrimaryButton}
            type="button"
            onClick={handleGenerate}
          >
            Generoi modbus-rajapinta
          </button>
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
                    onClick={() => handleCopy(section.key, section.value, section.title)}
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
            Tulosteet ilmestyvät tähän, kun generointi on tehty.
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
  );
}
