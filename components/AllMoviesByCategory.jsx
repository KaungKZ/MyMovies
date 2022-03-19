import React, { useEffect } from "react";
import { LightningBoltIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { BlurhashCanvas } from "react-blurhash";
import MovieList from "./utils/MovieList";

export default function AllMoviesByCategory(props) {
  // console.log(props);

  const { data } = props;
  const router = useRouter();

  const url =
    router.query.category.toLowerCase() !== "trending"
      ? `https://api.themoviedb.org/3movie/${router.query.category
          .toLowerCase()
          .replace(/\s/gi, "_")}?api_key=${process.env.NEXT_PUBLIC_API_KEY}`
      : `https://api.themoviedb.org/3/${router.query.category.toLowerCase()}/movie/week?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }`;

  console.log(url);

  // useEffect(() => {
  //   if ()
  // }, [])

  useEffect(() => {
    // let arr = [];

    document.querySelectorAll(".navbar__link").forEach((link) => {
      if (link.innerHTML === router.query.category) {
        link.classList.add("active");
      }
    });

    // const test = arr.includes(router.query.category);

    // console.log(test);
  }, []);
  // console.log(data);
  // console.log(router.query.category);
  // const [navbarHeight, setNavbarHeight] = useState(128);

  // useEffect(() => {
  //   if (typeof window !== undefined) {
  //     setNavbarHeight(document.querySelector(".navbar").offsetHeight);
  //   }
  // }, []);

  // console.log(navbarHeight);
  return (
    <div className="movies mt-20">
      <div className="section-wrapper">
        <div className="category__title section-wrapper">
          <div className="category-title-wrapper relative">
            <div className="flex items-center">
              <h1 className="category__title-text font-bold font-secondary text-3xl text-gray-700 underline md:text-[1.75rem] sm:text-2xl">
                {router.query.category}
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

        {data && data.data ? (
          <div className="movies__wrapper mt-16">
            <div className="movies__list grid grid-cols-4 lg:grid-cols-3 gap-x-5">
              {data.data.map((movie) => {
                return <MovieList movie={movie} key={movie.id} />;
              })}
            </div>
            <div className="movies__pagination"></div>
          </div>
        ) : (
          <>No data for this category</>
        )}
      </div>
    </div>
  );
}
