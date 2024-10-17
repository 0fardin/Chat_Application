/* eslint-disable react/jsx-key */
import React, { createRef, useEffect, useState } from "react";
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
import EmojiPicker from "emoji-picker-react";
import { Cropper } from "react-cropper";

const Messages = () => {
  const db = getDatabase();
  const cropperRef = createRef();
  let chatdata = useSelector((state) => state.Chattinginfo.value);
  let data = useSelector((state) => state.Userinfo.value);
  let [sendboxmodal, setSendboxmodal] = useState(false);
  let [textmsg, setTextmsg] = useState("");
  let [sendmsg, setSendmsg] = useState([]);
  let [openEmoji, setOpenEmoji] = useState(false);
  let [imageModal, setImageModal] = useState(false);
  const [image, setImage] = useState("");

  let handleTextmsg = (e) => {
    setTextmsg(e.target.value);
    setOpenEmoji(false);
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
      setOpenEmoji(false);
      setImageModal(false);
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

  let handleEmojiClick = (e) => {
    setTextmsg((prev) => prev + e.emoji);
  };

  let handleFile = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

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
                  <MdOutlineEmojiEmotions
                    onClick={() => setOpenEmoji(true)}
                    className=" text-2xl absolute top-2/4 right-[60px] translate-y-[-50%] cursor-pointer"
                  />
                  {openEmoji && (
                    <div className=" absolute bottom-[50px] right-0">
                      <EmojiPicker onEmojiClick={handleEmojiClick} />
                    </div>
                  )}
                  <IoCameraOutline
                    onClick={() => setImageModal(true)}
                    className=" text-2xl font-bold absolute top-2/4 right-[20px] translate-y-[-50%] cursor-pointer"
                  />
                  {imageModal && (
                    <div className=" w-[500px] bg-white rounded-lg border border-primary p-5 flex flex-col gap-10 z-50 absolute bottom-[50px] right-0">
                      <div className="flex flex-col gap-3">
                        <h1 className="text-black text-xl font-medium">
                          <span className="text-primary font-bold">Upload</span>{" "}
                          Your Profile Picture{" "}
                          <span className="text-primary font-extrabold ">
                            !
                          </span>
                        </h1>
                        <input onChange={handleFile} type="file"></input>
                        {image && (
                          <Cropper
                            ref={cropperRef}
                            style={{ height: 400, width: "100%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={image}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false}
                            guides={true}
                          />
                        )}
                      </div>
                      <div className="flex justify-between items-center">
                        <button
                          onClick={handleSendmsg}
                          className=" px-4 py-3 bg-white border border-primary rounded-lg text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
                        >
                          Submit
                        </button>

                        <button
                          onClick={() => setImageModal(false)}
                          className=" px-4 py-3 bg-white border border-red-600 rounded-lg text-red-700 font-bold hover:bg-red-600 hover:text-white transition-all duration-300"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
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
