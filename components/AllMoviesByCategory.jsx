import React, { useEffect, useMemo, useState } from "react";
// import { useState, useMemo } from "react";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { BlurhashCanvas } from "react-blurhash";
import MovieList from "./utils/MovieList";
import axios from "axios";
// import { getPlaiceholder } from "plaiceholder";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

export default function AllMoviesByCategory(props) {
  // console.log(props);
  const [results, setResults] = useState(props.data);
  const [loading, setLoading] = useState(null);
  // const [paginationCounts, setPaginationCounts] = useState();

  // const { data } = props;
  const router = useRouter();

  // console.log(results);

  // useMemo(() => {

  // }, [])

  const totalPagination = useMemo(
    () => generateTotalPagination(results.total_pages),
    [results.total_pages]
  );

  useEffect(() => {
    // let arr = [];

    document.querySelectorAll(".navbar__link").forEach((link) => {
      link.classList.remove("active");
      if (link.innerHTML === router.query.category) {
        link.classList.add("active");
      }
    });

    // const test = arr.includes(router.query.category);

    // console.log(test);
  }, []);

  useEffect(() => {}, []);

  // console.log(totalPagination);

  function generateTotalPagination(total_pages) {
    let arr = [];
    for (let i = 1; i <= total_pages; i++) {
      arr.push(i);
    }

    return arr;
  }

  async function handleGoSpecificPage(e) {
    // const response = await axios.get(
    //   results.url + `&page=${e.currentTarget.dataset.page}`
    // ).then(data => {

    // })

    // const getBlurHash = await axios.post("/api/getBase64", {
    //   url: `https://image.tmdb.org/t/p/w500${one.poster_path}`,
    // });

    // console.log(getBlurHash);

    console.log("going to" + e.currentTarget.dataset.page);

    const response = await axios
      .get(results.url + `&page=${e.currentTarget.dataset.page}`)
      .then(
        async (data) =>
          Promise.all(
            data.data.results.map(async (one) => {
              return await axios
                .post("/api/getBlurhash", {
                  url: `https://image.tmdb.org/t/p/w500${one.poster_path}`,
                })
                .then(({ data }) => {
                  return {
                    ...one,
                    img: { ...data.img, blurDataURL: data.blurhash },
                  };
                })
                .catch(() => ({ ...one, img: { blurDataURL: null } }));
            })
          ).then((values) => ({
            success: true,
            data: values,
            page: data.data.page,
          })),

        () => ({ success: false })
      );

    // console.log(response);
    console.log("done ! ");

    if (response.success) {
      generatePagination(response);
    }

    // console.log(response);

    // generatePagination(response.data.)
    // https://api.themoviedb.org/3/trending/movie/week?api_key=82a18ed118951da924967971e5b70de4&page=2
    // console.log(e.target.innerHTML);
  }

  function generatePagination(data) {
    // console.log(data);
    setResults({
      ...results,
      data: data.data,
      page: data.page,
    });
    // console.log(results);
  }

  // console.log(results);

  function handleGoLastPage() {}

  return (
    <div className="movies mt-20">
      <div className="section-wrapper">
        <div className="category__title section-wrapper">
          <div className="category-title-wrapper relative">
            <div className="flex items-center">
              <h1 className="category__title-text font-bold font-secondary text-3xl text-gray-700 underline md:text-[1.75rem] sm:text-2xl">
                {router.query.category + " " + "Movies"}
              </h1>
            </div>

            <div
              // className="category__title-bg"
              className="category__title-bg absolute -left-12 transform -translate-y-2/4 -z-1"
            >
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

        {results && results.data ? (
          <div className="movies__wrapper mt-16">
            <div className="movies__list grid grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-1 gap-x-7">
              {results.data.map((movie) => {
                return <MovieList movie={movie} key={movie.id} />;
              })}
            </div>
            <div className="movies__pagination">
              {/* {console.log(totalPagination)} */}
              <button className="left-pagination">
                <ChevronLeftIcon className="h-6 w-6 text-black transition duration-300" />
              </button>

              <div className="page-numbers">
                {totalPagination.slice(0, 5).map((v) => {
                  return (
                    <button
                      className={`page-number ${
                        v === results.page ? "active" : ""
                      }`}
                      key={v}
                      data-page={v}
                      onClick={handleGoSpecificPage}
                    >
                      {v}
                    </button>
                  );
                })}
                <span>...</span>
                <button
                  className={`page-number ${
                    totalPagination[totalPagination.length - 1] === results.page
                      ? "active"
                      : ""
                  }`}
                  key={totalPagination[totalPagination.length - 1]}
                  data-page={totalPagination[totalPagination.length - 1]}
                  onClick={handleGoSpecificPage}
                >
                  {totalPagination[totalPagination.length - 1]}
                </button>
              </div>
              <button className="right-pagination">
                <ChevronRightIcon className="h-6 w-6 text-black transition duration-300" />
              </button>
            </div>
          </div>
        ) : (
          <>No data for this category</>
        )}
      </div>
    </div>
  );
}
