const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
const isGitHubPages =
  process.env.DEPLOY_TARGET === 'github' ||
  process.env.GITHUB_ACTIONS === 'true'
const repoBasePath = process.env.NEXT_PUBLIC_REPO_BASE_PATH || '/The_Vlog'
const basePath = isProd && isGitHubPages ? repoBasePath : ''
const assetPrefix = basePath || undefined
const output = isProd && isGitHubPages ? 'export' : undefined

const allowedDevOrigins = process.env.NEXT_PUBLIC_ALLOWED_DEV_ORIGINS
  ? process.env.NEXT_PUBLIC_ALLOWED_DEV_ORIGINS.split(',').map(s => s.trim()).filter(Boolean)
  : []

const strapiRemotePattern = process.env.NEXT_PUBLIC_STRAPI_HOSTNAME
  ? [{ protocol: 'https', hostname: process.env.NEXT_PUBLIC_STRAPI_HOSTNAME }]
  : []

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  allowedDevOrigins,
  output,
  basePath,
  assetPrefix,
  env: {
    NEXT_PUBLIC_DEPLOY_TARGET: process.env.DEPLOY_TARGET || '',
    NEXT_PUBLIC_BASE_PATH: basePath,
    NEXT_PUBLIC_CMS_BRIDGE_URL: process.env.NEXT_PUBLIC_CMS_BRIDGE_URL || '',
  },
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
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      ...strapiRemotePattern,
    ],
  },
}

module.exports = nextConfig
