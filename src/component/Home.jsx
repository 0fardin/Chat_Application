import React, { useEffect, useState } from "react";
import GroupList from "./GroupList";
import Friends from "./Friends";
import FriendsRequest from "./FriendsRequest";
import MyGroup from "./MyGroup";
import Searchbar from "./Searchbar";
import UserList from "./UserList";
import BlockedUser from "./BlockedUser";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { UserLogininfo } from "../slice/UserSlice";

const Home = () => {
  const auth = getAuth();
  let dispatch = useDispatch();
  let [verify, setVerify] = useState(false);
  let navigate = useNavigate();
  let data = useSelector((state) => state.Userinfo.value);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(UserLogininfo(user));
        // localStorage.setItem("user", JSON.stringify(user));
      } else {
        navigate("/Login");
        setVerify(false);
      }
    });
  }, [auth, dispatch, navigate]);

  useEffect(() => {
    if (!data) {
      navigate("/Login");
    } else if (!data.emailVerified) {
      setVerify(false);
    } else {
      setVerify(true);
    }
  }, [data, navigate]);

  return (
    <>
      {verify ? (
        <div className=" flex justify-around">
          <div className="flex flex-col gap-3">
            <Searchbar />
            <GroupList />
            <Friends />
          </div>
          <div className="flex flex-col gap-3">
            <FriendsRequest />
            <MyGroup />
          </div>
          <div className="flex flex-col gap-3">
            <UserList />
            <BlockedUser />
          </div>
          {/* <div>
            <Messages />
          </div> */}
        </div>
      ) : (
        <div>
          <div className=" w-full h-screen bg-black/90  absolute top-0 left-0 flex justify-center items-center">
            <div className=" w-[500px] h-[300px] rounded-lg bg-primary/90 text-white text-2xl font-bold flex justify-center items-center">
              Please Verify Your Email !{" "}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
