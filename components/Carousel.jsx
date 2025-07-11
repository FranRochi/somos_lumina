// components/Carousel.jsx
"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";

const images = [
  "/foto_1.jpg",
  "/foto_2.jpg",
  "/foto_3.jpg",
];

export default function Carousel() {
  return (
    <div className="w-full max-w-5xl mx-auto py-12">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 1000 }}
        className="rounded-xl overflow-hidden"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx}`}
              className="w-full h-96 object-cover filter grayscale brightness-75"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
