/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "b.thumbs.redditmedia.com",
      "i.redd.it",
      "firebasestorage.googleapis.com",
      "www.redditstatic.com",
    ],
  },
};

module.exports = nextConfig;
