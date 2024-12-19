import {ChipButton} from '@wraffle/ui';

interface ChipButtonsProps extends React.HTMLAttributes<HTMLDivElement> {
  chipList: string[];
  category: string;
  setCategory: (category: string) => void;
}

export const ChipButtons = ({
  chipList,
  category,
  setCategory,
  ...props
}: ChipButtonsProps) => (
  <div {...props}>
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
