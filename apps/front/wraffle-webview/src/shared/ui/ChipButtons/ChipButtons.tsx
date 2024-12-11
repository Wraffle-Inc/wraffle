import {ChipButton} from '@wraffle/ui';

interface ChipButtons {
  chipList: string[];
  category: string;
  setCategory: (category: string) => void;
  className?: string;
}

export const ChipButtons = ({
  chipList,
  category,
  setCategory,
  className,
}: ChipButtons) => (
  <div className={className}>
    {chipList.map(chip => (
      <ChipButton
        key={chip}
        selected={category === chip}
        onClick={() => setCategory(chip)}
      >
        {chip}
      </ChipButton>
    ))}
  </div>
);
