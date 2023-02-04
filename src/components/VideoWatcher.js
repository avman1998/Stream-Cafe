import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { query, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { UserAuth } from "../context/AuthContext";
import { removeDuplicates } from "../config";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ReactPlayer from "react-player";
export default function VideoWatcher() {
  const navigate = useNavigate();
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const { user } = UserAuth();
  const { id } = useParams();
  const location = useLocation();
  const [videoData, setVideoData] = useState([]);
  const [like, setLike] = useState(false);
  const [isAddedToWatchList, setIsAddedToWatchList] = useState(false);
  const [watchListIds, setWatchListIds] = useState([]);
  function doLike() {
    if (user === null) {
      navigate("/login");
    }
    if (like === false) {
      setLike(true);
    }
  }
  function AddedToWatchList() {
    if (user === null) {
      navigate("/login");
    }
    const idOfVideo = location.pathname.slice(7);
    if (!newWatchListIDs.includes(idOfVideo)) {
      setIsAddedToWatchList(true);
    }
  }
  console.log(videoData);
  useEffect(() => {
    const q = query(collection(db, `${user?.email}-WatchList`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({ ...doc.data() });
      });

      setWatchListIds(data);
    });
    return () => unsubscribe();
  }, [user?.email]);
  console.log("isAddedToWatchList", isAddedToWatchList);
  console.log("WatchListIds", watchListIds);
  if (!watchListIds) return null;

  const newWatchListIDs = watchListIds?.map((item) => item?.url?.[0].id);
  console.log("newWatchListIDs", newWatchListIDs);
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
    <div className=" flex flex-col  justify-start items-center  mt-[30px] gap-[20px] min-h-[90vh]">
      <ReactPlayer
        className="react-player object-cover "
        controls
        width={isBigScreen ? "640px" : "100%"}
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
          <p className="text-white ">{!like ? "like" : "Liked"}</p>{" "}
          <i className="text-white  fa-solid fa-thumbs-up"></i>
        </div>{" "}
        <div
          onClick={() => AddedToWatchList()}
          className=" cursor-pointer flex items-baseline font-bold gap-[10px]"
        >
          <p className="text-white ">
            {!isAddedToWatchList ? "Add to Watch List" : "Added to Watch List"}
          </p>
          <i className="text-white  fa-sharp fa-solid fa-list mx-[10px]"></i>
        </div>
      </div>
      {/* <h1 className="font-bold">{videoData[0]?.snippet?.description}</h1> */}
    </div>
  );
}
// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=xE_rMj35BIM&key=AIzaSyCgTMvP2KORvN4PDT7cTceuSXH3QMUqDxs
