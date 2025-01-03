"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ChevronDown,
  Search,
  Image as LucideImage,
  TrendingUp,
  Flame,
  Clock,
  Clapperboard,
} from "lucide-react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useMutation } from "@tanstack/react-query";
import { searchMoviesByInput } from "@/app/actions";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { truncateString } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const imageWidth = 500;
const imageBasePath = `https://image.tmdb.org/t/p/w${imageWidth}`;

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [inputWidth, setInputWidth] = useState(null);
  const [dropDownOpen, setDropdownOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const inputRef = useRef();
  let searchtimer;
  const { mutate, data, isPending, isError } = useMutation({
    // mutationKey: [`get-category-page-data`, category],
    mutationKey: ["get-movies-searchbar"],
    retry: false,
    mutationFn: searchMoviesByInput,
    onError: (err) => {
      throw new Error(err);
    },
  });

  // console.log(data);

  useEffect(() => {
    if (inputRef && inputRef.current) {
      setInputWidth(inputRef.current.getBoundingClientRect().width);
    }
  }, [inputRef]);

  return (
    <>
      <nav className="bg-background py-4">
        <MaxWidthWrapper>
          <div className="flex justify-between items-center">
            <Link href="/">
              <div className="relative">
                <div className="relative w-16 h-16">
                  <Image src="/assets/website-title-bg-shape.svg" fill />
                </div>
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <h2 className="font-semibold text-zinc-600 text-xl">
                    MyMovies
                  </h2>
                </div>
              </div>
            </Link>

            <div className="flex space-x-4 mdmx:space-x-2">
              <div className="relative">
                <Popover open={dropDownOpen} onOpenChange={setDropdownOpen}>
                  <PopoverTrigger asChild>
                    <Input
                      type="text"
                      ref={inputRef}
                      startIcon={Search}
                      className="rounded-[6px] placeholder:text-base min-w-[320px] mdmx:min-w-[260px] py-5"
                      value={searchValue}
                      placeholder="Search movies.."
                      onChange={(e) => {
                        setSearchValue(e.target.value); // set immediately

                        clearTimeout(searchtimer);
                        searchtimer = setTimeout(() => {
                          setDropdownOpen(true);
                          setSearchInput(e.target.value); // set after 650ms
                          mutate({ searchInput: e.target.value });
                        }, 650);
                      }}
                    />
                  </PopoverTrigger>
                  <PopoverContent
                    onOpenAutoFocus={(e) => e.preventDefault()}
                    className="p-2"
                    style={{
                      width: `${inputWidth}px`,
                    }}
                  >
                    {isPending ? (
                      <div className="">
                        <span className="text-sm">Searching ...</span>
                      </div>
                    ) : isError ||
                      !data ||
                      searchValue === "" ||
                      data.results.length === 0 ? (
                      <div className="">
                        <span className="text-sm">There is no results..</span>
                      </div>
                    ) : (
                      <div className="flex flex-col space-y-5">
                        {(data.results.length > 5
                          ? data.results.slice(0, 5)
                          : data.results
                        ).map((result) => (
                          <Link
                            href={`/movie/${result.title.replace(
                              /\s/gi,
                              "-"
                            )}-${result.id}`}
                            className="group"
                            onClick={() => {
                              setSearchValue("");
                              setDropdownOpen(false);
                            }}
                            key={result.id}
                          >
                            <div className="flex space-x-4">
                              {result.poster_path ? (
                                <div className="relative w-[60px] flex-grow-0 rounded-[5px]">
                                  <AspectRatio ratio={2 / 3}>
                                    <Image
                                      src={imageBasePath + result.poster_path}
                                      fill
                                      className="rounded-[5px]"
                                      alt="search result movie cover"
                                    />
                                  </AspectRatio>
                                </div>
                              ) : (
                                <div className="w-[60px]  flex justify-center items-center bg-[#CECECE] flex-grow-0 rounded-[5px]">
                                  <AspectRatio ratio={2 / 3}>
                                    <LucideImage className="w-6 h-6 text-gray-100 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                                  </AspectRatio>
                                </div>
                              )}
                              <div className="flex flex-col flex-1">
                                <h5 className="font-semibold group-hover:underline decoration-1">
                                  {truncateString(result.title, 20)}
                                </h5>
                                {result.release_date && (
                                  <span className="text-sm text-zinc-600 mt-1 block">
                                    {result.release_date.split("-")[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                    {/* </DropdownMenuGroup> */}
                  </PopoverContent>
                </Popover>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="link"
                    className="text-base hover:no-underline text-zinc-600 px-1"
                  >
                    Categories <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                  {/* <DropdownMenuSeparator /> */}
                  <DropdownMenuGroup>
                    <DropdownMenuItem className="">
                      <Link
                        href="/trending"
                        className="px-2 py-1.5 w-full hover:text-white hover:rounded-sm hover:bg-primary"
                      >
                        Trending
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/popular"
                        className="px-2 py-1.5 w-full hover:text-white hover:rounded-sm hover:bg-primary"
                      >
                        Popular
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/top-rated"
                        className="px-2 py-1.5 w-full hover:text-white hover:rounded-sm hover:bg-primary"
                      >
                        Top rated
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        href="/upcoming"
                        className="px-2 py-1.5 w-full hover:text-white hover:rounded-sm hover:bg-primary"
                      >
                        Upcoming
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </MaxWidthWrapper>
      </nav>
      <MaxWidthWrapper>
        <div className="navbarSm hidden h-14 bg-lightGray mdmx:flex items-center shadow-emerald smmx:w-full">
          <nav className="navbarSm__nav flex w-full h-full text-gray-500 justify-between items-center">
            {/* <Link href={`/`}>
            <a className="navbarSm__link">
              <HomeIcon className="w-6 h-6" />
            </a>
          </Link> */}
            <Link href="/trending" className="navbarSm__link mr-2">
              <TrendingUp className="w-6 h-6" />
            </Link>
            <Link href="/popular" className="navbarSm__link mr-2">
              <Flame className="w-6 h-6" />
            </Link>
            <Link href="/upcoming" className="navbarSm__link mr-2">
              <Clock className="w-6 h-6" />
            </Link>
            <Link href="/top-rated" className="navbarSm__link">
              {/* <a className="navbarSm__link" data-to="top-rated"> */}
              <Clapperboard className="w-6 h-6" />
              {/* </a> */}
            </Link>

            {/* <a className="navbar__link mr-4" href="#">
              Upcoming
            </a>
            <a className="navbar__link" href="#">
              Top Rated
            </a> */}
          </nav>
        </div>
      </MaxWidthWrapper>
    </>
  );
}
