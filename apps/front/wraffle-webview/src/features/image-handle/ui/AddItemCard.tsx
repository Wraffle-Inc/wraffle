'use client';

import clsx from 'clsx';

export const AddItemCard = ({
  label,
  onClick,
  className,
}: {
  label: string;
  onClick: () => void;
  className: string;
}) => (
  <button
    className={clsx(
      'relative flex aspect-square items-center justify-center rounded-lg border border-solid border-[#F5F5F7] bg-[#FAFAFB] text-sm font-medium text-[#ADB5BD]',
      className,
    )}
    onClick={onClick}
  >
    {label}
  </button>
);
