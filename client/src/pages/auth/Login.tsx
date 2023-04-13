import PrimaryButton from '../../components/PrimaryButton';
import { useState } from 'react';
import { login } from '../../services/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/auth/PasswordInput';
import AuthFormsWrapper from './AuthFormsWrapper';
import EmailInput from '../../components/auth/EmailInput';

function Login() {
  const navigate = useNavigate();
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
    <AuthFormsWrapper showDecor={true}>
      <>
        <EmailInput inputClasses={inputClasses} email={email} setEmail={setEmail} />
        <PasswordInput inputClasses={inputClasses} password={password} setPassword={setPassword} />
        <PrimaryButton
          text={loading ? 'Verifying ...' : 'Login'}
          align='center'
          onClick={handleLogin}
          disabled={loading}
        />
        <div className='mt-5 text-white text-center'>
          Don't have an account?
          <Link to='/signup'>
            <span className='text-primary ml-2 underline'>Sign up</span>
          </Link>
        </div>
      </>
    </AuthFormsWrapper>
  );
}

export default Login;
