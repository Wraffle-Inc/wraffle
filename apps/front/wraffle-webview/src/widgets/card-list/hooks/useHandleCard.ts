import {usePATCHDefaultCardQuery} from './../../../features/card/api/changeDefaultCard';
import {useCallback} from 'react';

export const useHandleCard = () => {
  const {changeDefaultCard} = usePATCHDefaultCardQuery();

  const onChangeDefaultCard = useCallback(
    (id: number) => {
      changeDefaultCard(id);
    },
    [changeDefaultCard],
  );

  return {onChangeDefaultCard};
};
