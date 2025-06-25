import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './App.css';

// Route components
import MainLayout from './pages/MainLayout.tsx';
import Login from './pages/auth/Login.tsx';
import SignUp from './pages/auth/SignUp.tsx';
import NotFound from './pages/NotFound.tsx';

// Define app routes
const router = createBrowserRouter([
  { path: '/', element: <MainLayout /> },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },
  { path: '*', element: <NotFound /> },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
