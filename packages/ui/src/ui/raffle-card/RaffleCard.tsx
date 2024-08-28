import { SVGIcon } from "@wds/ui/icon/SVGIcon";
import { Typography } from "../typography/Typography";
import { VisibleTags } from "./VisibleTags";
import { Tag as TagType } from "./use-hiddenTag";

export interface RaffleCardProps {
  name: string;
  price: string;
  hashtags: TagType[];
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
  const isClosed = (endDate && new Date(endDate) < new Date()) || false;

  return (
    <div className="w-[160px] h-[267px]">
      <div className="relative flex justify-center items-center w-full h-[160px] mb-2 rounded-sm backdrop-brightness-90">
        <img
          src={thumbnailUrl}
          alt={name}
          className="w-full h-full rounded-sm"
        />
        {isClosed && (
          <div className="absolute w-full h-full flex justify-center items-center bg-black bg-opacity-40 z-10 rounded-sm">
            <Typography className="text-white" fontWeight="bold">
              마감되었어요 🫠
            </Typography>
          </div>
        )}
      </div>
      <Typography className="truncate" fontSize="p2" fontWeight="semibold">
        {name}
      </Typography>
      <Typography
        className="text-gray-600 mb-2"
        fontSize="sm2"
        fontWeight="semibold"
      >
        {price}원
      </Typography>
      <VisibleTags hashtags={hashtags} letterSpace={20} />
      <span className="flex justify-start items-center gap-0.5">
        {isBookmarked && <SVGIcon id="bookmark-fill" />}
        {!isBookmarked && <SVGIcon id="bookmark" />}
        <Typography className="text-[11px]" fontWeight="semibold">
          {scrapCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </Typography>
      </span>
    </div>
  );
};

export { RaffleCard };
