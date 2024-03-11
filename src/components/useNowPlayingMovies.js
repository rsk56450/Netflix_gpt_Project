import { useEffect } from "react";
import { api_options } from "../Utils/constants";

import { useDispatch, useSelector } from "react-redux";
import { addNowPlayingMovies } from "../Utils/moviesSlice";

const useNowPlayingMovies = () => {
  const dispatch = useDispatch();

  const NowPLayingMovies = useSelector(
    (store) => store.movies.NowPlayingMoviess
  );

  const getNowPlayingMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?page=1",
      api_options
    );
    const json = await data.json();

    const result = json.results;

    dispatch(addNowPlayingMovies(result));
  };

  useEffect(() => {
    !NowPLayingMovies && getNowPlayingMovies();
  }, []);
};

export default useNowPlayingMovies;
