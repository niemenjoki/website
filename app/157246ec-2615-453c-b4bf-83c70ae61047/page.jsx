import OptOutRedirect from './OptOutRedirect';

// Hidden page for the site owner. Not linked anywhere and not in the sitemap.
export const metadata = {
  title: 'Analytiikan poisto käytöstä',
  robots: { index: false, follow: false, nocache: true },
};

export default function Page() {
  return (
    <>
      <OptOutRedirect />
      <p>Hetki...</p>
    </>
  );
}
