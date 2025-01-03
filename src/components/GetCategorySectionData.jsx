"use client";

import React, { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { handleRequest } from "@/app/actions";
import Link from "next/link";
import {
  MoveRight,
  TrendingUp,
  Flame,
  Award,
  Clock,
  Clapperboard,
  Star,
} from "lucide-react";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/grid";

import { Grid, Navigation, Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { SkeletonSectionPlaceholders } from "./SkeletonPlaceholders";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { SectionBgShape } from "./LoadSvgShapes";
import { Button, buttonVariants } from "./ui/button";

const matchTitle = {
  trending: "Trending this week",
  upcoming: "Upcoming",
  popular: "Popular",
  similar: "Similar Movies",
  topRated: "Top Rated",
};

const matchLinks = {
  trending: "trending",
  upcoming: "upcoming",
  popular: "popular",
  topRated: "top-rated",
  similar: "/",
};

export default function GetCategorySectionData({
  category,
  movieId = null,
  browseAll = true,
}) {
  const { data, isError, isPending, error, isFetching, isLoading } = useQuery({
    queryKey: [`get-category-data-${category}-${movieId}`],

    // refetchOnWindowFocus: false,
    queryFn: () => handleRequest({ category: category, movieId: movieId }),
    onError: (err) => {
      throw new Error(err);
    },
  });

  // const isPending = true;

  // console.log(data.results);

  // console.log(data, isPending, isFetching, isLoading);

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
            category === "trending" ? (
              <TrendingUp className="h-11 w-11 text-primary smmx:w-8 smmx:h-8" />
            ) : category === "popular" ? (
              <Flame className="h-9 w-9 text-primary smmx:w-8 smmx:h-8 fill-primary" />
            ) : category === "upcoming" ? (
              <Clock className="h-9 w-9 text-white smmx:w-8 smmx:h-8 fill-primary" />
            ) : category === "topRated" ? (
              <Star className="h-9 w-9 text-primary smmx:w-8 smmx:h-8 fill-primary" />
            ) : category === "similar" ? (
              <Clapperboard className="h-9 w-9 text-white fill-primary smmx:w-8 smmx:h-8" />
            ) : (
              <Award className="h-11 w-11 text-primary smmx:w-8 smmx:h-8" />
            )
          }
        />
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
                    className={`category-custom-pagination flex space-x-1 my-8 justify-end ${category} smmx:hidden mdmx:my-5`}
                  ></div>
                  <Swiper
                    // slidesPerView={5}
                    // slidesPerGroup={5}
                    spaceBetween={20}
                    pagination={{
                      el: `.category-custom-pagination.${category}`,

                      clickable: false,
                    }}
                    grid={{
                      rows: 2,
                      fill: "row",
                    }}
                    breakpoints={{
                      240: {
                        slidesPerView: 2,
                        spaceBetween: 7,
                        slidesPerGroup: 2,
                        grid: {
                          rows: 4,
                          fill: "row",
                        },
                        allowTouchMove: true,
                      },
                      420: {
                        slidesPerView: 3,
                        spaceBetween: 15,
                        slidesPerGroup: 3,
                        grid: {
                          rows: 3,
                          fill: "row",
                        },
                        allowTouchMove: true,
                      },

                      701: {
                        slidesPerView: 4,
                        spaceBetween: 15,
                        slidesPerGroup: 4,
                        grid: {
                          rows: 2,
                          fill: "row",
                        },
                        allowTouchMove: true,
                      },
                      1025: {
                        slidesPerView: 5,
                        // spaceBetween: 25,
                        slidesPerGroup: 5,
                        allowTouchMove: false,
                      },
                    }}
                    modules={[Pagination, Navigation, Grid]}
                    speed={800}
                    navigation={
                      (true,
                      {
                        nextEl: `.swiper-navigation-next.${category}-next`,
                        prevEl: `.swiper-navigation-prev.${category}-prev`,
                      })
                    }
                    className="mySwiper relative smmx:mt-7"
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
                      2xlmx:left-8 xlmx:h-14 xlmx:w-8 mdmx:h-12 mdmx:w-8 mdmx:top
                      `}
                    >
                      <ArrowLeft className="h-6 w-6 text-white transition duration-300 mdmx-h-5 mdmx:w-5" />
                    </div>
                    <div
                      className={`swiper-navigation-next absolute z-10 bg-emerald-500 h-16 w-10 flex justify-center items-center rounded shadow-xl transform -translate-y-1/2 top-1/2 cursor-pointer group-hover:hidden transition duration-300 hover:bg-emerald-600 -right-0 ${category}-next
                       2xlmx:right-8 xlmx:h-14 xlmx:w-8  mdmx:h-12 mdmx:w-8
                      `}
                    >
                      <ArrowRight className="h-6 w-6 text-white transition duration-300 mdmx-h-5 mdmx:w-5" />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>There is no result for this category</div>
                </>
              )}
            </MaxWidthWrapper>

            {browseAll && (
              <MaxWidthWrapper>
                <div className="mt-10 flex justify-center lgmx:mt-6 mdmx:mt-3">
                  <Link
                    className={buttonVariants({
                      variant: "outline",
                      // className: "hidden",
                    })}
                    href={`/${matchLinks[category]}`}
                  >
                    Browse All
                  </Link>
                </div>
              </MaxWidthWrapper>
            )}
            <div className="w-full h-fit absolute left-0 top-1/2 -translate-y-1/2 -z-10 lgmx:hidden">
              <SectionBgShape className="scale-x-1 w-full" />
              <SectionBgShape className="-scale-x-1 rotate-180 w-full" />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
