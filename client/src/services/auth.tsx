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

export const signup = async (username: string, password: string) => {
  try {
    return await Auth.signUp({ username, password });
  } catch (error) {
    console.error(error);
    toast.error('Ooops! Something went wrong.');
  }
};

export const confirmEmail = async (username: string, code: string) => {
  try {
    await Auth.confirmSignUp(username, code);
  } catch (error) {
    console.error(error);
    toast.error('Ooops! Something went wrong.');
  }
};

export const logout = async () => {
  try {
    await Auth.signOut();
  } catch (error) {
    console.error(error);
    toast.error('Ooops! Something went wrong.');
  }
};
