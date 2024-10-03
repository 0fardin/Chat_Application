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
import { useSelector } from "react-redux";

const Friends = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.Userinfo.value);
  let [friendlist, setFriendlist] = useState([]);

  useEffect(() => {
    const Friends = ref(db, "FriendList/");
    onValue(Friends, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        console.log(item.key);

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
    console.log(item);

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
            {friendlist.map((item) => (
              <div className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25">
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
                <button
                  onClick={() => handleBlocked(item)}
                  className="py-2 px-5 bg-primary rounded-lg text-white"
                >
                  Block
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Friends;
