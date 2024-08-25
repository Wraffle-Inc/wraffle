import clsx from 'clsx';

interface IconWithLabelProps {
  Icon: React.ReactNode;
  label: string;
  strokeColor?: string;
  url?: string;
  onClick?: () => void;
}

function IconWithLabel({
  Icon,
  label,
  strokeColor,
  url,
  onClick,
}: IconWithLabelProps) {
  return (
    <a
      href={url}
      className={clsx(
        'flex flex-col items-center gap-1 hover:cursor-pointer hover:text-foreground',
        strokeColor
      )}
      onClick={onClick}
    >
      {Icon}
      <span className="text-xs">{label}</span>
    </a>
  );
}

export default IconWithLabel;
