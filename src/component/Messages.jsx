import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";

const Messages = () => {
  return (
    <>
      <div className="w-[690px] h-[956px] border border-primary">
        <div className=" w-full h-full flex flex-col justify-between p-5">
          <div className="flex justify-between items-center border-b border-black/50 py-4">
            <div className=" flex gap-5 items-center">
              <div className="w-[75px] h-[75px] relative">
                <img
                  className="w-full h-full rounded-full"
                  src="/src/assets/Human.jpg"
                  alt=""
                />
                <div className="w-4 h-4 bg-green-400 rounded-full outline outline-white absolute bottom-0 right-0"></div>
              </div>
              <div className="flex flex-col ">
                <h1 className=" text-2xl font-semibold text-black">Swathi</h1>
                <p className="text-sm font-medium text-black/85">online</p>
              </div>
            </div>
            <BsThreeDotsVertical className=" text-primary text-xl " />
          </div>
          <div className=" flex gap-6 items-center">
            <div className=" w-[537px] h-[47px] bg-black/5 rounded-xl relative active:border active:border-primary">
              <input
                className="w-[80%] h-full bg-transparent text-black px-8 rounded-xl outline-none "
                placeholder="Send Message"
                type="text"
              ></input>
              <MdOutlineEmojiEmotions className=" text-2xl absolute top-2/4 right-[60px] translate-y-[-50%] cursor-pointer" />
              <IoCameraOutline className=" text-2xl font-bold absolute top-2/4 right-[20px] translate-y-[-50%] cursor-pointer" />
            </div>
            <button className=" py-3 px-4 bg-primary rounded-xl text-white font-bold text-2xl">
              <IoSendSharp />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Messages;
