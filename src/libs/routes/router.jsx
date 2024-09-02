import { createBrowserRouter } from "react-router-dom";
import Todo from "../../pages/todo/todo";
import Main from "../../pages/main/main";
import RootLayout from "../../layouts/layout";
import PrivateRoute from "./private-route";
import PublicRoute from "./public-route";

const router = createBrowserRouter([
  {
    element: <RootLayout />, // 부모
    children: [
      {
        element: <PublicRoute/>,
        children: [
          {
            path: "/",
            element: <Main/>
          }
        ]
      },
      {
        element: <PrivateRoute />,
        children: [
          {
            path: "/todo",
            element: <Todo/>
          },
        ]
      },
    ],
  },
]);

export default router;