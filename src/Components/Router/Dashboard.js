import {
  NavLink,
  Route,
  Switch,
  Redirect,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./Home";
import Bills from "./Bill";
import CreateBill from "../Mini/CreateBill";
import BillList from "../Mini/BillList";
import SingleBill from "../Mini/SingleBill";
import {
  MenuIcon,
  BellIcon,
  MinusCircleIcon,
  PlusIcon,
} from "@heroicons/react/solid";
import NotificationComp from "../Notification/NotificationComp";
import ColorModeT from "../Mini/ColorModeT";
import { toggleTheme } from "../../Hooks/useTheme";
import { GetMiniBills, GetMiniBillsBy } from "../../Controllers/Bill";
import AddShortCutModal from "../Modal/AddShortCutModal";
export default function Dashboard() {
  const [showMenu, setShowMenu] = useState(false);
  const [isHeaderDisplay, setIsHeaderDisplay] = useState(true);
  const [showNotification, setShowNotification] = useState(false);
  const [showShortCutCreatModal, setShowShortCutCreatModal] = useState(false);
  const path = useLocation();
  const [list, setlist] = useState([]);
  const [linkRes, setLinkRes] = useState("");
  const [shorcutList, setShorcutList] = useState([]);

  //set up shortcut links
  useEffect(() => {
    let getListOfShortCut = localStorage.getItem("slinks");
    let listoflink = JSON.parse(getListOfShortCut);
    if (Array.isArray(linkRes)) setShorcutList([...listoflink]);
  }, [linkRes]);

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
  const ToggleSCreation = () => {
    setShowShortCutCreatModal((t) => !t);
    setLinkRes("");
  };
  const AddShortCut = (linkObject) => {
    let k = JSON.parse(localStorage.getItem("slinks"));
    if (!Array.isArray(k)) {
      let b = [];
      b.push(linkObject);
      localStorage.setItem("slinks", JSON.stringify(b));
      setLinkRes(true);
    } else {
      let b = JSON.parse(localStorage.getItem("slinks"));
      if (b.includes(linkObject)) setLinkRes(false);
      else {
        b.push(linkObject);
        localStorage.setItem("slinks", JSON.stringify(b));
        setLinkRes(true);
      }
    }
  };

  return (
    <div className={"transition-colors duration-300 ease-in-out flex flex-col"}>
      <div
        className={`p-4 ${
          isHeaderDisplay ? "sticky top-0" : ""
        }  z-10 text-gray-100 bg-coolGray-700`}
      >
        <div className={"flex justify-between items-center"}>
          <div>
            <h1
              className={
                "text-lg font-semibold tracking-widest text-trueGray-100"
              }
            >
              BX2
            </h1>
          </div>
          <div
            className={"flex-shrink-0 flex justify-between gap-3 items-center"}
          >
            <PlusIcon onClick={ToggleSCreation} className={"w-6 h-6"} />
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
          className={`transition-height duration-400 ease-in-out transform ${
            showMenu ? "h-12 " : "h-0"
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
        className={`transition-transform duration-300 ease-in-out flex flex-col items-center justify-between px-3 py-4 fixed top-20 bottom-20 left-5 right-5 sm:left-44 sm:right-44 
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

      <div
        className={`z-30 flex flex-col items-center justify-center  fixed top-0 bottom-0 left-0 right-0
        transition-transform ease-in-ou duration-300  transform ${
          showShortCutCreatModal ? "scale-100" : "scale-0"
        }  `}
      >
        <AddShortCutModal
          ToggleSCreation={ToggleSCreation}
          linkRes={linkRes}
          AddShortCut={AddShortCut}
        />
      </div>
    </div>
  );
}
