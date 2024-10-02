import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import lady from "../assets/Human.jpg";
import {
  getDatabase,
  onValue,
  push,
  ref,
  remove,
  set,
} from "firebase/database";
import { useSelector } from "react-redux";
import moment from "moment";

const FriendsRequest = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.Userinfo.value);
  let [friendsRequest, setFriendsRequest] = useState([]);

  useEffect(() => {
    const FriendRequestRef = ref(db, "friendRequest/");
    onValue(FriendRequestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid == item.val().receiverid) {
          array.push({ ...item.val(), key: item.key });
        }
      });
      setFriendsRequest(array);
    });
  }, []);

  let handleAccept = (item) => {
    set(push(ref(db, "FriendList/")), {
      ...item,
    }).then(() => {
      remove(ref(db, "friendRequest/" + item.key));
    });
  };

  return (
    <>
      <div className="w-[427px]  bg-white rounded-xl shadow-custom px-5 pt-5">
        <div className="flex justify-between mb-5">
          <h2 className="font-semibold text-xl text-black">Friends Request</h2>
          <BsThreeDotsVertical className="text-primary text-xl" />
        </div>
        <div className="w-full h-[450px] overflow-y-scroll">
          <div className="flex flex-col gap-7">
            {friendsRequest &&
              friendsRequest.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.senderPhoto || lady}
                      alt={item.name || "User Image"}
                      className="w-[70px] h-[70px] rounded-full"
                    />
                    <div>
                      <h2 className="text-lg font-semibold text-black">
                        {item.senderName}
                      </h2>
                      <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                        {moment().format("MM D YYYY, h:mm:ss a")}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleAccept(item)}
                    className="py-2 px-5 bg-primary rounded-lg text-white"
                  >
                    Accept
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FriendsRequest;
