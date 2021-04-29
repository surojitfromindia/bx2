import { NavLink, Route, Switch, Redirect } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Home from "./Home";
import Bills from "./Bill";
import CreateBill from "../Mini/CreateBill";
import BillList from "../Mini/BillList";
import SingleBill from "../Mini/SingleBill";
import { MenuIcon, BellIcon, MinusCircleIcon } from "@heroicons/react/solid";
import NotificationComp from "../Notification/NotificationComp";
import ColorModeT from "../Mini/ColorModeT";
import { ReloadFromLocal, saveToLocal } from "../../Controllers/LoadFromLocal";

var l;
export default function Dashboard() {
  const noti = useRef();
  const [showMenu, setShowMenu] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (JSON.parse(ReloadFromLocal("isDark")) === true) {
      l = false;
      document.body.classList.toggle("dark");
      document.body.classList.toggle("bg-gray-600");
    } else {
      saveToLocal("isDark", true);
    }
  }, []);
  const handleHideAndShow = () => {
    setShowMenu((t) => !t);
  };
  const ToggleColorMode = () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("bg-gray-600");
    saveToLocal("isDark", !JSON.parse(ReloadFromLocal("isDark")));
  };
  const ToggleNotification = () => {
    setShowNotification((t) => !t);
  };
  return (
    <div
      className={"transition-colors duration-300 ease-in-out flex flex-col   "}
    >
      <div className={"p-4 text-gray-100 bg-gray-800"}>
        <div className={"flex justify-between items-center"}>
          <div>
            <h1>Welcome Surojit</h1>
          </div>
          <div
            className={"flex-shrink-0 flex justify-between gap-3 items-center"}
          >
            <ColorModeT onTog={ToggleColorMode} />
            <div onClick={ToggleNotification} className={"relative"}>
              <BellIcon className={"w-6 h-6"} />

              <div
                className={
                  "select-none absolute -top-0.5 -right-0.5 w-4 h-4  bg-red-500 rounded-full bg-clip-content  flex justify-center items-center "
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
          <Route exact path="/bill" component={() => <Bills />} />
          <Route exact path="/bill/create" component={CreateBill} />
          <Route exact path="/bill/billlist" component={BillList} />
          <Route exact path="/bill/billlist/:id" component={SingleBill} />
        </Switch>
      </div>
      <div
        ref={noti}
        className={`transition-transform  duration-300 ease-in-out flex flex-col items-center justify-between px-3 py-4 fixed top-20 bottom-20 left-5 right-5 sm:left-44 sm:right-44 
        transform ${
          showNotification ? "scale-100" : "scale-0"
        } rounded-md border-2 border-blue-300 dark:border-gray-200 bg-blue-500  dark:bg-gray-700  `}
      >
        <div className={"flex-1 py-3"}>
          <NotificationComp />
        </div>
        <div
          onClick={ToggleNotification}
          className={"h-auto text-gray-800 dark:text-gray-50"}
        >
          <MinusCircleIcon className={"object-fill text-gray-50 h-6 w-6"} />
        </div>
      </div>
    </div>
  );
}
