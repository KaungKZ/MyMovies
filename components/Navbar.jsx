import React from "react";
import NavbarTitleBgShape from "../assets/website-title-bg-shape.svg";

export default function Navbar() {
  return (
    <div className="navbar h-28 font-sans">
      <div className="navbar__content flex w-4/5 justify-between items-center m-auto h-full">
        <div className="navbar__title relative">
          <a href="#" className="navbar__title-link">
            MyMovies
          </a>
          <div className="navbar__title-bg-shape absolute top-2/4 left-2/4 left-50 transform -translate-x-2/4 -translate-y-2/4 -z-1">
            <NavbarTitleBgShape />
          </div>
        </div>
        <nav className="navbar__nav">
          <a className="navbar__link" href="#">
            Trending
          </a>
          <a className="navbar__link" href="#">
            Popular
          </a>
          <a className="navbar__link" href="#">
            Upcoming
          </a>
          <a className="navbar__link" href="#">
            Top Rated
          </a>
        </nav>
      </div>
    </div>
  );
}
