import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import React from "react";
import Image from "next/image";
import GetCategoryPageData from "@/components/GetCategoryPageData";

export default function Page() {
  return (
    <section className="mt-20">
      <MaxWidthWrapper>
        <div>
          <div className="relative flex items-center space-x-2">
            <h1 className="text-3xl font-bold text-gray-700 underline title">
              Top rated Movies
            </h1>

            <div className="absolute left-0 top-0 -translate-x-[45px] -translate-y-[60px] -z-10">
              <Image
                src="/assets/section-title-bg-shape.png"
                width="143"
                height="130"
                alt="section title bg shape"
              />
            </div>
          </div>
        </div>
        <div>
          <GetCategoryPageData category="top-rated" />
        </div>
      </MaxWidthWrapper>
    </section>
  );
}
