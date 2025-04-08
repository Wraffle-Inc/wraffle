import dayjs from 'dayjs';
import {useGetSettlements} from '@/features/my-profile/api/settlement';
import {Typography} from '@wraffle/ui';

export const SettlementList = () => {
  const {data: settlementsResponse} = useGetSettlements();
  const settlementList = settlementsResponse.items;

  return (
    <>
      {settlementList.length === 0 ? (
        <div className='flex h-14 items-center justify-center'>
          <Typography size='p3' color='zinc400'>
            정산 내역이 없습니다
          </Typography>
        </div>
      ) : (
        settlementList.map(settlement => (
          <li
            key={`settlementList_${settlement.id}`}
            className='flex h-14 items-center justify-between border-b-2 border-b-zinc-100'
          >
            <div className='flex h-full w-20 items-center'>
              <Typography size='p3' className='font-normal'>
                {dayjs(settlement.createdAt).format('YYYY.MM.DD')}
              </Typography>
            </div>
            <div className='flex h-full flex-1 items-center justify-center'>
              <Typography size='p3' className='font-normal'>
                {settlement.status === 'requested' ? '정산 요청' : '정산 완료'}
              </Typography>
            </div>
            <div className='flex h-full flex-1 items-center justify-center text-center'>
              <Typography size='p3' className='font-normal'>
                {settlement.settlementPrice.toLocaleString()}원
              </Typography>
            </div>
            <div className='flex h-full flex-1 items-center justify-end text-right'>
              <Typography size='p3' className='font-normal'>
                {settlement.settlementAccumulatePrice.toLocaleString()}원
              </Typography>
            </div>
          </li>
        ))
      )}
    </>
  );
};
