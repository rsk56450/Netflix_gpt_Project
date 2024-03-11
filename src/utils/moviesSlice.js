import { createSlice } from "@reduxjs/toolkit";

const MovieSlice = createSlice({
  name: "NowPlayingmovies",
  initialState: {
    NowPlayingMoviess: null,
    trailerVideo: null,
    PopularMovies: null,
  },
  reducers: {
    addNowPlayingMovies: (state, action) => {
      state.NowPlayingMoviess = action.payload;
    },
    addTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    addPopularMovies: (state, action) => {
      state.PopularMovies = action.payload;
    },
    resetMovieData: (state) => {
      state.NowPlayingMoviess = null;
      state.PopularMovies = null;
      state.trailerVideo = null;
    },
  },
});

export const {
  addNowPlayingMovies,
  addTrailerVideo,
  addPopularMovies,
  resetMovieData,
} = MovieSlice.actions;
export default MovieSlice.reducer;
