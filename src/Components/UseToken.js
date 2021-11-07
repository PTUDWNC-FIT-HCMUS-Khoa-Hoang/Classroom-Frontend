import { useState } from "react";

const useToken = () => {
  const getToken = () => {
    const token = sessionStorage.getItem("token");
    const userToken = JSON.parse(token);
    return userToken;
  };

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken);
  };

  return {
    token,
    setToken: saveToken,
  };
};

export default useToken;
