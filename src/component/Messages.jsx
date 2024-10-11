/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { IoCameraOutline } from "react-icons/io5";
import { IoSendSharp } from "react-icons/io5";
import Searchbar from "./Searchbar";
import Friends from "./Friends";
import { useSelector } from "react-redux";
import Human from "/public/Human.jpg";
import moment from "moment";
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const Messages = () => {
  const db = getDatabase();
  let chatdata = useSelector((state) => state.Chattinginfo.value);
  let data = useSelector((state) => state.Userinfo.value);
  let [sendboxmodal, setSendboxmodal] = useState(false);
  let [textmsg, setTextmsg] = useState("");
  let [sendmsg, setSendmsg] = useState([]);

  let handleTextmsg = (e) => {
    setTextmsg(e.target.value);
  };

  let handleSendmsg = () => {
    set(push(ref(db, "msg/")), {
      senderid: data.uid,
      sendername: data.displayName,
      receiverid: chatdata.id,
      receivername: chatdata.name,
      msg: textmsg,
      date: moment().format("MM D YYYY, h:mm a"),
    }).then(() => {
      setTextmsg("");
      setSendboxmodal("");
    });
  };

  useEffect(() => {
    const chat = ref(db, "msg/");
    onValue(chat, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          (chatdata.id == item.val().receiverid &&
            data.uid == item.val().senderid) ||
          (chatdata.id == item.val().senderid &&
            data.uid == item.val().receiverid)
        ) {
          array.push({ ...item.val(), key: item.key });
        }
      });
      setSendmsg(array);
    });
  }, [chatdata, data.uid, db]);

  return (
    <>
      <div className=" flex gap-10">
        <div>
          <Searchbar />
          <Friends />
        </div>
        {chatdata && (
          <div className="w-[690px] h-[956px] mt-5 border rounded-xl shadow-xl">
            <div className=" w-full h-full flex flex-col justify-between p-5">
              <div className=" w-full flex justify-between items-center border-b border-black/50 py-4">
                <div className=" flex gap-5 items-center">
                  <div className="w-[75px] h-[75px] relative">
                    <img
                      className="w-full h-full rounded-full"
                      src={chatdata ? chatdata.photo : Human}
                      alt="Human"
                    />
                    <div className="w-4 h-4 bg-green-400 rounded-full outline outline-white absolute bottom-0 right-0"></div>
                  </div>
                  <div className="flex flex-col ">
                    <h1 className=" text-2xl font-semibold text-black">
                      {chatdata && chatdata.name}
                    </h1>
                    <p className="text-sm font-medium text-black/85">online</p>
                  </div>
                </div>
                <BsThreeDotsVertical className=" text-primary text-xl " />
              </div>
              <div className=" h-full px-5 flex flex-col gap-5 overflow-y-scroll ">
                {sendmsg.map((item) =>
                  data.uid == item.senderid ? (
                    <div className=" flex flex-row-reverse">
                      <div className="flex flex-col items-end mt-5 ">
                        <div className="max-w-[400px]">
                          <h2 className=" break-words p-5 rounded-2xl text-sm text-white font-semibold bg-primary ">
                            {item.msg}
                          </h2>
                        </div>
                        <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                          {item.date}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-start mt-5">
                      <div className="max-w-[400px]">
                        <h2 className=" break-words p-5 rounded-2xl text-sm text-black font-semibold bg-primary/30 ">
                          {item.msg}
                        </h2>
                      </div>
                      <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                        {item.date}
                      </p>
                    </div>
                  )
                )}
              </div>
              <div className=" border-t pt-10 pb-5 flex gap-6 items-center">
                <div
                  onClick={() => setSendboxmodal(true)}
                  className={`w-[537px] h-[47px] bg-black/5 rounded-xl relative ${
                    sendboxmodal && "border border-primary"
                  }`}
                >
                  <input
                    onChange={handleTextmsg}
                    value={textmsg}
                    className="w-[80%] h-full bg-transparent text-black px-8 rounded-xl outline-none "
                    placeholder="Send Message"
                    type="text"
                  ></input>
                  <MdOutlineEmojiEmotions className=" text-2xl absolute top-2/4 right-[60px] translate-y-[-50%] cursor-pointer" />
                  <IoCameraOutline className=" text-2xl font-bold absolute top-2/4 right-[20px] translate-y-[-50%] cursor-pointer" />
                </div>
                <button
                  onClick={handleSendmsg}
                  className=" py-3 px-4 bg-primary rounded-xl text-white font-bold text-2xl"
                >
                  <IoSendSharp />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Messages;
