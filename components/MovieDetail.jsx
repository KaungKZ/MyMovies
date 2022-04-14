/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { BlurhashCanvas } from "react-blurhash";
import Link from "next/link";
import { Portal, PortalWithState } from "react-portal";
import DownloadPopup from "../components/DownloadPopup";
import { ClockIcon } from "@heroicons/react/solid";
import { StarIcon } from "@heroicons/react/solid";
import { VideoCameraIcon } from "@heroicons/react/solid";
import { DownloadIcon } from "@heroicons/react/outline";
import DetailBgShape from "../public/static/assets/movie-detail-bg-shape.svg";
// import axios from "axios";
// import Image from "next/image";

export default function MovieDetail({ tmdbData, ytxData }) {
	// const [tmdbData] = useState(data.data.res);

	function handleDownloadOpen() {
		document.body.classList.add("portal-open");
	}

	function handleDownloadClose() {
		document.body.classList.remove("portal-open");
	}

	function removeDuplicate() {
		var result = ytxData.data.movies[0].torrents.reduce((unique, o) => {
			if (!unique.some((obj) => obj.quality === o.quality)) {
				unique.push(o);
			}
			return unique;
		}, []);

		// console.log(result)

		return result;
	}

	// console.log(tmdbData, ytxData)

	function getFullDate() {
		const months = [
			"January",
			"February",
			"March",
			"April",
			"May",
			"June",
			"July",
			"August",
			"September",
			"October",
			"November",
			"December",
		];
		const now = new Date(tmdbData.release_date);

		return `${months[now.getMonth()]} ${now.getDate()} ${now.getFullYear()}`;
	}

	function renderYtsMovieDetail() {
		return (
			<iframe
				className="h-60 w-full"
				src={`https://www.youtube.com/embed/${ytxData.data.movies[0].yt_trailer_code}?rel=1&wmode=transparent&border=0&autoplay=0&iv_load_policy=3`}
			/>
			// <embed
			//   src={`https://www.youtube.com/embed/${ytxData.data.movies[0].yt_trailer_code}?rel=0&wmode=transparent&border=0&autoplay=0&iv_load_policy=3`}
			//   className="h-60 w-full"
			// />
		);
	}

	// console.log(removeDuplicate());
	// const tmdbData = data.data.res;
	// const ytxData = data.data.res;
	// console.log(data);
	return (
		<>
			<div className="detail detail-wrapper mx-auto my-20 flex justify-between lg:mt-[calc(4rem+128px)] md:mb-8 sm:mt-[calc(3rem+128px)] md:flex-col xsm:mt-[calc(2.5rem+110px)]">
				{tmdbData.poster_path ? (
					<div className="detail__image-wrapper w-[325px] h-[475px] text-0 relative mr-24 lg:mr-16 lg:w-[300px] lg:h-[450px] md:w-[360px] md:h-[480px] xsm:h-[550px] xsm:w-full md:mx-auto md:mb-8">
						{tmdbData.img.blurDataURL ? (
							<div className="detail__movie-canvas relative w-full h-full">
								{/* <BlurhashCanvas
                  punch={1}
                  hash={tmdbData.img?.blurDataURL?.hash}
                  width={tmdbData.img?.blurDataURL?.height}
                  height={tmdbData.img?.blurDataURL?.width}
                  className="absolute left-0 top-0 h-full w-full inset-0 rounded-lg"
                />

                <Image
                  src={tmdbData.img?.src}
                  alt={tmdbData.title}
                  layout="fill"
                  className="object-cover rounded-lg detail__poster"
                /> */}
								<img
									src={tmdbData.img.src}
									layout="fill"
									alt={tmdbData.title}
									className="object-cover rounded-lg detail__poster"
								/>
							</div>
						) : (
							<Image
								src={`https://image.tmdb.org/t/p/original${tmdbData.poster_path}`}
								width="325"
								height="500"
								alt={tmdbData.title}
								className="object-cover rounded-lg detail__poster"
							/>
						)}
						<DetailBgShape className="detail__banner-bg-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-1 xsm:hidden " />
						<DetailBgShape className="detail__banner-bg-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -scale-x-1 -z-1 xsm:hidden" />
					</div>
				) : (
					<div>There is no image for this movie</div>
				)}

				<div className="detail__content flex-1 max-w-lg">
					{/* <div className="detail__title-wrapper flex items-center font-bold font-secondary text-3xl"> */}
					<h1 className="detail__title text-4xl font-bold text-gray-700 mb-1 lg:text-3xl md:text-2xl xsm:text-3xl">
						{tmdbData.title}
						{(tmdbData.release_date !== "" || tmdbData.release_date) && (
							<span className="detail__date ml-2 text-base text-gray-500 font-medium">{`(${
								ytxData ? tmdbData.release_date.split("-")[0] : getFullDate()
							})`}</span>
						)}
					</h1>

					{/* </div> */}
					{ytxData && (
						<div className="detail__duration flex items-center text-base text-gray-600 mb-8 xsm:mb-4 xsm:text-sm">
							<span>
								<ClockIcon className="w-5 h-5 text-emerald-500 mr-1"></ClockIcon>
							</span>
							{`${Math.floor(tmdbData.runtime / 60)}hr ${
								tmdbData.runtime % 60
							}min`}
						</div>
					)}

					<div className="detail__summary text-base my-8 text-gray-700 md:hidden">
						{tmdbData.overview}
					</div>
					{ytxData && (
						<>
							<div className="detail__resolution mb-3 text-gray-600 flex sm:flex-col xsm:flex-row">
								<span>Available in:</span>
								<div>
									{removeDuplicate().map((t, i) => {
										return (
											<span
												key={i}
												className="detail__resolution-text text-emerald-500 font-medium mr-1.5 last:mr-0 ml-2">
												{t.quality}
											</span>
										);
									})}
								</div>

								{/* {ytxData.data.movies[0].torrents.map((t, i) => {
                return <Link href={t.url}>{`${t.quality} (${t.type})`}</Link>;
              })} */}
							</div>
							<div className="detail__voting mb-6 flex items-center text-gray-600">
								<span>Voting:</span>
								<span className="text-emerald-500 font-bold ml-2">
									{tmdbData.vote_average}
								</span>
								<span>
									<StarIcon className="w-4 h-4 ml-1 text-emerald-500" />
								</span>
							</div>
							<PortalWithState
								closeOnOutsideClick
								closeOnEsc
								onOpen={handleDownloadOpen}
								onClose={handleDownloadClose}>
								{({ openPortal, closePortal, isOpen, portal }) => (
									<>
										<button
											onClick={openPortal}
											className="py-2 px-6 bg-emerald-400 rounded text-white hover:bg-emerald-500 transition flex items-center text-base">
											Download
											<span>
												<DownloadIcon className="w-5 h-5 ml-2" />
											</span>
										</button>

										{portal(
											<DownloadPopup
												isOpen={isOpen}
												result={removeDuplicate()}></DownloadPopup>
										)}
									</>
								)}
							</PortalWithState>
							{/* <div className="detail__download">Download</div> */}
						</>
					)}
				</div>
			</div>
			<div className="detailSm hidden md:block detail-wrapper mb-16 mx-auto">
				<div className="detail__summary text-lg my-8 text-gray-700">
					{tmdbData.overview}
				</div>
			</div>
			{ytxData && (
				<div className="trailer mx-auto pb-10">
					<div className="trailer__title category__title-text text-gray-700  flex items-center mb-20 mx-auto section-wrapper md:mb-14 xsm:mb-10">
						<div className="category-title-wrapper relative">
							<div className="flex items-center">
								<h1 className="captalize text-3xl underline font-bold font-secondary md:text-[1.75rem] sm:text-2xl">
									Watch trailer
								</h1>
								<span>
									<VideoCameraIcon className="w-7 h-7 text-emerald-500 ml-3" />
								</span>
							</div>

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
					<div className="trailer__content flex justify-between section-wrapper mx-auto">
						<div className="trailer__video mr-5 w-2/6 xsm:w-full xsm:mr-0">
							{renderYtsMovieDetail()}
						</div>
						<div className="trailer__banners mr-5 h-60 w-2/6 relative xsm:hidden">
							<Image
								src={`https://image.tmdb.org/t/p/original${tmdbData.backdrop_path}`}
								layout="fill"
								objectFit="cover"
								className=""
								style={{ width: "100%", height: "unset" }}
							/>
						</div>
						<div className="trailer__banners h-60 w-2/6 relative xsm:hidden">
							<Image
								src={`https://image.tmdb.org/t/p/original${
									tmdbData.belongs_to_collection?.backdrop_path ??
									tmdbData.poster_path
								}`}
								layout="fill"
								objectFit="cover"
								style={{ width: "100%", height: "unset" }}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
