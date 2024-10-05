/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdOutlineGroupAdd } from "react-icons/md";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from "react-redux";
import { RxCross2 } from "react-icons/rx";

const GroupList = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.Userinfo.value);
  let [grouplist, setGroupList] = useState([]);
  let [createGroupModal, setCreateGroupModal] = useState(false);
  let [groupName, setGroupName] = useState("");

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
      setGroupList(array);
    });
  }, []);

  let handleGroupName = (e) => {
    setGroupName(e.target.value);
  };
  let CreateGroup = () => {
    console.log("click");

    set(push(ref(db, "MyGroup/")), {
      name: groupName,
      adminid: data.uid,
      adminName: data.displayName,
    })
      .then(() => {
        alert("group Success!");
      })
      .then(() => {
        setGroupName("");
      })
      .then(() => {
        setCreateGroupModal(false);
      })
      .catch(() => {
        alert("Group never Created");
      });
  };

  let CloseGroup = () => {
    setGroupName("");
    setCreateGroupModal(false);
  };

  return (
    <>
      <div className="w-[427px]  bg-white rounded-xl shadow-custom px-5 pt-5">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold text-xl text-black">Groups List</h2>
          <div className="flex gap-5 ">
            {createGroupModal ? (
              <RxCross2
                onClick={() => setCreateGroupModal(false)}
                className="text-primary text-xl cursor-pointer"
              />
            ) : (
              <MdOutlineGroupAdd
                onClick={() => setCreateGroupModal(true)}
                className="text-primary text-xl cursor-pointer"
              />
            )}
            <BsThreeDotsVertical className="text-primary text-xl cursor-pointer" />
          </div>
        </div>
        <div className="w-full h-[330px] overflow-y-scroll">
          <div className="flex flex-col gap-7">
            {createGroupModal ? (
              <div className="w-full flex flex-col gap-5">
                <h2 className=" text-xl text-black font-semibold">
                  Create Group
                </h2>
                <input
                  onChange={handleGroupName}
                  className="w-full h-10 border outline-primary px-6"
                  placeholder="Group Name"
                  type="text"
                />
                <div className=" flex gap-10">
                  <button
                    onClick={CreateGroup}
                    className="px-4 py-3 rounded-xl bg-primary text-white"
                  >
                    Create
                  </button>
                  <button
                    onClick={CloseGroup}
                    className="px-4 py-3 rounded-xl bg-red-700 text-white"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              grouplist.map((item) => (
                <div className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25">
                  <div className="flex items-center gap-4">
                    {data.uid == item.senderid ? (
                      <img
                        src={item && item.receiverPhoto}
                        alt="Women"
                        className="w-[70px] h-[70px] rounded-full"
                      />
                    ) : (
                      <img
                        src={item && item.senderPhoto}
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
                        {item && item.Date}
                      </p>
                    </div>
                  </div>
                  <button className="py-2 px-5 bg-primary rounded-lg text-white">
                    <MdOutlineGroupAdd className="text-white text-xl cursor-pointer" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupList;
