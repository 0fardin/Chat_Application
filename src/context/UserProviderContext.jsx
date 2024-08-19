import React, { createContext, useState } from "react";
import context from "./context";

const UserProviderContext = ({ children }) => {
  let [name, setName] = useState("");
  return (
    <context.Provider value={{ name, setName }}>{children}</context.Provider>
  );
};

export default UserProviderContext;
