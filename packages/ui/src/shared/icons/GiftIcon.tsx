interface GiftIconProps {
  className?: string;
  storkeColor?: string;
}

const GiftIcon = ({ className, storkeColor }: GiftIconProps) => {
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
        d="M16 8.0802V18.0802H2V8.0802M16 8.0802H2M16 8.0802H17V5.0802H1V8.0802H2M9 5.0802C9.83333 3.24687 11.9999 -0.4198 13.9999 1.5802C15.9999 3.5802 11.5 4.91353 9 5.0802ZM9 5.0802C8.16667 3.24687 5.99999 -0.4198 3.99999 1.5802C1.99999 3.5802 6.5 4.91353 9 5.0802Z"
        stroke={storkeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default GiftIcon;
