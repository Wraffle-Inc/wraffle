interface IconWithLabelProps {
  Icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

function IconWithLabel({Icon, label, onClick}: IconWithLabelProps) {
  return (
    <a
      className='flex flex-col items-center gap-1 hover:cursor-pointer hover:text-foreground'
      onClick={onClick}
    >
      {Icon}
      <span className='text-xs'>{label}</span>
    </a>
  );
}

export default IconWithLabel;
