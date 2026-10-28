'use client';

import { useEffect, useRef } from 'react';

export default function MobileDialog({
  children,
  className,
  dataName,
  id,
  isOpen,
  labelledBy,
  onRequestClose,
  panelClassName,
  returnFocusRef,
}) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    if (isOpen && !dialog.open) {
      dialog.showModal();
      const frameId = globalThis.requestAnimationFrame?.(() => {
        const initialFocusRegion = dialog.querySelector('[data-dialog-initial-focus]');
        const initialFocusTarget = initialFocusRegion?.matches(
          'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
          ? initialFocusRegion
          : initialFocusRegion?.querySelector(
              'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

        initialFocusTarget?.focus();
      });

      return () => globalThis.cancelAnimationFrame?.(frameId);
    }

    if (!isOpen && dialog.open) {
      dialog.close();
      globalThis.requestAnimationFrame?.(() => {
        const returnTarget = returnFocusRef?.current;

        if (returnTarget?.isConnected && returnTarget.getClientRects().length > 0) {
          returnTarget.focus();
        }
      });
    }
  }, [isOpen, returnFocusRef]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        onRequestClose();
      }
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', handleKeyDown, true);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onRequestClose]);

  useEffect(
    () => () => {
      if (dialogRef.current?.open) {
        dialogRef.current.close();
      }
    },
    []
  );

  const handleCancel = (event) => {
    event.preventDefault();
    onRequestClose();
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onRequestClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id={id}
      className={className}
      aria-labelledby={labelledBy}
      data-mobile-navigation-dialog={dataName}
      onCancel={handleCancel}
      onClick={handleBackdropClick}
    >
      <div className={panelClassName}>{children}</div>
    </dialog>
  );
}
