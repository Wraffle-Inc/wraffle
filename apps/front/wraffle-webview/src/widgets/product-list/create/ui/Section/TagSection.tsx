import {
  useCreateTag,
  useTagQuery,
} from '../../../../../features/product/tag/api/useTagQuery';
import {useEffect, useState} from 'react';
import {
  addTagFromServerData,
  addTagFromUserInputIfDuplicate,
  createTagAndAddToList,
} from '@/features/product/tag/config/utils';
import {useDebounce} from '@/shared/hook';
import {InputWithSearchIcon} from '@/shared/ui/input/InputWithSearchIcon';
import {Tags} from '@/shared/ui/tag/Tags';
import {TAG_LIMIT} from '@/shared/util';
import {Label} from '@wraffle/ui';

interface TagList {
  id: number;
  name: string;
}

interface TagSectionProps {
  tagIds: number[];
  onTagChange: (newTags: number[]) => void;
}

export const TagSection = ({tagIds, onTagChange}: TagSectionProps) => {
  const [inputValue, setInputValue] = useState(''); // 입력하는 값
  const debouncedInputValue = useDebounce(inputValue);

  const [autocompleteTags, setAutocompleteTags] = useState<TagList[]>([]); // 서버에서 받아오는 태그 리스트

  const [isNew, setIsNew] = useState<boolean>(true); // 새로 생성할지 말지

  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]); // 화면에 보여지는 태그 리스트

  const {mutateAsync: createTag} = useCreateTag();
  const {isPending: isQueryPending, data} = useTagQuery({
    itemsPerPage: 100, //
    uuid: '',
    prefix: debouncedInputValue.toLocaleLowerCase(),
  });
  const serverTags = data?.items;

  useEffect(() => {
    if (!serverTags) return;

    setIsNew(true);

    const isExistingTag = serverTags.some(tag => tag.name === inputValue);

    if (isExistingTag) {
      const suggestions = serverTags.filter(tag => tag.name !== inputValue);
      setAutocompleteTags(suggestions);
      setIsNew(false);
    } else {
      setAutocompleteTags(serverTags);
    }
  }, [data, inputValue, serverTags]);

  const handleAddTag = async (tag: string, id: number) => {
    if (selectedTagNames.length >= 5 || selectedTagNames.includes(tag)) {
      setInputValue('');
      return;
    }

    if (isNew && id === 0) {
      createTagAndAddToList({tag, createTag, tagIds, onTagChange});
    } else if (!isNew && id === 0) {
      addTagFromUserInputIfDuplicate({tag, serverTags, tagIds, onTagChange});
    } else {
      addTagFromServerData({id, tagIds, onTagChange});
    }

    setSelectedTagNames(prev => [...prev, tag]);
    setInputValue('');
  };

  return (
    <div className='relative'>
      <Label className='text-xl font-bold'>태그</Label>

      <InputWithSearchIcon
        placeholder='태그명을 입력해주세요. (최대 5개)'
        onClick={() => {}}
        maxLength={TAG_LIMIT}
        disabled={selectedTagNames.length === 5}
        value={inputValue}
        onChange={e => setInputValue(e.target.value.trim())}
      />

      {inputValue && (
        <div className='absolute z-10 mt-2 flex max-h-40 w-full flex-col gap-1 overflow-y-auto rounded-md border border-solid bg-[#FAFAFB] px-3 py-2 text-sm'>
          <p
            className='text-[#ADB5BD]'
            onClick={() => handleAddTag(inputValue, 0)}
          >
            # {inputValue}
          </p>
          {isQueryPending ? (
            <div className='px-2 pb-3 pt-2 text-sm text-gray-500'>
              검색 중...
            </div>
          ) : (
            autocompleteTags.length > 0 && (
              <>
                {autocompleteTags.map(({id, name}) => (
                  <div key={id} onClick={() => handleAddTag(name, id)}>
                    <span className='text-[#ADB5BD]'>
                      # {name.slice(0, inputValue.length)}
                    </span>

                    <span className='text-black'>
                      {name.slice(inputValue.length)}
                    </span>
                  </div>
                ))}
              </>
            )
          )}
        </div>
      )}

      <Tags
        tags={selectedTagNames}
        setTags={setSelectedTagNames}
        className='mt-2 h-20 flex-wrap'
      />
    </div>
  );
};
