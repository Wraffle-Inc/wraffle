import path from 'path';
import {fileURLToPath} from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: config => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@wds/ui': path.resolve(__dirname, '../../../packages/ui/src/ui'),
      '@wds/shared': path.resolve(__dirname, '../../../packages/ui/src/shared'),
      '@wds/widgets': path.resolve(
        __dirname,
        '../../../packages/ui/src/widgets',
      ),
    };

    return config;
  },
  experimental: {
    optimizePackageImports: ['@wraffle/ui'],
  },
  // !TODO: API 연동 후 삭제
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'image.vans.co.kr',
      },
      {
        protocol: 'https',
        hostname: 'wraffle-cdn.justsloth.com',
      },
    ],
    domains: ['github.com', 'unsplash.com'],
  },
};

export default nextConfig;
