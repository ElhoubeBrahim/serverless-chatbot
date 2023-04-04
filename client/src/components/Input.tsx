import { FC, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  postIcon?: ReactNode;
  preIcon?: ReactNode;
}

const Input: FC<InputProps> = (inputProps: InputProps) => {
  let { postIcon, preIcon, ...props } = inputProps;
  props.className +=
    ' p-2 w-full rounded border border-primary focus:shadow-light transition outline-none';

  if (preIcon) {
    props.className += ' pl-8';
  }

  if (postIcon) {
    props.className += ' pr-8';
  }

  return (
    <div className='relative w-full'>
      {preIcon && (
        <div className='absolute left-2 top-2 text-primary'>{preIcon}</div>
      )}
      <input {...props} />
      {postIcon && (
        <div className='absolute right-2 top-2 text-primary'>{postIcon}</div>
      )}
    </div>
  );
};

export default Input;
