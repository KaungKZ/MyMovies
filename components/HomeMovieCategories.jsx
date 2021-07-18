import React from "react";
import Link from "next/link";

export default function HomeMovieCategories(props) {
  //   console.log(props);
  return (
    <div>
      <h1 className="font-bold">{props.title}</h1>
      {props.data
        ? props.data.results.map((movie, index) => {
            return (
              <div key={index}>
                <Link href={`/movie/${movie.id}`}>
                  <a>{movie.original_title}</a>
                </Link>
              </div>
            );
          })
        : "Not found"}
    </div>
  );
}
