import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "./Home";
import Bill from "./Bill";

export default function Dashboard() {
  return (
    <div>
      <Router>
        <div className={"flex flex-col"}>
          <div className={"p-4 text-white bg-indigo-500"}>
            <h1 className={"text-xl"}>Welcome Surojit,</h1>
            <div className={"mt-5 text-md flex flex-row justify-between"}>
              <div>
                <NavLink
                  to="/home"
                  className={"px-6 py-2"}
                  activeClassName={"text-white bg-indigo-700 rounded-md"}
                >
                  Home
                </NavLink>
                <NavLink
                  to="/bill"
                  className={"px-6 py-2"}
                  activeClassName={"text-white bg-indigo-700 rounded-md"}
                >
                  Bills
                </NavLink>
              </div>
              <div>
                <NavLink
                  to="/preference"
                  className={"px-6 py-2"}
                  activeClassName={"text-white bg-indigo-700 rounded-md"}
                >
                  Preference
                </NavLink>
              </div>
            </div>
          </div>
          <div className={"py-2 px-4 mt-5"}>
            <Switch>
              <Route exact path="/" component={() => <Redirect to="/home" />} />
              <Route
                exact
                path="/home"
                component={() => <Home name="Prices" />}
              />
              <Route exact path="/bill" component={() => <Bill />} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
}
