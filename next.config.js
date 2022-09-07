/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["cdn.sanity.io", 'sanity.io'],
    formats: ['image/avif', 'image/webp'],
  },
}
