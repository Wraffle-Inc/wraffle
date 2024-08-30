'use client';

interface ProductInfoMenuProps {
  selectedMenu: string;
  onSelectMenu: (menu: string) => void;
}

const menus = ['상품', '응모 기간', '당첨자 발표', '유의사항'];

export default function ProductInfoMenu({
  selectedMenu,
  onSelectMenu,
}: ProductInfoMenuProps) {
  return (
    <nav className='mb-[21px] flex h-[34px] w-full items-center gap-5 px-5'>
      {menus.map((menu, index) => (
        <div
          key={index}
          onClick={() => onSelectMenu(menu)}
          className={`relative cursor-pointer px-1 pb-3 text-sm font-semibold ${
            selectedMenu === menu ? 'text-black' : 'text-gray-400'
          }`}
        >
          {menu}
          {selectedMenu === menu && (
            <div
              className='absolute bottom-0 left-0 h-0.5 bg-red-600'
              style={{width: '100%', zIndex: 1}}
            />
          )}
        </div>
      ))}
    </nav>
  );
}
