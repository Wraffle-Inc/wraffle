import clsx from "clsx";
import { SVGAttributes } from "react";

export type SvgIconId =
	| "arrow-bottom"
	| "arrow-right"
	| "arrow-left"
	| "menu"
	| "search"
	| "home"
	| "gift"
	| "user-circle"
	| "cart"
	| "shopping-box"
	| "setting"
	| "plus"
	| "bell"
	| "bookmark"
	| "bookmark-fill"
	| "heart"
	| "heart-fill"
	| "user"
	| "credit-card"
	| "upload"
	| "calendar"
	| "write";

type SvgIconProps = {
	id: SvgIconId;
	width?: number | string;
	height?: number | string;
	withBadge?: boolean;
	showBadge?: boolean;
	badgeCount?: number;
} & SVGAttributes<SVGSVGElement>;

export const SVGIcon = ({
	id,
	width = 20,
	height = 20,
	withBadge,
	showBadge = false,
	badgeCount = 0,
	...props
}: SvgIconProps) => (
	<div className={clsx(withBadge && "absolute")}>
		<svg fill='none' width={width} height={height} {...props}>
			<use href={`/icon.svg#icon-${id}`} />
		</svg>
		{showBadge && (
			<div
				className={clsx(
					"absolute bg-red-500 rounded-full flex justify-center items-center text-white text-xs",
					badgeCount > 0 ? "-top-2 -right-2 w-4 h-4" : "top-0 right-0 w-2 h-2"
				)}
			>
				{badgeCount > 0 && badgeCount}
			</div>
		)}
	</div>
);
