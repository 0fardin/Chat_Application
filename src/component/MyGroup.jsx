/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import Lips from "/public/Human.jpg";
import { getDatabase, onValue, ref } from "firebase/database";
import { useSelector } from "react-redux";

const MyGroup = () => {
  const db = getDatabase();
  let data = useSelector((state) => state.Userinfo.value);
  let [myGroupList, setMyGroupList] = useState([]);

  useEffect(() => {
    const group = ref(db, "MyGroup/");
    onValue(group, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push({ ...item.val(), key: item.key });
      });

      setMyGroupList(array);
    });
  }, []);

  return (
    <>
      <div className="w-[427px]  bg-white rounded-xl shadow-custom px-5 pt-5">
        <div className="flex justify-between mb-5">
          <h2 className="font-semibold text-xl text-black">My Group</h2>
          <BsThreeDotsVertical className="text-primary text-xl" />
        </div>
        <div className="w-full h-[330px] overflow-y-scroll">
          <div className="flex flex-col gap-7">
            {myGroupList.map((item) => (
              <div className="flex justify-between items-center pb-3 border-b-2 border-black border-opacity-25">
                <div className="flex items-center gap-4">
                  <img
                    src={Lips}
                    alt="Women"
                    className="w-[70px] h-[70px] rounded-full"
                  />
                  <div>
                    <h2 className="text-lg font-semibold text-black">
                      {item.name}
                    </h2>
                    <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                      {item.date}
                    </p>
                  </div>
                </div>
                {/* <p className="text-sm font-medium text-[#4D4D4D] opacity-75">
                  Today, 8:56pm
                </p> */}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyGroup;
