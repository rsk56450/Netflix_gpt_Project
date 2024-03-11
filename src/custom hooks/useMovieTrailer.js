import React, { useEffect } from 'react'
import { api_options } from '../Utils/constants'
import { useDispatch, useSelector } from 'react-redux'
import { addTrailerVideo } from '../Utils/moviesSlice'

const useMovieTrailer = (movieId)=>{
    const dispatch =useDispatch();
    const trailerDatafromStore = useSelector(store=> store.movies.trailerVideo)

    
  
  const getBackGroundVideo = async ()=>{
   const data = await fetch('https://api.themoviedb.org/3/movie/'+movieId+'/videos?language=en-US', api_options)
    const json  = await data.json();
    const TrailerFilter = json.results.filter((i)=>{
      return i.type === "Trailer"
  });
  
  const Trailer  = TrailerFilter.length  ? TrailerFilter[0] : json.results[0];
  
 
  dispatch(addTrailerVideo(Trailer))
  
  }
  
  useEffect(()=>{
      !trailerDatafromStore && getBackGroundVideo();
    },[])

    return trailerDatafromStore?.key
}

export default useMovieTrailer;