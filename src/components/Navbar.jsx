"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  DropdownMenuPortal,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Navbar() {
  const [searchInput, setSearchInput] = useState("");
  let searchtimer;
  const { mutate, data, isPending, isError } = useMutation({
    // mutationKey: [`get-category-page-data`, category],
    // refetchOnWindowFocus: false,
    mutationFn: searchMoviesByInput,
    onError: (err) => {
      throw new Error(err);
    },
  });

  console.log(data);

  // useEffect(() => {
  //   mutate(searchInput);
  // }, [searchInput]);

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
            <div>
              <Input
                type="text"
                placeholder="Search movies.."
                onChange={(e) => {
                  clearTimeout(searchtimer); // <--- The solution is here
                  searchtimer = setTimeout(() => {
                    mutate({ searchInput: e.target.value });

                    // console.log(e.target.value);
                    // setSearchInput(e.target.value);
                  }, 1000);
                }}
              />
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
