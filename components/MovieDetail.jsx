import React, { useState } from "react";
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

export default function MovieDetail({ tmdbData, ytxData }) {
  // const [tmdbData] = useState(data.data.res);
  // const [ytxData] = useState(data.data.ytxData);

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

  // console.log(removeDuplicate());
  // const tmdbData = data.data.res;
  // const ytxData = data.data.res;
  // console.log(data);
  return (
    <>
      <div className="detail w-3/4 mx-auto my-20 flex justify-between">
        <div className="detail__image-wrapper w-[325px] text-0 relative mr-16">
          {tmdbData.img.blurDataURL ? (
            <div className="category__movie-canvas relative">
              <BlurhashCanvas
                punch={1}
                hash={tmdbData.img.blurDataURL.hash}
                width={tmdbData.img.blurDataURL.height}
                height={tmdbData.img.blurDataURL.width}
                className="absolute left-0 top-0 h-full w-full inset-0 rounded-lg"
              />

              <Image
                src={tmdbData.img.src}
                width="325px"
                height="500"
                alt={tmdbData.original_title}
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <Image
              src={`https://image.tmdb.org/t/p/original${tmdbData.poster_path}`}
              width="325px"
              height="500"
              alt={tmdbData.original_title}
              className="object-cover rounded-lg"
            />
          )}
          <DetailBgShape className="detail__banner-bg-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-1" />
          <DetailBgShape className="detail__banner-bg-shape absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -scale-x-1 -z-1" />
        </div>

        <div className="detail__content flex-1 max-w-lg">
          {/* <div className="detail__title-wrapper flex items-center font-bold font-secondary text-3xl"> */}
          <h1 className="detail__title mr-2 text-4xl font-bold text-gray-700 mb-1">
            {tmdbData.original_title}
            <span className="detail__date ml-2 text-base">{`(${
              ytxData ? tmdbData.release_date.split("-")[0] : getFullDate()
            })`}</span>
          </h1>

          {/* </div> */}
          {ytxData && (
            <div className="detail__duration flex items-center text-base text-gray-600 mb-8">
              <span>
                <ClockIcon className="w-5 h-5 text-green-500 mr-1"></ClockIcon>
              </span>
              {`${Math.floor(tmdbData.runtime / 60)}hr ${
                tmdbData.runtime % 60
              }min`}
            </div>
          )}

          <div className="detail__summary text-base mb-8 text-gray-700">
            {tmdbData.overview}
          </div>
          {ytxData && (
            <>
              <div className="detail__resolution mb-3 text-gray-600">
                Available in:
                {removeDuplicate().map((t, i) => {
                  return (
                    <span
                      key={i}
                      className="text-green-500 font-medium mr-1.5 last:mr-0 ml-2"
                    >
                      {t.quality}
                    </span>
                  );
                })}
                {/* {ytxData.data.movies[0].torrents.map((t, i) => {
                return <Link href={t.url}>{`${t.quality} (${t.type})`}</Link>;
              })} */}
              </div>
              <div className="detail__voting mb-6 flex items-center text-gray-600">
                Voting:{" "}
                <span className="text-green-500 font-bold ml-2">
                  {tmdbData.vote_average}
                </span>
                <span>
                  <StarIcon className="w-4 h-4 ml-1 text-green-500" />
                </span>
              </div>
              <PortalWithState closeOnOutsideClick closeOnEsc>
                {({ openPortal, closePortal, isOpen, portal }) => (
                  <>
                    <button
                      onClick={openPortal}
                      className="py-2 px-6 bg-green-400 rounded text-white hover:bg-green-500 transition flex items-center text-base"
                    >
                      Download
                      <span>
                        <DownloadIcon className="w-5 h-5 ml-2" />
                      </span>
                    </button>

                    {portal(<DownloadPopup></DownloadPopup>)}
                  </>
                )}
              </PortalWithState>
              {/* <div className="detail__download">Download</div> */}
            </>
          )}
        </div>
      </div>
      <div className="trailer">
        <div className="trailer__title category__title-text font-bold font-secondary text-3xl text-gray-700 underline flex items-center">
          <h1>Watch trailer</h1>
          <span>
            <VideoCameraIcon className="w-5 h-5 text-green-500" />
          </span>
        </div>
        <div className="trailter__content"></div>
      </div>
    </>
  );
}
