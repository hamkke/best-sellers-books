/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/transform/:path*',
        destination:
          'https://storage.googleapis.com/du-prd/books/images/:path*',
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/du-prd/books/images/**',
      },
    ],
  },
};

export default nextConfig;
