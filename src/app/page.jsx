import Image from "next/image";
import { Button } from "@/components/ui/button";
// import { Image } from "next/image";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export default function Home() {
  return (
    <section>
      <MaxWidthWrapper>
        <div className="my-10">
          <div>
            <h1 className="text-5xl font-bold">
              Keep track of Movies, <span className="text-primary">Here</span>
            </h1>
            <div className="relative w-full h-[464px]">
              <Image
                src="/assets/home-main-illustration.svg"
                className=""
                fill
                alt="home bannner image"
              />
            </div>
          </div>
          {/* <DesignUserOrders orders={orders} /> */}
        </div>
      </MaxWidthWrapper>
    </section>
  );
}

// const urls = [
//   `https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.IMDB_API_KEY}`,
//   `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.IMDB_API_KEY}&language=en-US&page=1`,
//   `https://api.themoviedb.org/3/discover/movie?api_key=${
//     process.env.IMDB_API_KEY
//   }&language=en-US&sort_by=popularity.desc&include_adult=true&include_video=false&page=1&primary_release_date.gte=${makeDate()}&with_watch_monetization_types=flatrate`,
//   // `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=1`,
// ];
