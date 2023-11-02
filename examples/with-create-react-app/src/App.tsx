import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TailwindPage } from './tailwind/tailwind';
import MainPage from './main';

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainPage />,
    },
    {
      path: '/tailwind',
      element: <TailwindPage />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
