import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("Atoken");
    return tokenString;
  };
  const [token, setToken] = useState(getToken());

  const saveToken = (tokenJson) => {
    sessionStorage.setItem("Atoken", tokenJson?.token);
    setToken(tokenJson.token);
  };

  return {
    setToken: saveToken,
    token
  };
}
