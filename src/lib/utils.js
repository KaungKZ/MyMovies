import { clsx } from "clsx";
// import { Metadata } from 'next'
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "MyMovies - Search any movies and download",
  description = "Search any movies with different categories and movie detail along with the option to download into your device. Totally free to use and check it out to search your favourite movie !",
  image = "https://i.imgur.com/80NFFGZ.jpg",
  icons = "/icon.ico",
} = {}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@kaungkz",
    },
    icons,
    metadataBase: new URL("https://dopecase.vercel.app/"),
  };
}
