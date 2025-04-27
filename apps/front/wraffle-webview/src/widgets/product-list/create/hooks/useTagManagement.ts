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
  loadMoreTags: () => void;
  hasMore: boolean;
  isFetchingNextPage: boolean;
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
  const {
    isPending: isQueryPending,
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useTagQuery(
    {
      itemsPerPage: 10,
      prefix: debouncedInputValue.toLocaleLowerCase(),
    },
    {
      enabled: !!debouncedInputValue,
    },
  );

  const serverTags = data?.pages.flatMap(page => page.items) ?? [];

  useEffect(() => {
    if (!serverTags.length) return;

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

  useEffect(() => {
    setAutocompleteTags([]);
  }, [debouncedInputValue]);

  const loadMoreTags = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handleAddTag = async (tag: string, id: number) => {
    if (selectedTagNames.length >= 5 || selectedTagNames.includes(tag)) {
      setInputValue('');
      return;
    }

    if (isNew && id === 0) {
      const newTag = await createTag(tag);
      onTagChange([...tagIds, newTag.id]);
    } else if (!isNew && id === 0) {
      const foundid = serverTags?.find(item => item.name === tag)?.id ?? 0;
      onTagChange([...tagIds, foundid]);
    } else {
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
    loadMoreTags,
    hasMore: hasNextPage,
    isFetchingNextPage,
  };
};
