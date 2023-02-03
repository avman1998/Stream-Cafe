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
  const [like, setLike] = useState(false);
  const [isAddedToWatchList, setIsAddedToWatchList] = useState(false);
  function doLike() {
    if (like === false) {
      setLike(true);
    }
  }
  function AddedToWatchList() {
    if (isAddedToWatchList === false) {
      setIsAddedToWatchList(true);
    }
  }
  console.log(videoData);
  // Storing History
  useEffect(() => {
    if (videoData.length !== 0) {
      async function setDataFun(e) {
        if (user) {
          await addDoc(collection(db, `${user?.email}-History`), {
            url: videoData,
          });
        }
      }
      setDataFun();
    }
  }, [videoData]);

  //Adding Liked Videos
  useEffect(() => {
    if (videoData.length !== 0) {
      async function setDataFun(e) {
        if (user) {
          await addDoc(collection(db, `${user?.email}-Like`), {
            url: videoData,
          });
        }
      }
      setDataFun();
    }
  }, [like]);

  //Adding to Watch-List
  useEffect(() => {
    if (videoData.length !== 0) {
      async function setDataFun(e) {
        if (user) {
          await addDoc(collection(db, `${user?.email}-WatchList`), {
            url: videoData,
          });
        }
      }
      setDataFun();
    }
  }, [isAddedToWatchList]);

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
        playing={true}
        url={`https://www.youtube.com/watch?v=${id}`}
      />

      <h1 className="font-bold mt-[30px] text-[140%]  text-white mx-[10px] text-center">
        {videoData[0]?.snippet?.title}
      </h1>
      <div className="cursor-pointer mt-[70px] md:mt-[10px] text-[120%] flex  gap-[20px]">
        <div
          onClick={() => doLike()}
          className="flex items-baseline font-bold gap-[10px]"
        >
          <p className="text-white ">Like</p>{" "}
          <i className="text-white  fa-solid fa-thumbs-up"></i>
        </div>{" "}
        <div
          onClick={() => AddedToWatchList()}
          className=" cursor-pointer flex items-baseline font-bold gap-[10px]"
        >
          <p className="text-white ">Add to WatchList</p>
          <i className="text-white  fa-sharp fa-solid fa-list mx-[10px]"></i>
        </div>
      </div>
      {/* <h1 className="font-bold">{videoData[0]?.snippet?.description}</h1> */}
    </div>
  );
}
// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=xE_rMj35BIM&key=AIzaSyCgTMvP2KORvN4PDT7cTceuSXH3QMUqDxs
