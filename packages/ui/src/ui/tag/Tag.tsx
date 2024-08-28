interface TagProps {
  children: string;
  noHash?: boolean;
}

const Tag = ({children, noHash = false}: TagProps) => {
  return (
    <div
      className={
        'inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-md bg-[#F4F4F5] px-1.5 py-1 text-sm font-medium text-[#3F3F46] transition-colors'
      }
    >
      {!noHash && '#'} {children}
    </div>
  );
};

export {Tag};
