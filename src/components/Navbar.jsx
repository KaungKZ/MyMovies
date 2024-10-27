"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import MaxWidthWrapper from "./MaxWidthWrapper";

export default function Navbar() {
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
            <Link
              href="/trending"
              // className="hover:underline hover:decoration-2"
            >
              Trending
            </Link>
            <Link
              href="/popular"
              // className="hover:underline hover:decoration-2"
            >
              Popular
            </Link>
            <Link
              href="/top-rated"
              // className="hover:underline hover:decoration-2"
            >
              Top rated
            </Link>
            <Link
              href="/upcoming"
              // className="hover:underline hover:decoration-2"
            >
              Upcoming
            </Link>
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
}
