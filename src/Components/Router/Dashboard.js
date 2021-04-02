import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import Home from "./Home";
import Bills from "./Bill";
import CreateBill from "../Mini/CreateBill";

export default function Dashboard() {
  return (
    <div className={"flex flex-col"}>
      <div className={"p-4 text-white bg-indigo-500"}>
        <h1 className={"text-xl"}>Welcome Surojit,</h1>
        <div className={"mt-5 text-md flex flex-row justify-between"}>
          <div className={"w-2/3 flex"}>
            <NavLink
              to="/home"
              className={"px-3 py-2"}
              activeClassName={"text-white bg-indigo-700 rounded-md"}
            >
              Home
            </NavLink>
            <NavLink
              to="/bill"
              className={"px-3 py-2"}
              activeClassName={"text-white bg-indigo-700 rounded-md"}
            >
              Bills
            </NavLink>
          </div>
          <div className={"w-1/3 flex justify-end"}>
            <NavLink
              to="/preference"
              className={"px-3 py-2"}
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
          <Route exact path="/home" component={() => <Home />} />
          <Route exact path="/bill" component={() => <Bills />} />
          <Route exact path="/bill/create" component={CreateBill} />
        </Switch>
      </div>
    </div>
  );
}
