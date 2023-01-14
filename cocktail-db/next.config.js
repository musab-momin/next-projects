/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "https://react-projects-15-cocktails.netlify.app",
      "www.thecocktaildb.com",
    ],
  },
};

module.exports = nextConfig;
