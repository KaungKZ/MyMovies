"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { getMoviesByPage, handleRequest } from "@/app/actions";
// import { SkeletonPagePlaceholders } from "./SkeletonPlaceholders";
import { SkeletonPagePlaceholders } from "./SkeletonPlaceholders";
import MovieCard from "./MovieCard";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  useParams,
  useRouter,
  useSearchParams,
  usePathname,
} from "next/navigation";

export default function GetCategoryPageData({ category }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isPageNumberExist = searchParams.get("page");
  // const isPendingQuery = true;

  const {
    data,
    isPending: isPendingQuery,
    isError,
    error,
  } = useQuery({
    queryKey: [`get-category-page-data-${category}`],
    refetchOnWindowFocus: false,

    queryFn: () =>
      getMoviesByPage({
        category: category,
        pageNumber: isPageNumberExist || 1,
      }),
    onError: (err) => {
      throw new Error(err);
    },
  });

  const queryClient = useQueryClient();
  const {
    mutate,
    isPending: isPendingMutate,
    isError: isErrorMutate,
  } = useMutation({
    // mutationKey: [`get-category-page-data`, category],
    // refetchOnWindowFocus: false,
    mutationFn: getMoviesByPage,
    onError: (err) => {
      throw new Error(err);
    },
    onSuccess: (data) => {
      // console.log("success", data);
      // const existingData = queryClient.getQueryData([`get-category-page-data`]);

      // console.log(existingData);
      queryClient.setQueryData([`get-category-page-data-${category}`], data);
    },
  });

  // console.log(isError);

  useEffect(() => {
    if (isPageNumberExist) {
      handleGoSpecificPage(isPageNumberExist);
    }
  }, []);

  const totalPagination = useMemo(
    () => generateTotalPagination(data?.total_pages),
    [data]
  );

  function generateTotalPagination(total_pages) {
    // console.log(total_pages, start);
    // console.log("rendered total pagination function");
    let arr = [];
    const _total_pages = total_pages > 500 ? 500 : total_pages; // set to 500 if total page is over 500 as api limit is 500

    for (let i = 1; i <= _total_pages; i++) {
      arr.push(i);
    }

    return arr;
  }

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  async function handleGoSpecificPage(pageNumber) {
    // const pageNumber = e.currentTarget.dataset.page;
    router.push(pathname + "?" + createQueryString("page", pageNumber));
    // createQueryString()
    await mutate({ category: category, pageNumber: pageNumber });
  }

  async function handleGoNextPage(currentPageNumber) {
    router.push(
      pathname + "?" + createQueryString("page", currentPageNumber + 1)
    );
    await mutate({ category: category, pageNumber: currentPageNumber + 1 });
  }

  async function handleGoPrevPage(currentPageNumber) {
    router.push(
      pathname + "?" + createQueryString("page", currentPageNumber - 1)
    );
    await mutate({ category: category, pageNumber: currentPageNumber - 1 });
  }

  // console.log(totalPagination, data);

  return (
    <div>
      {isError || isErrorMutate ? (
        <div>APi got error</div>
      ) : isPendingQuery ? (
        <SkeletonPagePlaceholders />
      ) : (
        <div>
          <div className="my-16 relative py-5 grid grid-cols-5 gap-x-4 gap-y-8">
            {data?.results?.map((d) => {
              return <MovieCard key={d.id} movie={d} />;
            })}

            {/* <div> */}

            {/* </div> */}
          </div>
          <div className="flex justify-center mt-8">
            <button
              className="left-pagination mr-4 sm:mr-1"
              onClick={() => handleGoPrevPage(data.page)}
            >
              <ChevronLeft className="h-6 w-6 text-black transition duration-300 sm:w-5 sm:h-5" />
            </button>

            <div className="page-numbers ">
              <button
                className={`page-number ${
                  totalPagination[0] === data.page
                    ? "bg-primary text-white rounded-[3px]"
                    : ""
                } py-1 px-2 mr-2 sm:mr-1 sm:text-sm ${
                  isPendingMutate ? "cursor-not-allowed" : ""
                }`}
                key={totalPagination[0]}
                data-page={totalPagination[0]}
                onClick={(e) =>
                  handleGoSpecificPage(e.currentTarget.dataset.page)
                }
                disabled={isPendingMutate}
              >
                {totalPagination[0]}
              </button>
              {data.page >= 6 ? <span>...</span> : <></>}
              {[
                // if total page is over 6
                ...(totalPagination.length > 6
                  ? // if current page is less than 6
                    data.page < 6
                    ? totalPagination.slice(1, 6)
                    : // else if current page is within 4 pages away from last page
                    data.page >=
                      (data.total_pages > 500 ? 500 : data.total_pages) - 4
                    ? totalPagination.slice(
                        totalPagination[totalPagination.length - 7], // show only numbers which are 7 index away from last
                        totalPagination[totalPagination.length - 2] // remove last and show before last
                      )
                    : // anything else (if current page is not less than 6 or within 4 pages away from last page)
                      totalPagination.slice(data.page - 3, data.page + 2)
                  : // if total page is below 6
                    totalPagination),
              ].map((v) => {
                return (
                  <button
                    // className={`page-number ${
                    //   v === data.page ? "active" : ""
                    // } py-1 px-2 mr-2 sm:mr-1 sm:text-sm ${
                    //   isPendingMutate ? "cursor-not-allowed" : ""
                    // }`}
                    className={`page-number ${
                      v === data.page
                        ? "bg-primary text-white rounded-[3px]"
                        : ""
                    } py-1 px-2 mr-2 sm:mr-1 sm:text-sm ${
                      isPendingMutate ? "cursor-not-allowed" : ""
                    }`}
                    key={v}
                    data-page={v}
                    disabled={isPendingMutate}
                    onClick={(e) =>
                      handleGoSpecificPage(e.currentTarget.dataset.page)
                    }
                  >
                    {v}
                  </button>
                );
              })}
              {data.page <
              (data.total_pages > 500 ? 500 : data.total_pages) - 4 ? (
                <span>...</span>
              ) : (
                <></>
              )}
              <button
                className={cn(`page-number py-1 px-2`, {
                  "bg-primary text-white rounded-[3px]":
                    totalPagination[totalPagination.length - 1] === data.page ||
                    isPageNumberExist ===
                      totalPagination[totalPagination.length - 1],
                  "cursor-not-allowed": isPendingMutate,
                })}
                key={totalPagination[totalPagination.length - 1]}
                disabled={isPendingMutate}
                data-page={totalPagination[totalPagination.length - 1]}
                onClick={(e) =>
                  handleGoSpecificPage(e.currentTarget.dataset.page)
                }
              >
                {totalPagination[totalPagination.length - 1]}
              </button>
            </div>
            <button
              className={`right-pagination ml-4 sm:ml-1 cursor-not-allowed ${
                isPendingMutate ? "cursor-not-allowed" : ""
              }`}
              onClick={() => handleGoNextPage(data.page)}
            >
              <ChevronRight className="h-6 w-6 text-black transition duration-300 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
