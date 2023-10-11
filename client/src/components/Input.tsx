import { FC, InputHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  postIcon?: ReactNode;
  preIcon?: ReactNode;
}

const Input: FC<InputProps> = (inputProps: InputProps) => {
  let { postIcon, preIcon, label, ...props } = inputProps;
  props.className +=
    ' p-2 w-full rounded border border-primary focus:shadow-light transition outline-none dark:bg-slate-700 dark:text-white';

  if (preIcon) {
    props.className += ' pl-8';
  }

  if (postIcon) {
    props.className += ' pr-8';
  }

  return (
    <div className='relative w-full'>
      {label && (
        <label className='block mb-2' htmlFor={props.id}>
          {label}
        </label>
      )}
      <div className='relative w-full'>
        {preIcon && (
          <div className='absolute left-2 top-[50%] translate-y-[-50%] text-primary'>{preIcon}</div>
        )}
        {props.type === 'textarea' ? (
          <textarea {...props}>{props.value}</textarea>
        ) : (
          <input {...props} />
        )}
        {postIcon && (
          <div className='absolute right-2 top-[50%] translate-y-[-50%] text-primary'>
            {postIcon}
          </div>
        )}
      </div>
    </div>
  );
};

export default Input;
