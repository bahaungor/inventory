import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// IMPORT LAYOUTS
import PlainLayout from './layouts/plainLayout/plainLayout';

// IMPORT PAGES
import Homepage from './pages/homepage/homepage';
import ErrorPage from './pages/error/error';
import Create from './pages/create/create';

// DEFINE WHICH REACT PAGE TO SERVE WHEN CERTAIN ROUTE REQ.
const router = createBrowserRouter([
  {
    path: '/', // PARENT PATH SHOULD START FROM ROOT
    element: <PlainLayout />, // PARENT COMPONENT (LAYOUT)
    errorElement: <ErrorPage />, // ERROR ELEMENT
    children: [
      // RENDER element INSIDE <Outlet /> OF PARENT COMPONENT (LAYOUT) WHEN path REQUESTED
      { path: '/', element: <Homepage /> },
      { path: '/create', element: <Create /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />; /* CONSUME ROUTER */
}
