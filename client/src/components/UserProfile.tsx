import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { logout } from '../services/auth';
import { useRecoilState } from 'recoil';
import { themeState } from '../store/theme';

function UserProfile({ user }: { user: any }) {
  const navigate = useNavigate();
  const [theme, setTheme] = useRecoilState(themeState);

  const userData = user?.attributes;
  const username = userData?.email.split('@')[0];

  const handleLogout = async () => {
    if (confirm('Are you sure you want to logout?')) {
      await logout();
      toast.success('Logged out successfully. Have a nice day!');
      navigate('/');
    }
  };

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  }

  return (
    <div className='flex justify-between items-center gap-4'>
      <div className='flex gap-3 items-center'>
        <img
          src='https://picsum.photos/200'
          alt='User'
          className='w-10 h-10 rounded-full object-cover border-2 border-primary'
        />
        <p className='font-medium'>{username}</p>
      </div>
      <div className='flex gap-2'>
        <FontAwesomeIcon
          icon={theme === 'light' ? 'moon' : 'sun'}
          className='cursor-pointer'
          onClick={toggleTheme}
        />
        <FontAwesomeIcon
          icon='sign-out-alt'
          className='cursor-pointer text-danger'
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default UserProfile;
