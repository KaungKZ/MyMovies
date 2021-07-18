import React from "react";
import NavbarTitleBgShape from "../assets/website-title-bg-shape.svg";
import { SearchIcon } from "@heroicons/react/outline";

export default function Navbar() {
  return (
    <div className="navbar h-28 shadow-emerald bg-lightGray">
      <div className="navbar__content flex w-4/5 justify-between items-center m-auto h-full">
        <div className="navbar__title relative">
          <a
            href="#"
            className="navbar__title-link text-gray-600 text-2xl relative z-10"
          >
            MyMovies
          </a>
          <div className="navbar__title-bg-shape absolute top-2/4 left-2/4 left-50 transform -translate-x-2/4 -translate-y-2/4 z-0">
            <NavbarTitleBgShape />
          </div>
        </div>
        <div className="navbar__right-items flex w-8/12 justify-end items-center flex-1">
          <div className="navbar__search-bar min-w-300 relative mr-10">
            <SearchIcon className="h-5 w-5 text-gray-400 pointer-events-none absolute top-1/2 transform -translate-y-1/2 left-3" />
            <input
              type="text"
              className="focus:outline-none focus:ring-green-300 focus:ring-2 focus:border-transparent px-4 pl-10 py-2 text-gray-600 bg-green-100 transition rounded-lg text-sm w-full shadow-sm"
              placeholder="Search Anything .."
            />
          </div>
          <nav className="navbar__nav flex text-gray-500 ">
            <a
              className="navbar__link mr-4 hover:text-gray-900 transition font-medium"
              href="#"
            >
              Trending
            </a>
            <a
              className="navbar__link mr-4 hover:text-gray-900 transition font-medium"
              href="#"
            >
              Popular
            </a>
            <a
              className="navbar__link mr-4 hover:text-gray-900 transition font-medium"
              href="#"
            >
              Upcoming
            </a>
            <a
              className="navbar__link hover:text-gray-900 transition font-medium"
              href="#"
            >
              Top Rated
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
