import React, { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import MovieList from "./utils/MovieList";
import axios from "axios";
// import { getPlaiceholder } from "plaiceholder";

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";

export default function AllMoviesByCategory(props) {
  // console.log(props);
  const router = useRouter();
  const [results, setResults] = useState(props.data);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    document
      .querySelectorAll(".navbar__link, .navbarSm__link")
      .forEach((link) => {
        link.classList.remove("active");
        console.log(link.dataset.to, router.query.category.toLowerCase());
        if (
          link.dataset.to ===
          router.query.category.toLowerCase().replace(/\s/gi, "-")
        ) {
          link.classList.add("active");
        }
      });
  }, []);

  useEffect(() => {
    if (router.asPath.includes("?page=")) {
      if (router.query.page) {
        getMoviesByPage(router.query.page, true);
      }
    } else {
      setResults(props.data);
    }
  }, [router.query]);

  const totalPagination = useMemo(
    () => generateTotalPagination(results.total_pages),
    [results.total_pages]
  );

  // useEffect(() => {
  //   router.reload(window.location.pathname);
  // }, []);

  // useEffect(() => {
  //   if (isPageNumberExist) {
  //   }
  // }, [isPageNumberExist]);

  // console.log(results);

  function generateTotalPagination(total_pages) {
    // console.log(total_pages, start);
    // console.log("rendered total pagination function");
    let arr = [];
    for (let i = 1; i <= total_pages; i++) {
      arr.push(i);
    }

    return arr;
  }

  async function getMoviesByPage(pageNumber, initialExist) {
    // const pageNumber = e.currentTarget.dataset.page;

    let url;

    if (router.asPath.includes("?page=")) {
      url =
        router.query.category.toLowerCase() !== "trending"
          ? `https://api.themoviedb.org/3/movie/${router.query.category
              .toLowerCase()
              .replace(/\s/gi, "_")}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
          : `https://api.themoviedb.org/3/${router.query.category.toLowerCase()}/movie/week?api_key=${
              process.env.NEXT_PUBLIC_API_KEY
            }`;
    } else {
      url = results.url;
    }

    const response = await axios.get(url + `&page=${pageNumber}`).then(
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

    if (response.success) {
      generatePagination(response, initialExist);
    }
  }

  function handleGoSpecificPage(e) {
    setLoading(true);

    // router.push(`?number=${e.currentTarget.dataset.page}`, undefined, {
    //   shallow: true,
    // });

    getMoviesByPage(e.currentTarget.dataset.page);
  }

  function generatePagination(data, initialExist) {
    setResults({
      ...results,
      data: data.data,
      page: data.page,
    });

    const category = router.query.category;
    const page = data.page;

    if (!initialExist) {
      router.push(
        {
          pathname: `/[category]`,
          query: { category: category, page: page },
        },
        `/${category}?page=${page}`,
        { shallow: true }
      );
    }

    // router.push(`${router.asPath}?page=${data.page}`);

    setLoading(false);

    // console.log(results);
  }

  // function handleGoPreviousPage() {}

  // function handleGoNextPage() {}

  // function paginationCalculation() {}

  return (
    <div className="movies mt-20 lg:mt-[calc(128px+4rem)] sm:mt-[calc(128px+3rem)]">
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
          <div className="movies__wrapper mt-16 sm:mt-12">
            <div className="movies__list grid grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 xsm:grid-cols-1 gap-x-7 gap-y-5">
              {results.data.map((movie) => {
                return (
                  <MovieList movie={movie} key={movie.id} isLoading={loading} />
                );
              })}
            </div>
            <div
              className={`movies__pagination flex justify-center mt-12 ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              {/* {console.log(totalPagination)} */}
              <button className="left-pagination mr-4 sm:mr-1">
                <ChevronLeftIcon className="h-6 w-6 text-black transition duration-300 sm:w-5 sm:h-5" />
              </button>

              <div className="page-numbers ">
                <button
                  className={`page-number ${
                    totalPagination[0] === results.page ? "active" : ""
                  } py-1 px-2 mr-2 sm:mr-1 sm:text-sm ${
                    loading ? "cursor-not-allowed" : ""
                  }`}
                  key={totalPagination[0]}
                  data-page={totalPagination[0]}
                  onClick={handleGoSpecificPage}
                  disabled={loading}
                >
                  {totalPagination[0]}
                </button>
                {results.page >= 6 ? <span>...</span> : <></>}
                {[
                  // if total page is over 6
                  ...(totalPagination.length > 6
                    ? // if current page is less than 6
                      results.page < 6
                      ? totalPagination.slice(1, 6)
                      : // else if current page is within 4 pages away from last page
                      results.page >= results.total_pages - 4
                      ? totalPagination.slice(
                          totalPagination[totalPagination.length - 7], // show only numbers which are 7 index away from last
                          totalPagination[totalPagination.length - 2] // remove last and show before last
                        )
                      : // anything else (if current page is not less than 6 or within 4 pages away from last page)
                        totalPagination.slice(
                          results.page - 3,
                          results.page + 2
                        )
                    : // if total page is below 6
                      totalPagination),
                ].map((v) => {
                  return (
                    <button
                      className={`page-number ${
                        v === results.page ? "active" : ""
                      } py-1 px-2 mr-2 sm:mr-1 sm:text-sm ${
                        loading ? "cursor-not-allowed" : ""
                      }`}
                      key={v}
                      data-page={v}
                      disabled={loading}
                      onClick={handleGoSpecificPage}
                    >
                      {v}
                    </button>
                  );
                })}
                {results.page < results.total_pages - 4 ? (
                  <span>...</span>
                ) : (
                  <></>
                )}
                <button
                  className={`page-number ${
                    totalPagination[totalPagination.length - 1] === results.page
                      ? "active"
                      : ""
                  } py-1 px-2 ${loading ? "cursor-not-allowed" : ""}`}
                  key={totalPagination[totalPagination.length - 1]}
                  disabled={loading}
                  data-page={totalPagination[totalPagination.length - 1]}
                  onClick={handleGoSpecificPage}
                >
                  {totalPagination[totalPagination.length - 1]}
                </button>
              </div>
              <button
                className={`right-pagination ml-4 sm:ml-1 cursor-not-allowed ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                <ChevronRightIcon className="h-6 w-6 text-black transition duration-300 sm:w-5 sm:h-5" />
              </button>
            </div>
            {/* <button
              onClick={() => {
                const category = router.query.category;
                const page = "7";
                router.push(
                  {
                    pathname: `/[category]`,
                  },
                  `/${category}?page=${page}`,
                  { shallow: true }
                );
              }}
            >
              click
            </button> */}
          </div>
        ) : (
          <>No data for this category</>
        )}
      </div>
    </div>
  );
}
