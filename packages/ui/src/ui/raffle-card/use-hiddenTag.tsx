"use client";

import { useEffect, useRef, useState } from "react";

export interface TagType {
  id: number;
  name: string;
}
// 태그와 글자폭을 입력받으면 너비에 맞게 보여질 태그와 보여지지 않을 태그, 태그 컨테이너 ref를 반환합니다.
export const useHiddenTags = (tags: TagType[], letterSpace: number) => {
  const [visibleTags, setVisibleTags] = useState<TagType[]>(tags);
  const [hiddenTags, setHiddenTags] = useState<TagType[]>([]);

  const tagWrapperRef = useRef<HTMLElement>(null);
  const checkAndManageTags = () => {
    if (tagWrapperRef.current) {
      const containerWidth = tagWrapperRef.current.offsetWidth;

      let totalWidth = 0;
      const newVisibleTags: TagType[] = [];
      const newHiddenTags: TagType[] = [];

      tags.forEach((tag) => {
        const tagWidth = tag.name.length * letterSpace;
        if (totalWidth + tagWidth <= containerWidth) {
          newVisibleTags.push(tag);
          totalWidth += tagWidth;
        } else {
          newHiddenTags.push(tag);
        }
      });

      setVisibleTags(newVisibleTags);
      setHiddenTags(newHiddenTags);
    }
  };

  useEffect(() => {
    checkAndManageTags();
  }, [tagWrapperRef.current]);

  return { visibleTags, hiddenTags, tagWrapperRef };
};
