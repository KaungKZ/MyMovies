import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Image } from "next/image";
import { Input } from "@/components/ui/input";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import GetCategoryData from "@/components/GetCategorySectionData";

export default function Home() {
  return (
    <section className="my-10">
      {/* <MaxWidthWrapper> */}
      <div>
        <MaxWidthWrapper>
          <div>
            <h1 className="text-5xl font-bold text-center title text-zinc-700 xsmmx:text-4xl">
              Keep track of movies, <span className="text-primary">Here.</span>
            </h1>
            <div className="relative w-full h-[464px] mt-8 lgmx:h-[350px] mdmx:h-[260px] smmx:mt-3 smmx:h-[240px]">
              <Image
                src="/assets/home-main-illustration.svg"
                className=""
                fill
                alt="home bannner image"
              />
            </div>
          </div>
        </MaxWidthWrapper>

        <div className="mt-20 lgmx:mt-16">
          <GetCategoryData category="trending" />
        </div>
        <div className="mt-20 lgmx:mt-16">
          <GetCategoryData category="popular" />
        </div>
        <div className="mt-20 lgmx:mt-16">
          <GetCategoryData category="upcoming" />
        </div>
      </div>
    </section>
  );
}
