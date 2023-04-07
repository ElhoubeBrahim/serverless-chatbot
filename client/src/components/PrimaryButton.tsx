import { ReactNode } from 'react';

interface PrimaryButtonProps {
  text: string;
  align?: 'left' | 'center' | 'right';
  postIcon?: ReactNode;
  preIcon?: ReactNode;
}

function PrimaryButton(props: PrimaryButtonProps) {
  const { postIcon, preIcon, text, align } = props;
  let classes =
    'py-2 px-4 bg-primary text-white w-full rounded font-medium hover:shadow-light transition select-none';
  classes += align ? ` text-${align}` : ' text-left';

  return (
    <button className={classes}>
      {preIcon && <span className='mr-3'>{preIcon}</span>}
      <span>{text}</span>
      {postIcon && <span className='ml-3'>{postIcon}</span>}
    </button>
  );
}

export default PrimaryButton;
