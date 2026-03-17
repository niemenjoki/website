'use client';

import { useRef, useState } from 'react';

import classes from './AlarmPageTool.module.css';
import {
  DEFAULT_LIMIT_NUMBERS,
  GROUP_ID_REGEX,
  LIMIT_OPTIONS,
  buildOutputs,
  parsePointDatabase,
} from './alarmPageTool';

function createEmptyCopyState() {
  return {
    hint: '',
    message: '',
    target: '',
  };
}

export default function AlarmPageToolClient() {
  const [source, setSource] = useState('');
  const [systemPrefix, setSystemPrefix] = useState('');
  const [groupHtml, setGroupHtml] = useState(true);
  const [limitNumbers, setLimitNumbers] = useState(DEFAULT_LIMIT_NUMBERS);
  const [parsedData, setParsedData] = useState(null);
  const [reviewGroups, setReviewGroups] = useState([]);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [codeOutput, setCodeOutput] = useState('');
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');
  const [copyState, setCopyState] = useState(createEmptyCopyState());
  const htmlOutputRef = useRef(null);
  const codeOutputRef = useRef(null);

  function clearOutputs() {
    setHtmlOutput('');
    setCodeOutput('');
    setCopyState(createEmptyCopyState());
  }

  function resetDerivedState() {
    setParsedData(null);
    setReviewGroups([]);
    clearOutputs();
    setSummary('');
    setError('');
  }

  function selectOutput(target) {
    const element = target === 'html' ? htmlOutputRef.current : codeOutputRef.current;

    if (!element) {
      return false;
    }

    element.focus();
    element.select();
    element.setSelectionRange(0, element.value.length);
    return true;
  }

  function updateSource(value) {
    setSource(value);
    resetDerivedState();
  }

  function updateSystemPrefix(value) {
    setSystemPrefix(value);
    resetDerivedState();
  }

  function updateGrouping(nextValue) {
    setGroupHtml(nextValue);
    resetDerivedState();
  }

  function updateLimitNumber(field, value) {
    setLimitNumbers((currentLimitNumbers) => ({
      ...currentLimitNumbers,
      [field]: Number(value),
    }));
    resetDerivedState();
  }

  function createSummaryText({
    finalGroupCount,
    measurementCount,
    pendingReview = false,
    rowCount,
  }) {
    const baseText = `Löytyi ${rowCount} tulostettavaa hälytysriviä ${measurementCount} mittauspisteestä. Käytetyt limitit: yläraja ${limitNumbers.high}, alaraja ${limitNumbers.low}, säätövika ${limitNumbers.control}.`;

    if (pendingReview) {
      return `${baseText} Tunnistetut ryhmät: ${finalGroupCount}. Tarkista ryhmät ennen grafiikkakuvan ja koodin generointia.`;
    }

    return `${baseText} Lopullisia koodiryhmiä: ${finalGroupCount}.`;
  }

  function handleParse() {
    clearOutputs();
    setError('');

    try {
      const nextParsedData = parsePointDatabase(source, {
        limitNumbers,
        systemPrefix,
      });

      if (nextParsedData.rows.length === 0) {
        setParsedData(null);
        setReviewGroups([]);
        setSummary(
          `Tulostettavia hälytysrivejä ei löytynyt. Tarkistettuja mittauspisteitä: ${nextParsedData.measurementCount}. Käytetyt limitit: yläraja ${nextParsedData.limitNumbers.high}, alaraja ${nextParsedData.limitNumbers.low}, säätövika ${nextParsedData.limitNumbers.control}.`
        );
        return;
      }

      if (groupHtml) {
        setParsedData(nextParsedData);
        setReviewGroups(nextParsedData.groups);
        setSummary(
          createSummaryText({
            finalGroupCount: nextParsedData.groups.length,
            measurementCount: nextParsedData.measurementCount,
            pendingReview: true,
            rowCount: nextParsedData.rows.length,
          })
        );
        return;
      }

      const nextOutputs = buildOutputs(nextParsedData, {
        groupHtml: false,
      });

      setParsedData(null);
      setReviewGroups([]);
      setHtmlOutput(nextOutputs.html);
      setCodeOutput(nextOutputs.code);
      setSummary(
        createSummaryText({
          finalGroupCount: nextOutputs.finalGroups.length,
          measurementCount: nextParsedData.measurementCount,
          rowCount: nextParsedData.rows.length,
        })
      );
    } catch (nextError) {
      setParsedData(null);
      setReviewGroups([]);
      clearOutputs();
      setSummary('');
      setError(
        nextError instanceof Error ? nextError.message : 'Jäsentäminen epäonnistui.'
      );
    }
  }

  function updateReviewGroup(sourceId, field, value) {
    setCopyState(createEmptyCopyState());
    setHtmlOutput('');
    setCodeOutput('');

    if (field === 'id') {
      if (value !== '' && !GROUP_ID_REGEX.test(value)) {
        setError('Ryhmätunnuksessa sallitaan vain kirjaimet A-Z ja numerot 0-9.');
        return;
      }

      if (error === 'Ryhmätunnuksessa sallitaan vain kirjaimet A-Z ja numerot 0-9.') {
        setError('');
      }
    }

    setReviewGroups((currentGroups) =>
      currentGroups.map((group) =>
        group.sourceId === sourceId
          ? {
              ...group,
              [field]: value,
            }
          : group
      )
    );
  }

  function handleGenerateFromReviewedGroups() {
    if (!parsedData) {
      return;
    }

    clearOutputs();
    setError('');

    try {
      const nextOutputs = buildOutputs(parsedData, {
        groupHtml: true,
        groupEdits: reviewGroups,
      });

      setHtmlOutput(nextOutputs.html);
      setCodeOutput(nextOutputs.code);
      setSummary(
        createSummaryText({
          finalGroupCount: nextOutputs.finalGroups.length,
          measurementCount: parsedData.measurementCount,
          rowCount: parsedData.rows.length,
        })
      );
    } catch (nextError) {
      setError(
        nextError instanceof Error ? nextError.message : 'Generointi epäonnistui.'
      );
    }
  }

  async function handleCopy(target) {
    const nextOutput = target === 'html' ? htmlOutput : codeOutput;

    if (!nextOutput) {
      return;
    }

    try {
      if (navigator.clipboard?.writeText && window.isSecureContext) {
        await navigator.clipboard.writeText(nextOutput);
      } else {
        const selected = selectOutput(target);

        if (!selected || !document.execCommand('copy')) {
          throw new Error('fallback-copy-failed');
        }
      }

      setCopyState({
        hint: '',
        message:
          target === 'html' ? 'Grafiikkakuvan HTML-koodi kopioitu.' : 'Koodi kopioitu.',
        target,
      });
      setError('');
    } catch {
      setCopyState({
        hint:
          target === 'html'
            ? 'Valitse HTML-koodi käsin ja kopioi se näppäimillä Ctrl+C tai Cmd+C.'
            : 'Valitse koodi käsin ja kopioi se näppäimillä Ctrl+C tai Cmd+C.',
        message: '',
        target,
      });
      selectOutput(target);
      setError(
        target === 'html'
          ? 'HTML-koodin kopiointi epäonnistui selaimessa.'
          : 'Koodin kopiointi epäonnistui selaimessa.'
      );
    }
  }

  const showReviewPanel = groupHtml && reviewGroups.length > 0;

  return (
    <div className={classes.ToolShell}>
      <section className={classes.Panel}>
        <h2 className={classes.PanelTitle}>Lähdedata</h2>
        <p className={classes.PanelText}>
          Liitä FX-Editorin Points-välilehdeltä kaikki pisteet, joille haluat generoida
          hälytyssivun ja IEC-koodin.
        </p>
        <p className={classes.PanelText}>
          Työkalu huomioi kaikki _M tai _FM päätteiset pisteet, joille löytyy vastaava
          _SVH, _ARH tai _YRH päätteinen hälytyspiste.
        </p>

        <div className={classes.SettingsGrid}>
          <label className={classes.Field}>
            <span className={classes.FieldLabel}>Järjestelmäetuliite</span>
            <input
              className={classes.TextInput}
              value={systemPrefix}
              onChange={(event) => updateSystemPrefix(event.target.value)}
              placeholder="Esim. VAK1 tai KOHDE_VAK1"
              spellCheck={false}
            />
          </label>

          <label className={classes.CheckboxField}>
            <span aria-hidden="true" className={classes.CheckboxSpacer}>
              Asetus
            </span>
            <span className={classes.CheckboxRow}>
              <input
                checked={groupHtml}
                className={classes.Checkbox}
                onChange={(event) => updateGrouping(event.target.checked)}
                type="checkbox"
              />
              <span>Ryhmittele hälytykset</span>
            </span>
          </label>
        </div>

        <div className={classes.LimitSettings}>
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
          onChange={(event) => updateSource(event.target.value)}
          placeholder="Liitä pisteet tähän"
          spellCheck={false}
        />

        <div className={classes.Actions}>
          <button className={classes.PrimaryButton} type="button" onClick={handleParse}>
            {groupHtml ? 'Tunnista ryhmät' : 'Luo grafiikkakuva ja koodi'}
          </button>
        </div>

        <div className={classes.StatusArea} aria-live="polite">
          {summary ? <p className={classes.Summary}>{summary}</p> : null}
          {error ? <p className={classes.Error}>{error}</p> : null}
        </div>
      </section>

      {showReviewPanel ? (
        <section className={classes.Panel}>
          <h2 className={classes.PanelTitle}>Ryhmien tarkistus</h2>
          <p className={classes.PanelText}>
            Pistetietokannan perusteella löytyi seuraavat ryhmät. Voit vielä muokata
            ryhmiä. Hälytykset ryhmitellään ryhmätunnuksen perusteella koodissa ja
            grafiikkakuvassa.
          </p>

          <div className={classes.GroupReviewList}>
            {reviewGroups.map((group) => (
              <div key={group.sourceId} className={classes.GroupReviewRow}>
                <label className={classes.Field}>
                  <span className={classes.FieldLabel}>Ryhmätunnus</span>
                  <input
                    className={classes.TextInput}
                    onChange={(event) =>
                      updateReviewGroup(group.sourceId, 'id', event.target.value)
                    }
                    spellCheck={false}
                    value={group.id}
                  />
                </label>

                <label className={classes.Field}>
                  <span className={classes.FieldLabel}>Ryhmän nimi</span>
                  <input
                    className={classes.TextInput}
                    onChange={(event) =>
                      updateReviewGroup(group.sourceId, 'name', event.target.value)
                    }
                    spellCheck={false}
                    value={group.name}
                  />
                </label>
              </div>
            ))}
          </div>

          <div className={classes.Actions}>
            <button
              className={classes.PrimaryButton}
              type="button"
              onClick={handleGenerateFromReviewedGroups}
            >
              Luo grafiikkakuva ja koodi
            </button>
          </div>
        </section>
      ) : null}

      <div className={classes.OutputGrid}>
        <section className={[classes.Panel, classes.OutputPanel].join(' ')}>
          <div className={classes.OutputHeader}>
            <div className={classes.OutputHeaderText}>
              <h2 className={classes.PanelTitle}>Grafiikkakuva</h2>
              <p className={classes.PanelText}>Generoitu HTML</p>
            </div>

            <button
              className={classes.SecondaryButton}
              type="button"
              onClick={() => handleCopy('html')}
              disabled={!htmlOutput}
            >
              Kopioi HTML-koodi
            </button>
          </div>

          <textarea
            ref={htmlOutputRef}
            className={[classes.Textarea, classes.OutputTextarea].join(' ')}
            value={htmlOutput}
            readOnly
            spellCheck={false}
          />

          <div className={classes.StatusArea} aria-live="polite">
            {copyState.target === 'html' && copyState.message ? (
              <p className={classes.Success}>{copyState.message}</p>
            ) : null}
            {copyState.target === 'html' && copyState.hint ? (
              <p className={classes.Hint}>{copyState.hint}</p>
            ) : null}
          </div>
        </section>

        <section className={[classes.Panel, classes.OutputPanel].join(' ')}>
          <div className={classes.OutputHeader}>
            <div className={classes.OutputHeaderText}>
              <h2 className={classes.PanelTitle}>Koodi</h2>
              <p className={classes.PanelText}>Generoitu IEC koodi</p>
            </div>

            <button
              className={classes.SecondaryButton}
              type="button"
              onClick={() => handleCopy('code')}
              disabled={!codeOutput}
            >
              Kopioi koodi
            </button>
          </div>

          <textarea
            ref={codeOutputRef}
            className={[classes.Textarea, classes.OutputTextarea].join(' ')}
            value={codeOutput}
            readOnly
            spellCheck={false}
          />

          <div className={classes.StatusArea} aria-live="polite">
            {copyState.target === 'code' && copyState.message ? (
              <p className={classes.Success}>{copyState.message}</p>
            ) : null}
            {copyState.target === 'code' && copyState.hint ? (
              <p className={classes.Hint}>{copyState.hint}</p>
            ) : null}
            <p className={classes.WarningText}>
              Tarkista generoitu koodi huolellisesti ennen käyttöönottoa.
            </p>
          </div>
        </section>
      </div>

      <section className={classes.InfoPanel}>
        <h2 className={classes.PanelTitle}>Huomiot</h2>
        <ul className={classes.RuleList}>
          <li>
            Grafiikkakuvan selitetekstit otetaan suoraan pisteen tekstistä. Ryhmiteltynä
            selitteestä poistetaan alkuosa ennen ensimmäistä pilkkua. Ilman ryhmittelyä
            pistetekstiä käytetään sellaisenaan.
          </li>
          <li>
            Generointi perustuu _M tai _FM päätteisiin mittauspisteisiin. Jos molemmat
            löytyvät, käytetään _M päätteistä pistettä.
          </li>
          <li>
            Riville generoidaan vain mittauspisteet, joille löytyy vastaava _SVH, _ARH tai
            _YRH päätteinen hälytyspiste.
          </li>
          <li>
            Riville lisätään asetusarvo vain, jos liittyvä _C piste löytyy, ja
            muunnostaulukko vain, jos liittyvä _L piste löytyy.
          </li>
          <li>
            Säätövian liukuma generoidaan mittauspisteen limitistä vain silloin, kun
            liittyvä _SVH piste löytyy. Samalla riville lisätään myös _SVH hälytys.
          </li>
          <li>
            Alaraja generoidaan mittauspisteen valitusta limitistä vain silloin, kun
            liittyvä _ARH piste löytyy. Samalla riville lisätään myös _ARH hälytys.
          </li>
          <li>
            Yläraja generoidaan mittauspisteen valitusta limitistä vain silloin, kun
            liittyvä _YRH piste löytyy. Samalla riville lisätään myös _YRH hälytys.
          </li>
        </ul>
      </section>
    </div>
  );
}
