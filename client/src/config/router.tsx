import { createBrowserRouter } from 'react-router-dom';
import Chat from '../pages/Chat';
import ChatHome from '../pages/ChatHome';
import ChatMessages from '../pages/ChatMessages';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ConfirmEmail from '../pages/auth/ConfirmEmail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/confirm-email',
    element: <ConfirmEmail />,
  },
  {
    path: '/chat',
    element: <Chat />,
    children: [
      {
        path: '/chat',
        element: <ChatHome />,
      },
      {
        path: '/chat/:id',
        element: <ChatMessages />,
      },
    ],
  },
]);
