import { auth } from "../Utils/firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addUser, removeUser } from "../Utils/UserSlice";
import { logo, userAvatar } from "../Utils/constants";
import { toggleGptSearchView } from "../Utils/gptSlice";
import lang from "../Utils/languageConstant";
import { supported_languages } from "../Utils/constants";
import { changeLanguage } from "../Utils/ConfigSlice";
import { resetAllGptSliceData } from "../Utils/gptSlice";
import { resetMovieData } from "../Utils/moviesSlice";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const [username,setusername]=useState("");
  const user = useSelector((store) => store.user);
  const gptStatus = useSelector((store) => store.gpt.showGPTSearch);
  useSelector((store) => store.movies);
  const gptSliceData = useSelector((store) => store.gpt);
  const HandleGptClick = () => {
    //Handle GPT search button
    dispatch(toggleGptSearchView());
  };

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  };

  // let dispName = auth.currentUser.displayName;

  const handleSignOut = () => {
    dispatch(resetAllGptSliceData());
    dispatch(resetMovieData());
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        //sign In logic
        const { uid, email, displayName } = user;

        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));

        navigate("/browse");
      } else {
        //sign Out Logic
        dispatch(removeUser());
        navigate("/");
      }
    });

    //unSubcribe to onAuthStateChanged when the component will unmount
    return () => {
      console.log("header unmounted");
      unsubscribe();
    };
  }, []);

  return (
    <div
      className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex flex-col md:flex-row 
     justify-between  bg-black sm:bg-blue-900 md:bg-green-900"
    >
      <img src={logo} className="w-40 mx-auto md:mx-0 "></img>

      {user ? (
        <div className="flex p-2 justify-between">
          {gptStatus && (
            <select
              className="p-2 bg-gray-900 text-white m-2 hover:bg-gray-600 rounded-lg"
              onChange={handleLanguageChange}
            >
              {supported_languages.map((lang, index) => {
                return (
                  <option key={index} value={lang.identifier}>
                    {lang.name}
                  </option>
                );
              })}
            </select>
          )}
          <button
            className="py-2 px-4 m-4 my-1  h-12 bg-purple-800 rounded-lg text-white hover:opacity-80"
            onClick={HandleGptClick}
          >
            {gptStatus ? "Home" : "Search GPT"}
          </button>
          <img
            src={userAvatar}
            alt="userlogo"
            className="hidden md:inline-block w-12 h-12 mx-2"
          />

          <button onClick={handleSignOut} className=" font-bold text-white">
            Sign Out({user.displayName})
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Header;
