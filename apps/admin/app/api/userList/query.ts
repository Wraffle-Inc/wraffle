import fetchUserList from './fetch';
import UserList from './type';
import {UseQueryOptions, useQuery} from '@tanstack/react-query';

type QueryOptions = UseQueryOptions<UserList, Error>;

const userListQuery = (options?: QueryOptions) => {
  return useQuery<UserList>({
    queryKey: ['users'],
    queryFn: fetchUserList,
    ...options,
  });
};

export default userListQuery;
