import type {Config} from 'tailwindcss';
import sharedConfig from '@wraffle/tailwind-config';

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  presets: [sharedConfig],
};

export default config;
