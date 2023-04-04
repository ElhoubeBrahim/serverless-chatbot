import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import Login from './pages/Login';
import './index.css';

library.add(faUser, faEye, faLock);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
