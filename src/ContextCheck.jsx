/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useState } from "react";
import Context from "./context/context";

const ContextCheck = () => {
  const [test, setTest] = useState("");
  const [setName] = useContext(Context);

  const handleChange = (e) => {
    setTest(e.target.value);
  };

  const handleClick = () => {
    setName(test);
  };

  return (
    <>
      <div>
        <input
          onChange={handleChange}
          type="text"
          className="w-[400px] h-[100px] rounded-xl border-2 outline-primary"
        />
        <button
          onClick={handleClick}
          className="p-5 bg-primary rounded-xl font-extrabold text-white"
        >
          Submit
        </button>
      </div>
      <ul>
        <li>{test}</li>
      </ul>
    </>
  );
};

export default ContextCheck;
