import fetchUserList from './fetch';
import {QueryOptions, useQuery} from '@tanstack/react-query';

const userListQuery = (options?: QueryOptions) => {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUserList,
    ...options,
  });
};

export default userListQuery;
