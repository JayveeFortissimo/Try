import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./Wrapper";
import Dashboard from "./Dashboard";
import Boards from "./Boards";

import Createboards from "@/context/Createboards";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Wrapper />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "boards",
          element: <Boards />,
        },
      ],
    },
  ]);
  return (
    <Createboards>
      <RouterProvider router={router} />
    </Createboards>
  );
}

export default App;
