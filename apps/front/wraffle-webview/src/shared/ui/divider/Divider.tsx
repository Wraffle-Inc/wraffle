interface DividerProps {
  height?: number;
}

export const Divider = ({height = 1}: DividerProps) => {
  return <div className={`h-${height} w-full bg-[#F9FAFB]`} />;
};
