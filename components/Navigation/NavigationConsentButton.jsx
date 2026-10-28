'use client';

import { useId, useState } from 'react';

import { openConsentPreferences } from '@/lib/site/consentPreferences';

export default function NavigationConsentButton({
  className,
  failureMessage,
  label,
  messageClassName,
  onOpened,
}) {
  const [message, setMessage] = useState('');
  const messageId = useId();

  const handleClick = () => {
    const opened = openConsentPreferences();

    setMessage(opened ? '' : failureMessage);

    if (opened) {
      onOpened?.();
    }
  };

  return (
    <>
      <button
        type="button"
        className={className}
        aria-describedby={message ? messageId : undefined}
        data-consent-preferences-trigger="true"
        onClick={handleClick}
      >
        {label}
      </button>
      {message ? (
        <span
          id={messageId}
          className={messageClassName}
          role="status"
          aria-live="polite"
        >
          {message}
        </span>
      ) : null}
    </>
  );
}
