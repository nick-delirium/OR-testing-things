import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { TailwindPage } from './feature/tailwind/ui/pages/tailwind';
import { MainPage } from './feature/main/ui/pages';

function App() {
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
}

export default App;
