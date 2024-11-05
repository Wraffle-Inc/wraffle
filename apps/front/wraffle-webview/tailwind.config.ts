// tailwind config is required for editor support
import type {Config} from 'tailwindcss';
import sharedConfig from '@wraffle/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'extends' | 'plugins'> = {
  content: ['**/*.{ts,tsx}', '../../packages/ui/src/**/*.{ts,tsx}'],
  presets: [sharedConfig],
  extends: {
    fontFamily: {
      pretendard: ['var(--font-pretendard)'],
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};

export default config;
