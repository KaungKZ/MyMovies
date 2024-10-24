"use client";

import React, { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import handleRequest from "@/app/actions";
import { MoveRight } from "lucide-react";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import "./styles.css";

import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MovieCard from "./MovieCard";
import SkeletonPlaceholders from "./SkeletonPlaceholders";

// import "../lib/config/envConfig";

const matchTitle = {
  trending: "Trending this week",
  upcoming: "Upcoming",
  popular: "Popular",
};

export default function GetCategoryData({ category }) {
  const { data, mutate, isPending, isError, error } = useMutation({
    mutationKey: [`get-category-data-${category}`],
    mutationFn: handleRequest,
    onError: (err) => {
      // console.log("api got error");
      throw new Error(err);
    },
  });

  console.log(isError, error);

  // console.log(`.swiper-navig11ation-prev.${category}-prev`);

  useEffect(() => {
    mutate({ category: category });
  }, []);

  return (
    <>
      <div className="relative flex items-center space-x-2">
        <h1 className="text-3xl font-bold text-gray-700 underline">
          {matchTitle[category]}
        </h1>
        <span>
          <MoveRight className="h-11 w-11 text-primary" />
        </span>
        <div className="absolute left-0 top-0 -translate-x-[45px] -translate-y-[60px] -z-10">
          <Image
            src="/assets/section-title-bg-shape.png"
            width="143"
            height="130"
          />
        </div>
      </div>
      <div className="relative">
        {isError ? (
          <div>APi got error</div>
        ) : (
          <Swiper
            slidesPerView={4}
            slidesPerGroup={4}
            spaceBetween={65}
            pagination={{
              clickable: true,
              el: ".category-custom-pagination",
              type: "bullets",
              clickable: false,
              // bulletClass: "bg-primary opacity-60 w-10 h-1",
              // bulletActiveClass: "bg-primary",
              // renderBullet: function (index, className) {
              //   return (
              //     '<span class="' + className + '">' + (index + 1) + "</span>"
              //   );
              // },
            }}
            modules={[Pagination, Navigation]}
            speed={800}
            // navigation={true}
            navigation={
              (true,
              {
                nextEl: `.swiper-navigation-next.${category}-next`,
                prevEl: `.swiper-navigation-prev.${category}-prev`,
              })
            }
            className="mySwiper"
          >
            {!isPending ? (
              data?.results?.map((d) => {
                return (
                  <SwiperSlide>
                    <MovieCard movie={d} />
                  </SwiperSlide>
                );
              })
            ) : (
              <SkeletonPlaceholders />
            )}
          </Swiper>
        )}
        <div className="category-custom-pagination flex space-x-1"></div>
        <div className={`swiper-navigation-wrapper`}>
          <div
            className={`swiper-navigation-prev absolute z-10 bg-emerald-500 h-16 w-10 flex justify-center items-center rounded shadow-xl transform -translate-y-1/2 top-1/2 cursor-pointer group-hover:hidden transition duration-300 hover:bg-emerald-600 left-12 xl:right-7 ${category}-prev`}
          >
            <ArrowLeft className="h-6 w-6 text-white transition duration-300" />
          </div>
          <div
            className={`swiper-navigation-next absolute z-10 bg-emerald-500 h-16 w-10 flex justify-center items-center rounded shadow-xl transform -translate-y-1/2 top-1/2 cursor-pointer group-hover:hidden transition duration-300 hover:bg-emerald-600 right-12 ${category}-next`}
          >
            <ArrowRight className="h-6 w-6 text-white transition duration-300" />
          </div>
        </div>
      </div>
    </>
  );
}
