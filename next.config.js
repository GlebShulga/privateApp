/** @type {import('next').NextConfig} */

const isGithubActions = process.env.ACTIONS || false;
const repo = isGithubActions ? process.env.REPOSITORY.replace(/.*?\//, "") : "";

const assetPrefix = isGithubActions ? `/${repo}/` : "";
const basePath = isGithubActions ? `/${repo}` : "";

const nextConfig = {
  reactStrictMode: true,
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    domains: [],
  },
};

module.exports = nextConfig;
