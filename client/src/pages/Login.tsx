import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import loginBackground from '../assets/login-bg.svg';
import loginDecor from '../assets/login-decor.svg';
import { useState } from 'react';

function Login() {
  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const togglePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const inputClasses = 'bg-light text-white placeholder-gray-300';

  return (
    <main
      className='px-5 py-20 h-screen bg-cover relative overflow-hidden'
      style={{
        backgroundImage: `url(${loginBackground})`,
      }}
    >
      <div className='container mx-auto'>
        <div className='w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto'>
          <div className='flex items-center justify-center mb-10'>
            <img src='logo.svg' alt='Chatty' className='h-[150px] w-[150px] select-none' />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='mb-4 w-full'>
              <Input
                type='text'
                placeholder='Email'
                className={inputClasses}
                preIcon={<FontAwesomeIcon icon='user' className='text-white' />}
              />
            </div>
            <div className='mb-5 w-full'>
              <Input
                type={passwordType}
                placeholder='Password'
                className={inputClasses}
                preIcon={<FontAwesomeIcon icon='lock' className='text-white' />}
                postIcon={
                  <FontAwesomeIcon
                    icon='eye'
                    className='text-white cursor-pointer'
                    onClick={togglePasswordType}
                  />
                }
              />
              <div className='flex justify-end m-2'>
                <a href='#' className='text-sm text-primary underline'>
                  Forgot password?
                </a>
              </div>
            </div>
            <PrimaryButton />
          </div>
        </div>
      </div>
      <img
        src={`${loginDecor}`}
        className='absolute bottom-0 right-0 h-[200px] w-full object-cover object-top mix-blend-multiply select-none'
      />
    </main>
  );
}

export default Login;
