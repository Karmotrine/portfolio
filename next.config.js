/** @type {import('next').NextConfig} */
const nextConfig = 

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io", 'sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
}
