export const checkValidData = (email, password, name) => {
  const isEmailValid = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );

  const isPasswordValid =
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);

  const isNameValid = /\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+/.test(name);

  if (!isEmailValid) {
    return "Email ID not valid";
  }

  if (!isPasswordValid) {
    return "Password not valid";
  }

  if (!name) {
  } else if (!isNameValid) {
    return "Entered Name is not valid";
  }

  return null;
};
