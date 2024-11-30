/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SERVER_HOST: process.env.SERVER_HOST,
  },
};

export default nextConfig;
