import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const imageWidth = 500;
const imageBasePath = `https://image.tmdb.org/t/p/w${imageWidth}`;

export default function MovieCard(props) {
  const { poster_path, img } = props.movie;

  console.log(props.movie);

  return (
    <div className="">
      <div className="w-[250px] relative ">
        <AspectRatio ratio={2 / 3}>
          <Image
            src={imageBasePath + poster_path}
            fill
            alt="movie poster"
            // blurDataURL={img?.blurDataURL}
          />
        </AspectRatio>
      </div>
      <div>
        <h5></h5>
      </div>
    </div>
  );
}
