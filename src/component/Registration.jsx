/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import Regis from "../assets/Registration.png";
import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Registration = () => {
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");

  let handleemail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
  };
  let handleName = (e) => {
    setName(e.target.value);
    setNameerr("");
  };
  let handlePassword = (e) => {
    setPassword(e.target.value);
    setPassworderr("");
  };

  let handlesignup = () => {
    if (!email) {
      setEmailerr("*Email is resquired");
    }
    if (!name) {
      setNameerr("*Name is resquired");
    }
    if (!password) {
      setPassworderr("*Password is resquired");
    }
  };

  return (
    <>
      <div className="w-full h-screen flex">
        <div className="w-2/4 h-full flex justify-end items-center">
          <div className="mr-[69px]">
            <h1 className="w-[497px] text-[34px] font-bold text-secondary">
              Get started with easily register
            </h1>
            <p className="w-[313px] mt-3 text-[20px] text-black opacity-50">
              Free register and you can enjoy it
            </p>
            <div className="w-[368px] h-[81px] relative mt-[61px]">
              <input
                onChange={handleemail}
                value={email}
                className=" px-5 w-full h-full border border-secondary rounded-lg opacity-50"
                type="email"
                placeholder="Enter Your Email"
              />
              <label className="text-[13px] font-semibold absolute top-[-9px] left-10 bg-white px-5 text-secondary text-opacity-70">
                Email Address
              </label>
              {emailerr && (
                <div>
                  <input className="px-5 w-full h-full border border-red-600 rounded-lg absolute top-0 left-0" />
                  <label className="text-[13px] font-semibold absolute top-[-9px] left-10 bg-white px-5 text-red-600">
                    Email Address{" "}
                  </label>
                  <p className="text-red-600 text-sm font-bold">{emailerr}</p>
                </div>
              )}
            </div>
            <div className="w-[368px] h-[81px] relative mt-[61px]">
              <input
                onChange={handleName}
                value={name}
                className="px-5 w-full h-full border border-secondary rounded-lg opacity-50"
                type="text"
                placeholder="Enter Your Name"
              />
              <label className="text-[13px] font-semibold absolute top-[-9px] left-10 bg-white px-5 text-secondary text-opacity-70">
                Full Name
              </label>
              {nameerr && (
                <div>
                  <input className="px-5 w-full h-full border border-red-600 rounded-lg absolute top-0 left-0" />
                  <label className="text-[13px] font-semibold absolute top-[-9px] left-10 bg-white px-5 text-red-600">
                    Full Name{" "}
                  </label>
                  <p className="text-red-600 text-sm font-bold">{nameerr}</p>
                </div>
              )}
            </div>
            <div className="w-[368px] h-[81px] relative mt-[61px]">
              <input
                onChange={handlePassword}
                value={password}
                className="px-5 w-full h-full border border-secondary rounded-lg opacity-50 relative"
                type="password"
                placeholder="Enter Your Password"
              />
              <IoEye className=" text-3xl absolute top-2/4 right-10 translate-y-[-50%] cursor-pointer opacity-60" />
              <IoEyeOff className=" text-3xl absolute top-2/4 right-10 translate-y-[-50%] cursor-pointer opacity-60" />
              <label className="text-[13px] font-semibold absolute top-[-9px] left-10 bg-white px-5 text-secondary text-opacity-70">
                Password
              </label>
              {passworderr && (
                <div>
                  <input
                    className="px-5 w-full h-full border border-red-600 rounded-lg absolute top-0 left-0"
                    type="password"
                  />
                  <label className="text-[13px] font-semibold absolute top-[-9px] left-10 bg-white px-5 text-red-600">
                    Password{" "}
                  </label>
                  <p className="text-red-600 text-sm font-bold">
                    {passworderr}
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={handlesignup}
              className="w-[368px] h-[67px] bg-primary rounded-[86px] text-white mt-[51px]"
            >
              Sign Up
            </button>
            <p className="w-[368px] text-center text-sm text-secondary font-normal mt-[35px]">
              Already have an account ?{" "}
              <Link className="text-[#EA6C00] font-bold"> Sign In</Link>
            </p>
          </div>
        </div>
        <div className="w-2/4 h-full ">
          <img
            className="w-full h-full object-cover"
            src={Regis}
            alt="Regis_img"
          />
        </div>
      </div>
    </>
  );
};

export default Registration;
