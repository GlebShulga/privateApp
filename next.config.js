/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  output: 'export',
  images: {
    domains: [],
    unoptimized: true,
  },
};

module.exports = nextConfig;
