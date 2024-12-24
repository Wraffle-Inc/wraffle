import clsx from 'clsx';
import {Tag} from '@wraffle/ui';

interface TagsProps {
  tags: string[];
  className: string;
}

export const Tags = ({tags, className}: TagsProps) => (
  <div className={clsx('flex gap-1.5', className)}>
    {tags.map(tag => (
      <Tag handleRemoveTag={tag => tag} key={tag}>
        {tag}
      </Tag>
    ))}
  </div>
);
