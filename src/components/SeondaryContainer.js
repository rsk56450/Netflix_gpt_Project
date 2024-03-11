import React from "react";
import MovieList from "./MovieList";
import "react-redux";
import { useSelector } from "react-redux";

const SeondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  return (
    movies.NowPlayingMoviess && (
      <div className=" bg-black">
        <div className="mt-0 md:-mt-52 pl-4 md:pl-12  relative z-20">
          {" "}
          <MovieList title={"Now Playing"} movies={movies.NowPlayingMoviess} />
          <MovieList title={"Popular"} movies={movies.PopularMovies} />
          <MovieList title={"Thriller"} movies={movies.NowPlayingMoviess} />
          <MovieList title={"Comedy"} movies={movies.NowPlayingMoviess} />
        </div>
      </div>
    )
  );
};

export default SeondaryContainer;
