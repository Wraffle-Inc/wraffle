'use client';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import Image from 'next/image';
import React, {useState} from 'react';
import type {FunctionComponent} from 'react';
import Slider from 'react-slick';

interface ProductImageListProps {
  images: string[];
}

const ProductImageList: FunctionComponent<ProductImageListProps> = ({
  images,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: false,
    draggable: true,
    beforeChange: (oldIndex: number, newIndex: number) =>
      setCurrentIndex(newIndex),
  };

  return (
    <div className='relative mx-auto w-full max-w-screen-lg'>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className='w-full'>
            <Image
              src={image}
              alt={`Product Image ${index + 1}`}
              layout='responsive'
              width={1000}
              height={600}
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
        ))}
      </Slider>
      <div className='absolute bottom-5 right-5 z-50 rounded-2xl bg-black bg-opacity-60 px-3 py-1 text-sm text-white'>
        {currentIndex + 1}/{images.length}
      </div>
    </div>
  );
};

export default ProductImageList;
