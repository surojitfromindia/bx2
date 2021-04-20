import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Bills from "./Bill";
import CreateBill from "../Mini/CreateBill";

export default function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const handleHideAndShow = () => {
    setShowMenu((t) => !t);
  };
  return (
    <div className={"flex flex-col"}>
      <div className={"p-4 text-gray-100 bg-gray-700 sticky top-0"}>
        <div className={"flex justify-between items-center"}>
          <h1>Welcome Surojit</h1>

          <a className={"cursor-pointer"} onClick={handleHideAndShow}>
            <svg viewBox={"0 0 100 80"} fill={"white"} width={20} height={20}>
              <rect x={40} width={100} height={15}></rect>
              <rect y={30} width={100} height={15}></rect>
              <rect x={40} y={60} width={100} height={15}></rect>
            </svg>
          </a>
        </div>

        <div
          className={`transition-height duration-300 ease-in-out transform ${
            showMenu ? "h-12 " : "h-0"
          }  justify-between text-md flex  overflow-hidden`}
        >
          <div className={"w-2/3 flex mt-3 items-center"}>
            <NavLink
              to="/home"
              className={"px-3 py-1"}
              activeClassName={"px-3 py-1 text-gray-700 bg-gray-100 rounded-md"}
            >
              Home
            </NavLink>
            <NavLink
              to="/bill"
              className={"px-3 py-1"}
              activeClassName={"px-3 py-1 text-gray-700 bg-gray-100 rounded-md"}
            >
              Bills
            </NavLink>
          </div>
          <div className={"w-1/3 flex mt-3 justify-end items-center"}>
            <NavLink
              to="/preference"
              className={"px-3 py-1"}
              activeClassName={"px-3 py-1 text-gray-700 bg-gray-100 rounded-md"}
            >
              Preference
            </NavLink>
          </div>
        </div>
      </div>
      <div className={"py-2 px-4 mt-2"}>
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
