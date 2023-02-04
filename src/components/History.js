import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { VideoCard } from "./Body";
import { Link } from "react-router-dom";
import { removeDuplicates } from "../config";
import Loader from "./Loader";
export function HistoryCard({ item }) {
  return (
    <div className="cursor-pointer md:max-w-[250px] rounded-full">
      <img
        src={item?.snippet?.thumbnails?.medium?.url}
        alt="poster"
        className="w-[100%] object-cover max-h-[250px] transition ease-in-out delay-150 hover:-translate-3 hover:scale-110 duration-300 "
      />
      <p className="text-white leading-[28px] font-bold md:text-[70%] my-[10px] m-[5px]">
        {item?.snippet?.title}
      </p>
    </div>
  );
}
export default function History() {
  const { user } = UserAuth();
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const q = query(collection(db, `${user?.email}-History`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data(), id: doc.id });
      });
      setHistory(removeDuplicates(data.map((item) => item?.url[0])));
    });
    return () => unsubscribe();
  }, [user?.email]);
  console.log(history);
  return history.length === 0 ? (
    <Loader />
  ) : (
    <div className="flex flex-col justify-center items-center gap-[20px]">
      <h1 className="header text-white text-[130%] bg-bodyColor px-[30px] py-[10px] shadow-xl mt-[20px]">
        History
      </h1>
      <div className="flex flex-wrap min-h-[90vh]  py-[20px] justify-center items-baseline gap-[25px]">
        {history?.map((item, index) => {
          return (
            <Link to={`/video/${item?.id}`} key={index}>
              <HistoryCard item={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
