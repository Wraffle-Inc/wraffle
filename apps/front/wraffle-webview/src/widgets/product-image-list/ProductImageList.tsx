'use client';

import 'swiper/css';
import 'swiper/css/pagination';
import {Swiper, SwiperSlide} from 'swiper/react';
import Image from 'next/image';
import React, {useState} from 'react';
import type {FunctionComponent} from 'react';

interface ProductImageListProps {
  images: string[];
}

const ProductImageList: FunctionComponent<ProductImageListProps> = ({
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className='relative mx-auto w-full max-w-screen-lg'>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        slidesPerGroup={1}
        loop={true}
        onSlideChange={swiper => setCurrentIndex(swiper.realIndex)}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <Image
              src={image}
              alt={`Product Image ${index + 1}`}
              layout='responsive'
              width={1000}
              height={600}
              objectFit='cover'
              className='rounded-lg'
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className='absolute bottom-5 right-5 z-50 rounded-2xl bg-black bg-opacity-60 px-3 py-1 text-sm text-white'>
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};

export default ProductImageList;
