import React from "react";
import { NavLink } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container">
      <main className=" main-section flex ">
        <div className="logo-section ">
          <figure className="flex">
            <img
              src="/MySafeLogo.png
                "
              alt="logo of MeSafe"
              width="40%"
              height="auto"
            />
          </figure>
        </div>

        <div className="mesafe-tag-line flex">
          <p>
          "Don't trust everything you see! Mesafe helps you identify AI-generated images and deepfakes. Verify the truth with Mesafe—our AI-powered app that accurately detects fake images and deepfakes, ensuring what you see is real."
          </p>
          </div>
          <div className="btn-home flex"> <NavLink to="/DetectAi"> <button>Detect Ai</button> </NavLink >
         <NavLink to="/VideoModeration"> <button>Detect VideoModeration</button> </NavLink >
     </div>
            
      </main>
    </div>
  );
};

export default Home;
