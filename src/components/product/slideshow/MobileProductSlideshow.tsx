'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';

import './slideshow.css';

// import required modules
import { FreeMode, Thumbs, Autoplay, Pagination } from 'swiper/modules'; //estos modulos vienen separados para que la app no pese tanto
import type { ImagesProps } from '@/interfaces';
import ProductImage from '../product-image/ProductImge';


interface Props {
    images: ImagesProps[];
    title: string;
    className?: string;
}

export function MobileProductSlideshow({ images, title, className }: Props) {
    return (
        <div className={`${className}`}>
            <Swiper
                navigation={true}
                autoplay={{ delay: 2500, disableOnInteraction: true }}
                modules={[FreeMode, Thumbs, Autoplay, Pagination]}
                pagination
                className="mySwiper2"
            >
                {images.map((img) => (
                    <SwiperSlide key={img.id}>
                        <ProductImage
                            src={`/products/${img.url}`}
                            alt={title}
                            width={500}
                            height={500}
                            className='object-fill '
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}