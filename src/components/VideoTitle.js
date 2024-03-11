import React from "react";

const VideoTitle = ({ title, overviewData }) => {
  return (
    <div className="pt-[10%] px-6 md:px-32 absolute bg-gradient-to-r from-black w-screen aspect-video">
      <h1 className="text-2xl md:text-6xl font-bold text-white">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-2/4 text-white">
        {overviewData}
      </p>
      <div className="my-4 md:my-0">
        <button className="bg-white text-black p-4 px-2 md:px-12 text-lg rounded-lg bg-opacity-80 mx-2 hover:bg-opacity-50 ">
          ▶️ Play
        </button>
        <button className="hidden md:inline-block bg-gray-500 text-white p-4 px-12 text-lg rounded-lg bg-opacity-70 hover:bg-opacity-90">
          {" "}
          ⓘ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
