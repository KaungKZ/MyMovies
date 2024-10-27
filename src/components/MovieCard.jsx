import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Star } from "lucide-react";
import Link from "next/link";

const imageWidth = 500;
const imageBasePath = `https://image.tmdb.org/t/p/w${imageWidth}`;

export default function MovieCard(props) {
  const { poster_path, title, release_date, vote_average, id } = props.movie;

  // console.log(props.movie);

  return (
    <div className="">
      <Link href={`/movie/${title.replace(/\s/gi, "-")}-${id}`} className="">
        <div className="w-[220px] relative rounded-[6px]  overflow-hidden">
          <AspectRatio ratio={2 / 3}>
            <Image
              src={imageBasePath + poster_path}
              fill
              alt="movie poster"
              className="rounded-[6px] hover:scale-110 transition-all duration-500"
              // blurDataURL={img?.blurDataURL}
            />
          </AspectRatio>
          <div className="bg-[#161D25] px-2 py-[2px] rounded-[8px] absolute left-[10px] top-[10px]">
            <div className="flex items-center">
              <Star className="text-yellow-400 fill-yellow-400 text-base w-4 h-4 mr-2" />{" "}
              <div className="text-white flex items-baseline">
                <span className="text-base">{vote_average.toFixed(1)} / </span>
                <span className="text-sm text-zinc-400 ml-1"> 10</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <div className="mt-2">
        <Link href={`/movie/${title.replace(/\s/gi, "-")}-${id}`}>
          <h5 className="font-bold text-base hover:underline hover:decoration-2">
            {title}
          </h5>
        </Link>
        <div>
          <span className="text-zinc-700 text-sm">
            {release_date.split("-")[0]}
          </span>
        </div>
      </div>
    </div>
  );
}
