import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { removeDuplicates } from "../config";
export function LikedVideosCard({ item }) {
  return (
    <div className="cursor-pointer md:max-w-[250px] rounded-full">
      <img
        src={item?.snippet?.thumbnails?.medium?.url}
        alt="poster"
        className="w-[100%] object-cover max-h-[250px] transition ease-in-out delay-150 hover:-translate-3 hover:scale-110 duration-300 "
      />
      <p className="text-gray-800 font-bold md:text-[70%] my-[10px] m-[5px]">
        {item?.snippet?.title}
      </p>
    </div>
  );
}
export default function LikedVideos() {
  const { user } = UserAuth();
  const [likedVideos, setLikedVideos] = useState([]);
  useEffect(() => {
    const q = query(collection(db, `${user?.email}-Like`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });

      setLikedVideos(removeDuplicates(data.map((item) => item?.url[0])));
    });
    return () => unsubscribe();
  }, [user?.email]);
  console.log("LikedVideos", likedVideos);

  return (
    <div className="flex flex-wrap min-h-[90vh] bg-white py-[20px] justify-center items-baseline gap-[25px]">
      {likedVideos?.map((item, index) => {
        return (
          <Link to={`/video/${item?.id}`} key={index}>
            <LikedVideosCard item={item} />
          </Link>
        );
      })}
    </div>
  );
}
