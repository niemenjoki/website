'use client';

import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { useRouter } from 'next/navigation';

import Icon from '@/components/Icon/Icon';
import { normalizeSearchQuery } from '@/lib/search/searchQuery.mjs';

import classes from './SiteSearch.module.css';
import SiteSearchResults from './SiteSearchResults';

const MIN_QUERY_LENGTH = 3;
const SEARCH_KEYS = [
  { name: 'title', weight: 0.45 },
  { name: 'description', weight: 0.25 },
  { name: 'keywords', weight: 0.25 },
  { name: 'tags', weight: 0.18 },
  { name: 'headings', weight: 0.2 },
  { name: 'section', weight: 0.12 },
  { name: 'searchText', weight: 0.08 },
];

function getResultStatus({ hasSearched, isSearching, normalizedQuery, resultCount }) {
  if (isSearching) {
    return `Haetaan tuloksia haulle ”${normalizedQuery}”…`;
  }

  if (!hasSearched) return '';
  if (resultCount === 0) return `Ei hakutuloksia haulle ”${normalizedQuery}”.`;
  if (resultCount === 1) return `1 hakutulos haulle ”${normalizedQuery}”.`;
  return `${resultCount} hakutulosta haulle ”${normalizedQuery}”.`;
}

export default function SiteSearch({
  autoFocus = false,
  className = '',
  clearLabel = 'Tyhjennä haku',
  closeLabel = 'Sulje haku',
  initialQuery = '',
  label = 'Hae sivustolta',
  onNavigate,
  placeholder = 'Hae julkaisuja tai aiheita',
  resultLimit = 5,
  searchItems = [],
  variant = 'inline',
}) {
  const router = useRouter();
  const instanceId = useId().replaceAll(':', '');
  const inputId = `site-search-${variant}-${instanceId}`;
  const panelId = `site-search-panel-${instanceId}`;
  const resultsId = `site-search-results-${instanceId}`;
  const resultsHeadingId = `site-search-heading-${instanceId}`;
  const resultsStatusId = `site-search-status-${instanceId}`;
  const resultGroupIdPrefix = `site-search-group-${instanceId}`;
  const [isOpen, setIsOpen] = useState(variant !== 'navbar');
  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const triggerRef = useRef(null);
  const isNavbar = variant === 'navbar';
  const normalizedQuery = useMemo(() => normalizeSearchQuery(query), [query]);
  const canSearch = normalizedQuery.length >= MIN_QUERY_LENGTH;
  const showResults = canSearch && (isSearching || hasSearched);
  const variantClassName = classes[`Variant_${variant}`] ?? '';
  const resultStatus = getResultStatus({
    hasSearched,
    isSearching,
    normalizedQuery,
    resultCount: results.length,
  });

  const closeNavbarSearch = useCallback(({ restoreFocus = false } = {}) => {
    setIsOpen(false);
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setIsSearching(false);

    if (restoreFocus) {
      globalThis.requestAnimationFrame?.(() => triggerRef.current?.focus());
    }
  }, []);

  // A new non-empty initial query (for example from the /haku URL) replaces the typed one.
  const [syncedInitialQuery, setSyncedInitialQuery] = useState(initialQuery);
  if (syncedInitialQuery !== initialQuery) {
    setSyncedInitialQuery(initialQuery);
    if (initialQuery) {
      setQuery(initialQuery);
    }
  }

  useEffect(() => {
    if (!isOpen || !autoFocus) return;
    inputRef.current?.focus();
  }, [autoFocus, isOpen]);

  useEffect(() => {
    let isCurrent = true;

    async function runSearch() {
      if (!canSearch) {
        setResults([]);
        setHasSearched(false);
        setIsSearching(false);
        return;
      }

      setResults([]);
      setHasSearched(false);
      setIsSearching(true);

      const { default: Fuse } = await import('fuse.js');
      const fuse = new Fuse(searchItems, {
        includeScore: true,
        ignoreLocation: true,
        minMatchCharLength: MIN_QUERY_LENGTH,
        threshold: 0.4,
        keys: SEARCH_KEYS,
      });

      const nextResults = fuse
        .search(normalizedQuery)
        .filter((result) => result.score == null || result.score < 0.62)
        .slice(0, resultLimit)
        .map((result) => result.item);

      if (!isCurrent) return;
      setResults(nextResults);
      setHasSearched(true);
      setIsSearching(false);
    }

    runSearch();

    return () => {
      isCurrent = false;
    };
  }, [canSearch, normalizedQuery, resultLimit, searchItems]);

  useEffect(() => {
    if (!isNavbar || !isOpen) return undefined;

    const handleKeyDown = (event) => {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      closeNavbarSearch({ restoreFocus: true });
    };
    const handlePointerDown = (event) => {
      if (!containerRef.current?.contains(event.target)) closeNavbarSearch();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [closeNavbarSearch, isNavbar, isOpen]);

  const submitSearch = (event) => {
    event.preventDefault();
    if (!canSearch) {
      inputRef.current?.focus();
      return;
    }

    if (!results[0]) return;
    onNavigate?.();
    if (isNavbar) closeNavbarSearch();
    router.push(results[0].href);
  };

  const openNavbarSearch = () => {
    setIsOpen(true);
    globalThis.requestAnimationFrame?.(() => inputRef.current?.focus());
  };

  const handleNavigate = () => {
    onNavigate?.();
    if (isNavbar) closeNavbarSearch();
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setHasSearched(false);
    setIsSearching(false);
    inputRef.current?.focus();
  };

  return (
    <div
      ref={containerRef}
      className={`${classes.SiteSearch} ${variantClassName} ${className}`.trim()}
      data-search-open={isOpen ? 'true' : 'false'}
    >
      {isNavbar ? (
        <button
          ref={triggerRef}
          type="button"
          className={`${classes.IconButton} ${isOpen ? classes.IconButtonHidden : ''}`}
          aria-label={label}
          aria-controls={panelId}
          aria-expanded={isOpen}
          onClick={openNavbarSearch}
        >
          <Icon name="search" aria-hidden="true" />
        </button>
      ) : null}

      {!isNavbar || isOpen ? (
        <div id={panelId} className={classes.SearchPanel}>
          <form className={classes.Form} role="search" onSubmit={submitSearch}>
            <label className={classes.Label} htmlFor={inputId}>
              {label}
            </label>
            <div className={classes.InputWrap}>
              <Icon name="search" className={classes.InputIcon} aria-hidden="true" />
              <input
                ref={inputRef}
                id={inputId}
                type="search"
                value={query}
                placeholder={placeholder}
                onChange={(event) => setQuery(event.target.value)}
                className={classes.Input}
                autoComplete="off"
                aria-controls={resultsId}
                aria-describedby={showResults ? resultsStatusId : undefined}
              />
              {isNavbar ? (
                <button
                  type="button"
                  className={classes.CloseButton}
                  aria-label={closeLabel}
                  onClick={() => closeNavbarSearch({ restoreFocus: true })}
                >
                  <Icon name="close" aria-hidden="true" />
                </button>
              ) : query ? (
                <button
                  type="button"
                  className={classes.CloseButton}
                  aria-label={clearLabel}
                  onClick={clearSearch}
                >
                  <Icon name="close" aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </form>

          {showResults ? (
            <section
              id={resultsId}
              className={classes.ResultsPanel}
              aria-labelledby={resultsHeadingId}
            >
              <div className={classes.ResultsHeader}>
                <h2 id={resultsHeadingId}>Hakutulokset</h2>
                <p
                  id={resultsStatusId}
                  className={classes.ResultsStatus}
                  role="status"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {resultStatus}
                </p>
              </div>

              {isSearching ? (
                <div className={classes.Searching} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              ) : (
                <SiteSearchResults
                  headingLevel={3}
                  idPrefix={resultGroupIdPrefix}
                  results={results}
                  emptyMessage={`Ei tuloksia haulle ”${normalizedQuery}”.`}
                  onNavigate={handleNavigate}
                />
              )}
            </section>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
