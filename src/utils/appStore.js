import "react-redux";
import "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./moviesSlice";
import userReducer from "./UserSlice";
import gptReducer from "./gptSlice";
import configReducer from "./ConfigSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: movieReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;
