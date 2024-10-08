/* eslint-disable no-useless-escape */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import Regis from "../assets/Login.jpg";
import { Link, useNavigate } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { FaFacebookF } from "react-icons/fa";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { UserLogininfo } from "../slice/UserSlice";
import { getDatabase, ref, set } from "firebase/database";
import moment from "moment";

const Login = () => {
  const db = getDatabase();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const providerFa = new FacebookAuthProvider();
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [emailerr, setEmailerr] = useState("");
  let [passworderr, setPassworderr] = useState("");
  let [passwordshow, setPasswordshow] = useState(false);

  let handleemail = (e) => {
    setEmail(e.target.value);
    setEmailerr("");
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
    if (!password) {
      setPassworderr("*Password is required");
    }
    if (email && password) {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(UserLogininfo(user));
          localStorage.setItem("user", JSON.stringify(user));
          setEmail("");
          setPassword("");
          navigate("/");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          if (errorCode.includes("auth/invalid-credential")) {
            setEmailerr("Invalid Email or Password");
            setPassworderr("Invalid Email or Password");
          }
        });
    }
  };
  let handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(UserLogininfo(user));
        localStorage.setItem("user", JSON.stringify(user));
        set(ref(db, "users/" + userCredential.user.uid), {
          username: userCredential.user.displayName,
          email: userCredential.user.email,
          profile_picture: userCredential.user.photoURL,
          Date: moment().format("MM D YYYY, h:mm:ss a"),
        }).then(() => {
          setEmail("");
          setPassword("");
          navigate("/");
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  let handleFacebookLogin = () => {
    signInWithPopup(auth, providerFa)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="w-full h-screen lg:flex">
        <div className="lg:w-2/4 w-full lg:h-full flex xl:justify-end justify-center items-center sm:p-5">
          <div className="xl:mr-[69px]">
            <h1 className="lg:w-[497px] lg:text-[34px] text-2xl font-bold text-secondary">
              Login to your account!
            </h1>
            <div className=" flex lg:gap-3 gap-1">
              <Link
                onClick={handleGoogleLogin}
                className="lg:w-[235px] w-fit lg:py-[22px] lg:px-[42px] p-3 border rounded-lg border-secondary border-opacity-30 mt-[29px] flex gap-3 items-center"
              >
                <FcGoogle />
                <h5 className="font-bold text-secondary text-sm">
                  Login with Google
                </h5>
              </Link>
              <Link
                onClick={handleFacebookLogin}
                className="lg:w-[249px] w-fit lg:py-[22px] lg:px-[42px] p-3 border rounded-lg border-secondary border-opacity-30 mt-[29px] flex gap-3 items-center"
              >
                <FaFacebookF />
                <h5 className="font-bold text-secondary text-sm">
                  Login with Facebook
                </h5>
              </Link>
            </div>
            <div className="lg:w-[368px] w-full h-[81px] relative mt-[61px]">
              <input
                onChange={handleemail}
                value={email}
                className={`px-5 w-full h-full border-b ${
                  emailerr ? "border-red-600" : "border-secondary"
                } rounded-lg opacity-50`}
                type="email"
                placeholder="Enter Your Email"
              />
              <label
                className={`text-[13px] font-semibold absolute top-[-9px] left-1 bg-white px-5 ${
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

            <div className="lg:w-[368px] w-full h-[81px] relative mt-[61px]">
              <input
                onChange={handlePassword}
                value={password}
                className={`px-5 w-full h-full border-b ${
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
                className={`text-[13px] font-semibold absolute top-[-9px] left-1 bg-white px-5 ${
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
            <button
              onClick={handlesignup}
              className="lg:w-[368px] w-full lg:h-[67px] p-4 bg-primary rounded-lg text-white font-bold mt-[51px]"
            >
              Login to Continue
            </button>
            <p className="lg:w-[368px] w-full text-center text-sm text-secondary font-normal mt-[35px]">
              Don't have an account ?{" "}
              <Link to={"/Registration"} className="text-[#EA6C00] font-bold">
                {" "}
                Sign Up
              </Link>
            </p>
          </div>
        </div>
        <div className="lg:w-2/4 h-full hidden lg:block">
          <img
            className="w-full h-full object-center"
            src={Regis}
            alt="Regis_img"
          />
        </div>
      </div>
    </>
  );
};

export default Login;
