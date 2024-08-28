// tailwind config is required for editor support
import type {Config} from 'tailwindcss';
import sharedConfig from '@wraffle/tailwind-config';

const config: Pick<Config, 'content' | 'presets'> = {
  content: ['**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  presets: [sharedConfig],
};

export default config;
