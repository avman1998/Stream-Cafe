import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { removeDuplicates } from "../config";
import { doc, deleteDoc } from "firebase/firestore";
import Loader from "./Loader";
export function WatchListCard({ item, index }) {
  const { user } = UserAuth();
  const navigate = useNavigate();
  console.log("navigate", navigate);
  useEffect(() => {
    if (user == null) navigate("/login");
  });
  async function del() {
    await deleteDoc(doc(db, `${user?.email}-WatchList`, `${item.id}`));
  }
  return (
    <div className="flex  items-center  flex-col m-[0px] justify-center gap-[10px] md:ml-[40px] ">
      <img
        alt="img"
        src={item?.url[0].snippet?.thumbnails?.medium?.url}
        className="rounded-md md:h-[200px] w-[100%] mt-[20px] justify-center items-center md:ml-[17px]  object-cover transition ease-in-out delay-150 hover:-translate-3 hover:scale-110 duration-300 cursor-pointer"
      />
      <h1 className="flex overflow-hidden text-lg w-[250px] truncate font-bold mt-[5px] text-white ">
        {item?.url[0].snippet?.title}
      </h1>

      <div className="flex gap-[10px]">
        <Link to={`/video/${item?.url[0].id}`}>
          <button className=" p-[10px] text-white bg-bodyColor font-bold shadow-xl rounded">
            Play
          </button>
        </Link>
        <button
          className=" p-[10px]  text-white bg-bodyColor font-bold shadow-xl rounded"
          onClick={() => del()}
        >
          Remove from WatchList
        </button>
      </div>
    </div>
  );
}
export default function WatchList() {
  const { user } = UserAuth();
  const [watchListVideos, setWatchListVideos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, `${user?.email}-WatchList`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setWatchListVideos(removeDuplicates(data));
    });
    return () => unsubscribe();
  }, [user?.email]);
  console.log("Watch Videos", watchListVideos);

  return watchListVideos.length === 0 ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <h1 className="header text-white text-[130%] bg-bodyColor px-[30px] py-[10px] shadow-xl mt-[20px]">
        Watch List
      </h1>
      <div className="flex flex-wrap min-h-[90vh]  py-[20px] justify-center items-baseline gap-[25px]">
        {watchListVideos?.map((item, index) => {
          return <WatchListCard item={item} index={index} />;
        })}
      </div>
    </div>
  );
}
