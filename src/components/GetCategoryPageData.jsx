"use client";

import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMoviesByPage, handleRequest } from "@/app/actions";
// import { SkeletonPagePlaceholders } from "./SkeletonPlaceholders";
import { SkeletonPagePlaceholders } from "./SkeletonPlaceholders";
import MovieCard from "./MovieCard";

export default function GetCategoryPageData({ category }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: [`get-category-data-${category}`],
    // refetchOnWindowFocus: false,
    queryFn: () => handleRequest({ category: category, movieId: null }),
    onError: (err) => {
      throw new Error(err);
    },
  });

  const {
    mutate,
    isPending: isPendingMutate,
    isError: isErrorMutate,
  } = useMutation({
    queryKey: [`get-category-page-data-${category}`],
    // refetchOnWindowFocus: false,
    queryFn: getMoviesByPage,
    onError: (err) => {
      throw new Error(err);
    },
  });
  return (
    <div>
      {isErrorMutate ? (
        <div>APi got error</div>
      ) : isPendingMutate ? (
        <SkeletonPagePlaceholders />
      ) : (
        <div className="mt-16 relative py-5 grid grid-cols-5 gap-x-4 gap-y-8">
          {data?.results?.map((d) => {
            return <MovieCard movie={d} />;
          })}

          {/* <div> */}

          {/* </div> */}
        </div>
      )}
    </div>
  );
}
