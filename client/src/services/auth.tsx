import { Auth } from 'aws-amplify';
import { toast } from 'react-toastify';

export const login = async (username: string, password: string) => {
  try {
    await Auth.signIn(username, password);
  } catch (error) {
    console.error(error);
    toast.error('Ooops! Email or password is incorrect.');
  }
};

