"use client";

import { getMovieDetail } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { AspectRatio } from "./ui/aspect-ratio";
import GetCategoryData from "./GetCategorySectionData";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import React from "react";
import { Star, Clock, Download, Video } from "lucide-react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const imageWidth = 500;
const imageBasePath = `https://image.tmdb.org/t/p/w${imageWidth}`;

export default function MovieDetail() {
  const params = useParams();

  //   console.log(params);
  const { data, error, isFetching, isPending } = useQuery({
    queryKey: ["get-movie-detail"],
    refetchOnWindowFocus: false,
    queryFn: () => getMovieDetail(params.slug),
    // throwOnError: true,
  });

  // console.log(isFetching, isPending);

  if (error) {
    return <div>Movie detail not found</div>;
  }

  const [IMDB_Detail, YTX_Detail] = data;

  console.log(IMDB_Detail, YTX_Detail);

  // console.log(IMDB_Detail, YTX_Detail);

  const minutesToHour = (totalMinutes) => {
    if (!totalMinutes) return `${0}m`;

    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    const h = hours > 0 ? `${hours?.toFixed()}hr` : "";
    const m = minutes > 0 ? ` ${minutes?.toFixed()}min` : "";

    return `${h} ${m}`;
  };

  // console.log(IMDB_Detail, YTX_Detail);

  //   console.log(data, error, isFetching);

  //   console.log(data);
  return (
    <section className="py-16">
      <MaxWidthWrapper>
        <div className="grid grid-cols-12 grid-x-12">
          <div className="col-span-6">
            <div className="relative w-[350px]">
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
              <div className="w-[500px] h-full absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
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
          <div className="col-span-6 flex flex-col space-y-6">
            <div>
              <h2 className="text-4xl font-bold">{IMDB_Detail.title}</h2>
              <span className="text-base text-zinc-700 mt-2 block">
                {IMDB_Detail.release_date}
              </span>
            </div>

            <span className="flex items-center text-zinc-700">
              <Clock className="text-white fill-primary text-base w-6 h-6 mr-2" />{" "}
              {minutesToHour(IMDB_Detail.runtime)}
            </span>
            <p className="text-lg">{IMDB_Detail.overview}</p>
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
                    <div className="grid grid-cols-4 py-4">
                      {YTX_Detail.torrents.map((torrent) => (
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
          <div className="mt-24">
            <div className="relative flex items-center space-x-2">
              <h1 className="text-3xl font-bold text-gray-700 underline title">
                Casts
              </h1>
              {/* <span>
            <MoveRight className="h-11 w-11 text-primary" />
          </span> */}
              <div className="absolute left-0 top-0 -translate-x-[45px] -translate-y-[60px] -z-10">
                <Image
                  src="/assets/section-title-bg-shape.png"
                  width="143"
                  height="130"
                  alt="section title bg shape"
                />
              </div>
            </div>
            <div className="flex flex-wrap space-x-6 mt-12">
              {YTX_Detail.cast.map((cast) => (
                <div key={cast.name} className="flex items-center space-x-3">
                  <div className="relative w-[64px] h-[64px] rounded-full">
                    <Image
                      src={cast.url_small_image}
                      fill
                      className="rounded-full"
                      alt="movie cast"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-zinc-500">{cast.name}</span>
                    <span>
                      as{" "}
                      <span className="font-medium">{cast.character_name}</span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {YTX_Detail.yt_trailer_code && (
          <div className="mt-24">
            <div className="relative flex items-center space-x-2">
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
            </div>
            <div className="grid grid-cols-3 gap-x-4 mt-12">
              <div>
                <iframe
                  className="h-60 w-full"
                  src={`https://www.youtube.com/embed/${YTX_Detail.yt_trailer_code}?rel=1&wmode=transparent&border=0&autoplay=0&iv_load_policy=3`}
                />
              </div>
              <div className="relative w-full h-full">
                <Image
                  src={YTX_Detail.large_screenshot_image1}
                  fill
                  className="object-cover"
                  alt="movie screenshot"
                />
              </div>
              <div className="relative w-full h-full">
                <Image
                  src={YTX_Detail.large_screenshot_image2}
                  fill
                  className="object-cover"
                  alt="movie screenshot"
                />
              </div>
            </div>
          </div>
        )}
      </MaxWidthWrapper>
      <div className="mt-24">
        <GetCategoryData category="similar" movieId={IMDB_Detail.id} />
      </div>
    </section>
  );
}
