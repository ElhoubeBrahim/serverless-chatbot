import { createBrowserRouter } from 'react-router-dom';
import Chat from '../pages/Chat';
import ChatHome from '../pages/ChatHome';
import ChatMessages from '../pages/ChatMessages';
import Login from '../pages/Login';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
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
