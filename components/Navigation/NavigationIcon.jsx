const ICON_PATHS = {
  home: (
    <>
      <path d="M3.5 10.2 12 3l8.5 7.2" />
      <path d="M6.2 9.2v10h11.6v-10M10 19.2v-5.4h4v5.4" />
    </>
  ),
  blog: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h5" />
    </>
  ),
  about: (
    <>
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5.2 20c.8-4 3.1-6 6.8-6s6 2 6.8 6" />
      <path d="M8.7 4.2c1.8-1.4 4.8-1.4 6.6 0" />
    </>
  ),
  search: (
    <>
      <circle cx="10.7" cy="10.7" r="6.2" />
      <path d="m15.2 15.2 4.6 4.6" />
    </>
  ),
  more: (
    <>
      <circle cx="5" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  close: <path d="m5 5 14 14M19 5 5 19" />,
};

export default function NavigationIcon({ name, className }) {
  const content = ICON_PATHS[name] ?? ICON_PATHS.blog;

  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {content}
    </svg>
  );
}
