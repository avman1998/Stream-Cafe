import React, { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
export function VideoCard({ item }) {
  return (
    <div className="mx-[5px] cursor-pointer md:max-w-[250px] rounded flex flex-col gap-[10px]">
      <img
        src={item?.snippet?.thumbnails?.medium?.url}
        alt="poster"
        className="rounded-md shadow w-[100%] object-cover max-h-[250px] transition ease-in-out delay-150 hover:-translate-3 hover:scale-110 duration-300 "
      />
      <p className="text-gray-300 font-bold md:text-[70%] my-[10px] m-[5px]">
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
        `https://youtube-v31.p.rapidapi.com/search?q=ps4&part=snippet%2Cid&regionCode=US&maxResults=48&order=date`,
        options
      );
      const json = await data.json();

      setVideos(json?.items);
    }
    getVideos();
  }, []);

  async function getVideos() {
    const data = await fetch(
      `https://youtube-v31.p.rapidapi.com/search?q=${search}&part=snippet%2Cid&regionCode=US&maxResults=48&order=date`,
      options
    );
    const json = await data.json();
    setVideos(json?.items);
    setSearch("");
    // console.log(videos);
  }

  // console.log(search);
  return (
    <div className=" min-h-[90vh]">
      <div className="flex justify-center items-center py-[40px]">
        <input
          type="text"
          placeholder="Search Here"
          className="search-input p-[10px] bg-none outline-none rounded-lg  text-white"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />

        <button
          className="py-[10px] px-[13px] bg-none  rounded-tr-sm rounded-br-sm"
          onClick={getVideos}
        >
          <i className="fa-solid fa-magnifying-glass text-white"></i>
        </button>
      </div>
      {videos.length === 0 ? (
        <Loader />
      ) : (
        <div className="flex flex-wrap justify-center items-baseline gap-[25px] ">
          {videos?.map((item, index) => {
            return (
              <Link to={`/video/${item?.id?.videoId}`} key={index}>
                <VideoCard item={item} />
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
