import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Components/Router/Login";
import Dashboard from "./Components/Router/Dashboard";
import useToken from "./Hooks/useToken";
import LoadingComp from "./Components/Mini/LoadingComp";
import { useState, useEffect } from "react";
import API from "./Controllers/APIs/API";
import getErrorMessage from "./Controllers/ErroHandeler/HandelErro";
import {
  ReloadFromLocal,
  isInLocal,
  saveToLocal,
} from "./Controllers/LoadFromLocal.js";

export default function App() {
  const { token, setToken } = useToken();
  const [isLoading, setIsLoading] = useState(true);
  const [errortext, setErrorText] = useState("");
  useEffect(() => {
    if (!isInLocal("isDark")) saveToLocal("isDark", true);
    API()
      .get("/")
      .then(() => {
        setIsLoading(false);
      })
      .catch((err) => {
        setErrorText(getErrorMessage(err));
      });
  }, []);

  return isLoading ? (
    <div className={"flex justify-center items-center h-screen"}>
      <LoadingComp onerrortext={errortext} />
    </div>
  ) : !token ? (
    <Login setToken={setToken} />
  ) : (
    <Router>
      <Route path="/" component={Dashboard}></Route>
    </Router>
  );
}
