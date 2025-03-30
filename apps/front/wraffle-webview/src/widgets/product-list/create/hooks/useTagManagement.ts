import {useState, useEffect} from 'react';
import {
  useCreateTag,
  useTagQuery,
} from '@/features/product/tag/api/useTagQuery';
import {useDebounce} from '@/shared/hook';

interface TagList {
  id: number;
  name: string;
}

interface UseTagManagementProps {
  tagIds: number[];
  onTagChange: (newTags: number[]) => void;
}

interface UseTagManagementReturn {
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedTagNames: string[];
  setSelectedTagNames: (tags: string[]) => void;
  autocompleteTags: TagList[];
  isQueryPending: boolean;
  handleAddTag: (tag: string, id: number) => Promise<void>;
}

export const useTagManagement = ({
  tagIds,
  onTagChange,
}: UseTagManagementProps): UseTagManagementReturn => {
  const [inputValue, setInputValue] = useState('');
  const [selectedTagNames, setSelectedTagNames] = useState<string[]>([]);
  const [autocompleteTags, setAutocompleteTags] = useState<TagList[]>([]);
  const [isNew, setIsNew] = useState(true);

  const debouncedInputValue = useDebounce(inputValue);
  const {mutateAsync: createTag} = useCreateTag();
  const {isPending: isQueryPending, data} = useTagQuery({
    itemsPerPage: 100,
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
      // 새 태그 서버에서 받아서 추가
      const newTag = await createTag(tag);
      onTagChange([...tagIds, newTag.id]);
    } else if (!isNew && id === 0) {
      // id를 서버에서 받아온 태그 추가하는 곳
      // but 서버에서 받아온 리스트중 사용자 입력값과 중복된 값은 리스트에서 제거하고 맨 위로 올리기 때문에
      // id를 찾아서 제출태그 리스트에 넣어줌
      const foundid = serverTags?.find(item => item.name === tag)?.id ?? 0;
      onTagChange([...tagIds, foundid]);
    } else {
      // id를 서버에서 받아온 태그 추가하는 곳
      onTagChange([...tagIds, id]);
    }

    setSelectedTagNames(prev => [...prev, tag]);
    setInputValue('');
  };

  return {
    inputValue,
    setInputValue,
    selectedTagNames,
    setSelectedTagNames,
    autocompleteTags,
    isQueryPending,
    handleAddTag,
  };
};
