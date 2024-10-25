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
import MaxWidthWrapper from "./MaxWidthWrapper";
import { SectionBgShape } from "./LoadSvgShapes";

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

  // console.log(`.swiper-navig11ation-prev.${category}-prev`);

  useEffect(() => {
    mutate({ category: category });
  }, []);

  return (
    <>
      <MaxWidthWrapper>
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
      </MaxWidthWrapper>
      <div className="relative">
        {isError ? (
          <div>APi got error</div>
        ) : isPending ? (
          <SkeletonPlaceholders />
        ) : (
          <div className="relative py-10">
            <MaxWidthWrapper cls="relative">
              <div
                className={`category-custom-pagination flex space-x-1 my-8 justify-end ${category}`}
              ></div>
              <Swiper
                slidesPerView={4}
                slidesPerGroup={4}
                spaceBetween={65}
                pagination={{
                  el: `.category-custom-pagination.${category}`,

                  clickable: false,
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
                className="mySwiper relative"
              >
                {data?.results?.map((d) => {
                  return (
                    <SwiperSlide>
                      <MovieCard movie={d} />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
              <div className="swiper-navigation-wrapper">
                <div
                  className={`swiper-navigation-prev absolute z-10 bg-emerald-500 h-16 w-10 flex justify-center items-center rounded shadow-xl transform -translate-y-1/2 top-1/2 cursor-pointer group-hover:hidden transition duration-300 hover:bg-emerald-600 -left-4 ${category}-prev`}
                >
                  <ArrowLeft className="h-6 w-6 text-white transition duration-300" />
                </div>
                <div
                  className={`swiper-navigation-next absolute z-10 bg-emerald-500 h-16 w-10 flex justify-center items-center rounded shadow-xl transform -translate-y-1/2 top-1/2 cursor-pointer group-hover:hidden transition duration-300 hover:bg-emerald-600 -right-4 ${category}-next`}
                >
                  <ArrowRight className="h-6 w-6 text-white transition duration-300" />
                </div>
              </div>
            </MaxWidthWrapper>
            {/* <div> */}

            {/* </div> */}
            <div className="w-full h-full absolute left-0 top-12 -z-10">
              <SectionBgShape class="scale-x-1 w-full" />
              <SectionBgShape class="-scale-x-1 rotate-180 w-full" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
