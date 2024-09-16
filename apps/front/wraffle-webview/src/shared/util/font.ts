import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../../../../../packages/ui/src/shared/assets/fonts/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: '../../../../../../packages/ui/src/shared/assets/fonts/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: '../../../../../../packages/ui/src/shared/assets/fonts/Pretendard-Bold.woff',
      weight: '700',
    },
  ],
  variable: '--font-pretendard',
});
