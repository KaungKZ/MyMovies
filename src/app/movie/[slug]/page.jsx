"use server";

import React from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import MovieDetail from "@/components/MovieDetail";
import { getMovieDetail } from "@/app/actions";
import { handleRequest } from "@/app/actions";

// import { useParams } from "next/navigation";

export default async function Page(params) {
  // const movieID =
  //   params.params.slug.split("-")[params.params.slug.split("-").length - 1];
  // const params = useParams();

  const queryClient = new QueryClient(); // becaue useQueryClient() only works in client components

  await queryClient.prefetchQuery({
    queryKey: ["get-movie-detail"],
    queryFn: () => getMovieDetail(params.params.slug),
  });

  // await queryClient.prefetchQuery({
  //   queryKey: [`get-category-data-similar`],
  //   queryFn: () =>
  //     handleRequest({
  //       category: "similar",
  //       movieId:
  //         params.params.slug.split("-")[params.params.split("-").length - 1],
  //     }),

  //   // queryFn: () => getMovieDetail(params.params.slug),
  // });

  // console.log(data)
  // console.log(params.params.slug);

  // console.log(body);

  // console.log(params);
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MovieDetail params={params} />
    </HydrationBoundary>
  );
}
