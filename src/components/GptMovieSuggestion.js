import React from "react";
import "react-redux";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GptMovieSuggestion = () => {
  const gptSliceData = useSelector((store) => store.gpt);
  const { movieNames, movieResult } = gptSliceData;

  return (
    <div className="p-4 m-4 bg-black text-white bg-opacity-70">
      {!movieNames ? (
        <h1 className="font-bold text-white self-center">
          {" "}
          Hang On fetching results...
        </h1>
      ) : (
        <div>
          {movieNames.map((movieName, index) => {
            return (
              <MovieList
                key={movieName}
                title={movieName}
                movies={movieResult[index]}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default GptMovieSuggestion;
