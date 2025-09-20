/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dummyjson.com',
        port: '', // Leave empty if no specific port is used
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.zilliondesigns.com',
        port: '', // Leave empty if no specific port is used
        pathname: '/**',
      },
    ],
  },
};
export default nextConfig;
