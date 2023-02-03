import React from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
export default function Login() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = React.useState({
    emailaddress: "amanver@123.com",
    password: "123456",
  });
  const { signIn, setName } = UserAuth();
  async function handleSubmit() {
    try {
      await signIn(userInfo.emailaddress, userInfo.password);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center min-h-[90vh] gap-[20px] bg-white">
      <div className=" flex flex-col gap-[20px]">
        <label className="text-bblack font-bold">Email : </label>
        <input
          type="email"
          placeholder="Enter your email here..."
          className="p-[10px] rounded border-2 border-red-300"
          value={userInfo.emailaddress}
          onChange={(e) =>
            setUserInfo({ ...userInfo, emailaddress: e.target.value })
          }
        />
      </div>
      <div className=" flex flex-col gap-[20px]">
        <label className="text-black font-bold">Password : </label>
        <input
          type="password"
          placeholder="Enter your password here..."
          className="p-[10px] rounded border-2 border-red-300"
          value={userInfo.password}
          onChange={(e) =>
            setUserInfo({ ...userInfo, password: e.target.value })
          }
        />
      </div>
      <button
        onClick={() => handleSubmit()}
        className="mt-[20px] p-[10px] bg-blue-400 text-white text-[110%] w-auto font-bold rounded"
      >
        Log In
      </button>
    </div>
  );
}
