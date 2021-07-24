import React from "react";
import NavbarTitleBgShape from "../public/static/assets/website-title-bg-shape.svg";
import { SearchIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar h-28 shadow-emerald bg-lightGray">
      <div className="navbar__content flex w-4/5 justify-between items-center m-auto h-full">
        <div className="navbar__title relative">
          <Link href={`/`}>
            <a className="navbar__title-link text-gray-600 text-2xl relative z-10">
              MyMovies
            </a>
          </Link>

          <div className="navbar__title-bg-shape absolute top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4 z-0">
            <NavbarTitleBgShape />
          </div>
        </div>
        <div className="navbar__right-items flex w-8/12 justify-end items-center flex-1">
          <div className="navbar__search-bar min-w-300 relative mr-10">
            <label
              htmlFor="search"
              className="navbar__label text-gray-500 transition"
            >
              <SearchIcon className="h-5 w-5 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
              <input
                name="search"
                id="search"
                type="text"
                className="navbar__search-input focus:outline-none focus:ring-green-300 focus:ring-2 focus:border-transparent px-4 pl-10 py-2 text-gray-900 bg-green-100 transition rounded-lg text-sm w-full placeholder-gray-500"
                placeholder="Search Anything .."
              />
            </label>
          </div>
          <nav className="navbar__nav flex text-gray-500 ">
            <Link href={`/`}>
              <a className="navbar__link mr-4">Trending</a>
            </Link>
            <Link href={`/`}>
              <a className="navbar__link mr-4">Popular</a>
            </Link>
            <Link href={`/`}>
              <a className="navbar__link mr-4">Upcoming</a>
            </Link>
            <Link href={`/`}>
              <a className="navbar__link">Top Rated</a>
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
    </div>
  );
}
