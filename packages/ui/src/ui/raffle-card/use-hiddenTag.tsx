"use client";

import { useEffect, useRef, useState } from "react";

export interface Tag {
	id: number;
	name: string;
}
// 태그와 글자폭을 입력받으면 너비에 맞게 보여질 태그와 보여지지 않을 태그, 태그 컨테이너 ref를 반환합니다.
export const useHiddenTags = (tags: Tag[], letterSpace: number) => {
	const [visibleTags, setVisibleTags] = useState<Tag[]>(tags);
	const [hiddenTags, setHiddenTags] = useState<Tag[]>([]);

	const tagWrapperRef = useRef<HTMLElement>(null);
	const checkAndManageTags = () => {
		if (tagWrapperRef.current) {
			const containerWidth = tagWrapperRef.current.offsetWidth;

			let totalWidth = 0;
			const newVisibleTags: Tag[] = [];
			const newHiddenTags: Tag[] = [];

			tags.forEach((tag) => {
				const tagWidth = tag.name.length * letterSpace;
				if (totalWidth + tagWidth <= containerWidth) {
					newVisibleTags.push(tag);
					totalWidth += tagWidth;
				} else {
					newHiddenTags.push(tag);
				}
			});

			setVisibleTags(newVisibleTags);
			setHiddenTags(newHiddenTags);
		}
	};

	useEffect(() => {
		checkAndManageTags();
	}, [tagWrapperRef.current]);

	return { visibleTags, hiddenTags, tagWrapperRef };
};
