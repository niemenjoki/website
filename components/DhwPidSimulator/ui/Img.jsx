export default function Img({ src, left, top, width, height }) {
  return (
    <img
      src={src.src}
      alt=""
      style={{ position: 'absolute', left, top, width, height, borderRadius: 0 }}
    />
  );
}
