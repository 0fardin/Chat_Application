import React from "react";
import women from "../assets/lady5.jpg";
import { IoHomeOutline } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";

const Sidebar = () => {
  return (
    <>
      <div className=" h-screen p-5">
        <div className="w-[186px] h-full bg-primary rounded-lg flex flex-col justify-between">
          <div className="pt-10">
            <img
              className="w-[100px] h-[100px] rounded-full mx-auto "
              src={women}
              alt="women"
            />
          </div>
          <div className="flex gap-24 flex-col">
            <div className="relative">
              <div className="w-[161px] h-[89px] bg-white ml-auto rounded-s-lg relative after:w-3 after:h-full after:bg-primary after:absolute after:top-0 after:right-0 after:rounded-s-lg shadow-2xl"></div>
              <IoHomeOutline className="text-primary text-[46px] mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] " />
            </div>
            <div className="relative">
              <div className="hidden w-[161px] h-[89px] bg-white ml-auto rounded-s-lg relative after:w-3 after:h-full after:bg-primary after:absolute after:top-0 after:right-0 after:rounded-s-lg shadow-2xl"></div>
              <AiFillMessage className="text-[#BAD1FF] text-[46px] mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] " />
            </div>
            <div className="relative">
              <div className="hidden w-[161px] h-[89px] bg-white ml-auto rounded-s-lg relative after:w-3 after:h-full after:bg-primary after:absolute after:top-0 after:right-0 after:rounded-s-lg shadow-2xl"></div>
              <IoMdNotificationsOutline className="text-white text-[46px] mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] " />
            </div>
            <div className="relative">
              <div className="hidden w-[161px] h-[89px] bg-white ml-auto rounded-s-lg relative after:w-3 after:h-full after:bg-primary after:absolute after:top-0 after:right-0 after:rounded-s-lg shadow-2xl"></div>
              <IoSettingsOutline className="text-white text-5xl mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] " />
            </div>
          </div>
          <div className="pb-10">
            <ImExit className="text-[46px] text-white mx-auto" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
