import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Input from '../components/Input';
import PrimaryButton from '../components/PrimaryButton';
import loginBackground from '../assets/login-bg.svg';
import loginDecor from '../assets/login-decor.svg';
import { useState } from 'react';
import { login } from '../services/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState<'password' | 'text'>('password');
  const togglePasswordType = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const inputClasses = 'bg-light text-white placeholder-gray-300';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    if (!email || !password) {
      toast.error('Please enter your email and password.');
    } else {
      await login(email, password);
      navigate('/chat');
    }

    setLoading(false);
  };

  return (
    <main
      className='px-5 py-20 h-screen bg-cover relative overflow-hidden bg-secondary'
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className='flex justify-end m-2'>
                <a href='#' className='text-sm text-primary underline'>
                  Forgot password?
                </a>
              </div>
            </div>
            <PrimaryButton
              text={loading ? 'Verifying ...' : 'Login'}
              align='center'
              onClick={handleLogin}
              disabled={loading}
            />
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
