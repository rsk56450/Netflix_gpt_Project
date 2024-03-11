import React, { useRef } from "react";
import languagesAvailable from "../Utils/languageConstant";
import "react-redux";
import { useDispatch, useSelector } from "react-redux";
import openai from "../Utils/openai";
import { api_options } from "../Utils/constants";
import { addGPTMovieResult, setsearchButtonClick } from "../Utils/gptSlice";
import { Dispatch } from "@reduxjs/toolkit";

const GptSearchBar = () => {
  const languageSelected = useSelector((store) => store.config.lang);

  const MoviesFromReduxStore = useSelector((store) => store.gpt.gptMovies);
  const searchText = useRef(null);

  const searchButtonStatus = useSelector(
    (store) => store.gpt.searchButtonClick
  );
  const dispatch = useDispatch();

  // const gptQuerys =
  //   "Act as a Movie Recommendation system and suggest some movies for the query : " +
  //   searchText.current.value +
  //   ". only give me names of  5 movies , comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Dhamal , Golmaal";

  // console.log("gpt query ", gptQuerys);

  const searchMovieInTMDB = async (movieName) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      api_options
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearchClick = async () => {
    dispatch(setsearchButtonClick());
    console.log("text is  ", searchText.current.value);
    //Make an API call to GPT API and get movie Results
    const gptResults = await openai.chat.completions.create({
      messages: [
        {
          role: "user",
          content:
            "Act as a Movie Recommendation system and suggest some movies for the query : " +
            searchText.current.value +
            ". only give me names of  5 movies , comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Dhamal , Golmaal",
        },
      ],
      model: "gpt-3.5-turbo",
    });

    if (!gptResults.choices) {
      //handle error here
    }
    console.log(gptResults?.choices[0]?.message?.content);
    const gptMovies = gptResults?.choices[0]?.message?.content.split(",");
    console.log(gptMovies);

    const promiseArray = gptMovies.map((movie) => searchMovieInTMDB(movie));
    console.log("promiseArray ===>   ", promiseArray);

    const tmdbResults = await Promise.all(promiseArray);

    console.log("tmdb results ==>  ", tmdbResults);
    dispatch(
      addGPTMovieResult({ movieNames: gptMovies, movieResult: tmdbResults })
    );
  };

  return (
    <div className="pt-[35%] md:pt-[10%] flex justify-center ">
      {
        <form
          className="w-full md:w-1/2 bg-black  grid grid-cols-12"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            ref={searchText}
            type="text"
            className="p-4 m-4 col-span-9"
            placeholder={
              languagesAvailable[languageSelected].gptSearchPlaceholder
            }
          />
          <button
            onClick={handleGptSearchClick}
            className="col-span-3 py-2 px-4 bg-red-600 text-white rounded-lg hover:opacity-70 m-4"
          >
            {languagesAvailable[languageSelected].search}
          </button>
        </form>
      }
    </div>
  );
};

export default GptSearchBar;
