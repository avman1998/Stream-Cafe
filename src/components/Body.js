import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import { DATA_API } from "../config";
function VideoCard({ item }) {
  return (
    <div className="cursor-pointer md:max-w-[250px] rounded-full">
      <img
        src={item?.snippet?.thumbnails?.high?.url}
        alt="poster"
        className="w-[100%] object-cover max-h-[250px] transition ease-in-out delay-150 hover:-translate-3 hover:scale-110 duration-300 "
      />
      <p className="text-gray-200 font-bold md:text-[70%] my-[10px] m-[5px]">
        {item?.snippet?.title}
      </p>
    </div>
  );
}
export default function Body() {
  const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);
  // useEffect(() => {
  //   async function getVideos() {
  //     const data = await fetch(
  //       `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=50&q=trending&videoType=any&key=${DATA_API}`
  //     );
  //     const json = await data.json();
  //     // console.log(json);
  //     setVideos(json?.items);
  //     setSearch("");
  //     console.log(videos);
  //   }
  //   getVideos();
  //   // console.log(json);
  // }, []);
  async function getVideos() {
    const data = await fetch(
      `https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&maxResults=10&q=${search}&videoType=any&key=${DATA_API}`
    );
    const json = await data.json();
    // console.log(json);
    setVideos(json?.items);
    setSearch("");
    console.log(videos);
  }
  console.log(search);
  return (
    <div className="bg-black min-h-[100vh]">
      <div className="flex  justify-center items-center py-[30px]">
        <input
          type="text"
          placeholder="Search Here"
          className="p-[10px] bg-gray-200 outline-none rounded-tl-sm rounded-bl-sm"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button
          className="py-[10px] px-[13px] bg-yellow-300 rounded-tr-sm rounded-br-sm"
          onClick={getVideos}
        >
          <i className="fa-solid fa-magnifying-glass text-black"></i>
        </button>
      </div>
      (
      <div className="flex flex-wrap justify-center items-baseline gap-[25px] p-[30px]">
        {videos?.map((item, index) => {
          return (
            <Link to={`/video/${item?.id?.videoId}`} key={index}>
              <VideoCard item={item} />
            </Link>
          );
        })}
      </div>
      )
    </div>
  );
}
