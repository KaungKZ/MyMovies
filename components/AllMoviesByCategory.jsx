import React from "react";
import { LightningBoltIcon } from "@heroicons/react/solid";

export default function AllMoviesByCategory(props) {
  console.log(props);
  // const [navbarHeight, setNavbarHeight] = useState(128);

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     setNavbarHeight(document.querySelector(".navbar").offsetHeight);
  //   }
  // }, []);

  // console.log(navbarHeight);
  return (
    <div className="movies">
      {/* <div className="movies__coming-soon w-11/12 mx-auto h-[calc(100vh-128px)] flex items-center justify-center lg:mt-[128px]">
        <div className="wrapper text-center flex flex-col justify-center items-center">
          <span className="icon text-green-400 sm:mr-0 mb-4">
            <LightningBoltIcon className="w-10 h-10" />
          </span>
          <div className="content">
            <h1 className="font-bold text-3xl text-gray-800 text-center items-center lg:text-2xl sm:mb-1 xsm:mb-3">
              Stayed tuned, this page is coming soon !
            </h1>
            <span className="text-base text-gray-500 xsm:text-sm w-4/5 mx-auto block xsm:w-11/12">
              {" "}
              Meanwhile check out our{" "}
              <a
                href="https://github.com/KaungKZ/MyMovies"
                target="_blank"
                className="text-green-500 font-bold underline hover:text-green-600 transition"
                rel="noreferrer"
              >
                Repository
              </a>{" "}
              to stay up to date with everything.
            </span>
          </div>
        </div>
      </div> */}
      <div className="movies__category"></div>
      <div className="movies__wrapper">
        <div className="movies__list"></div>
        <div className="movies__pagination"></div>
      </div>
    </div>
  );
}
