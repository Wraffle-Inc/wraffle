'use client';

import {useRouter} from 'next/navigation';
import {Icon} from '@wraffle/ui';

interface NotificationProps {
  path: string;
}

export const NotificationIcon = ({path}: NotificationProps) => {
  const router = useRouter();

  return <Icon name='bell' onClick={() => router.push(path)} />;
};
