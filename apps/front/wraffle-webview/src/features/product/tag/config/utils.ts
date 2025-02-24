import type {
  AddTagFromServerData,
  AddTagFromUserInputIfDuplicate,
  CreateTagAndAddToList,
} from './type';

/**
 * 새 태그 서버에서 받아서 추가
 */
export const createTagAndAddToList = async ({
  tag,
  createTag,
  tagIds,
  onTagChange,
}: CreateTagAndAddToList) => {
  try {
    const response = await createTag(tag);
    onTagChange([...tagIds, response.id]);
  } catch (error) {
    console.error('error:', error);
  }
};

/**
 * id를 서버에서 받아온 태그 추가하는 곳
 * but 서버에서 받아온 리스트중 사용자 입력값과 중복된 값은 리스트에서 제거하고 맨 위로 올리기 때문에
 * id를 찾아서 제출태그 리스트에 넣어줌
 */
export const addTagFromUserInputIfDuplicate = ({
  tag,
  serverTags,
  tagIds,
  onTagChange,
}: AddTagFromUserInputIfDuplicate) => {
  const foundid = serverTags?.find(item => item.name === tag)?.id ?? 0;
  onTagChange([...tagIds, foundid]);
};

/**
 * id를 서버에서 받아온 태그 추가하는 곳
 */
export const addTagFromServerData = ({
  id,
  tagIds,
  onTagChange,
}: AddTagFromServerData) => {
  onTagChange([...tagIds, id]);
};
