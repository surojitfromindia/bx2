import {
  NavLink,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import Home from "./Home";
import Bills from "./Bill";
import CreateBill from "../Mini/CreateBill";
import BillList from "../Mini/BillList";
import SingleBill from "../Mini/SingleBill";
import { MenuIcon, BellIcon, MinusCircleIcon } from "@heroicons/react/solid";
import NotificationComp from "../Notification/NotificationComp";
import ColorModeT from "../Mini/ColorModeT";
import { toggleTheme } from "../../Hooks/useTheme";
import { GetMiniBills, GetMiniBillsBy } from "../../Controllers/Bill";
export default function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [isHeaderDisplay, setIsHeaderDisplay] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const path = useLocation();
  const [list, setlist] = useState([]);

  //make header not to stick if it is in /bill/billist
  useEffect(() => {
    if (path.pathname === "/bill/billlist") {
      setIsHeaderDisplay(false);
    } else {
      setIsHeaderDisplay(true);
    }
  }, [path]);

  //get bills from backend
  useEffect(async function () {
    let minibills = await GetMiniBills();
    setlist(minibills);
  }, []);

  const handleUpdateOfABill = async (index) => {
    let element = list[index];
    GetMiniBillsBy(element._id).then((miniBill) => {
      let updatedArry = [...list];
      updatedArry[index] = miniBill;
      setlist([...updatedArry]);
    });
  };

  const handleDelete = (id) => {
    let updatedArry = list.filter((item) => item._id !== id);
    console.log(updatedArry);
    setlist([...updatedArry]);
  };
  const handleNewEntry = async () => {
    let minibills = await GetMiniBills();
    setlist(minibills);
  };

  const handleHideAndShow = () => {
    setShowMenu(!showMenu);
  };
  const ToggleColorMode = () => {
    toggleTheme();
  };
  const ToggleNotification = () => {
    setShowNotification((t) => !t);
  };

  return (
    <div className={"transition-colors duration-300 ease-in-out flex flex-col"}>
      <div
        className={`p-4 ${
          isHeaderDisplay ? "sticky top-0" : ""
        }  z-20 text-gray-100 bg-coolGray-700`}
      >
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
                  "select-none absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full flex justify-center items-center "
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

      <div>
        <Switch>
          <Route exact path="/" component={() => <Redirect to="/home" />} />
          <Route exact path="/home" render={() => <Home de={list} />} />
          <Route exact path="/bill" component={Bills} />
          <Route
            exact
            path="/bill/create"
            render={() => <CreateBill onNewEntry={handleNewEntry} />}
          />
          <Route
            exact
            path="/bill/billlist"
            render={() => <BillList list={list} />}
          />
          <Route
            exact
            path="/bill/billlist/:id/:index"
            render={() => (
              <SingleBill
                onUpdate={handleUpdateOfABill}
                onDelete={handleDelete}
              />
            )}
          />
        </Switch>
      </div>

      <div
        className={`z-30 transition-transform duration-300 ease-in-out flex flex-col items-center justify-between px-3 py-4 fixed top-20 bottom-20 left-5 right-5 sm:left-44 sm:right-44 
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
