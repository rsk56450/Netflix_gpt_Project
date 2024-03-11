import Popup from "reactjs-popup";
import MovieCard from "./MovieCard";
import "reactjs-popup";

const MovieList = ({ title, movies }) => {
  console.log("title is  ", title, " movies is  ", movies);
  if (movies === null) {
    return;
  }

  return (
    <div className="px-6   ">
      <h1 className="text-lg md:text-3xl py-4 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-track-black">
        <div className="flex">
          {movies.map((i) => {
            return (
              <Popup
                trigger={
                  <button>
                    <MovieCard key={i.id} posterPath={i.poster_path} />
                  </button>
                }
                position="right center"
              >
                <div className="w-48 border  box-border  border-red-700 ">
                  <div className="bg-black text-white font-bold p-2 underline ">
                    {i.original_title}
                  </div>
                  <p className="bg-black text-white p-2">{i.overview}</p>
                </div>
              </Popup>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
