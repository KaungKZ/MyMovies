"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "lucide-react";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";
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
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  const [inputWidth, setInputWidth] = useState(null);
  // const [dropDownOpen, setDropdownOpen] = useState(null);
  const inputRef = useRef();
  let searchtimer;
  const { mutate, data, isPending, isError } = useMutation({
    // mutationKey: [`get-category-page-data`, category],
    mutationKey: ["get-movies-searchbar"],
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

  console.log(data, isPending);

  // console.log(searchInput, data);
  return (
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

          <div className="flex space-x-4">
            <div className="relative">
              <Popover>
                <PopoverTrigger>
                  <Input
                    type="text"
                    ref={inputRef}
                    startIcon={Search}
                    placeholder="Search movies.."
                    onChange={(e) => {
                      clearTimeout(searchtimer); // <--- The solution is here
                      searchtimer = setTimeout(() => {
                        // setDropdownOpen(true);
                        setSearchInput(e.target.value);
                        // if (e.target.value !== "") {
                        mutate({ searchInput: e.target.value });
                        // }
                      }, 1000);
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent
                  onOpenAutoFocus={(e) => e.preventDefault()}
                  style={{
                    width: `${inputWidth}px`,
                  }}
                >
                  {isPending ? (
                    <div className="">
                      <span className="text-sm">Searching ...</span>
                    </div>
                  ) : isError || !data || searchInput === "" ? (
                    <div className="">
                      <span className="text-sm">There is no results..</span>
                    </div>
                  ) : (
                    <div className="">
                      {data.results.map((result) => (
                        <Link
                          href={`/movie/${result.title.replace(/\s/gi, "-")}-${
                            result.id
                          }`}
                        >
                          <div>{result.title}</div>
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
                  className="text-base hover:no-underline text-zinc-600"
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
  );
}
