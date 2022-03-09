/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api-immocoin.herokuapp.com"]
    //domains: ["localhost:3000"]
  }
}

module.exports = nextConfig
