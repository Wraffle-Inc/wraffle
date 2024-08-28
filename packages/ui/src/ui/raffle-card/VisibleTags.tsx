"use client";

import { Tag } from "../tag/Tag";
import { type TagType, useHiddenTags } from "./use-hiddenTag";

interface VisibleTagsProps {
  hashtags: TagType[];
  letterSpace: number;
}

const VisibleTags = ({ hashtags, letterSpace = 14 }: VisibleTagsProps) => {
  const { visibleTags, hiddenTags, tagWrapperRef } = useHiddenTags(
    hashtags,
    letterSpace
  );
  return (
    <span
      ref={tagWrapperRef}
      className="flex items-center gap-1.5 w-full my-1.5"
    >
      {visibleTags.map((hashtag) => (
        <Tag key={hashtag.id}>{hashtag.name}</Tag>
      ))}
      {hiddenTags.length > 0 && <Tag noHash>...</Tag>}
    </span>
  );
};

export { VisibleTags };
