import {useEffect} from 'react';

export type UseIntersectionObserverCallback = (
  entry: IntersectionObserverEntry,
) => void;

/**
 * IntersectionObserver 적용 훅 메서드
 *
 * @param {Element | string | null} ref: Element
 * @param {UseIntersectionObserverCallback} callback: 콜백 메서드
 * @param {IntersectionObserverInit} options: 옵션
 */
const useIntersectionObserver = (
  ref: Element | string | null,
  callback: UseIntersectionObserverCallback,
  options?: IntersectionObserverInit,
) => {
  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(callback);
    }, options);

    // DOM이 유효할 경우
    if (ref) {
      // ref가 문자열일 경우
      if (typeof ref === 'string') {
        const tag = document.querySelector(ref);

        // 태그가 유효할 경우
        if (tag) {
          io.observe(tag);
        }
      }

      // DOM일 경우
      else {
        io.observe(ref);
      }
    }

    return () => {
      io.disconnect();
    };
  }, [ref, callback, options]);
};

export {useIntersectionObserver};
