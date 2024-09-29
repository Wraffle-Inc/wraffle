interface TagProps {
  children: string;
  noHash?: boolean;
  handleRemoveTag: (tag: string) => void;
}

/**
 * remove 모양 개선 필요. 디자인 시스템 의논 후 디자인 픽스
 */
const Tag = ({children, noHash = false, handleRemoveTag}: TagProps) => {
  return (
    <div
      className={
        'relative inline-flex w-fit items-center justify-center gap-2.5 whitespace-nowrap rounded-md bg-[#F4F4F5] px-1.5 py-1 text-[12px] font-medium text-[#3F3F46] transition-colors'
      }
    >
      <div
        onClick={() => handleRemoveTag(children)}
        className='absolute right-0 cursor-pointer'
      >
        x
      </div>
      {!noHash && '#'} {children}
    </div>
  );
};

export {Tag};
