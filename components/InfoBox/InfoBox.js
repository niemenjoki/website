// components/InfoBox.jsx
export default function InfoBox({ children }) {
  return (
    <aside
      style={{
        border: '2px solid var(--highlight)',
        padding: '0 .5em',
        borderRadius: '8px',
        marginBottom: '2rem',
        backgroundColor: 'var(--background-4)',
      }}
    >
      {children}
    </aside>
  );
}
