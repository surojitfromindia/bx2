import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { useState } from "react";
import Home from "./Home";
import Bills from "./Bill";
import CreateBill from "../Mini/CreateBill";
import BillList from "../Mini/BillList";
import SingleBill from "../Mini/SingleBill";
import { MenuIcon, BellIcon } from "@heroicons/react/solid";
import NotificationComp from "../Notification/NotificationComp";

export default function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const handleHideAndShow = () => {
    setShowMenu((t) => !t);
  };

  return (
    <div className={"flex flex-col"}>
      <div className={"p-4 text-gray-100 bg-gray-800"}>
        <div className={"flex justify-between items-center"}>
          <div>
            <h1>Welcome Surojit</h1>
          </div>
          <div
            className={"flex-shrink-0 flex justify-between gap-1 items-center"}
          >
            <div className={"relative"}>
              <NavLink to="/home/notification">
                <BellIcon className={"w-6 h-6"} />
              </NavLink>
              <div
                className={
                  "absolute -top-0.5 -right-0.5 w-4 h-4  bg-red-500 rounded-full bg-clip-content  flex justify-center items-center "
                }
              >
                <span className={"text-xs"}>!</span>
              </div>
            </div>

            <MenuIcon onClick={handleHideAndShow} className={"w-6 h-6"} />
          </div>
        </div>

        <div
          className={`transition-all duration-300 ease-in-out transform ${
            showMenu ? "max-h-12 " : "max-h-0"
          }  overflow-hidden`}
        >
          <div className={"flex justify-between text-md"}>
            <div className={"flex w-max mt-3 items-center gap-3"}>
              <NavLink
                to="/home"
                className={""}
                activeClassName={
                  " px-3 py-1 text-gray-800 bg-gray-100 text-base t rounded-sm"
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/bill"
                className={""}
                activeClassName={
                  " px-3 py-1 text-gray-800 bg-gray-100 rounded-sm text-base"
                }
              >
                Bills
              </NavLink>
            </div>
            <div className={"w-1/3  flex mt-3 justify-end items-center"}></div>
          </div>
        </div>
      </div>
      <div className={""}>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/home" />} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/home/notification" component={NotificationComp} />
          <Route exact path="/bill" component={() => <Bills />} />
          <Route exact path="/bill/create" component={CreateBill} />
          <Route exact path="/bill/billlist" component={BillList} />
          <Route exact path="/bill/billlist/:id" component={SingleBill} />
        </Switch>
      </div>
    </div>
  );
}
