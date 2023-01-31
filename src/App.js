import Header from "./components/Header";
import Body from "./components/Body";
import History from "./components/History";
import LikedVideos from "./components/likedvideos";
import Playlist from "./components/Playlist";
import VideoWatcher from "./components/VideoWatcher";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { AuthContextProvider } from "./context/AuthContext";
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
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
function App() {
  return (
    <AuthContextProvider>
      <div className="App">
        <Header />
        <Outlet />
      </div>
    </AuthContextProvider>
  );
}

export default App;
