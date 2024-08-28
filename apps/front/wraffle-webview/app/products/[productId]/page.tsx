import {Tag} from '../../../../../../packages/ui/src/ui/tag/Tag';

export default function Product() {
  return (
    <main>
      <div className='h-[375px] rounded-lg bg-slate-500' />
      <div className='p-4'>
        <div className='flex flex-row'>
          <Tag>Vans</Tag>
          <Tag>래플</Tag>
        </div>
        <h1 className='text-xl font-bold'>[Vans] 올드스쿨</h1>
        <h1 className='mb-4 text-xl font-bold'>78,000</h1>
        <div className='h-[4px] w-full bg-slate-200' />
        <h1 className='mb-4 mt-4 text-xl font-bold'>응모 기간</h1>
        <div className='mb-4'>6월 1일 23:59:59 ~ 6월 7일 00:00:00</div>
        <div className='h-[4px] w-full bg-slate-200' />
        <h1 className='mb-4 mt-4 text-xl font-bold'>당첨자 발표</h1>
        <div className='mb-4'>6월 11일 오후 5시 00분</div>
        <div className='h-[4px] w-full bg-slate-200' />
        <h1 className='mb-4 mt-4 text-xl font-bold'>유의사항</h1>
        <div className='mb-4'>-제작 박스로 준비해드립니다</div>
        <div>오후 3시 이전 결제 완료 시 택배 출고 드립니다</div>
        <div>당일 상품 출고 마감 시간 3시입니다</div>
      </div>
    </main>
  );
}
