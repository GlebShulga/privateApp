/** @type {import('next').NextConfig} */

const repo = 'privateApp'
const assetPrefix = `/${repo}/`
const basePath = `/${repo}`


const nextConfig = {
  reactStrictMode: true,
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    loader: 'imgix',
    path: 'https://private-9498.imgix.net',
  },
}

module.exports = nextConfig
