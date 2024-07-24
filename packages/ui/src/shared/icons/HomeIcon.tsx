interface HomeIconProps {
  className?: string;
  storkeColor?: string;
}

const HomeIcon = ({ className, storkeColor }: HomeIconProps) => {
  return (
    <svg
      className={className}
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 8L9 1L17 8L17 18H12V14C12 13.2044 11.6839 12.4413 11.1213 11.8787C10.5587 11.3161 9.79565 11 9 11C8.20436 11 7.44129 11.3161 6.87868 11.8787C6.31607 12.4413 6 13.2043 6 14V18H1L1 8Z"
        stroke={storkeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default HomeIcon;
