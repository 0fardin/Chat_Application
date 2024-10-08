/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import moment from "moment";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

const UserList = () => {
  const db = getDatabase();
  let [userList, setUserList] = useState([]);
  let data = useSelector((state) => state.Userinfo.value);
  let [requestList, setRequestList] = useState([]);
  let [friendList, setFriendList] = useState([]);
  let [searchicon, setSearchicon] = useState(false);
  let [searchList, setSearchlist] = useState([]);

  useEffect(() => {
    const UserRef = ref(db, "users");
    onValue(UserRef, (snapshot) => {
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
  useEffect(() => {
    const FriendList = ref(db, "FriendList/");
    onValue(FriendList, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val().senderid + item.val().receiverid);
      });
      setFriendList(array);
    });
  }, []);

  let handleFriendRequest = (item) => {
    set(push(ref(db, "friendRequest/")), {
      senderid: data.uid,
      senderName: data.displayName,
      senderEmail: data.email,
      senderPhoto: data.photoURL,
      receiverid: item.id,
      receiverName: item.username,
      receiverEmail: item.email,
      receiverPhoto: item.profile_picture,
      Date: moment().format("MM D YYYY, h:mm a"),
    })
      .then(() => {
        alert("Friend Request success!");
      })
      .catch(() => {
        alert("Request jay nai");
      });
  };

  let handleSearch = (e) => {
    let search = userList.filter((item) =>
      item.username.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setSearchlist(search);
  };

  // let handleFriendRequestCancel = (item) => {
  //   remove(ref(db, "friendRequest/", +item.id), {
  //     ...item,
  //   })
  //     .then(() => {
  //       alert("Friend Request Cancel!");
  //     })
  //     .catch(() => {
  //       console.log("Friend Request Cancel Hoy Nai!");
  //     });
  // };

  return (
    <>
      <div className="w-[427px]  bg-white rounded-xl shadow-custom px-5 pt-5">
        <div className="w-full h-11 flex justify-between items-center mb-5 ">
          <h2 className="font-semibold text-xl text-black">User List</h2>
          <div className=" flex items-center">
            <div
              className={`w-[274px] h-[40px] rounded-3xl relative ${
                searchicon
                  ? "border border-primary transition-all duration-300"
                  : ""
              }`}
            >
              {searchicon ? (
                <div className="w-full h-full">
                  <RxCross2
                    onClick={() => {
                      setSearchicon(false);
                    }}
                    className="absolute top-2/4 left-6 translate-y-[-50%] text-xl cursor-pointer"
                  />
                  <input
                    onChange={handleSearch}
                    type="text"
                    placeholder="Search"
                    className=" w-full h-full rounded-3xl border-none border-gray-700 pl-20 outline-none"
                  />
                </div>
              ) : (
                <FiSearch
                  onClick={() => {
                    setSearchicon(true);
                  }}
                  className="absolute top-2/4 left-6 translate-y-[-50%] text-xl cursor-pointer"
                />
              )}
            </div>
          </div>
          <BsThreeDotsVertical className="text-primary text-xl" />
        </div>
        <div className="w-full h-[330px] overflow-y-scroll">
          <div className="flex flex-col gap-7">
            {searchList.length > 0
              ? searchList.map((item) => (
                  <div className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25">
                    <div className="flex items-center gap-4">
                      <img
                        src={item && item.profile_picture}
                        alt="Women"
                        className="w-[70px] h-[70px] rounded-full"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-black">
                          {item && item.username}
                        </h2>
                        <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                          {moment(item.Date).fromNow()}
                        </p>
                      </div>
                    </div>
                    {friendList.includes(data.uid + item.id) ||
                    friendList.includes(item.id + data.uid) ? (
                      <button className="py-2 px-5 bg-white border border-primary rounded-lg text-primary">
                        <TiTick />
                      </button>
                    ) : requestList.includes(data.uid + item.id) ||
                      requestList.includes(item.id + data.uid) ? (
                      <button
                        // onClick={() => handleFriendRequestCancel(item)}
                        className="py-2 px-5 bg-secondary rounded-lg text-white"
                      >
                        Pending
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
                ))
              : userList.map((item) => (
                  <div className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25">
                    <div className="flex items-center gap-4">
                      <img
                        src={item && item.profile_picture}
                        alt="Women"
                        className="w-[70px] h-[70px] rounded-full"
                      />
                      <div>
                        <h2 className="text-lg font-semibold text-black">
                          {item && item.username}
                        </h2>
                        <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                          {moment(item.Date).fromNow()}
                        </p>
                      </div>
                    </div>
                    {friendList.includes(data.uid + item.id) ||
                    friendList.includes(item.id + data.uid) ? (
                      <button className="py-2 px-5 bg-white border border-primary rounded-lg text-primary">
                        <TiTick />
                      </button>
                    ) : requestList.includes(data.uid + item.id) ||
                      requestList.includes(item.id + data.uid) ? (
                      <button
                        // onClick={() => handleFriendRequestCancel(item)}
                        className="py-2 px-5 bg-secondary rounded-lg text-white"
                      >
                        Pending
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
