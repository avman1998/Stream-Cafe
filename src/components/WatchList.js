import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { removeDuplicates } from "../config";
import { doc, deleteDoc } from "firebase/firestore";
export function WatchListCard({ item, index }) {
  const { user } = UserAuth();
  async function del() {
    await deleteDoc(doc(db, `${user?.email}-WatchList`, `${item.id}`));
  }
  return (
    <div className="cursor-pointer md:max-w-[250px] rounded-full">
      <img
        src={item?.url[0].snippet?.thumbnails?.medium?.url}
        alt="poster"
        className="w-[100%] object-cover max-h-[250px] transition ease-in-out delay-150 hover:-translate-3 hover:scale-110 duration-300 "
      />
      <p className="text-gray-800 font-bold md:text-[70%] my-[10px] m-[5px]">
        {item?.url[0].snippet?.title}
      </p>
      <div className="flex justify-between">
        <Link to={`/video/${item?.id}`}>
          <button className="text-[60%] p-[5px] bg-blue-100 rounded hover:bg-green-500 hover:text-white">
            Play Video
          </button>
        </Link>
        <button
          className="text-[60%] p-[5px] bg-blue-100 rounded hover:bg-red-500 hover:text-white"
          onClick={() => del()}
        >
          Remove from Watch-List
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

  return (
    <div className="flex flex-wrap min-h-[90vh] bg-white py-[20px] justify-center items-baseline gap-[25px]">
      {watchListVideos?.map((item, index) => {
        return <WatchListCard item={item} index={index} />;
      })}
    </div>
  );
}
