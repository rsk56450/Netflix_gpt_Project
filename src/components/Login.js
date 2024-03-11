import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../Utils/validate";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Utils/firebase";

import { updateProfile } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../Utils/UserSlice";
import { backgroundImage } from "../Utils/constants";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);

  const dispatch = useDispatch();

  const [username, setusername] = useState("");
  const userStore = useSelector((store) => store.user);
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsg2, setErrorMsg2] = useState("");

  const stopExecution = () => {
    if (errorMsg) {
      console.log("wo wala if executed **********");
      return;
    }
  };

  const HandleCredentials = () => {
    if (!isSignIn) {
      //sign up logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );

              console.log("user is ", user.displayName);
            })
            .catch((error) => {
              setErrorMsg(error);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg2(errorCode + " - " + errorMessage);
          // ..
        });
    } else {
      //sign in logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log("singed in user ===>>>  ", userStore.displayName);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMsg(errorCode + " - " + errorMessage);
        });
    }
  };

  if (errorMsg === null) {
    HandleCredentials();
  } else {
    stopExecution();
  }

  const handleButtonClick = () => {
    {
      isSignIn
        ? setErrorMsg(
            checkValidData(email.current.value, password.current.value)
          )
        : setErrorMsg(
            checkValidData(
              email.current.value,
              password.current.value,
              name.current.value
            )
          );
    }
    console.log(
      "erros msg is  ",
      errorMsg,
      " and length is  ",
      errorMsg.length
    );
    // if (errorMsg) {
    //   console.log("wo wala if executed **********");
    //   return;
    // }

    // if (!isSignIn) {
    //   //sign up logic
    //   createUserWithEmailAndPassword(
    //     auth,
    //     email.current.value,
    //     password.current.value
    //   )
    //     .then((userCredential) => {
    //       // Signed up
    //       const user = userCredential.user;
    //       updateProfile(user, {
    //         displayName: name.current.value,
    //         photoURL: "https://example.com/jane-q-user/profile.jpg",
    //       })
    //         .then(() => {
    //           // Profile updated!
    //           const { uid, email, displayName } = auth.currentUser;
    //           dispatch(
    //             addUser({ uid: uid, email: email, displayName: displayName })
    //           );
    //           console.log("user is ", user);
    //           navigate("/browse");
    //         })
    //         .catch((error) => {
    //           setErrorMsg(error);
    //         });

    //       // ...
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       setErrorMsg2(errorCode + " - " + errorMessage);
    //       // ..
    //     });
    // } else {
    //   //sign in logic
    //   signInWithEmailAndPassword(
    //     auth,
    //     email.current.value,
    //     password.current.value
    //   )
    //     .then((userCredential) => {
    //       // Signed in
    //       const user = userCredential.user;
    //       console.log("singed in user ===>>>  ", user);
    //       navigate("/browse");
    //       // ...
    //     })
    //     .catch((error) => {
    //       const errorCode = error.code;
    //       const errorMessage = error.message;
    //       setErrorMsg(errorCode + " - " + errorMessage);
    //     });
    // }
    //setErrorMsg("");
  };

  const toggleSignInForm = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="h-screen w-screen object-cover"
          src={backgroundImage}
        ></img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 bg-black absolute w-full md:w-3/12 my-28 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">
          {" "}
          {isSignIn ? "Sign In" : "Sign Up"}
        </h1>
        {isSignIn ? (
          ""
        ) : (
          <input
            ref={name}
            type="text"
            placeholder="Enter Full Name "
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}

        <input
          ref={email}
          type="email"
          placeholder="Enter email "
          className="p-4 my-4 w-full bg-gray-700"
        />

        <input
          ref={password}
          type="password"
          placeholder="Enter  password"
          className="p-4 my-4 w-full bg-gray-700"
        />

        <p className="text-red-500">{errorMsg === null ? "" : errorMsg}</p>

        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="py-4 hover:underline cursor-pointer"
          onClick={toggleSignInForm}
        >
          {isSignIn
            ? "New to Netflix ? Sign Up Now"
            : "Already Registered , Sign In Now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
