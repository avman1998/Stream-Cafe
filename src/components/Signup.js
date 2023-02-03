import React, { useEffect, useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
export default function Signup() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "",
    emailaddress: "",
    password: "",
  });
  const { user, createUser, setName } = UserAuth();
  async function handleSubmit() {
    try {
      await createUser(userInfo.emailaddress, userInfo.password);
      await setName(userInfo.name);
      console.log(user?.displayName);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] gap-[20px] bg-white">
      <div className="flex flex-col gap-[20px]">
        <label className="tetx-black font-bold">Name : </label>
        <input
          type="text"
          placeholder="Enter your name here..."
          className="p-[10px] rounded border-2 border-blue-400"
          value={userInfo.name}
          onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
        />
      </div>
      <div className=" flex flex-col gap-[20px]">
        <label className="tetx-black font-bold">Email : </label>
        <input
          type="email"
          placeholder="Enter your email here..."
          value={userInfo.emailaddress}
          className="p-[10px] rounded border-2 border-blue-400"
          onChange={(e) =>
            setUserInfo({ ...userInfo, emailaddress: e.target.value })
          }
        />
      </div>
      <div className=" flex flex-col gap-[20px]">
        <label className="tetx-black font-bold">Password : </label>
        <input
          type="password"
          value={userInfo.password}
          placeholder="Enter your password here..."
          className="p-[10px] rounded border-2 border-blue-400"
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
      </div>
      <button
        onClick={() => handleSubmit()}
        className="mt-[20px]  p-[10px] bg-blue-400 text-white text-[110%] font-bold rounded"
      >
        Sign Up
      </button>
    </div>
  );
}
