import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { VideoCard } from "./Body";
import { Link } from "react-router-dom";
import { removeDuplicates } from "../config";
export function HistoryCard({ item }) {
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
  return (
    <div className="flex flex-wrap min-h-[90vh] bg-white py-[20px] justify-center items-baseline gap-[25px]">
      {history?.map((item, index) => {
        return (
          <Link to={`/video/${item?.id}`} key={index}>
            <HistoryCard item={item} />
          </Link>
        );
      })}
    </div>
  );
}
