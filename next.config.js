// module.exports = {
// }
const { withPlaiceholder } = require("@plaiceholder/next");

module.exports = withPlaiceholder({
  reactStrictMode: true,
  images: {
    domains: ["image.tmdb.org"],
  },

  webpack: (config, isServer) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
});
