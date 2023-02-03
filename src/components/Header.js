import { Link } from "react-router-dom";
import Burger from "./Burger";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
export default function Header() {
  const { user, logout } = UserAuth();
  console.log(user);
  const navigate = useNavigate();
  async function handleLogOut() {
    try {
      await logout();
      console.log(user?.displayName);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="header flex bg-blue-400 font-bold justify-between items-center p-[10px]  min-h-[10vh] ">
      <Burger />
      <h1 className="text-[110%] md:text-[150%] font-bold relative left-5 md:left-10 top-1 text-white">
        Stream Cafe
      </h1>
      <div className=" flex gap-[5px] md:gap-[30px]">
        {user && <p className="bg-black text-[80%]">{user?.displayName}</p>}
        {!user && (
          <Link to="/signup">
            <button className="px-[10px]  py-[5px]  rounded bg-white  text-blue-400 text-[80%]">
              Sign Up
            </button>
          </Link>
        )}
        {!user && (
          <Link to="/login">
            <button className="px-[10px] py-[5px]  rounded bg-white  text-blue-400 text-[80%]">
              Log In
            </button>
          </Link>
        )}
        {user && (
          <button
            className="px-[10px] py-[5px]  rounded bg-white  text-blue-400 text-[80%]"
            onClick={() => {
              handleLogOut();
            }}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
}
