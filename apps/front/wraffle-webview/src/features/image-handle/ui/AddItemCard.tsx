'use client';

import clsx from 'clsx';

interface AddItemCardProps {
  label: string;
  onClick: () => void;
  className: string;
}

export const AddItemCard = ({label, onClick, className}: AddItemCardProps) => (
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
