import PrimaryButton from '../../components/PrimaryButton';
import loginBackground from '../../assets/login-bg.svg';
import { useState } from 'react';
import { signup } from '../../services/auth';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import PasswordInput from '../../components/auth/PasswordInput';
import EmailInput from '../../components/auth/EmailInput';
import AuthFormsWrapper from './AuthFormsWrapper';

function Signup() {
  const navigate = useNavigate();
  const inputClasses = 'bg-light text-white placeholder-gray-300';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);

    if (!email || !password) {
      toast.error('Please enter your email and password.');
    } else if (password !== passwordConfirmation) {
      toast.error('Passwords do not match.');
    } else {
      const result: any = await signup(email, password);
      if (result) {
        toast.success('Signup successful. Please confirm your email.');
        navigate(`/confirm-email?email=${email}`);
      }
    }

    setLoading(false);
  };

  return (
    <AuthFormsWrapper>
      <>
        <EmailInput inputClasses={inputClasses} email={email} setEmail={setEmail} />
        <PasswordInput inputClasses={inputClasses} password={password} setPassword={setPassword} />
        <PasswordInput
          inputClasses={inputClasses}
          placeholder='Confirm Password'
          password={passwordConfirmation}
          setPassword={setPasswordConfirmation}
        />
        <PrimaryButton
          text={loading ? 'Verifying ...' : 'Signup'}
          align='center'
          onClick={handleSignup}
          disabled={loading}
        />
        <div className='mt-5 text-white text-center'>
          Already have an account?
          <Link to='/'>
            <span className='text-primary ml-2 underline'>Login</span>
          </Link>
        </div>
      </>
    </AuthFormsWrapper>
  );
}

export default Signup;
