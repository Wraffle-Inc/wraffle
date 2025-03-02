import fetchSettlementList from './fetch';
import SettlementList from './type';
import {UseQueryOptions, useQuery} from '@tanstack/react-query';

type QueryOptions = UseQueryOptions<SettlementList, Error>;

const settlementListQuery = (options?: QueryOptions) => {
  return useQuery<SettlementList>({
    queryKey: ['settlements'],
    queryFn: fetchSettlementList,
    ...options,
  });
};

export default settlementListQuery;
