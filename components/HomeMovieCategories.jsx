/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Link from "next/link";
// import CategoryTitleBgShape from "/static/assets/section-title-bg-shape.png";
import Image from "next/image";
import CategoryBgShape from "../public/static/assets/section-content-bg-shape.svg";
import Notfound from "../public/static/assets/error.svg";

import { BlurhashCanvas } from "react-blurhash";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import "swiper/components/navigation/navigation.min.css";
import { useRouter } from "next/router";
import MovieList from "./utils/MovieList";

import {
	ChevronRightIcon,
	ChevronLeftIcon,
	ArrowNarrowRightIcon,
} from "@heroicons/react/outline";

import SwiperCore, { Pagination, Navigation } from "swiper/core";

SwiperCore.use([Pagination, Navigation]);

// import {useState, useEffect} from

export default function HomeMovieCategories(props) {
	const [movieData, setMovieData] = useState({ data: [] });
	const [swiper, setSwiper] = useState(null);
	const router = useRouter();

	// console.log(props);

	// console.log(movieData);

	// console.log("xi");
	// const [height, setHeight] = useState();
	// const divRef = useRef();

	// console.log(divRef);
	// const router = useRouter();

	useEffect(() => {
		setMovieData({ ...props });

		// if (swiper) {
		//   swiper.slideToLoop(0, 0, false);
		// }
	}, [props]);

	// console.log(props);

	// console.log(movieData);

	useEffect(() => {
		if (swiper?.params && props) {
			swiper.slideToLoop(0, 0, false);
		}
	}, [props, swiper]);

	// const refreshData = () => {
	//   console.log("refreshings");
	//   router.replace(router.asPath);
	// };

	// useEffect(() => {
	//   refreshData();
	// });

	// useEffect(() => {
	//   setHeight(divRef.current.clientHeight);
	// }, [divRef]);
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
		<>
			{/* {refreshData()} */}

			<div className="category mt-20 lg:mt-16 md:mt-8">
				<div className="category__title section-wrapper">
					<div className="category-title-wrapper relative">
						<Link
							href={`/[category]`}
							as={`/${
								movieData.title?.toLowerCase().includes("trending")
									? "Trending"
									: movieData.title
							}`}>
							<a>
								<div className="flex items-center">
									<h1 className="category__title-text font-bold font-secondary text-3xl text-gray-700 underline md:text-[1.75rem] sm:text-2xl">
										{movieData.title}
									</h1>
									<span className="ml-3 mt-1 xsm:ml-2">
										<ArrowNarrowRightIcon className="w-9 h-9 text-emerald-600 xsm:w-7 xsm:h-7" />
									</span>
								</div>
							</a>
						</Link>

						<div
							// className="category__title-bg"
							className="category__title-bg absolute -left-12 transform -translate-y-2/4 -z-1">
							<Image
								src="/static/assets/section-title-bg-shape.png"
								width="143.38"
								height="130.21"
								// placeholder='blur'
								alt="category title background shape"
							/>
						</div>
					</div>
				</div>
				<div className="category__swiper relative mt-14 lg:mt-10 lg:overflow-hidden">
					{movieData.data ? (
						<>
							<Swiper
								// ref={swiperRef}
								onSwiper={(s) => setSwiper(s)}
								breakpoints={{
									240: {
										slidesPerView: 1,
										spaceBetween: 0,
										slidesPerGroup: 1,
										allowTouchMove: true,
									},
									361: {
										slidesPerView: 2,
										spaceBetween: 20,
										slidesPerGroup: 2,
										allowTouchMove: true,
									},
									601: {
										slidesPerView: 3,
										spaceBetween: 20,
										slidesPerGroup: 3,
										allowTouchMove: true,
									},

									957: {
										slidesPerView: 4,
										spaceBetween: 20,
										slidesPerGroup: 4,
										allowTouchMove: true,
									},
									1025: {
										slidesPerView: 4,
										spaceBetween: 50,
										slidesPerGroup: 4,
										allowTouchMove: true,
									},
									1281: {
										slidesPerView: 4,
										spaceBetween: 80,
										slidesPerGroup: 4,
										allowTouchMove: false,
									},
								}}
								loop={true}
								// allowTouchMove={false}
								pagination={true}
								speed={800}
								// navigation={true}
								navigation={
									(true,
									{
										nextEl: `.swiper-navigation-next.${props.title.replace(
											/\s/gi,
											"-"
										)}-next`,
										prevEl: `.swiper-navigation-prev.${props.title.replace(
											/\s/gi,
											"-"
										)}-prev`,
									})
								}
								className="category__myswiper mySwiper section-wrapper pt-10">
								{/* <div className="test"> */}
								{movieData.data.map((movie, index) => {
									// console.log(movie.overview.length > 30 ? movie.overview.substring(30, 0).concat(' ...') : movie.overview);
									return (
										<SwiperSlide
											key={index}
											style={{ width: "auto" }}
											className="category__swiperslide">
											<MovieList movie={movie} />
										</SwiperSlide>
									);
								})}
								{/* </div> */}
								<div className="swiper-pagination"></div>
							</Swiper>
							<div className={`swiper-navigation-wrapper`}>
								<div
									className={`swiper-navigation-prev swiper-navigation-btn left-12 xl:right-7 ${props.title.replace(
										/\s/gi,
										"-"
									)}-prev`}>
									<ChevronLeftIcon className="h-6 w-6 text-white transition duration-300" />
								</div>
								<div
									className={`swiper-navigation-next absolute swiper-navigation-btn right-12  ${props.title.replace(
										/\s/gi,
										"-"
									)}-next`}>
									<ChevronRightIcon className="h-6 w-6 text-white transition duration-300" />
								</div>
							</div>
							<div className="category__content-bg-shape absolute -top-10 left-0 w-full">
								<CategoryBgShape
									className={`mx-auto w-full ${
										movieData.reverse ? "-scale-x-1" : "scale-x-1"
									}`}
									viewBox="0 0 1440 250"
									preserveAspectRatio="none"
								/>
								<CategoryBgShape
									className={`mx-auto ${
										movieData.reverse ? "scale-x-1" : "-scale-x-1"
									} rotate-180`}
									viewBox="0 0 1440 250"
									preserveAspectRatio="none"
									width="100%"
								/>
							</div>
						</>
					) : (
						<div className="category__notfound h-24 md:h-28 md:mb-10 text-lg sm:text-base flex items-center justify-center font-medium text-gray-600 md:w-4/5 md:text-center md:flex-col md:mx-auto">
							<Notfound className="w-16 h-16 mr-4 md:mb-2 md:mr-0 xsm:w-12 xsm:h-12" />{" "}
							We couldn&apos;t find any movies for you, Please try again later
						</div>
					)}

					{/* {movieData.data} */}

					{/* <div className="category__content-bg-shape absolute -top-10 left-0 w-full">
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
        </div> */}
					{/* rgba(20,20,20,.7) */}
				</div>
			</div>
		</>
	);
}
