import { Auth } from 'aws-amplify';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Guest({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  useEffect(() => {
    Auth.currentAuthenticatedUser().then(() => {
      navigate('/chat');
    });
  }, []);

  return <>{children}</>;
}

export default Guest;
