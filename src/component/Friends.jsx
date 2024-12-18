/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Lips from "../assets/Human.jpg";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Chattinginfo } from "../slice/ChatSlice";

const Friends = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const db = getDatabase();
  let data = useSelector((state) => state.Userinfo.value);
  let [friendlist, setFriendlist] = useState([]);

  useEffect(() => {
    const Friends = ref(db, "FriendList/");
    onValue(Friends, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().receiverid ||
          data.uid == item.val().senderid
        ) {
          array.push({ ...item.val(), key: item.key });
        }
      });
      setFriendlist(array);
    });
  }, []);

  let handleBlocked = (item) => {
    if (data.uid == item.senderid) {
      set(push(ref(db, "BlockedUser/")), {
        senderid: item.senderid,
        senderName: item.senderName,
        senderPhoto: item.senderPhoto,
        receiverid: item.receiverid,
        receiverName: item.receiverName,
        receiverPhoto: item.receiverPhoto,
        Date: item.Date,
      })
        .then(() => {
          remove(ref(db, "FriendList/" + item.key));
        })
        .then(() => {
          alert("User Blocked!");
        })
        .catch(() => {
          alert("Blocked hoy nai");
        });
    } else {
      set(push(ref(db, "BlockedUser/")), {
        senderid: item.receiverid,
        senderName: item.receiverName,
        senderPhoto: item.receiverPhoto,
        receiverid: item.senderid,
        receiverName: item.senderName,
        receiverPhoto: item.senderPhoto,
        Date: item.Date,
      })
        .then(() => {
          remove(ref(db, "FriendList/" + item.key));
        })
        .then(() => {
          alert("User Blocked!");
        })
        .catch(() => {
          alert("Blocked hoy nai");
        });
    }
  };

  let handleChat = (item) => {
    if (data.uid == item.senderid) {
      dispatch(
        Chattinginfo({
          name: item.receiverName,
          id: item.receiverid,
          photo: item.receiverPhoto,
        })
      );
    } else {
      dispatch(
        Chattinginfo({
          name: item.senderName,
          id: item.senderid,
          photo: item.senderPhoto,
        })
      );
    }
  };

  return (
    <>
      <div className="w-[427px]  bg-white rounded-xl shadow-custom px-5 pt-5">
        <div className="flex justify-between mb-5">
          <h2 className="font-semibold text-xl text-black">Friends</h2>
          <BsThreeDotsVertical className="text-primary text-xl" />
        </div>
        <div className="w-full h-[360px] overflow-y-scroll">
          <div className="flex flex-col gap-7">
            {friendlist.map((item) =>
              location.pathname == "/" ? (
                <div className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25 cursor-pointer">
                  <div className="flex items-center gap-4">
                    {data.uid == item.senderid ? (
                      <img
                        src={(item && item.receiverPhoto) || Lips}
                        alt="human"
                        className="w-[70px] h-[70px] rounded-full"
                      />
                    ) : (
                      <img
                        src={(item && item.senderPhoto) || Lips}
                        alt="Women"
                        className="w-[70px] h-[70px] rounded-full"
                      />
                    )}
                    <div>
                      {data.uid == item.senderid ? (
                        <h2 className="text-lg font-semibold text-black">
                          {item.receiverName}
                        </h2>
                      ) : (
                        <h2 className="text-lg font-semibold text-black">
                          {item.senderName}
                        </h2>
                      )}
                      <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                        {moment().format("MM D YYYY, h:mm:ss a")}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => handleBlocked(item)}
                    className="py-2 px-5 bg-primary rounded-lg text-white"
                  >
                    Block
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => handleChat(item)}
                  className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25 cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    {data.uid == item.senderid ? (
                      <img
                        src={(item && item.receiverPhoto) || Lips}
                        alt="Women"
                        className="w-[70px] h-[70px] rounded-full"
                      />
                    ) : (
                      <img
                        src={(item && item.senderPhoto) || Lips}
                        alt="Women"
                        className="w-[70px] h-[70px] rounded-full"
                      />
                    )}
                    <div>
                      {data.uid == item.senderid ? (
                        <h2 className="text-lg font-semibold text-black">
                          {item.receiverName}
                        </h2>
                      ) : (
                        <h2 className="text-lg font-semibold text-black">
                          {item.senderName}
                        </h2>
                      )}
                      <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                        {moment().format("MM D YYYY, h:mm:ss a")}
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
