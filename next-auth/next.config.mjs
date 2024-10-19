/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "personal-practice.s3.ap-south-1.amazonaws.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
