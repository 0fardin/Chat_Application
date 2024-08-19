import React from "react";
import GroupList from "./GroupList";
import Friends from "./Friends";
import FriendsRequest from "./FriendsRequest";
import MyGroup from "./MyGroup";
import Searchbar from "./Searchbar";
import UserList from "./UserList";
import BlockedUser from "./BlockedUser";
import Check from "../ContextCheck";
import CheckTwo from "../CheckTwo";

const Home = () => {
  return (
    <>
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
      </div>
    </>
  );
};

export default Home;
