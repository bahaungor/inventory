import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useState } from 'react';

// IMPORT LAYOUTS
import PlainLayout from './layouts/plainLayout/plainLayout';

// IMPORT PAGES
import Homepage from './pages/homepage/homepage';
import ErrorPage from './pages/error/error';

// IMPORT CONTEXTS
import { MyContext } from './contexts/myContexts';

// DEFINE WHICH REACT PAGE TO SERVE WHEN CERTAIN ROUTE REQ.
const router = createBrowserRouter([
  {
    path: '/', // PARENT PATH SHOULD START FROM ROOT
    element: <PlainLayout />, // PARENT COMPONENT (LAYOUT)
    errorElement: <ErrorPage />, // ERROR ELEMENT
    children: [
      // RENDER element INSIDE <Outlet /> OF PARENT COMPONENT (LAYOUT) WHEN path REQUESTED
      { path: '/', element: <Homepage /> },
    ],
  },
]);

export default function App() {
  const [selected, setSelected] = useState(1);

  return (
    <MyContext.Provider value={{ selected, setSelected }}>
      <RouterProvider router={router} />
    </MyContext.Provider>
  );
}
