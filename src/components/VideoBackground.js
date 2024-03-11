import React, { useEffect } from "react";
import useMovieTrailer from "../CustomHooks/useMovieTrailer";

const VideoBackground = ({ movieId }) => {
  //fetching the video and updating the sotre with trailer video data
  const youtubeVideoId = useMovieTrailer(movieId);

  return (
    <div>
      <iframe
        className="w-screen aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          youtubeVideoId +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
