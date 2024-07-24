interface UserIconProps {
  className?: string;
  storkeColor?: string;
}

const UserIcon = ({ className, storkeColor }: UserIconProps) => {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16 16.7083C16 15.0886 14.8283 13 13 13H7C5.17172 13 4 15.0886 4 16.7083M1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10ZM13 7C13 8.65685 11.6569 10 10 10C8.34315 10 7 8.65685 7 7C7 5.34315 8.34315 4 10 4C11.6569 4 13 5.34315 13 7Z"
        stroke={storkeColor}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default UserIcon;
