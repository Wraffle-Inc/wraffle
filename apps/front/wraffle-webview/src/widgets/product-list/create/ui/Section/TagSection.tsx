import {useTagManagement} from '../../hooks/useTagManagement';
import {InputWithSearchIcon} from '@/shared/ui/input/InputWithSearchIcon';
import {Tags} from '@/shared/ui/tag/Tags';
import {TAG_LIMIT} from '@/shared/util';
import {Label} from '@wraffle/ui';

interface TagSectionProps {
  tagIds: number[];
  onTagChange: (newTags: number[]) => void;
}

export const TagSection = ({tagIds, onTagChange}: TagSectionProps) => {
  const {
    inputValue,
    setInputValue,
    selectedTagNames,
    setSelectedTagNames,
    autocompleteTags,
    isQueryPending,
    handleAddTag,
  } = useTagManagement({tagIds, onTagChange});

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
