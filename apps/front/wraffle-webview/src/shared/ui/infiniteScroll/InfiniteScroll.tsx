'use client';

import type {DetailedHTMLProps, HTMLAttributes} from 'react';
import {useState} from 'react';
import {useIntersectionObserver} from '@/shared/hook';

export type InfiniteScrollEndHandler = () => void;

export interface InfiniteScrollProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  /**
   * 비활성화 여부
   */
  disabled?: boolean;

  /**
   * 마진
   */
  rootMargin?: string;

  /**
   * 스크롤 끝 이벤트 메서드
   */
  onEnd?: InfiniteScrollEndHandler;
}

export const InfiniteScroll = ({
  disabled,
  rootMargin,
  onEnd,
  children,
  ...props
}: InfiniteScrollProps) => {
  const [domState, setDomState] = useState<HTMLDivElement | null>(null);

  useIntersectionObserver(
    domState,
    entry => {
      // DOM이 보일 경우
      if (entry.isIntersecting) {
        onEnd?.();
      }
    },
    {rootMargin},
  );

  return (
    <div {...props}>
      {children}

      {children && !disabled ? (
        <div ref={setDomState} style={{width: '100%'}} />
      ) : null}
    </div>
  );
};
