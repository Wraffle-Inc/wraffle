import { BookmarkIcon, BookmarkFilledIcon } from "@radix-ui/react-icons";
import { Tag, useHiddenTags } from "./use-hiddenTag";

export interface RaffleCardProps {
  name: string;
  price: string;
  hashtags: Tag[];
  scrapCount: number;
  thumbnailUrl: string;
  endDate?: string;
  isBookmarked: boolean;
}

const RaffleCard = ({
  name,
  price,
  hashtags,
  scrapCount,
  thumbnailUrl,
  endDate,
  isBookmarked,
}: RaffleCardProps) => {
  const { visibleTags, hiddenTags, tagWrapperRef } = useHiddenTags(
    hashtags,
    14
  );
  const isClosed = (endDate && new Date(endDate) < new Date()) || false;
  return (
    <div className="w-[160px] h-[267px">
      <div className="relative flex justify-center items-center w-full h-[160px] mb-2 rounded-sm backdrop-brightness-90">
        <img
          src={thumbnailUrl}
          alt={name}
          className="w-full h-full rounded-sm"
        />
        {isClosed && (
          <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-40 z-10 rounded-sm">
            <p className="text-white font-bold">마감되었어요 🫠</p>
          </div>
        )}
      </div>
      <h1 className="font-semibold text-sm truncate">{name}</h1>
      <p className="font-semibold text-xs text-gray-600 mb-2">{price}원</p>
      <span
        ref={tagWrapperRef}
        className="flex items-center gap-1.5 w-full my-1.5"
      >
        {visibleTags.map((hashtag) => (
          <p key={hashtag.id}>{hashtag.name}</p>
        ))}
        {hiddenTags.length > 0 && <p>...</p>}
      </span>
      <span className="flex justify-start items-center gap-0.5">
        {isBookmarked && <BookmarkFilledIcon width={15} height={15} />}
        {!isBookmarked && <BookmarkIcon width={15} height={15} />}
        <p className="font-semibold text-[11px]">
          {scrapCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </p>
      </span>
    </div>
  );
};

export { RaffleCard };
