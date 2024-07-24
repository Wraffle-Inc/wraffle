interface MenuIconProps {
  className?: string;
  storkeColor?: string;
}

const MenuIcon = ({ className, storkeColor }: MenuIconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="12"
      viewBox="0 0 18 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 11H17M1 6H17M1 1H17"
        stroke={storkeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default MenuIcon;
