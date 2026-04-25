const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const isGitHubPages =
  process.env.DEPLOY_TARGET === 'github' ||
  process.env.GITHUB_ACTIONS === 'true'
const repoBasePath = '/The_Vlog'
const basePath = isProd && isGitHubPages ? repoBasePath : ''
const assetPrefix = basePath || undefined
const output = isProd && isGitHubPages ? 'export' : undefined

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output,
  basePath,
  assetPrefix,
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
}

module.exports = nextConfig
