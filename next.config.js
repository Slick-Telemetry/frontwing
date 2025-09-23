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
  async rewrites() {
    return [
      {
        source: '/relay-QqWm/static/:path*',
        destination: 'https://us-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/relay-QqWm/:path*',
        destination: 'https://us.i.posthog.com/:path*',
      },
    ];
  },
  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
