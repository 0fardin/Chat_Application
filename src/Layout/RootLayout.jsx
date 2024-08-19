import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../component/Login";
import Sidebar from "../component/Sidebar";
import Home from "../component/Home";
import Searchbar from "../component/Searchbar";

const RootLayout = () => {
  return (
    <>
      <div className=" flex">
        <Sidebar />
        <div className="h-screen w-full">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default RootLayout;
