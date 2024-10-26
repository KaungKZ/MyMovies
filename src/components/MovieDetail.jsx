"use client";

import { getMovieDetail } from "@/app/actions";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

import React from "react";

export default function MovieDetail() {
  const params = useParams();

  //   console.log(params);
  const { data, error } = useQuery({
    queryKey: ["get-movie-detail"],
    queryFn: () => getMovieDetail(params.slug),
    // throwOnError: true,
  });

  //   console.log(data, error, isFetching);

  //   console.log(data);
  return <div>MovieDetail</div>;
}
