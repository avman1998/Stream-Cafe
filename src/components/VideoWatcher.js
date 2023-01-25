import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "./Loader";
export default function VideoWatcher() {
  const { id } = useParams();
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    async function getVideoData() {
      const data = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=AIzaSyCgTMvP2KORvN4PDT7cTceuSXH3QMUqDxs`
      );
      const json = await data.json();
      console.log(json?.items);
      setVideoData(json?.items);
    }
    getVideoData();
  }, []);

  console.log(videoData);
  return videoData.length === 0 ? (
    <Loader />
  ) : (
    <>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
      <h1 className="text-black">{videoData[0]?.snippet?.title}</h1>
      <h1 className="text-black">{videoData[0]?.snippet?.description}</h1>
    </>
  );
}
// https://www.googleapis.com/youtube/v3/videos?part=snippet&id=xE_rMj35BIM&key=AIzaSyCgTMvP2KORvN4PDT7cTceuSXH3QMUqDxs
