/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api-immocoin.herokuapp.com", "api-immocoin-staging.herokuapp.com", "localhost"]
  }
}

module.exports = nextConfig
