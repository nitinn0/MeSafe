import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Applayout from "./Layout/Applayout";
import Home from "./Pages/Home";
import DetectAI from './Pages/DetectAI';
// import DetectDeepFake from './Pages/DetectDeepFake';
import Login from './Pages/Login';
import VideoModeration from "./Pages/VideoModeration";

const app = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Applayout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/DetectAi",
          element: <DetectAI />,
        },
        {
          path: "/VideoModeration",
          element: <VideoModeration />,
        },
        {
          path: "/signin",
          element: <Login />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};

export default app;
