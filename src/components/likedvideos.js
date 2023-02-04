import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Link, Navigate } from "react-router-dom";
import Loader from "./Loader";
import { removeDuplicates } from "../config";
export function LikedVideosCard({ item }) {
  return (
    <div className="cursor-pointer md:max-w-[250px] rounded-full">
      <img
        src={item?.snippet?.thumbnails?.medium?.url}
        alt="poster"
        className="w-[100%] transition ease-in-out delay-150 hover:-translate-3 hover:scale-110 duration-300 rounded-md object-cover max-h-[250px]"
      />
      <p className="text-white leading-[28px] font-bold md:text-[70%] my-[10px] m-[5px]">
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

  return likedVideos.length === 0 ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <h1 className="header text-white text-[130%] bg-bodyColor px-[30px] py-[10px] shadow-xl mt-[20px]">
        Liked Videos
      </h1>
      <div className="flex flex-wrap min-h-[90vh]  py-[20px] justify-center items-baseline gap-[25px]">
        {likedVideos?.map((item, index) => {
          return (
            <Link to={`/video/${item?.id}`} key={index}>
              <LikedVideosCard item={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
