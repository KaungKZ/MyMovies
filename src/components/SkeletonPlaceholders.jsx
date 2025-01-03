import React from "react";
import { Skeleton } from "./ui/skeleton";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { SectionBgShape } from "./LoadSvgShapes";

export const SkeletonSectionPlaceholders = () => {
  return (
    <div className="py-5">
      <MaxWidthWrapper>
        <div className="grid grid-cols-5 grid-rows-2 items-center gap-y-6 gap-x-4 mt-16">
          {[...Array(10)].map((_, i) => (
            <div key={i}>
              <Skeleton className="min-w-[220px] h-[330px]" />
              <Skeleton className="w-[164px] h-3 mt-4" />
              <Skeleton className="w-[80px] h-3 mt-2" />
            </div>
          ))}

          {/* <div>
            <Skeleton className="w-[220px] h-[330px]" />
            <Skeleton className="w-[164px] h-3 mt-4" />
            <Skeleton className="w-[80px] h-3 mt-2" />
          </div>
          <div>
            <Skeleton className="w-[220px] h-[330px]" />
            <Skeleton className="w-[164px] h-3 mt-4" />
            <Skeleton className="w-[80px] h-3 mt-2" />
          </div>
          <div>
            <Skeleton className="w-[220px] h-[330px]" />
            <Skeleton className="w-[164px] h-3 mt-4" />
            <Skeleton className="w-[80px] h-3 mt-2" />
          </div>
          <div>
            <Skeleton className="w-[220px] h-[330px]" />
            <Skeleton className="w-[164px] h-3 mt-4" />
            <Skeleton className="w-[80px] h-3 mt-2" />
          </div> */}

          {/* </div> */}
        </div>
      </MaxWidthWrapper>
      {/* <div className="w-full h-full absolute left-0 top-6 -z-10">
        <SectionBgShape className="scale-x-1 w-full" />
        <SectionBgShape className="-scale-x-1 rotate-180 w-full" />
      </div> */}
    </div>
  );
};

export const SkeletonPagePlaceholders = () => {
  return (
    <div className="py-5">
      {/* <MaxWidthWrapper> */}
      <div className="grid grid-cols-5 grid-rows-4 items-center gap-y-8 gap-x-4 my-16">
        {[...Array(20)].map((_, i) => (
          <div key={i}>
            <Skeleton className="min-w-[220px] h-[330px]" />
            <Skeleton className="w-[164px] h-3 mt-4" />
            <Skeleton className="w-[80px] h-3 mt-2" />
          </div>
        ))}
      </div>
      {/* </MaxWidthWrapper> */}
    </div>
  );
};
