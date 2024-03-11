import React, { useState } from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestion from "./GptMovieSuggestion";
import { backgroundImage } from "../Utils/constants";
import { searchButtonClick } from "../Utils/gptSlice";
import { useSelector } from "react-redux";

const GptSearch = () => {
  const searchButtonStatus = useSelector(
    (store) => store.gpt.searchButtonClick
  );

  return (
    <>
      <div className="fixed -z-10 ">
        <img
          className="h-screen w-screen object-cover"
          src={backgroundImage}
        ></img>
      </div>
      <div className="">
        <GptSearchBar />
        {searchButtonStatus && <GptMovieSuggestion />}
      </div>
    </>
  );
};

export default GptSearch;
