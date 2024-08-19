import React, { useContext } from "react";
import Context from "./context/context";

const CheckTwo = () => {
  let { name } = useContext(Context);
  return <div>{name}</div>;
};

export default CheckTwo;
