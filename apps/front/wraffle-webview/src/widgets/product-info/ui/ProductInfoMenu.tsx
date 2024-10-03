'use client';

type MenuOption = '상품' | '응모 기간' | '당첨자 발표' | '유의사항';

interface ProductInfoMenuProps {
  selectedMenu: MenuOption;
  onSelectMenu: (menu: MenuOption) => void;
}

const menus: MenuOption[] = ['상품', '응모 기간', '당첨자 발표', '유의사항'];

export const ProductInfoMenu: React.FC<ProductInfoMenuProps> = ({
  selectedMenu,
  onSelectMenu,
}) => {
  return (
    <nav className='mb-[21px] mt-[21px] flex h-[34px] w-full items-center gap-5 px-5'>
      {menus.map(menu => (
        <div
          key={menu}
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
};
