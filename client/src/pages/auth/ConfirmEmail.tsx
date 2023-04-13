import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Input from '../../components/Input';
import PrimaryButton from '../../components/PrimaryButton';
import { confirmEmail } from '../../services/auth';
import AuthFormsWrapper from './AuthFormsWrapper';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function ConfirmEmail() {
  const navigate = useNavigate();
  const query = useQuery();

  const [username, setUsername] = useState(query.get('email') || '');
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const inputClasses = 'bg-light text-white placeholder-gray-300';
  const handleEmailConfirmation = async () => {
    setLoading(true);

    if (!username || !code) {
      toast.error('Please enter your email and confirmation code.');
    } else {
      await confirmEmail(username, code);
      toast.success('Email confirmed successfully.');
      navigate('/chat');
    }

    setLoading(false);
  };

  return (
    <AuthFormsWrapper>
      <>
        <div className='mb-4 w-full'>
          <Input
            className={inputClasses}
            placeholder='Enter confirmation code'
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <PrimaryButton
          text={loading ? 'Verifying ...' : 'Confirm Email'}
          align='center'
          onClick={handleEmailConfirmation}
          disabled={loading}
        />
      </>
    </AuthFormsWrapper>
  );
}

export default ConfirmEmail;
