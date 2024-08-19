import React from "react";
import Registration from "./component/Registration";
import Login from "./component/Login";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";

import Sidebar from "./component/Sidebar";
import RootLayout from "./Layout/RootLayout";
import Home from "./component/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
      </Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/Registration" element={<Registration />}></Route>
    </>
  )
);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
