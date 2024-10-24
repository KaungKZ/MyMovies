import "./globals.css";
import localFont from "next/font/local";
import AuthProvider from "@/components/AuthProvider";
import { constructMetadata } from "@/lib/utils";
import RQProviders from "@/components/RQProvider";
import NextTopLoader from "nextjs-toploader";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const worksans = localFont({
  src: [
    {
      path: "./fonts/WorkSans-Regular.woff",
      weight: "400",
    },
    {
      path: "./fonts/WorkSans-Medium.woff",

      weight: "500",
    },
    {
      path: "./fonts/WorkSans-SemiBold.woff",

      weight: "600",
    },
    {
      path: "./fonts/WorkSans-Bold.woff",

      weight: "700",
    },
  ],
  variable: "--font-worksans",
});

export const metadata = constructMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${worksans.variable} antialiased font-sans bg-background`}
      >
        <RQProviders children={children}>
          <AuthProvider>
            <NextTopLoader color="#059669" />
            <Navbar />
            {children}
            <Footer />
          </AuthProvider>
        </RQProviders>
      </body>
    </html>
  );
}

// // -- configuration --

// // https://api.themoviedb.org/3/configuration?api_key=82a18ed118951da924967971e5b70de4

// // --popular --

// // https://api.themoviedb.org/3/movie/popular?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// // -- top rated --

// // https://api.themoviedb.org/3/movie/top_rated?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// // -- upcoming movies --

// // https://api.themoviedb.org/3/movie/upcoming?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// // trending

// // https://api.themoviedb.org/3/trending/movie/week?api_key=82a18ed118951da924967971e5b70de4

// // -- similar movies --

// // https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=82a18ed118951da924967971e5b70de4&language=en-US&page=1

// // get details

// // https://api.themoviedb.org/3/movie/{movie_id}?api_key=82a18ed118951da924967971e5b70de4&language=en-US

// // search movies for searchbox

// // https://api.themoviedb.org/3/search/movie?api_key=82a18ed118951da924967971e5b70de4&language=en-US&query=the%20avengers&page=1&include_adult=true

// // -- torrent api with imdb id --

// // https://yts.mx/api/v2/list_movies.json?query_term=tt12801262

// // images url sample

// // base url                   / file size / file path

// // https://image.tmdb.org/t/p/   w500    /kqjL17yufvn9OVLyXYpvtyrFfak.jpg
