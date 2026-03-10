'use client';

import { useRef, useState } from 'react';

import classes from './AlarmPageTool.module.css';
import { buildOutputHtml, parsePointDatabase } from './alarmPageTool';

export default function AlarmPageToolClient() {
  const [source, setSource] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);
  const [copyHint, setCopyHint] = useState('');
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
      const { rows, measurementCount } = parsePointDatabase(source);

      if (rows.length === 0) {
        setOutput('');
        setError('');
        setCopyHint('');
        setSummary(
          `Kelvollisia rivejä ei löytynyt. Tarkistettuja mittauspisteitä: ${measurementCount}.`
        );
        return;
      }

      setOutput(buildOutputHtml(rows));
      setError('');
      setCopyHint('');
      setSummary(
        `Löytyi ${rows.length} tulostettavaa riviä ${measurementCount} mittauspisteestä.`
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
            _C-päätteinen asetusarvo sekä SVH-päätteinen säätövikahälytys.
          </p>

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
          <li>Alaraja käyttää limittiä 1</li>
          <li>Yläraja käyttää limittiä 2</li>
          <li>Säätövika käyttää limittiä 3</li>
        </ul>
      </section>
    </div>
  );
}
