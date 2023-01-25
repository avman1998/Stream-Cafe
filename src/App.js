import Header from "./components/Header";
import Body from "./components/Body";
import History from "./components/History";
import LikedVideos from "./components/likedvideos";
import Playlist from "./components/Playlist";
import VideoWatcher from "./components/VideoWatcher";
import { createBrowserRouter, Outlet } from "react-router-dom";
export const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/playlists",
        element: <Playlist />,
      },
      {
        path: "/history",
        element: <History />,
      },
      {
        path: "/liked-vidoes",
        element: <LikedVideos />,
      },
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/video/:id",
        element: <VideoWatcher />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </>
  );
}

export default App;
