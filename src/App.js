import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Components/Router/Login";
import Dashboard from "./Components/Router/Dashboard";
import useToken from "./Hooks/useToken";

export default function App() {
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  return (
    <Router>
      <Route path="/" component={Dashboard}></Route>
    </Router>
  );
}
