export interface Product {
  id: number;
  title: string;
  applyUid: string;
  applyDate: string;
  targetStatus: string;
  paymentMethod: string;
  estimatePayAmount: number;
}

interface MyEntryBlockProps {
  product: Product;
}

export const MyEntryBlock = ({product}: MyEntryBlockProps) => {
  return (
    <div
      className='flex flex-col gap-3.5 border-b-4 border-[#F2F4F6] px-2 pb-8 pt-6'
      onClick={() => {}}
    >
      <label className='text-base font-semibold'>{product.title}</label>
      <div className='flex gap-3'>
        <div className='h-32 w-32 rounded-md bg-blue-200'></div>
        <div className='grid grid-cols-2 gap-6 text-sm'>
          <div className='flex flex-col gap-2 text-[#6D7684]'>
            <div>응모 번호</div>
            <div>응모 일시</div>
            <div>당첨 발표일</div>
            <div>추첨 상태</div>
            <div>결제 금액</div>
          </div>
          <div className='flex flex-col gap-2 text-[#191F28]'>
            <div>{product.applyUid}</div>
            <div>{product.applyDate}</div>
            <div>{product.applyDate}</div>
            <div>{product.targetStatus}</div>
            <div>{product.estimatePayAmount}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
