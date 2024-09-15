/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
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
import FriendsRequest from "./FriendsRequest";
import { TiTick } from "react-icons/ti";

const UserList = () => {
  const db = getDatabase();
  let [userList, setUserList] = useState([]);
  let data = useSelector((state) => state.Userinfo.value);
  let [requestList, setRequestList] = useState([]);
  console.log(data);

  useEffect(() => {
    const starCountRef = ref(db, "users");
    onValue(starCountRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        if (data.uid != item.key) {
          array.push({ ...item.val(), id: item.key });
        }
      });
      setUserList(array);
    });
  }, []);
  useEffect(() => {
    const FriendRequestRef = ref(db, "friendRequest/");
    onValue(FriendRequestRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().receiverid);
      });
      setRequestList(array);
    });
  }, []);

  let handleFriendRequest = (item) => {
    set(push(ref(db, "friendRequest/")), {
      senderid: data.uid,
      senderName: data.displayName,
      senderEmail: data.email,
      // senderPhoto: data.photoUrl,
      receiverid: item.id,
      receiverName: item.username,
      receiverEmail: item.email,
      // receiverPhoto: item.profile_picture,
      Date: moment().format("MM D YYYY, h:mm a"),
    })
      .then(() => {
        alert("Friend Request success!");
      })
      .catch(() => {
        console.log("Request jay nai");
      });
  };

  let handleFriendRequestCancel = (item) => {
    remove(ref(db, "friendRequest/", item), {})
      .then(() => {
        alert("Friend Request Cancel!");
      })
      .catch(() => {
        console.log("Friend Request Cancel Hoy Nai!");
      });
  };

  return (
    <>
      <div className="w-[427px]  bg-white rounded-xl shadow-custom px-5 pt-5">
        <div className="flex justify-between mb-5">
          <h2 className="font-semibold text-xl text-black">User List</h2>
          <BsThreeDotsVertical className="text-primary text-xl" />
        </div>
        <div className="w-full h-[330px] overflow-y-scroll">
          <div className="flex flex-col gap-7">
            {userList.map((item) => (
              <div className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25">
                <div className="flex items-center gap-4">
                  <img
                    src={item.profile_picture}
                    alt="Women"
                    className="w-[70px] h-[70px] rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-black">
                      {item.username}
                    </h2>
                    <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                      {moment(item.Date).fromNow()}
                    </p>
                  </div>
                </div>
                {requestList.includes(data.uid + item.id) ||
                requestList.includes(item.id + data.uid) ? (
                  <button
                    onClick={() => handleFriendRequestCancel(item)}
                    className="py-2 px-5 bg-primary rounded-lg text-white"
                  >
                    <TiTick />
                  </button>
                ) : (
                  <button
                    onClick={() => handleFriendRequest(item)}
                    className="py-2 px-5 bg-primary rounded-lg text-white"
                  >
                    <FaPlus />
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

export default UserList;
