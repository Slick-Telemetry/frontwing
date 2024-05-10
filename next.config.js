/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // cache optimized images for 60 seconds
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
