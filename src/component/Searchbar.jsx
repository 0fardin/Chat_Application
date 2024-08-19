import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";

const Searchbar = () => {
  return (
    <>
      <div className="w-[427px] h-[59px] mt-5 rounded-3xl relative shadow-custom">
        <FiSearch className="absolute top-2/4 left-6 translate-y-[-50%] text-xl" />
        <input
          type="text"
          placeholder="Search"
          className=" w-full h- h-full rounded-3xl border-none border-gray-700 pl-20 outline-primary"
        />
        <BsThreeDotsVertical className="absolute top-2/4 right-6 translate-y-[-50%] text-primary text-xl" />
      </div>
    </>
  );
};

export default Searchbar;
