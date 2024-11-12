import React from "react";
import Registration from "./component/Registration";
import Login from "./component/Login";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import firebaseConfig from "../firebase.config";
import Sidebar from "./component/Sidebar";
import RootLayout from "./Layout/RootLayout";
import Home from "./component/Home";
import Messages from "./component/Messages";
import Notification from "./component/Notification";
import Settings from "./component/Settings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />}></Route>
      </Route>
      <Route path="/Messages" element={<RootLayout />}>
        <Route index element={<Messages />}></Route>
      </Route>
      <Route path="/Notification" element={<RootLayout />}>
        <Route index element={<Notification />}></Route>
      </Route>
      <Route path="/Settings" element={<RootLayout />}>
        <Route index element={<Settings />}></Route>
      </Route>
      <Route path="/Login" element={<Login />}></Route>
      <Route path="/Registration" element={<Registration />}></Route>
    </>
  )
);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
