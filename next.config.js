// module.exports = {
// }
const { withPlaiceholder } = require("@plaiceholder/next");
const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig = {
  reactStrictMode: true,
  future: {
    webpack5: true,
  },
  images: {
    domains: ["image.tmdb.org", "yts.mx"],
  },

  webpack: (config, isServer) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = withPlugins(
  [[withPlaiceholder], [withBundleAnalyzer]],
  nextConfig
);
