import { Auth } from 'aws-amplify';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Authenticator({ children }: { children: (user: any) => React.ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => setUser(user))
      .catch(() => {
        navigate('/');
      });
  }, []);

  return <>{children(user)}</>;
}

export default Authenticator;
