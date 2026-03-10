'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import SafeImage from '../SafeImage/SafeImage';

export default function ImageSlider({ images = [], maxWidth = '600px' }) {
  if (!images.length) return null;

  return (
    <Swiper
      modules={[Pagination]}
      pagination={{ clickable: true }}
      spaceBetween={20}
      style={{
        width: '100%',
        maxWidth,
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      {images.map((img, i) => (
        <SwiperSlide key={i}>
          <SafeImage
            src={img.src}
            alt={img.alt || ''}
            width={img.width || 1200}
            height={img.height || 800}
            sizes={img.sizes || '(max-width: 800px) 100vw, 800px'}
            priority={img.priority || false}
            loading={img.loading || 'lazy'}
            style={img.style || { width: '100%', maxWidth: '800px', height: 'auto' }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
