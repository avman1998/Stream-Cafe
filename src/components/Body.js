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
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a760903f0dmsh0ff0c07d17f9a99p130fffjsn4c276a048d96",
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };
  useEffect(() => {
    async function getVideos() {
      const data = await fetch(
        `https://youtube-v31.p.rapidapi.com/search?q=music&part=snippet%2Cid&regionCode=US&maxResults=48&order=date`,
        options
      );
      const json = await data.json();
      // console.log(json);
      setVideos(json?.items);
      setSearch("");
      // console.log(videos);
    }
    getVideos();
    // console.log(json);
  }, []);

  async function getVideos() {
    const data = await fetch(
      `https://youtube-v31.p.rapidapi.com/search?q=${search}&part=snippet%2Cid&regionCode=US&maxResults=48&order=date`,
      options
    );
    const json = await data.json();
    // console.log(json);
    setVideos(json?.items);
    setSearch("");
    // console.log(videos);
  }

  // console.log(search);
  return (
    <div className="bg-black min-h-[90vh]">
      <div className="flex  justify-center items-center py-[20px]">
        <input
          type="text"
          placeholder="Search Here"
          className="p-[10px] bg-gray-200 outline-none rounded-tl-sm rounded-bl-sm"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <button
          className="py-[10px] px-[13px] bg-yellow-300 rounded-tr-sm rounded-br-sm"
          onClick={getVideos}
        >
          <i className="fa-solid fa-magnifying-glass text-black"></i>
        </button>
      </div>
      (
      <div className="flex flex-wrap justify-center items-baseline gap-[25px] ">
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
