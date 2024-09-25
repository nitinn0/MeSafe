import { createHashRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Applayout from "./Layout/Applayout";
import Home from "./Pages/Home";
import DetectAI from './Pages/DetectAI';
import Login from './Pages/Login';
import VideoModeration from "./Pages/VideoModeration";
// import ErrorBoundary from './ErrorBoundary'; // Import your ErrorBoundary

const App = () => {
  const router = createHashRouter([
    {
      path: "/",
      element: <Applayout />,
 // Adding ErrorBoundary here
      children: [
        {
          path: "", // Default route for Home
          element: <Home />,
        },
        {
          path: "DetectAi", 
          element: <DetectAI />,
        },
        {
          path: "VideoModeration", 
          element: <VideoModeration />,
        },
        {
          path: "signin", 
          element: <Login />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
