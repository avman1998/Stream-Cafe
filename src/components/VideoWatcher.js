import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import Loader from "./Loader";
import ReactPlayer from "react-player";
export default function VideoWatcher() {
  const { user } = UserAuth();
  const { id } = useParams();
  const location = useLocation();
  const [videoData, setVideoData] = useState([]);

  // Storing History
  useEffect(() => {
    async function setDataFun(e) {
      if (user) {
        await addDoc(collection(db, `${user?.email}`), {
          url: location.pathname.slice(7),
        });
      }
    }
    setDataFun();
  }, [user, location]);

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a760903f0dmsh0ff0c07d17f9a99p130fffjsn4c276a048d96",
      "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
    },
  };
  useEffect(() => {
    async function getVideoData() {
      const data = await fetch(
        `https://youtube-v31.p.rapidapi.com/videos?part=contentDetails%2Csnippet%2Cstatistics&id=${id}`,
        options
      );
      const json = await data.json();
      // console.log(json?.items);
      setVideoData(json?.items);
    }
    getVideoData();
  }, []);
  const style = {
    width: "fit-content",
  };

  return videoData.length === 0 ? (
    <Loader />
  ) : (
    <div className=" flex flex-col  justify-start items-center  bg-black gap-[20px] min-h-[90vh]">
      <ReactPlayer
        className="react-player object-cover "
        controls
        width="100%"
        url={`https://www.youtube.com/watch?v=${id}`}
      />

      <h1 className="font-bold mt-[30px] text-[140%]  text-white mx-[10px] text-center">
        {videoData[0]?.snippet?.title}
      </h1>
      <div className="cursor-pointer mt-[70px] md:mt-[10px] text-[150%] flex  gap-[20px]">
        <div className="flex items-baseline font-bold gap-[10px]">
          <p className="text-white ">Like</p>{" "}
          <i className="text-white  fa-solid fa-thumbs-up"></i>
        </div>{" "}
        <div className=" cursor-pointer flex items-baseline font-bold gap-[10px]">
          <p className="text-white ">Add to Playlist</p>
          <i className="text-white  fa-sharp fa-solid fa-list mx-[10px]"></i>
        </div>
      </div>
      {/* <h1 className="font-bold">{videoData[0]?.snippet?.description}</h1> */}
    </div>
  );
}
// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=xE_rMj35BIM&key=AIzaSyCgTMvP2KORvN4PDT7cTceuSXH3QMUqDxs
