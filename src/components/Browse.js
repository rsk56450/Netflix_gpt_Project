import Header from "./Header";

import useNowPlayingMovies from "../CustomHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SeondaryContainer from "./SeondaryContainer";
import usePopularMovies from "../CustomHooks/usePopularMovies";
import GptSearch from "./GptSearch";
import { useSelector } from "react-redux";

const Browse = () => {
  const gptStatus = useSelector((store) => store.gpt.showGPTSearch);

  //Fetch Data from TMDB API and update the store with data

  useNowPlayingMovies();
  usePopularMovies();

  return (
    <div>
      <Header />
      {gptStatus ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          <SeondaryContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
