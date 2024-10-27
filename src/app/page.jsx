import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Image } from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import GetCategoryData from "@/components/GetCategoryData";

export default function Home() {
  return (
    <section>
      {/* <MaxWidthWrapper> */}
      <div className="my-10">
        <MaxWidthWrapper>
          <div>
            <h1 className="text-5xl font-bold text-center title text-zinc-600">
              Keep track of movies, <span className="text-primary">Here.</span>
            </h1>
            <div className="relative w-full h-[464px] mt-8">
              <Image
                src="/assets/home-main-illustration.svg"
                className=""
                fill
                alt="home bannner image"
              />
            </div>
          </div>
        </MaxWidthWrapper>

        <div className="mt-20">
          <GetCategoryData category="trending" />
        </div>
        <div className="mt-20">
          <GetCategoryData category="popular" />
        </div>
        <div className="mt-20">
          <GetCategoryData category="upcoming" />
        </div>
      </div>
    </section>
  );
}
