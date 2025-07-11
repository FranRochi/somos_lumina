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

export default function CarouselWithLema() {
  return (
    <div className="relative w-full aspect-[16/5] overflow-hidden">
      {/* Semicírculo decorativo */}
      <div className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-72 h-72 bg-[#deb9e2] rounded-full z-10 opacity-80 hidden md:block" />

      {/* Texto superpuesto */}
      <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none px-4">
        <h2 className="text-[32px] md:text-6xl font-extrabold text-white text-center tracking-tight leading-tight drop-shadow-xl backdrop-blur-sm p-6 rounded-lg">
          DISEÑANMOS SITIOS CON IDENTIDAD
        </h2>
      </div>

      <Swiper
        modules={[Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 2500 }}
        className="w-full h-full"
      >
        {images.map((src, idx) => (
          <SwiperSlide key={idx}>
            <img
              src={src}
              alt={`Slide ${idx}`}
              className="w-full h-full object-cover filter grayscale brightness-75"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
