import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faEye,
  faLock,
  faPencilAlt,
  faPlus,
  faSignOutAlt,
  faStar,
  faTrashAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Login from './pages/Login';
import ChatHome from './pages/ChatHome';
import './index.css';

library.add(faUser, faEye, faLock, faPlus, faPencilAlt, faTrashAlt, faSignOutAlt, faStar);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/chat',
    element: <ChatHome />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
