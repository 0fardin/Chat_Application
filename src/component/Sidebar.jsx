import React, { createRef, useState } from "react";
import women from "../assets/lady5.jpg";
import { IoHomeOutline } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { ImExit } from "react-icons/im";
import { MdOutlineCloudUpload } from "react-icons/md";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadString,
} from "firebase/storage";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { v4 as uuid } from "uuid";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { UserLogininfo } from "../../UserSlice";
import { ProgressBar } from "react-loader-spinner";
import Human from "/public/Human.jpg";
import { getDatabase, ref as dref, update, remove } from "firebase/database";
import moment from "moment";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const Sidebar = () => {
  let data = useSelector((state) => state);
  let dispatch = useDispatch();
  const db = getDatabase();
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();
  const [image, setImage] = useState("");
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();
  let [imageModal, setImageModal] = useState(false);
  let [success, setSuccess] = useState(false);

  let handleFile = (e) => {
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  let handleSubmit = () => {
    const storageRef = ref(storage, uuid());
    if (typeof cropperRef.current?.cropper !== "undefined") {
      setSuccess(true);
      setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      const message4 = cropperRef.current?.cropper
        .getCroppedCanvas()
        .toDataURL();
      uploadString(storageRef, message4, "data_url").then(() => {
        getDownloadURL(storageRef).then((downloadURL) => {
          updateProfile(auth.currentUser, {
            photoURL: downloadURL,
          })
            .then(() => {
              dispatch(UserLogininfo(auth.currentUser));
              update(dref(db, "users/" + data.Userinfo.value.uid), {
                profile_picture: downloadURL,
              });
            })
            .then(() => {
              setSuccess(false);
              setCropData("");
              setImage("");
              setImageModal(false);
            });
        });
      });
    }
  };

  let handleLogOut = () => {
    const user = auth.currentUser;
    const uid = user.uid;
    const credential = EmailAuthProvider.credential(
      user.email,
      prompt("Please confirm your password")
    );
    reauthenticateWithCredential(user, credential)
      .then(() => {
        console.log("User re-authenticated.");
        deleteUser(user)
          .then(() => {
            // localStorage.removeItem("user");
            const userRef = ref(db, "users/" + uid);
            return remove(userRef);
          })
          .then(() => {
            console.log("User deleted from Firebase Realtime Database.");
          })
          .catch((error) => {
            console.error("Error removing user from Firebase:", error);
          });
      })
      .catch((error) => {
        console.error("Error re-authenticating:", error);
      });
  };

  return (
    <>
      <div className=" h-screen p-5">
        <div className="w-[186px] h-full bg-primary rounded-lg flex flex-col justify-between">
          <div className="pt-10">
            <div className="w-[100px] h-[100px] mx-auto rounded-full relative group cursor-pointer">
              <img
                className="w-full h-full rounded-full"
                src={(data && data?.Userinfo?.value?.photoURL) || Human} // Nullish coalescing operator
                alt={
                  data?.Userinfo?.value?.photoURL
                    ? "User photo"
                    : "Human placeholder"
                }
              />

              <h1 className=" text-white text-xl font-bold text-center mt-4">
                {data && data.Userinfo.value.displayName}
              </h1>
              <div
                onClick={() => setImageModal(true)}
                className="w-full h-full rounded-full bg-black/75 absolute top-0 left-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300"
              >
                <MdOutlineCloudUpload className="text-white font-bold text-3xl " />
              </div>
            </div>
          </div>
          <div className="flex gap-24 flex-col">
            <div className="relative">
              <div className="w-[161px] h-[89px] bg-white ml-auto rounded-s-lg relative after:w-3 after:h-full after:bg-primary after:absolute after:top-0 after:right-0 after:rounded-s-lg shadow-2xl"></div>
              <IoHomeOutline className="text-primary text-[46px] mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] " />
            </div>
            <div className="relative">
              <div className="hidden w-[161px] h-[89px] bg-white ml-auto rounded-s-lg relative after:w-3 after:h-full after:bg-primary after:absolute after:top-0 after:right-0 after:rounded-s-lg shadow-2xl"></div>
              <AiFillMessage className="text-[#BAD1FF] text-[46px] mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] " />
            </div>
            <div className="relative">
              <div className="hidden w-[161px] h-[89px] bg-white ml-auto rounded-s-lg relative after:w-3 after:h-full after:bg-primary after:absolute after:top-0 after:right-0 after:rounded-s-lg shadow-2xl"></div>
              <IoMdNotificationsOutline className="text-white text-[46px] mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] " />
            </div>
            <div className="relative">
              <div className="hidden w-[161px] h-[89px] bg-white ml-auto rounded-s-lg relative after:w-3 after:h-full after:bg-primary after:absolute after:top-0 after:right-0 after:rounded-s-lg shadow-2xl"></div>
              <IoSettingsOutline className="text-white text-5xl mx-auto absolute top-2/4 left-2/4 translate-x-[-50%] translate-y-[-50%] " />
            </div>
          </div>
          <div className="pb-10">
            <ImExit
              onClick={handleLogOut}
              className="text-[46px] text-white mx-auto cursor-pointer"
            />
          </div>
        </div>
      </div>
      {imageModal && (
        <div className=" w-full h-screen bg-black/70 absolute top-0 left-0 flex justify-center items-center z-50">
          <div className=" w-[500px] bg-white rounded-lg border border-primary p-5 flex flex-col gap-10">
            <div className="flex flex-col gap-3">
              <h1 className="text-black text-xl font-medium">
                <span className="text-primary font-bold">Upload</span> Your
                Profile Picture{" "}
                <span className="text-primary font-extrabold ">!</span>
              </h1>
              <input onChange={handleFile} type="file"></input>
              {image && (
                <Cropper
                  ref={cropperRef}
                  style={{ height: 400, width: "100%" }}
                  zoomTo={0.5}
                  initialAspectRatio={1}
                  preview=".img-preview"
                  src={image}
                  viewMode={1}
                  minCropBoxHeight={10}
                  minCropBoxWidth={10}
                  background={false}
                  responsive={true}
                  autoCropArea={1}
                  checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                  guides={true}
                />
              )}
            </div>
            <div className="flex justify-between items-center">
              {success ? (
                <div>
                  <ProgressBar
                    visible={true}
                    height="80"
                    width="80"
                    color="#4fa94d"
                    barColor="#5F35F5"
                    borderColor="#5F35F5"
                    ariaLabel="progress-bar-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                  />
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  className=" px-4 py-3 bg-white border border-primary rounded-lg text-primary font-bold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Submit
                </button>
              )}

              <button
                onClick={() => setImageModal(false)}
                className=" px-4 py-3 bg-white border border-red-600 rounded-lg text-red-700 font-bold hover:bg-red-600 hover:text-white transition-all duration-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
