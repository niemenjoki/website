export default function Label({ text, left, top }) {
  return (
    <div
      style={{
        position: 'absolute',
        left,
        top,
        fontSize: 10,
        fontWeight: 'bold',
        color: '#000000',
      }}
    >
      {text}
    </div>
  );
}
