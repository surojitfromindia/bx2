
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";

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
      <Switch>
        <Dashboard />
      </Switch>
    </Router>
  );
}
