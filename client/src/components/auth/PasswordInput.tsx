import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import Input from '../Input';

interface PasswordInputProps {
  inputClasses?: string;
  placeholder?: string;
  password: string;
  setPassword: (password: string) => void;
}

function PasswordInput({ inputClasses, placeholder, password, setPassword }: PasswordInputProps) {
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const togglePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  return (
    <div className='mb-5 w-full'>
      <Input
        type={passwordType}
        placeholder={placeholder || 'Password'}
        className={inputClasses}
        preIcon={<FontAwesomeIcon icon='lock' className='text-white' />}
        postIcon={
          <FontAwesomeIcon
            icon='eye'
            className='text-white cursor-pointer'
            onClick={togglePasswordType}
          />
        }
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </div>
  );
}

export default PasswordInput;
