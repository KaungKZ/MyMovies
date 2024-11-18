"use client";

import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { handleRequest } from "@/app/actions";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { SkeletonSectionPlaceholders } from "./SkeletonPlaceholders";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { SectionBgShape } from "./LoadSvgShapes";

const matchTitle = {
  trending: "Trending this week",
  upcoming: "Upcoming",
  popular: "Popular",
  similar: "Similar Movies",
};

export default function GetCategorySectionData({ category, movieId = null }) {
  const { data, isPending, isError, error, isFetching, isLoading } = useQuery({
    queryKey: [`get-category-data-${category}`],

    // refetchOnWindowFocus: false,
    queryFn: () => handleRequest({ category: category, movieId: movieId }),
    onError: (err) => {
      throw new Error(err);
    },
  });

  console.log(data, isPending, isFetching, isLoading);

  // console.log(isload);

  // useEffect(() => {
  //   mutate({ category: category });
  // }, []);

  return (
    <>
      <MaxWidthWrapper>
        <SectionHeader
          title={matchTitle[category]}
          icon={
            <MoveRight className="h-11 w-11 text-primary smmx:w-8 smmx:h-8" />
          }
        />
        {/* <div className="relative flex items-center space-x-2">
          <h1 className="text-3xl font-bold text-gray-700 underline title">
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
              alt="section title bg shape"
            />
          </div>
        </div> */}
      </MaxWidthWrapper>
      <div className="relative">
        {isError ? (
          <div>APi got error</div>
        ) : isPending ? (
          <SkeletonSectionPlaceholders />
        ) : (
          <div className="relative py-5">
            <MaxWidthWrapper cls="relative">
              {data.results.length > 0 ? (
                <>
                  <div
                    className={`category-custom-pagination flex space-x-1 my-8 justify-end ${category}`}
                  ></div>
                  <Swiper
                    // slidesPerView={5}
                    // slidesPerGroup={5}
                    spaceBetween={15}
                    pagination={{
                      el: `.category-custom-pagination.${category}`,

                      clickable: false,
                    }}
                    breakpoints={{
                      240: {
                        slidesPerView: 1,
                        spaceBetween: 0,
                        slidesPerGroup: 1,
                        allowTouchMove: true,
                      },
                      361: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                        slidesPerGroup: 3,
                        allowTouchMove: true,
                      },
                      // 601: {
                      //   slidesPerView: 3,
                      //   spaceBetween: 15,
                      //   slidesPerGroup: 3,
                      //   allowTouchMove: true,
                      // },

                      601: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                        slidesPerGroup: 4,
                        allowTouchMove: true,
                      },
                      1025: {
                        slidesPerView: 5,
                        // spaceBetween: 25,
                        slidesPerGroup: 5,
                        allowTouchMove: false,
                      },
                      // 1366: {
                      //   slidesPerView: 5,
                      //   slidesPerGroup: 5,
                      //   allowTouchMove: false,
                      // },
                    }}
                    modules={[Pagination, Navigation]}
                    speed={800}
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
                        <SwiperSlide key={d.id}>
                          <MovieCard movie={d} />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                  <div className="swiper-navigation-wrapper">
                    <div
                      className={`swiper-navigation-prev absolute z-10 bg-emerald-500 h-16 w-10 flex justify-center items-center rounded shadow-xl transform -translate-y-1/2 top-1/2 cursor-pointer group-hover:hidden transition duration-300 hover:bg-emerald-600 -left-0 ${category}-prev
                      2xlmx:left-8 xlmx:h-14 xlmx:w-8
                      `}
                    >
                      <ArrowLeft className="h-6 w-6 text-white transition duration-300" />
                    </div>
                    <div
                      className={`swiper-navigation-next absolute z-10 bg-emerald-500 h-16 w-10 flex justify-center items-center rounded shadow-xl transform -translate-y-1/2 top-1/2 cursor-pointer group-hover:hidden transition duration-300 hover:bg-emerald-600 -right-0 ${category}-next
                       2xlmx:right-8 xlmx:h-14 xlmx:w-8
                      `}
                    >
                      <ArrowRight className="h-6 w-6 text-white transition duration-300" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>There is no result for this category</div>
                </>
              )}
            </MaxWidthWrapper>

            <div className="w-full h-full absolute left-0 top-6 -z-10 lgmx:hidden">
              <SectionBgShape className="scale-x-1 w-full" />
              <SectionBgShape className="-scale-x-1 rotate-180 w-full" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
