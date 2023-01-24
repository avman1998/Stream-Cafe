import Burger from "./Burger";
export default function Header() {
  return (
    <div className="header flex bg-yellow-300 font-bold justify-between items-center p-[10px] ">
      <Burger />
      <h1 className="text-[110%] md:text-[150%] font-bold relative left-5 md:left-10 top-1">
        Stream Cafe
      </h1>
      <div className="flex gap-[5px] md:gap-[30px]">
        <button className="px-[10px]  py-[5px]  rounded bg-black  text-yellow-300 text-[80%]">
          Sign Up
        </button>
        <button className="px-[10px] py-[5px]  rounded bg-black  text-yellow-300 text-[80%]">
          Log In
        </button>
      </div>
    </div>
  );
}
