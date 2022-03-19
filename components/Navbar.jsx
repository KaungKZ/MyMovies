import React, { useState, useEffect, useRef } from "react";
import NavbarTitleBgShape from "../public/static/assets/website-title-bg-shape.svg";
import {
  SearchIcon,
  ChevronDownIcon,
  // MenuAlt3Icon,
} from "@heroicons/react/outline";
import {
  TrendingUpIcon,
  FireIcon,
  ClockIcon,
  StarIcon,
  HomeIcon,
} from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

// import Link from "next/link";

import axios from "axios";
// import Home from "../pages";

export default function Navbar() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [closeResults, setCloseResults] = useState(true);
  const [sliceNumber, setSliceNumber] = useState(5);
  const [navScroll, setNavScroll] = useState({
    show: true,
    scrollPos: 0,
    scrollDirection: null,
  });
  // const [scrollDirection, setScrollDirection] = useState("");
  // let scroll_direction;
  const resultsRef = useRef();
  const router = useRouter();

  // console.log(sliceNumber, searchResults.length);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollDocument);

    return () => window.removeEventListener("scroll", handleScrollDocument);
  }, []);

  useEffect(() => {
    if (closeResults) {
      setSliceNumber(5);
    }
  }, [closeResults]);

  useEffect(() => {
    // console.log(router.asPath);
    if (router.asPath) {
      // setSearchResults([]);
      setCloseResults(true);
    }
  }, [router.asPath]);

  // console.log(closeResults);

  useEffect(() => {
    axios
      .get(
        `
    https://api.themoviedb.org/3/search/movie?api_key=${
      process.env.NEXT_PUBLIC_API_KEY
    }&language=en-US&query=${
          searchValue === "" ? "emptymovie" : searchValue
        }&page=1&include_adult=false`
      )
      .then((data) => setSearchResults(data.data.results));
  }, [searchValue]);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        // alert("You clicked outside of me!");
        setCloseResults(true);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [resultsRef]);

  function handleScrollDocument() {
    setNavScroll((prev) => {
      return {
        scrollDirection:
          document.body.getBoundingClientRect().top > prev.scrollPos
            ? "up"
            : "down",
        scrollPos: document.body.getBoundingClientRect().top,
      };
    });
  }

  // console.log(navScroll);

  function handleOnClickMore() {
    // setSearchResults(searchResults.splice(0, 10));
    setSliceNumber((val) => val + 5);
  }

  function handleOnclickNavLink(e) {
    // document
    //   .querySelectorAll(".navbar__link")
    //   .forEach((link) => link.classList.remove("active"));
    // e.target.classList.add("active");
  }

  // console.log(navScroll);
  // console.log(searchResults);

  // console.log(searchResults.slice(0, 10));
  // console.log(closeResults);

  return (
    <div
      className={`navbar h-28 shadow-emerald bg-lightGray lg:shadow-none lg:h-auto ${
        !closeResults
          ? "show"
          : navScroll.scrollDirection === "down" && navScroll.scrollPos < 30
          ? "hide"
          : navScroll.scrollDirection === "up"
          ? "show"
          : ""
      }`}
    >
      <div
        className={`navbar__content flex section-wrapper justify-between items-center m-auto h-full lg:h-[4.5rem]`}
      >
        <div className="navbar__title relative xsm:hidden">
          <Link href={`/`}>
            <a className="navbar__title-link text-gray-600 text-2xl relative z-10 lg:text-lg">
              MyMovies
            </a>
          </Link>

          <div className="navbar__title-bg-shape absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 z-0">
            <NavbarTitleBgShape />
          </div>
        </div>
        <div className="navbar__right-items flex w-8/12 justify-end items-center flex-1">
          <div className="navbar__search-bar min-w-300 relative mr-10 lg:mr-0 sm:min-w-3/4 xsm:min-w-full">
            <label
              htmlFor="search"
              className="navbar__label text-gray-500 transition"
            >
              <SearchIcon className="h-5 w-5 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
              <input
                name="search"
                id="search"
                type="text"
                autoComplete="off"
                value={searchValue}
                onFocus={(e) => {
                  if (e.target.value === "") {
                    setCloseResults(true);
                  } else {
                    setCloseResults(false);
                  }
                }}
                onChange={(e) => {
                  setSearchValue(e.target.value);
                  setCloseResults(false);
                }}
                className="navbar__search-input focus:outline-none focus:ring-green-300 focus:ring-2 focus:border-transparent px-4 pl-10 py-2 text-gray-900 bg-green-100 transition rounded-lg text-base w-full placeholder-gray-400"
                placeholder="Search Anything .."
              />
            </label>
            {!closeResults && (
              <div
                className="results absolute top-[50px] left-0 bg-lightGray rounded p-4 w-full shadow-lg z-100 max-h-[calc(100vh-100px)] overflow-y-auto"
                ref={resultsRef}
              >
                {searchResults.length > 0 ? (
                  <ul>
                    {searchResults.slice(0, sliceNumber).map((r, i) => {
                      // console.log(r);
                      return (
                        <li
                          key={i}
                          className="p-1 results__li rounded-lg hover:bg-gray-100 transition duration-300"
                        >
                          <Link
                            href={`/movie/[movieId]`}
                            as={`/movie/${r.title}-${r.id}`}
                          >
                            <a className="flex">
                              {r.poster_path ? (
                                <div className="results__photo w-[70px] h-[80px]">
                                  <Image
                                    src={`https://image.tmdb.org/t/p/original${r.poster_path}`}
                                    width="70"
                                    height="80"
                                    alt={r.title}
                                    className="object-cover rounded-lg"
                                    placeholder="blur"
                                    blurDataURL={`/_next/image?url=https://image.tmdb.org/t/p/original${r.poster_path}&w=17&q=1`}
                                  />
                                </div>
                              ) : (
                                <div className="rounded-lg bg-gray-100 w-[70px] h-[80px]" />
                              )}
                              <div className="results__detail ml-4 flex-1">
                                <h3
                                  className="font-medium text-base"
                                  title={r.title}
                                >
                                  {r.title.length > 40
                                    ? r.title.substring(40, 0).concat(" ...")
                                    : r.title}
                                </h3>
                                <span className="text-sm text-gray-500">
                                  {r.release_date?.split("-")[0] ?? ""}
                                </span>
                              </div>
                            </a>
                          </Link>
                        </li>
                      );
                    })}

                    {/* .slice(0, 5) */}
                    {searchResults.length > 5 && sliceNumber < 10 && (
                      <li className="results__li flex justify-center items-center transition duration-300 hover:bg-gray-200 rounded mt-1.5 text-center">
                        <button
                          className="w-full py-1 flex justify-center"
                          onClick={handleOnClickMore}
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                        </button>
                      </li>
                    )}
                  </ul>
                ) : (
                  "No results"
                )}
              </div>
            )}
          </div>

          <nav className="navbar__nav flex text-gray-500 lg:hidden">
            <Link href={`/[category]`} as={`/Trending`}>
              <a className="navbar__link mr-4" onClick={handleOnclickNavLink}>
                Trending
              </a>
            </Link>
            <Link href={`/[category]`} as={`/Popular`}>
              <a className="navbar__link mr-4" onClick={handleOnclickNavLink}>
                Popular
              </a>
            </Link>
            <Link href={`/[category]`} as={`/Upcoming`}>
              <a className="navbar__link mr-4" onClick={handleOnclickNavLink}>
                Upcoming
              </a>
            </Link>
            <Link href={`/[category]`} as={`/Top Rated`}>
              <a className="navbar__link" onClick={handleOnclickNavLink}>
                Top Rated
              </a>
            </Link>
          </nav>
        </div>
      </div>
      <div className="navbarSm hidden h-14 bg-lightGray lg:flex items-center shadow-emerald sm:w-full">
        <nav className="navbarSm__nav flex w-full h-full text-gray-500 justify-between items-center">
          <Link href={`/`}>
            <a className="navbarSm__link">
              <HomeIcon className="w-6 h-6" />
            </a>
          </Link>
          <Link href={`/[category]`} as={`/Trending`}>
            <a className="navbarSm__link mr-2">
              <TrendingUpIcon className="w-6 h-6" />
            </a>
          </Link>
          <Link href={`/[category]`} as={`/Popular`}>
            <a className="navbarSm__link mr-2">
              <FireIcon className="w-6 h-6" />
            </a>
          </Link>
          <Link href={`/[category]`} as={`/Upcoming`}>
            <a className="navbarSm__link mr-2">
              <ClockIcon className="w-6 h-6" />
            </a>
          </Link>
          <Link href={`/[category]`} as={`/Top Rated`}>
            <a className="navbarSm__link">
              <StarIcon className="w-6 h-6" />
            </a>
          </Link>

          {/* <a className="navbar__link mr-4" href="#">
              Upcoming
            </a>
            <a className="navbar__link" href="#">
              Top Rated
            </a> */}
        </nav>
      </div>
    </div>
  );
}
