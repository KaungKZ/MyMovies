import React, { useState, useEffect } from "react";
import Link from "next/link";
// import CategoryTitleBgShape from "/static/assets/section-title-bg-shape.png";
import Image from "next/image";
import CategoryBgShape from "../public/static/assets/section-content-bg-shape.svg";

import { BlurhashCanvas } from "react-blurhash";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import {
  ChevronRightIcon,
  ChevronLeftIcon,
  ArrowNarrowRightIcon,
} from "@heroicons/react/outline";

import SwiperCore, { Pagination, Navigation } from "swiper/core";

SwiperCore.use([Pagination, Navigation]);

// import {useState, useEffect} from

export default function HomeMovieCategories(props) {
  const [movieData, setMovieData] = useState({});

  useEffect(() => {
    setMovieData({ ...props });
  }, []);
  // console.log(new Date().)
  // useEffect(() => {

  // }, [])
  //  const makeImagesBlurred = async () => {
  //   const { base64, img } = await getPlaiceholder(
  //     "https://images.unsplash.com/photo-1621961458348-f013d219b50c?auto=format&fit=crop&w=2850&q=80",
  //     { size: 10 }
  //   );
  //   return {
  //     props: {
  //       imageProps: {
  //         ...img,
  //         blurDataURL: base64,
  //       },
  //     },
  //   };
  // };

  //   console.log(props);

  // function CustomPagination(index, className) {
  //   // return '<span class="' + className + '">' + (menu[index]) + '</span>';

  //   return <span className={`${className}`}>dots</span>;
  // }

  return (
    <div className="category">
      <div className="category__title w-4/5 mx-auto">
        <div className="category-title-wrapper relative">
          <div className="flex items-center">
            <h1 className="category__title-text font-bold font-secondary text-2xl text-gray-700 underline">
              {movieData.title}
            </h1>
            <span className="ml-3 mt-1">
              <ArrowNarrowRightIcon className="w-7 h-7 text-green-500" />
            </span>
          </div>

          <div
            // className="category__title-bg"
            className="category__title-bg absolute -left-12 transform -translate-y-2/4 -z-1"
          >
            <Image
              src="/static/assets/section-title-bg-shape.png"
              width="143.38"
              height="130.21"
              placeholder="blur"
              alt="category title background shape"
            />
          </div>
        </div>
      </div>
      <div className="category__swiper relative my-20">
        {movieData.data ? (
          <Swiper
            breakpoints={{
              280: {
                slidesPerView: 1,
                spaceBetween: 10,
                slidesPerGroup: 1,
              },
              320: {
                slidesPerView: 2,
                spaceBetween: 20,
                slidesPerGroup: 2,
              },
              600: {
                slidesPerView: 3,
                spaceBetween: 40,
                slidesPerGroup: 3,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
                slidesPerGroup: 4,
              },
              1280: {
                slidesPerView: 5,
                spaceBetween: 80,
                slidesPerGroup: 5,
              },
            }}
            // spaceBetween={30}
            loop={true}
            allowTouchMove={false}
            // pagination={
            //   (true,
            //   {
            //     el: ".swiper-pagination",
            //     renderBullet: (index, className) => {
            //       return `<span class="dot swiper-pagination-bullet">${index}</span>`;

            //     },
            //   })
            // }
            pagination={true}
            speed={800}
            // navigation={true}
            navigation={
              (true,
              {
                nextEl: ".swiper-navigation-next",
                prevEl: ".swiper-navigation-prev",
              })
            }
            className="category__myswiper mySwiper w-[95%] mx-auto pt-10"
          >
            {/* <div className="test"> */}
            {movieData.data.map((movie, index) => {
              // console.log(movie.original_title.length);
              return (
                <SwiperSlide
                  key={index}
                  style={{ width: "auto" }}
                  className="group"
                >
                  <Link href={`/movie/${movie.id}`}>
                    <a>
                      <div className="category__movie-banner overflow-hidden rounded">
                        {movie.img.blurDataURL ? (
                          <div className="category__movie-canvas relative block h-[340px] transform group-hover:scale-110 transition duration-500">
                            <BlurhashCanvas
                              punch={1}
                              hash={movie.img.blurDataURL.hash}
                              width={movie.img.blurDataURL.height}
                              height={movie.img.blurDataURL.width}
                              className="absolute left-0 top-0 w-full h-full inset-0"
                            />

                            <Image
                              src={movie.img.src}
                              width="auto"
                              height="340"
                              // alt={movie.original_title}
                              className="object-cover"
                            />
                          </div>
                        ) : (
                          <Image
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            width="auto"
                            height="340"
                            // alt={movie.original_title}
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="category__movie-summary my-3 h-12">
                        <h1 className="category__movie-title text-gray-700 font-bold text-base group-hover:underline">
                          {movie.original_title.length > 22
                            ? movie.original_title
                                .substring(0, 22)
                                .concat(" ...")
                            : movie.original_title}
                        </h1>
                        <span className="category__movie-date text-xs text-gray-600">
                          {movie.release_date?.split("-")[0] ?? ""}
                        </span>
                      </div>
                    </a>
                  </Link>
                </SwiperSlide>
              );
            })}
            {/* </div> */}
            <div className="swiper-navigation-wrapper">
              <div className="swiper-navigation-prev swiper-navigation-btn left-5">
                <div className="">
                  <ChevronLeftIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="swiper-navigation-next absolute swiper-navigation-btn right-5">
                <div className="">
                  <ChevronRightIcon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
            <div className="swiper-pagination"></div>
          </Swiper>
        ) : (
          "Not Found"
        )}

        <div className="category__content-bg-shape absolute -top-10 left-0 w-full">
          <CategoryBgShape
            className={`mx-auto lg:h-full ${
              movieData.reverse ? "-scale-x-1" : "scale-x-1"
            }`}
            viewBox="0 0 1440 250"
            preserveAspectRatio="none"
            width="100%"
          />
          <CategoryBgShape
            className={`mx-auto lg:h-full ${
              movieData.reverse ? "scale-x-1" : "-scale-x-1"
            } rotate-180`}
            viewBox="0 0 1440 250"
            preserveAspectRatio="none"
            width="100%"
          />
        </div>
        {/* rgba(20,20,20,.7) */}
      </div>
    </div>
  );
}
