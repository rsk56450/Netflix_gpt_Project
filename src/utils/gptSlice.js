import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearch: false,
    gptMovies: null,
    movieNames: null,
    movieResult: null,
    searchButtonClick: false,
  },
  reducers: {
    toggleGptSearchView: (state) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGPTMovieResult: (state, action) => {
      const { movieNames, movieResult } = action.payload;
      state.movieNames = movieNames;
      state.movieResult = movieResult;
    },
    setsearchButtonClick: (state) => {
      state.searchButtonClick = true;
    },
    resetAllGptSliceData: (state) => {
      state.gptMovies = null;
      state.movieNames = null;
      state.movieResult = null;
      state.searchButtonClick = false;
      state.showGPTSearch = false;
    },
  },
});

export const {
  toggleGptSearchView,
  addGPTMovieResult,
  setsearchButtonClick,
  resetAllGptSliceData,
} = gptSlice.actions;
export default gptSlice.reducer;
