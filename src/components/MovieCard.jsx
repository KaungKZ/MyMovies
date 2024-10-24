import React from "react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const imageWidth = 500;
const imageBasePath = `https://image.tmdb.org/t/p/w${imageWidth}`;

export default function MovieCard(props) {
  const { poster_path, img } = props.movie;

  console.log(img);
  return (
    <div className="">
      <div className="w-[250px] relative ">
        <AspectRatio ratio={2 / 3}>
          {/* <BlurhashCanvas
            punch={1}
            hash={img.blurDataURL}
            width="250"
            height="auto"
            className="absolute left-0 top-0 w-full h-full inset-0"
          /> */}
          <Image
            src={imageBasePath + poster_path}
            fill
            alt="movie poster"
            // blurDataURL={img?.blurDataURL}
          />
        </AspectRatio>
      </div>
    </div>
  );
}
