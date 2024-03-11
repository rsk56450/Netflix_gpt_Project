import { img_cdn } from "../Utils/constants";

const MovieCard = ({ posterPath }) => {
  if (!posterPath) {
    return;
  }
  return (
    <div className="w-36 md:w-48 pr-4">
      <img alt="MovieCrdImage" src={img_cdn + posterPath} />
    </div>
  );
};
export default MovieCard;
