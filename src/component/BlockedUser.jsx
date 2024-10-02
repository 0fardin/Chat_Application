/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import lady3 from "../assets/lady3.jpg";
import {
  getDatabase,
  ref,
  onValue,
  set,
  push,
  remove,
} from "firebase/database";
import { useSelector } from "react-redux";
import moment from "moment";

const BlockedUser = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.Userinfo.value);
  let [blockList, setBlockList] = useState([]);

  useEffect(() => {
    const blockUser = ref(db, "BlockedUser/");
    onValue(blockUser, (snapshot) => {
      let arr = [];
      snapshot.forEach((item) => {
        if (
          data.uid == item.val().senderid ||
          data.uid == item.val().receiverid
        ) {
          arr.push({ ...item.val(), key: item.key });
        }
      });
      setBlockList(arr);
    });
  }, []);

  let handleUnblock = (item) => {
    set(push(ref(db, "FriendList/")), {
      senderid: item.senderid,
      senderName: item.senderName,
      senderPhoto: item.senderPhoto,
      receiverid: item.receiverid,
      receiverName: item.receiverName,
      receiverPhoto: item.receiverPhoto,
      Date: item.Date,
    })
      .then(() => {
        remove(ref(db, "BlockedUser/" + item.key));
      })
      .then(() => {
        alert("User UnBlocked!");
      })
      .catch(() => {
        alert("UnBlocked hoy nai");
      });
  };

  return (
    <>
      <div className="w-[427px]  bg-white rounded-xl shadow-custom px-5 pt-5">
        <div className="flex justify-between mb-5">
          <h2 className="font-semibold text-xl text-black">Blocked User</h2>
          <BsThreeDotsVertical className="text-primary text-xl" />
        </div>
        <div className="w-full h-[450px] overflow-y-scroll">
          <div className="flex flex-col gap-7">
            {blockList.map((item) => (
              <div className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25">
                <div className="flex items-center gap-4">
                  {data.uid == item.senderid ? (
                    <img
                      src={(item && item.receiverPhoto) || lady3}
                      alt="Women"
                      className="w-[70px] h-[70px] rounded-full"
                    />
                  ) : (
                    <img
                      src={(item && item.senderPhoto) || lady3}
                      alt="Women"
                      className="w-[70px] h-[70px] rounded-full"
                    />
                  )}
                  <div>
                    {data.uid == item.senderid ? (
                      <h2 className="text-lg font-semibold text-black">
                        {item && item.receiverName}
                      </h2>
                    ) : (
                      <h2 className="text-lg font-semibold text-black">
                        {item && item.senderName}
                      </h2>
                    )}
                    <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                      {moment().format("MM D YYYY, h:mm:ss a")}
                    </p>
                  </div>
                </div>
                {data.uid == item.senderid && (
                  <button
                    onClick={() => handleUnblock(item)}
                    className="py-2 px-5 bg-primary rounded-lg text-white"
                  >
                    Unblock
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlockedUser;
