/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // cache optimized images for 60 seconds
    minimumCacheTTL: 60,
  },
};

module.exports = nextConfig;
