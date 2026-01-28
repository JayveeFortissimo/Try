import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "@/Wrapper";
import Dashboard from "@/Dashboard";
import Boards from "@/Boards";
import SeeBoards from "@/SeeBoards";

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
          {
          path: "boards/:id",
          element: <SeeBoards />,
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
