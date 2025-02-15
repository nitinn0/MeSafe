import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Applayout from "./Layout/Applayout";
import Home from "./Pages/Home";
import DetectAI from './Pages/DetectAI';
import VideoModeration from "./Pages/VideoModeration";
import MainPg from "./Layout/MainPg";

const router = createHashRouter([
  {
    path: "/",
    element: <Applayout />, 
    children: [
      {
        path: "", 
        element: (
          <>
            <Home />
          </>
        ),
      },
      {
        path: "DetectAi", 
        element: <DetectAI />,
      },
      {
        path: "VideoModeration", 
        element: <VideoModeration />,
      }
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
