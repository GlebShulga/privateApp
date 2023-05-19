/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: true,
  images: {
    loader: 'imgix',
    path: 'https://private-9498.imgix.net',
  },
}

module.exports = nextConfig
