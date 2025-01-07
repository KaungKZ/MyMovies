import React, { useEffect, useState } from "react";
import { Skeleton } from "./ui/skeleton";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { SectionBgShape } from "./LoadSvgShapes";

export const SkeletonSectionPlaceholders = () => {
  // console.log("hi");
  const [skeletonSection, setSkeletonSection] = useState(() => {
    if (window.innerWidth <= 420) {
      return 8;
    } else if (window.innerWidth <= 700) {
      return 9;
    } else if (window.innerWidth <= 1025) {
      return 8;
    } else {
      return 10;
    }
  });

  console.log(window.innerWidth <= 700);

  const handleResize = () => {
    if (window.innerWidth <= 420) {
      setSkeletonSection(8);
    } else if (window.innerWidth <= 700) {
      setSkeletonSection(9);
    } else if (window.innerWidth <= 1024) {
      setSkeletonSection(8);
    } else {
      setSkeletonSection(10);
    }
  };

  console.log(skeletonSection);

  // useEffect(() => {
  //   handleResize();
  // }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize, false);
  }, []);
  return (
    <div className="py-5">
      <MaxWidthWrapper>
        <div className="grid grid-cols-5 grid-rows-2 items-center gap-y-6 gap-x-4 mt-16 lgmx:grid-cols-4 700mx:grid-cols-3 2xsmmx:grid-cols-2 xlmx:mt-8 smmx:mt-4 smmx:gap-y-4">
          {[...Array(skeletonSection)].map((_, i) => (
            <div key={i}>
              <Skeleton className="w-auto h-[330px] lgmx:min-w-full xlmx:h-[280px] lgmx:h-[240px] mdmx:h-[220px]" />
              <Skeleton className="w-[164px] h-3 mt-4 xlmx:w-full mdmx:h-2" />
              <Skeleton className="w-[80px] h-3 mt-2 mdmx:h-2" />
            </div>
          ))}

          {/* </div> */}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export const SkeletonPagePlaceholders = () => {
  return (
    <div className="py-5">
      {/* <MaxWidthWrapper> */}
      <div className="grid grid-cols-5 grid-rows-4 items-center gap-y-8 gap-x-4 my-16 mdmx:grid-cols-4 2xsmmx:grid-cols-2 smmx:grid-cols-3 mdmx:gap-x-2 mdmx:gap-y-5 mdmx:my-8">
        {[...Array(20)].map((_, i) => (
          <div key={i}>
            <Skeleton className="w-auto h-[330px] lgmx:min-w-full xlmx:h-[280px] lgmx:h-[240px] mdmx:h-[220px]" />
            <Skeleton className="w-[164px] h-3 mt-4 xlmx:w-full mdmx:h-2" />
            <Skeleton className="w-[80px] h-3 mt-2 mdmx:h-2" />
          </div>
        ))}
      </div>
      {/* </MaxWidthWrapper> */}
    </div>
  );
};
