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
      {
        protocol: 'https',
        hostname: 'media.formula1.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'www.formula1.com',
        port: '',
        pathname: '**',
      },
    ],
  },
};

module.exports = nextConfig;
