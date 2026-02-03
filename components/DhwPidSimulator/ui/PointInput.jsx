export default function PointInput({ value, left, top, editable, onChange, className }) {
  return (
    <input
      value={value}
      disabled={!editable}
      className={className}
      style={{
        position: 'absolute',
        left,
        top,
        cursor: editable ? 'text' : 'not-allowed',
        opacity: 1,
      }}
      onChange={(e) => onChange?.(e.target.value)}
    />
  );
}
