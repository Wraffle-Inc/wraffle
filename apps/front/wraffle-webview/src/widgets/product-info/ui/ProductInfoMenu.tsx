type ProductInfoMenuProps = {
  menus: string[];
  selectedMenu: string;
  onSelectMenu: (menu: string) => void;
};

export const ProductInfoMenu: React.FC<ProductInfoMenuProps> = ({
  menus,
  selectedMenu,
  onSelectMenu,
}) => {
  return (
    <nav
      className='mb-[21px] mt-[21px] flex h-[34px] w-full items-center gap-5 overflow-x-auto whitespace-nowrap px-5'
      style={{scrollbarWidth: 'none'}}
    >
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
            <div className='z-1 absolute bottom-0 left-0 h-0.5 w-full bg-red-600' />
          )}
        </div>
      ))}
    </nav>
  );
};
