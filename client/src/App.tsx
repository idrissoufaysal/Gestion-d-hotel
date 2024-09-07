import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/register";
import Home from "./pages/Home";
import Login from "./pages/login";
import List from "./pages/List";
import Hotel from "./pages/Hotel";

import "./styles/components.scss";
import "./styles/pages.scss";
import { Toaster } from "@/components/ui/toaster"

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/hotels",
      element: <List />,
    },
    {
      path: "/hotels/:id",
      element: <Hotel />,
    },
  ]);

  return (
    <div className="app">
      <RouterProvider router={router} />
      <Toaster/>
    </div>
  );
}

export default App;
