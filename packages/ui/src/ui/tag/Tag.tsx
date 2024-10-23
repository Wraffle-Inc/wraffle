interface TagProps {
  children: string;
  noHash?: boolean;
  handleRemoveTag?: (tag: string) => void;
}

const Tag = ({children, noHash = false, handleRemoveTag}: TagProps) => {
  return (
    <div
      className={
        'relative inline-flex h-fit w-fit items-center justify-center gap-1 whitespace-nowrap rounded-md bg-[#F4F4F5] px-1.5 py-1 text-[12px] font-medium text-[#3F3F46] transition-colors'
      }
    >
      {!noHash && '#'} {children}
      {handleRemoveTag && (
        <button onClick={() => handleRemoveTag(children)}>
          <svg
            width='14'
            height='14'
            viewBox='0 0 14 14'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M0.918945 4.73999C0.918945 2.53085 2.70981 0.73999 4.91895 0.73999H9.90907C12.1182 0.73999 13.9091 2.53085 13.9091 4.73999V9.73999C13.9091 11.9491 12.1182 13.74 9.90907 13.74H4.91895C2.70981 13.74 0.918945 11.9491 0.918945 9.73999V4.73999Z'
              fill='#DEDEDE'
            />
            <path
              d='M4.97852 9.67712L9.84981 4.80212'
              stroke='white'
              strokeWidth='1.2'
            />
            <path
              d='M9.84961 9.67749L4.97831 4.80249'
              stroke='white'
              strokeWidth='1.2'
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export {Tag};
