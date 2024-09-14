/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import Regis from "../assets/Registration.png";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import {
  getAuth,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { RotatingLines } from "react-loader-spinner";
import Human from "/public/Human.jpg";
import { useDispatch } from "react-redux";
import { UserLogininfo } from "../../UserSlice";
import moment from "moment";

const Registration = () => {
  const db = getDatabase();
  const auth = getAuth();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [name, setName] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [nameerr, setNameerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [passwordshow, setPasswordshow] = useState(false);
  let [success, setSuccess] = useState(false);

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
      setEmailerr("*Email is required");
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr("**Invalid Email");
    }
    if (!name) {
      setNameerr("*Name is required");
    }
    if (!password) {
      setPassworderr("*Password is required");
    }
    if (email && name && password) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          sendEmailVerification(auth.currentUser).then(() => {
            updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: Human,
            })
              .then(() => {
                set(ref(db, "users/" + userCredential.user.uid), {
                  username: userCredential.user.displayName,
                  email: userCredential.user.email,
                  profile_picture: Human,
                  Date: moment().format("MM D YYYY, h:mm:ss a"),
                }).then(() => {
                  setSuccess(true);
                  setTimeout(() => {
                    navigate("/login");
                  }, 1000);
                });
              })
              .catch((error) => {
                console.log(error);
              });
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/email-already-in-use")) {
            setEmailerr("***This Email already in use");
          }
        });
    }
  };

  return (
    <>
      <div className="w-full h-screen lg:flex">
        <div className="lg:w-2/4 w-full lg:h-full flex xl:justify-end justify-center items-center py-5">
          <div className="xl:mr-[69px]">
            <h1 className="lg:w-[497px] lg:text-[34px] text-2xl font-bold text-secondary">
              Get started with easily register
            </h1>
            <p className="lg:w-[313px] mt-3 lg:text-[20px] text-lg text-black opacity-50">
              Free register and you can enjoy it
            </p>
            <div className="lg:w-[368px] w-full h-[81px] relative mt-[61px]">
              <input
                onChange={handleemail}
                value={email}
                className={`px-5 w-full h-full border ${
                  emailerr ? "border-red-600" : "border-secondary"
                } rounded-lg opacity-50`}
                type="email"
                placeholder="Enter Your Email"
              />
              <label
                className={`text-[13px] font-semibold absolute top-[-9px] left-10 bg-white px-5 ${
                  emailerr ? "text-red-600" : "text-secondary"
                } text-opacity-70`}
              >
                Email Address
              </label>
              {emailerr && (
                <div>
                  <p className="text-red-600 text-sm font-bold">{emailerr}</p>
                </div>
              )}
            </div>
            <div className="lg:w-[368px] w-full h-[81px] relative lg:mt-[61px] mt-10">
              <input
                onChange={handleName}
                value={name}
                className={`px-5 w-full h-full border ${
                  nameerr ? "border-red-600" : "border-secondary"
                } rounded-lg opacity-50`}
                type="text"
                placeholder="Enter Your Name"
              />
              <label
                className={`text-[13px] font-semibold absolute top-[-9px] left-10 bg-white px-5  ${
                  nameerr ? "text-red-600" : "text-secondary"
                }  text-opacity-70`}
              >
                Full Name
              </label>
              {nameerr && (
                <div>
                  <p className="text-red-600 text-sm font-bold">{nameerr}</p>
                </div>
              )}
            </div>
            <div className="lg:w-[368px] w-full h-[81px] relative lg:mt-[61px] mt-10">
              <input
                onChange={handlePassword}
                value={password}
                className={`px-5 w-full h-full border ${
                  passworderr ? "border-red-600" : "border-secondary"
                } rounded-lg opacity-50 relative`}
                type={passwordshow ? "text" : "password"}
                placeholder="Enter Your Password"
              />
              {passwordshow ? (
                <IoEye
                  onClick={() => setPasswordshow(false)}
                  className=" text-3xl absolute top-2/4 right-10 translate-y-[-50%] cursor-pointer opacity-60"
                />
              ) : (
                <IoEyeOff
                  onClick={() => setPasswordshow(true)}
                  className=" text-3xl absolute top-2/4 right-10 translate-y-[-50%] cursor-pointer opacity-60"
                />
              )}
              <label
                className={`text-[13px] font-semibold absolute top-[-9px] left-10 bg-white px-5 ${
                  passworderr ? "text-red-600" : "text-secondary"
                } text-opacity-70`}
              >
                Password
              </label>
              {passworderr && (
                <div>
                  <p className="text-red-600 text-sm font-bold">
                    {passworderr}
                  </p>
                </div>
              )}
            </div>
            {success ? (
              <div className="lg:w-[368px] w-full flex justify-center mt-5">
                <RotatingLines
                  visible={true}
                  height="60"
                  width="60"
                  strokeColor="#5f35f5"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              </div>
            ) : (
              <button
                onClick={handlesignup}
                className="lg:w-[368px] w-full h-[67px] bg-primary rounded-[86px] text-white font-bold lg:mt-[51px] mt-10"
              >
                Sign Up
              </button>
            )}

            <p className="lg:w-[368px] w-full text-center text-sm text-secondary font-normal lg:mt-[35px] mt-5">
              Already have an account ?{" "}
              <Link to={"/Login"} className="text-[#EA6C00] font-bold">
                {" "}
                Sign In
              </Link>
            </p>
          </div>
        </div>
        <div className="lg:w-2/4 h-full hidden lg:block">
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
