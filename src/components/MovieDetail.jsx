"use client";

import { getMovieDetail } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AspectRatio } from "./ui/aspect-ratio";
import GetCategorySectionData from "./GetCategorySectionData";
import SectionHeader from "./SectionHeader";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React, { useState } from "react";
import { Star, Clock, Download, Clapperboard, UserRound } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const imageWidth = 500;
const imageBasePath = `https://image.tmdb.org/t/p/w${imageWidth}`;
const errorImagePath = "/assets/no-image.png";

export default function MovieDetail() {
  const params = useParams();

  const [image1Err, setImage1Err] = useState(null);
  const [image2Err, setImage2Err] = useState(null);

  //   console.log(params);
  const { data, error, isPending } = useQuery({
    queryKey: ["get-movie-detail"],
    refetchOnWindowFocus: false,
    queryFn: () => getMovieDetail(params.slug),
    // throwOnError: true,
  });
  // console.log(imageErr);

  if (error) {
    return <div>Movie detail not found</div>;
  }

  console.log(data);

  const [IMDB_Detail, YTX_Detail] = data;

  // console.log(IMDB_Detail, YTX_Detail);

  const minutesToHour = (totalMinutes) => {
    if (!totalMinutes) return `${0}m`;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const h = hours > 0 ? `${hours?.toFixed()}hr` : "";
    const m = minutes > 0 ? ` ${minutes?.toFixed()}min` : "";

    return `${h} ${m}`;
  };

  function removeDuplicate(arr) {
    var result = arr.reduce((unique, o) => {
      if (!unique.some((obj) => obj.quality === o.quality)) {
        unique.push(o);
      }
      return unique;
    }, []);

    // console.log(result)

    return result;
  }

  console.log(YTX_Detail);

  return (
    <section className="py-16 lgmx:py-12 smmx:py-8">
      <MaxWidthWrapper>
        <div className="grid grid-cols-12 grid-x-12 xlmx:gap-x-16 lgmx:flex lgmx:flex-col lgmx:gap-x-0 lgmx:space-y-8">
          <div className="col-span-5 lgmx:flex lgmx:justify-center">
            <div className="relative w-[350px] lgmx:w-[320px] mdmx:w-[280px] smmx:w-[235px]">
              <AspectRatio ratio={2 / 3}>
                {YTX_Detail.large_cover_image ? (
                  <Image
                    src={YTX_Detail.large_cover_image}
                    key={YTX_Detail.id}
                    fill
                    alt="Movie detail poster"
                    className="rounded-[6px] "
                    // blurDataURL={img?.blurDataURL}
                  />
                ) : (
                  <Image
                    src={imageBasePath + IMDB_Detail.poster_path}
                    key={IMDB_Detail.id}
                    fill
                    alt="Movie detail poster"
                    className="rounded-[6px] "
                    // blurDataURL={img?.blurDataURL}
                  />
                )}
              </AspectRatio>
              <div className="w-[500px] h-full absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 xlmx:hidden lgmx:block mdmx:w-[400px] smmx:w-[340px]">
                <Image
                  src="/assets/movie-detail-bg-shape.svg"
                  fill
                  alt="Movie detail poster"
                />
                <Image
                  src="/assets/movie-detail-bg-shape.svg"
                  className="-scale-x-1"
                  fill
                  alt="Movie detail poster"
                />
              </div>
            </div>
          </div>
          <div className="col-span-7 flex flex-col space-y-6">
            <div>
              <h2 className="text-4xl font-bold smmx:text-3xl">
                {IMDB_Detail.title}
              </h2>
              <span className="text-base text-zinc-700 mt-2 block">
                {IMDB_Detail.release_date}
              </span>
            </div>

            <span className="flex items-center text-zinc-800">
              <Clock className="text-white fill-primary text-base w-6 h-6 mr-2" />{" "}
              {minutesToHour(IMDB_Detail.runtime)}
            </span>
            <p className=" text-zinc-700 leading-relaxed">
              {IMDB_Detail.overview}
            </p>
            <div className="flex space-x-1">
              <span>Voting:</span>
              <span className="flex items-flex-start">
                <span className="text-base text-primary font-semibold">
                  {IMDB_Detail.vote_average.toFixed(1)}
                </span>
                <Star className="text-primary fill-primary text-base w-5 h-5 ml-2" />{" "}
              </span>
            </div>
            <div className="flex space-x-2 flex-wrap space-y-2">
              {IMDB_Detail.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="[&(:first-child)]:mt-2 border-[1px] border-primary px-4 text-primary font-medium text-sm py-1 rounded-[5px]"
                >
                  {genre.name}
                </span>
              ))}
            </div>
            <div>
              {YTX_Detail.torrents ? (
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="text-base">
                      Download
                      <Download className="text-white fill-primary text-base w-6 h-6 " />{" "}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle className="text-center mt-5">
                        Select Movie Quality
                      </DialogTitle>
                      {/* <DialogDescription>
                        Make changes to your profile here. Click save when you're
                        done.
                      </DialogDescription> */}
                    </DialogHeader>
                    <div
                      className="grid  py-4 items-center"
                      style={{
                        gridTemplateColumns:
                          "repeat(auto-fit, minmax(min(100% / 3, max(90px, 100% / 4)), 1fr))",
                      }}
                    >
                      {removeDuplicate(YTX_Detail.torrents).map((torrent) => (
                        // <div>
                        <div
                          key={torrent.hash}
                          className="flex flex-col space-y-3 items-center border-zinc-300 [&:not(:first-child)]:pl-2 [&:not(:last-child)]:pr-2 [&:not(:last-child)]:border-r"
                        >
                          <Link
                            href={torrent.url}
                            className="bg-primary px-4 py-3 text-white rounded-[3px]"
                          >
                            {torrent.quality}
                          </Link>
                          <span>{torrent.type.toUpperCase()}</span>
                          <span>{torrent.size}</span>
                        </div>
                        // </div>
                      ))}
                    </div>
                    {/* <DialogFooter>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
                  </DialogContent>
                </Dialog>
              ) : (
                <div>
                  <span className="text-zinc-500">
                    This movie is not available to download yet
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        {YTX_Detail.cast && (
          <div className="mt-24 mdmx:mt-16">
            <SectionHeader
              title="Casts"
              // icon={<Video className="h-7 w-7 text-primary fill-primary" />}
            />
            {/* <div className="relative flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-gray-700 underline title">
                Casts
              </h1>
        
              <div className="absolute left-0 top-0 -translate-x-[45px] -translate-y-[60px] -z-10">
                <Image
                  src="/assets/section-title-bg-shape.png"
                  width="143"
                  height="130"
                  alt="section title bg shape"
                />
              </div>
            </div> */}
            <div className="flex flex-wrap gap-x-6 gap-y-6 mt-12 xsmmx:grid xsmmx:grid-cols-2 xsmmx:gap-x-3 2xsmmx:flex 2xsmmx:flex-col 2xsmmx:gap-x-0 2xsmmx:gap-y-6">
              {YTX_Detail.cast.map((cast) => (
                <div
                  key={cast.name}
                  className="flex items-center space-x-3 xsmmx:items-start "
                >
                  <div className="relative w-[64px] h-[64px] rounded-full mdmx:w-12 mdmx:h-12">
                    {cast.url_small_image ? (
                      <Image
                        // onError={(err) => console.log("true cast")}
                        src={cast.url_small_image}
                        fill
                        className="rounded-full"
                        alt="movie cast"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#CECECE] rounded-full">
                        <UserRound className="w-7 h-7 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-100" />
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-700 font-bold">{cast.name}</span>
                    <span className="text-zinc-500">
                      as{" "}
                      <span className="font-medium text-zinc-700">
                        {cast.character_name}
                      </span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {YTX_Detail.yt_trailer_code && (
          <div className="mt-24 mdmx:mt-16">
            <SectionHeader
              title="Watch Trailer"
              icon={
                <Clapperboard className="h-9 w-9 text-white fill-primary smmx:h-5 smmx:w-5" />
              }
            />
            {/* <div className="relative flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-gray-700 underline title">
                Watch Trailer
              </h1>
              <span>
                <Video className="h-7 w-7 text-primary fill-primary" />
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
            <div className="grid grid-cols-3 gap-x-4 mt-12 mdmx:grid-cols-2 xsmmx:grid-cols-1">
              <div>
                <iframe
                  className="h-60 w-full lgmx:h-44 xsmmx:h-56"
                  src={`https://www.youtube.com/embed/${YTX_Detail.yt_trailer_code}?rel=1&wmode=transparent&border=0&autoplay=0&iv_load_policy=3`}
                />
              </div>
              {/* {YTX_Detail.large_screenshot_image1 ? ( */}
              <div className="relative w-full h-full mdmx:hidden">
                <Image
                  onError={() => {
                    return setImage1Err(true);
                  }}
                  src={
                    !image1Err
                      ? YTX_Detail.large_screenshot_image1
                      : errorImagePath
                  }
                  fill
                  className="object-cover"
                  alt="movie screenshot"
                />
              </div>
              {/* ) : ( */}
              {/* <div className="relative w-full h-full mdmx:hidden">
                  <Image
                    src="./assets/no-image.png"
                    fill
                    className="object-cover"
                    alt="movie screenshot"
                  />
                </div> */}
              {/* )} */}
              {/* <div className="relative w-full h-full mdmx:hidden">
                <Image
                  src={YTX_Detail.large_screenshot_image1}
                  fill
                  className="object-cover"
                  alt="movie screenshot"
                />
              </div> */}
              <div className="relative w-full h-full xsmmx:hidden">
                <Image
                  onError={() => {
                    return setImage2Err(true);
                  }}
                  // src={YTX_Detail.large_screenshot_image2}
                  src={
                    !image2Err
                      ? YTX_Detail.large_screenshot_image2
                      : errorImagePath
                  }
                  fill
                  className="object-cover"
                  alt="movie screenshot"
                />
              </div>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
      <div className="mt-24 mdmx:mt-16">
        <GetCategorySectionData
          category="similar"
          movieId={IMDB_Detail.id}
          browseAll={false}
        />
      </div>
    </section>
  );
}
