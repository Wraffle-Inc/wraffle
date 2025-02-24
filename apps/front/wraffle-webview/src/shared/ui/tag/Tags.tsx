import clsx from 'clsx';
import {Tag} from '@wraffle/ui';

interface TagsProps {
  tags: string[];
  setTags: (tags: string[]) => void;
  className: string;
}

export const Tags = ({tags, setTags, className}: TagsProps) => {
  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  return (
    <div className={clsx('flex gap-1.5', className)}>
      {tags.map(tag => (
        <Tag handleRemoveTag={tag => handleRemoveTag(tag)} key={tag}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};
