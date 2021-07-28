import React, { useState } from "react";
import Image from "next/image";
import { BlurhashCanvas } from "react-blurhash";

export default function MovieDetail({ data }) {
  const [tmdbData] = useState(data.data.res);
  const [ytxData] = useState(data.data.ytxData);

  // console.log(tmdbData);
  // console.log(ytxData.data.movies[0]);

  function removeDuplicate() {
    var result = ytxData.data.movies[0].torrents.reduce((unique, o) => {
      if (!unique.some((obj) => obj.quality === o.quality)) {
        unique.push(o);
      }
      return unique;
    }, []);

    // console.log(result);

    return result;
  }

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
  // const tmdbData = data.data.res;
  // const ytxData = data.data.res;
  // console.log(data);
  return (
    <div className="detail">
      <div className="detail__image-wrapper w-[300px]">
        {tmdbData.img.blurDataURL ? (
          <div className="category__movie-canvas relative">
            <BlurhashCanvas
              punch={1}
              hash={tmdbData.img.blurDataURL.hash}
              width={tmdbData.img.blurDataURL.height}
              height={tmdbData.img.blurDataURL.width}
              className="absolute left-0 top-0 h-full w-full inset-0"
            />

            <Image
              src={tmdbData.img.src}
              width="auto"
              height="600"
              alt={tmdbData.original_title}
              className="object-cover"
            />
          </div>
        ) : (
          <Image
            src={`https://image.tmdb.org/t/p/w500${tmdbData.poster_path}`}
            width="auto"
            height="600"
            alt={tmdbData.original_title}
            className="object-cover"
          />
        )}
      </div>

      <div className="detail__content">
        <div className="detail__title">{tmdbData.original_title}</div>
        {ytxData ? (
          <div className="detail__duration">{`${Math.floor(
            tmdbData.runtime / 60
          )}hr ${tmdbData.runtime % 60}min`}</div>
        ) : (
          <div className="detail__date">{getFullDate()}</div>
        )}

        <div className="detail__summary">{tmdbData.overview}</div>
        {ytxData && (
          <>
            <div className="detail__resolution">
              {removeDuplicate().map((t, i) => {
                return <span key={i}>{t.quality}</span>;
              })}
            </div>
            <div className="detail__voting">{tmdbData.voting_average}</div>
            <div className="detail__download"></div>
          </>
        )}
      </div>
    </div>
  );
}
