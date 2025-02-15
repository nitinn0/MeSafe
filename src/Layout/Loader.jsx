import React from "react";
import loader from "./Loader.gif";

const Loader = () => {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <img
        src={loader}
        alt="Loading..."
        className="mt-8 w-20 h-20 object-contain animate-spin"
      />
    </div>
  );
};

export default Loader;
