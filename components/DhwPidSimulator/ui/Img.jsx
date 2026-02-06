import Image from 'next/image';

export default function Img({ src, left, top, width, height }) {
  return (
    <Image
      width={width}
      height={height}
      src={src.src}
      alt=""
      style={{ position: 'absolute', left, top, width, height, borderRadius: 0 }}
    />
  );
}
