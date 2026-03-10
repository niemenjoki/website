'use client';

import { useRef, useState } from 'react';

import classes from './StVariableTool.module.css';
import {
  DEFAULT_IO_PREFIXES,
  DEFAULT_PREFIX_RULES,
  buildVariableDeclarations,
} from './stVariableTool';

function createEditableRules() {
  return DEFAULT_PREFIX_RULES.map((rule, index) => ({
    ...rule,
    id: `rule-${index + 1}`,
  }));
}

export default function StVariableToolClient() {
  const [source, setSource] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [warnings, setWarnings] = useState([]);
  const [copied, setCopied] = useState(false);
  const [copyHint, setCopyHint] = useState('');
  const [ioPrefixes, setIoPrefixes] = useState(DEFAULT_IO_PREFIXES);
  const [prefixRules, setPrefixRules] = useState(createEditableRules);
  const outputRef = useRef(null);
  const nextRuleId = useRef(DEFAULT_PREFIX_RULES.length + 1);

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

  function resetPrefixes() {
    setIoPrefixes(DEFAULT_IO_PREFIXES);
    setPrefixRules(createEditableRules());
    nextRuleId.current = DEFAULT_PREFIX_RULES.length + 1;
  }

  function updateIoPrefix(field, value) {
    setIoPrefixes((currentPrefixes) => ({
      ...currentPrefixes,
      [field]: value,
    }));
  }

  function updateRule(ruleId, field, value) {
    setPrefixRules((currentRules) =>
      currentRules.map((rule) => {
        if (rule.id !== ruleId) {
          return rule;
        }

        return {
          ...rule,
          [field]: value,
        };
      })
    );
  }

  function addRule() {
    const ruleId = `rule-${nextRuleId.current}`;

    nextRuleId.current += 1;
    setPrefixRules((currentRules) => [
      ...currentRules,
      {
        id: ruleId,
        prefix: '',
        type: '',
        kind: 'value',
      },
    ]);
  }

  function removeRule(ruleId) {
    setPrefixRules((currentRules) => currentRules.filter((rule) => rule.id !== ruleId));
  }

  function createWarnings(result) {
    const nextWarnings = [];

    if (result.unknownVariables.length > 0) {
      nextWarnings.push(
        `Seuraaville muuttujille ei löytynyt tyyppiä etuliitteiden perusteella: ${result.unknownVariables.join(', ')}.`
      );
    }

    if (result.placeholderFunctionBlocks.length > 0) {
      nextWarnings.push(
        `Koodissa on seuraavat funktiolohkot: ${result.placeholderFunctionBlocks.join(', ')}. Täydennä oikea lohkon nimi käsin.`
      );
    }

    if (result.counts.constant > 0) {
      nextWarnings.push(
        'VAR CONSTANT -lohkon arvoalustukset pitää täydentää tarvittaessa käsin.'
      );
    }

    return nextWarnings;
  }

  function handleGenerate() {
    setCopied(false);
    setCopyHint('');

    try {
      const result = buildVariableDeclarations(source, {
        ioPrefixes,
        prefixRules,
      });

      setOutput(result.output);
      setSummary(result.summary);
      setWarnings(createWarnings(result));
      setError('');
    } catch (nextError) {
      setOutput('');
      setSummary('');
      setWarnings([]);
      setCopyHint('');
      setError(
        nextError instanceof Error
          ? nextError.message
          : 'Muuttujalistan luonti epäonnistui.'
      );
    }
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
            Liitä IEC ST -koodi tähän. Työkalu kerää käytetyt tunnukset, sijoittaa
            <code className={classes.InlineCode}> in_</code>-etuliitettä käyttävät
            muuttujat <code className={classes.InlineCode}>VAR_INPUT</code>-lohkoon,
            <code className={classes.InlineCode}> out_</code>-etuliitettä käyttävät
            muuttujat <code className={classes.InlineCode}>VAR_OUTPUT</code>-lohkoon ja
            muut muuttujat tavalliseen <code className={classes.InlineCode}>VAR</code>
            -lohkoon.
          </p>

          <textarea
            className={[classes.Textarea, classes.SourceTextarea].join(' ')}
            value={source}
            onChange={(event) => setSource(event.target.value)}
            placeholder="Liitä IEC ST -koodi tähän"
            spellCheck={false}
          />

          <div className={classes.Actions}>
            <button
              className={classes.PrimaryButton}
              type="button"
              onClick={handleGenerate}
            >
              Luo muuttujalista
            </button>
          </div>
        </section>

        <section className={classes.Panel}>
          <div className={classes.OutputHeader}>
            <div>
              <h2 className={classes.PanelTitle}>Tuloste</h2>
              <p className={classes.PanelText}>
                Kopioi muuttujien esittely koodieditoriin ja täydennä tarvittaessa
                taulukkojen pituudet, vakioiden arvot sekä mahdolliset omien
                funktiolohkojen nimet.
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
              <p className={classes.Success}>Muuttujalista kopioitu leikepöydälle.</p>
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
        <div className={classes.SettingsHeader}>
          <div>
            <h2 className={classes.PanelTitle}>Prefixiasetukset</h2>
            <p className={classes.PanelText}>
              Muokkaa etuliitteitä tarpeen mukaan. Taulukkomuuttujat päätellään
              automaattisesti muodosta{' '}
              <code className={classes.InlineCode}>a + etuliite</code>, esimerkiksi{' '}
              <code className={classes.InlineCode}>ai</code> -&gt; ARRAY of INT ja{' '}
              <code className={classes.InlineCode}>ar</code> -&gt; ARRAY of REAL.
            </p>
          </div>

          <button
            className={classes.SecondaryButton}
            type="button"
            onClick={resetPrefixes}
          >
            Palauta oletukset
          </button>
        </div>

        <div className={classes.FieldGrid}>
          <label className={classes.Field}>
            <span className={classes.FieldLabel}>VAR_INPUT-etuliite</span>
            <input
              className={classes.FieldInput}
              type="text"
              value={ioPrefixes.input}
              onChange={(event) => updateIoPrefix('input', event.target.value)}
              spellCheck={false}
            />
          </label>

          <label className={classes.Field}>
            <span className={classes.FieldLabel}>VAR_OUTPUT-etuliite</span>
            <input
              className={classes.FieldInput}
              type="text"
              value={ioPrefixes.output}
              onChange={(event) => updateIoPrefix('output', event.target.value)}
              spellCheck={false}
            />
          </label>
        </div>

        <div className={classes.RuleListHeader}>
          <h3 className={classes.SubTitle}>Tietotyyppien etuliitteet</h3>
          <button className={classes.SecondaryButton} type="button" onClick={addRule}>
            Lisää prefixi
          </button>
        </div>

        <div className={classes.RuleList}>
          {prefixRules.map((rule) => (
            <div key={rule.id} className={classes.RuleRow}>
              <input
                className={classes.RuleInput}
                type="text"
                value={rule.prefix}
                onChange={(event) => updateRule(rule.id, 'prefix', event.target.value)}
                placeholder="prefix"
                spellCheck={false}
              />
              <input
                className={classes.RuleInput}
                type="text"
                value={rule.type}
                onChange={(event) => updateRule(rule.id, 'type', event.target.value)}
                placeholder="tyyppi"
                spellCheck={false}
              />
              <select
                className={classes.RuleSelect}
                value={rule.kind}
                onChange={(event) => updateRule(rule.id, 'kind', event.target.value)}
              >
                <option value="value">Muuttuja</option>
                <option value="functionBlock">FB-instanssi</option>
              </select>
              <button
                className={classes.IconButton}
                type="button"
                onClick={() => removeRule(rule.id)}
                aria-label={`Poista prefixi ${rule.prefix || rule.type || rule.id}`}
              >
                Poista
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className={classes.InfoPanel}>
        <h2 className={classes.PanelTitle}>Huomiot</h2>
        <ul className={classes.NoteList}>
          <li>
            Täysin isoilla kirjaimilla kirjoitetut tunnukset sijoitetaan VAR CONSTANT
            -lohkoon.
          </li>
          <li>
            Taulukoille luodaan oletuksena muoto ARRAY[] OF TYYPPI. Lisää pituus käsin.
          </li>
          <li>
            fb-etuliite tuottaa oletuksena tyypin FB_. Korvaa se oikealla FB-nimellä
            käsin.
          </li>
          <li>
            Funktiokutsut, tyyppimuunnokset ja FB-jäsenten nimet pyritään ohittamaan
            automaattisesti.
          </li>
        </ul>
      </section>
    </div>
  );
}
