import {useTagManagement} from '../../hooks/useTagManagement';
import {useState} from 'react';
import {InfiniteScroll} from '@/shared/ui/infiniteScroll/InfiniteScroll';
import {InputWithSearchIcon} from '@/shared/ui/input/InputWithSearchIcon';
import {Tags} from '@/shared/ui/tag/Tags';
import {TAG_LIMIT} from '@/shared/util';
import {Label} from '@wraffle/ui';

interface TagSectionProps {
  tagIds: number[];
  onTagChange: (newTags: number[]) => void;
}

interface TagList {
  id: number;
  name: string;
}

interface TagListProps {
  inputValue: string;
  autocompleteTags: TagList[];
  isQueryPending: boolean;
  isFetchingNextPage: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
  onAddTag: (tag: string, id: number) => Promise<void>;
  isOpen: boolean;
}

const TagList = ({
  inputValue,
  autocompleteTags,
  isQueryPending,
  isFetchingNextPage,
  hasMore,
  onLoadMore,
  onAddTag,
  isOpen,
}: TagListProps) => {
  if (!isOpen) return null;

  return (
    <div className='absolute z-10 mt-2 flex max-h-40 w-full flex-col gap-1 overflow-y-auto rounded-md border border-solid bg-[#FAFAFB] px-3 py-2 text-sm'>
      <p className='text-[#ADB5BD]' onClick={() => onAddTag(inputValue, 0)}>
        # {inputValue}
      </p>
      {isQueryPending ? (
        <div className='px-2 pb-3 pt-2 text-sm text-gray-500'>검색 중...</div>
      ) : (
        autocompleteTags.length > 0 && (
          <InfiniteScroll
            onEnd={onLoadMore}
            disabled={!hasMore}
            rootMargin='0px 0px 100px 0px'
          >
            {autocompleteTags.map(({id, name}) => (
              <div key={id} onClick={() => onAddTag(name, id)}>
                <span className='text-[#ADB5BD]'>
                  # {name.slice(0, inputValue.length)}
                </span>
                <span className='text-black'>
                  {name.slice(inputValue.length)}
                </span>
              </div>
            ))}
            {isFetchingNextPage && (
              <div className='px-2 pb-3 pt-2 text-sm text-gray-500'>
                더 불러오는 중...
              </div>
            )}
          </InfiniteScroll>
        )
      )}
    </div>
  );
};

export const TagSection = ({tagIds, onTagChange}: TagSectionProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    inputValue,
    setInputValue,
    selectedTagNames,
    setSelectedTagNames,
    autocompleteTags,
    isQueryPending,
    handleAddTag,
    loadMoreTags,
    hasMore,
    isFetchingNextPage,
  } = useTagManagement({tagIds, onTagChange});

  const handleAddTagWithClose = async (tag: string, id: number) => {
    await handleAddTag(tag, id);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <Label className='text-xl font-bold'>태그</Label>

      <InputWithSearchIcon
        placeholder='태그명을 입력해주세요. (최대 5개)'
        onClick={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
        maxLength={TAG_LIMIT}
        disabled={selectedTagNames.length === 5}
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value.trim());
          setIsOpen(true);
        }}
      />

      <TagList
        inputValue={inputValue}
        autocompleteTags={autocompleteTags}
        isQueryPending={isQueryPending}
        isFetchingNextPage={isFetchingNextPage}
        hasMore={hasMore}
        onLoadMore={loadMoreTags}
        onAddTag={handleAddTagWithClose}
        isOpen={isOpen}
      />

      <Tags
        tags={selectedTagNames}
        setTags={setSelectedTagNames}
        className='mt-2 h-20 flex-wrap'
      />
    </div>
  );
};
