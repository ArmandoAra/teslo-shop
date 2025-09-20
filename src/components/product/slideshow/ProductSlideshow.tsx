'use client';
import { useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperObject } from 'swiper/types'; //Para tipar el thumbsSwiper
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import './slideshow.css';

// import required modules
import { FreeMode, Navigation, Thumbs, Autoplay } from 'swiper/modules'; //estos modulos vienen separados para que la app no pese tanto
import Image from 'next/image';

interface Props {
    images: string[];
    title: string;
    className?: string;
}

export function ProductSlideshow({ images, title, className }: Props) {

    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperObject>();

    return (
        <div className={`${className}`}>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                } as React.CSSProperties}
                spaceBetween={10}
                navigation={true}
                autoplay={{ delay: 2500, disableOnInteraction: true }}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                className="mySwiper2"
            >
                {images.map((img) => (
                    <SwiperSlide key={img}>
                        <Image
                            src={`/products/${img}`}
                            alt={title}
                            width={1024}
                            height={800}
                            priority
                            className='object-fill rounded-md'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                {images.map((img) => (
                    <SwiperSlide key={img}>
                        <Image
                            src={`/products/${img}`}
                            alt={title}
                            width={300}
                            height={300}
                            priority
                            className='object-fill rounded-md cursor-pointer'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}