//

import React from "react";
import ContextCheck from "./ContextCheck";
import CheckTwo from "./CheckTwo";

const App = () => {
  return (
    <>
      <div className="w-screen h-screen flex flex-col justify-center items-center gap-5">
        <ContextCheck />

        <CheckTwo />
      </div>
    </>
  );
};

export default App;
