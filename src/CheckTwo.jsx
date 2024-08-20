import React, { useContext } from "react";
import Context from "./context/context";

const CheckTwo = () => {
  let { name } = useContext(Context);
  return <div className="font-bold text-4xl text-black">{name}</div>;
};

export default CheckTwo;
