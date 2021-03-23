import { createContext, useState } from "react";

const UserContext = createContext();

const getUserDetails = () => {
  const user = sessionStorage.getItem("user-details");
  if (user) {
    return JSON.parse(user);
  } else {
    return null;
  }
};

export const UserContextProvider = (props) => {
  const [userDetails, setUserDetails] = useState(getUserDetails);

  const updateUser = (data) => {
    setUserDetails(data);
    sessionStorage.setItem("user-details", JSON.stringify(data));
  };
  const removeUser = () => {
    setUserDetails(null);
    sessionStorage.removeItem("quiz-data");
    sessionStorage.removeItem("user-details");
  };

  return (
    <UserContext.Provider value={{ userDetails, updateUser, removeUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
