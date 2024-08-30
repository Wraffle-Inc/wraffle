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
  images: {
    domains: ['github.com'],
  },
};

export default nextConfig;
