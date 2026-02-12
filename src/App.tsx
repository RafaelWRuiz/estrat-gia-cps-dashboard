import { createHashRouter, RouterProvider } from "react-router-dom";
import Presidencia from "./pages/Presidencia";
import Regional from "./pages/Regional";
import Unidade from "./pages/Unidade";
import NotFound from "./pages/NotFound";

const router = createHashRouter([
  {
    path: "/",
    element: <Presidencia />,
  },
  {
    path: "/regional",
    element: <Regional />,
  },
  {
    path: "/unidade",
    element: <Unidade />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
