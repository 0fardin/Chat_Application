import React from "react";
import Registration from "./component/Registration";
import Login from "./component/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/Registration",
    element: (
      <>
        <Registration />
      </>
    ),
  },
  {
    path: "/",
    element: (
      <>
        <Login />
      </>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
