import React from "react";
import HeaderIllustration from "../public/static/assets/home-main-illustration.svg";

export default function HomeHeader() {
  return (
    <div className="header my-20 lg:mt-20 lg:mb-24">
      <div className="header__title mb-8 w-4/5 mx-auto lg:w-11/12">
        <h1 className="header__title-text capitalize text-5xl font-secondary text-center font-bold text-gray-600">
          Keep track of movies, <span className="text-green-400">here.</span>
        </h1>
      </div>
      <div className="header__illustration w-95% mx-auto">
        <HeaderIllustration
          className="mx-auto lg:h-full"
          viewBox="0 0 1174 464"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          // height="100%"

          // preserveAspectRatio="none"
        />
      </div>
    </div>
  );
}
