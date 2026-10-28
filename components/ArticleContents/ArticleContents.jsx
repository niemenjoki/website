'use client';

import { useEffect, useId, useRef, useState } from 'react';

import classes from './ArticleContents.module.css';

const MINIMUM_HEADING_COUNT = 3;

function ContentsLinks({ headings, onNavigate }) {
  return (
    <ol className={classes.List}>
      {headings.map((heading) => (
        <li
          key={heading.id}
          className={`${classes.Item} ${heading.level === 3 ? classes.LevelThree : ''}`}
        >
          <a href={`#${heading.id}`} className={classes.Link} onClick={onNavigate}>
            {heading.text}
          </a>
        </li>
      ))}
    </ol>
  );
}

export default function ArticleContents({ headings = [] }) {
  const generatedId = useId().replaceAll(':', '');
  const dialogId = `article-contents-${generatedId}`;
  const dialogTitleId = `${dialogId}-title`;
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);
  const restoreFocusRef = useRef(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  useEffect(() => {
    const mediaQuery = globalThis.matchMedia?.('(max-width: 760px)');

    if (!mediaQuery) return undefined;

    const closeAtDesktopWidth = () => {
      if (mediaQuery.matches || !dialogRef.current?.open) return;

      restoreFocusRef.current = false;
      dialogRef.current.close();
    };

    closeAtDesktopWidth();
    mediaQuery.addEventListener?.('change', closeAtDesktopWidth);
    return () => mediaQuery.removeEventListener?.('change', closeAtDesktopWidth);
  }, []);

  if (headings.length < MINIMUM_HEADING_COUNT) return null;

  const openDialog = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    restoreFocusRef.current = true;
    dialog.showModal();
    setIsOpen(true);
    globalThis.requestAnimationFrame?.(() => closeButtonRef.current?.focus());
  };

  const closeDialog = ({ restoreFocus = true } = {}) => {
    restoreFocusRef.current = restoreFocus;
    dialogRef.current?.close();
  };

  const handleDialogClose = () => {
    setIsOpen(false);

    if (restoreFocusRef.current) {
      globalThis.requestAnimationFrame?.(() => triggerRef.current?.focus());
    }
  };

  const handleDialogCancel = () => {
    restoreFocusRef.current = true;
  };

  const handleDialogClick = (event) => {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  const handleContentsLinkClick = () => {
    closeDialog({ restoreFocus: false });
  };

  return (
    <>
      <aside className={classes.DesktopContents} aria-label="Artikkelin sisällys">
        <nav className={classes.StickyContents} aria-label="Artikkelin sisällys">
          <p className={classes.Title}>Sisällys</p>
          <ContentsLinks headings={headings} />
        </nav>
      </aside>

      <div className={classes.MobileContents}>
        <button
          ref={triggerRef}
          type="button"
          className={classes.Trigger}
          aria-controls={dialogId}
          aria-expanded={isOpen}
          aria-haspopup="dialog"
          onClick={openDialog}
        >
          <span>Sisällys</span>
          <span className={classes.TriggerMeta} aria-hidden="true">
            {headings.length} kohtaa
          </span>
        </button>

        <dialog
          ref={dialogRef}
          id={dialogId}
          className={classes.Dialog}
          aria-labelledby={dialogTitleId}
          onCancel={handleDialogCancel}
          onClick={handleDialogClick}
          onClose={handleDialogClose}
        >
          <div className={classes.DialogPanel}>
            <div className={classes.DialogHeader}>
              <h2 id={dialogTitleId}>Sisällys</h2>
              <button
                ref={closeButtonRef}
                type="button"
                className={classes.CloseButton}
                onClick={() => closeDialog()}
              >
                Sulje
              </button>
            </div>
            <nav aria-label="Artikkelin sisällys">
              <ContentsLinks headings={headings} onNavigate={handleContentsLinkClick} />
            </nav>
          </div>
        </dialog>
      </div>
    </>
  );
}
