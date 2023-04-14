import { ReactNode } from 'react';

interface PrimaryButtonProps {
  text: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
  disabled?: boolean;
  postIcon?: ReactNode;
  preIcon?: ReactNode;
  onClick?: () => void;
}

function PrimaryButton(props: PrimaryButtonProps) {
  const { postIcon, preIcon, text, className, align, disabled, onClick } = props;
  let classes = 'py-2 px-4 bg-primary w-full text-white rounded font-medium select-none';
  classes += align ? ` text-${align}` : ' text-left';

  if (disabled) {
    classes += ' opacity-50 cursor-not-allowed';
  } else {
    classes += ' hover:shadow-light transition';
  }

  classes += className ? ` ${className}` : '';

  return (
    <button className={classes} onClick={onClick}>
      {preIcon && <span className='mr-3'>{preIcon}</span>}
      <span>{text}</span>
      {postIcon && <span className='ml-3'>{postIcon}</span>}
    </button>
  );
}

export default PrimaryButton;
