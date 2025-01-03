import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from '@/configs/router.config.ts';

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
