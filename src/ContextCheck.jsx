import React, { useContext, useState } from "react";
import Context from "./context/context";

const ContextCheck = () => {
  const [test, setTest] = useState("");
  let { setName } = useContext(Context);

  const handleChange = (e) => {
    setTest(e.target.value);
  };

  const handleClick = () => {
    setName(test);
    // setTest(""); // Clear input after submission
  };

  return (
    <>
      <div>
        <input
          onChange={handleChange}
          value={test}
          type="text"
          className="w-[400px] h-[100px] rounded-xl border shadow-custom outline-primary"
        />
        <button
          onClick={handleClick}
          disabled={!test.trim()} // Disable button if input is empty
          className="p-5 bg-primary rounded-xl font-extrabold text-white"
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default ContextCheck;
