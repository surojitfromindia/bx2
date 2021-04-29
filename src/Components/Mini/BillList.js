import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SearchCircleIcon } from "@heroicons/react/outline";
import { GetMiniBills } from "../../Controllers/Bill";
import moment from "moment";
import LoadingComp from "./LoadingComp";
import getErrorMessage from "../../Controllers/ErroHandeler/HandelErro";

let globalid;
export default function BillList(props) {
  const [billlist, setbilllis] = useState([]);
  const [seachFillterList, setseachFillterList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errortext, setErrorText] = useState("");

  useEffect(async () => {
    let mounted = true;
    try {
      let miniBillInfos = await GetMiniBills();
      if (mounted) {
        setbilllis(miniBillInfos);
        setIsLoading(false);
        if (globalid) {
          document.getElementById(globalid)?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "center",
          });
        }
      }
    } catch (err) {
      setErrorText(getErrorMessage(err));
    }
    return () => {
      mounted = false;
      globalid = undefined;
    };
  }, []);

  const onSearch = (searchedText) => {
    let m = searchedText.toUpperCase();
    let fillterdList = billlist.filter((info) =>
      info.customer_name.toUpperCase().startsWith(m)
    );
    if (m !== "") setseachFillterList([...fillterdList]);
    else setseachFillterList([]);
  };

  const onSeachedItemClick = (idToScroll) => {
    document.getElementById(idToScroll).scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
  };

  const onCardItemViewClick = (id) => {
    globalid = id;
  };
  return (
    <div>
      {isLoading ? (
        <div className={"grid place-items-center h-screen"}>
          <LoadingComp onerrortext={errortext} />
        </div>
      ) : (
        <div>
          <div className={"sticky  top-0  md:mx-14 lg:mx-48"}>
            <SearchBox
              billlist={seachFillterList}
              onSearch={onSearch}
              onClick={onSeachedItemClick}
            />
          </div>
          <div
            className={
              "px-4 py-2 mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 md:mx-12 lg:mx-44"
            }
          >
            {billlist.map((billdetails) => (
              <BillItems
                details={billdetails}
                key={billdetails._id}
                onlinkClick={onCardItemViewClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

const SearchBox = ({ billlist, onSearch, onClick }) => {
  const searchRef = useRef("");
  const onTextChange = (ev) => {
    ev.preventDefault();
    onSearch(searchRef.current.value);
  };
  return (
    <div className={"group shadow-md"}>
      {/**Search box */}
      <div
        className={"h-10 flex p-0 bg-white dark:bg-coolGray-700 items-center"}
      >
        <SearchCircleIcon
          className={"dark:text-gray-50 text-lightBlue-500  w-6 h-6 ml-4"}
        />
        <input
          onChange={onTextChange}
          ref={searchRef}
          className={
            "transition-all dark:bg-coolGray-700 dark:text-gray-50 dark:placeholder-gray-50 duration-400 ease-in-out flex-1 px-2 md:text-center transform rounded-sm group-hover:rounded-b-none outline-none"
          }
          placeholder="Search..."
        ></input>
      </div>
      {/**Searchbox drop down */}
      <div
        className={
          "flex flex-col items-center gap-1.5 transition-all duration-300 ease-in-out transform h-0 group-hover:h-32  py-0 group-hover:py-3 bg-white dark:bg-coolGray-700 rounded-b-sm overflow-scroll no-scrollbar"
        }
      >
        {billlist.length === 0 && searchRef.current.value !== "" ? (
          <div className={"dark:text-gray-50 text-gray-600"}>
            {`${
              !searchRef.current.value
                ? ""
                : `Sorry! No record found on "${searchRef.current.value}"`
            }`}
          </div>
        ) : (
          <div className={"w-full px-1.5"}>
            {billlist.map((billdetails) => (
              <SuperMini
                details={billdetails}
                key={billdetails._id}
                onClick={onClick}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const BillItems = ({ details, onlinkClick, isViewButtonHidden = false }) => {
  const handleOnLinkClick = () => {
    onlinkClick?.(details._id);
  };
  return (
    <div
      id={details._id}
      className={
        "group select-none transition-colors ease-in-out duration-200 rounded-md flex flex-col gap-3 justify-between shadow-md  bg-gray-50 dark:bg-coolGray-700"
      }
    >
      <div
        className={
          "flex pt-5 px-3 flex-col divide-y divide-gray-200 dark:divide-gray-500"
        }
      >
        <div className={"flex justify-between gap-3 items-center"}>
          <div className={"flex justify-between gap-1"}>
            <p className={"text-sm"}>
              <span
                className={`px-1 py-0.5  rounded-tr-sm rounded-br-sm ${
                  details.payment.status === "paid"
                    ? "text-green-700  font-medium  bg-green-200 "
                    : "text-red-700 font-medium  bg-red-200 "
                }" uppercase `}
              >
                {details.payment.status}
              </span>
            </p>
            <p className={"text-sm"}>
              <span
                className={
                  "px-1 py-0.5 rounded-tl-sm rounded-bl-sm text-white  bg-gray-500 "
                }
              >
                BCD
              </span>
              <span
                className={
                  "px-1 py-0.5  rounded-tr-sm rounded-br-sm  text-blue-700 font-medium bg-blue-300 "
                }
              >
                {`${moment.utc(details?.bill_date).format("DD-MM-YYYY")}`}
              </span>
            </p>
            <p className={"text-sm"}>
              <span
                className={
                  "px-1.5 py-0.5 rounded-tl-sm rounded-bl-sm text-white  bg-gray-500 "
                }
              >
                LUD
              </span>
              <span
                className={
                  "px-1.5 py-0.5  rounded-tr-sm rounded-br-sm  text-pink-700 font-medium bg-pink-300 "
                }
              >
                {`${moment
                  .utc(details?.payment?.last_pay_date)
                  .format("DD-MM-YYYY")}`}
              </span>
            </p>
          </div>
          <div className={"hidden justify-end gap-1"}>
            <p className={"text-sm"}>
              <span
                className={
                  "px-1.5 py-0.5  rounded-tr-sm rounded-br-sm  text-green-700 font-medium "
                }
              >
                Unpin
              </span>
            </p>
          </div>
        </div>

        <div className={"mt-3"}>
          <p
            className={
              "text-gray-700 dark:text-gray-50 mt-1.5 font-medium text-base flex items-baseline "
            }
          >
            {details.customer_name.toUpperCase()}
            <span
              className={
                "group-hover:text-red-600 dark:group-hover:text-yellow-300 text-xs ml-2.5 text-gray-600 dark:text-gray-100 font-bold"
              }
            >
              {details.item_details.name
                ? details.item_details.name.toUpperCase()
                : ""}
            </span>
          </p>
          <div className={"mt-1 -ml-3 grid grid-rows-2 gap-1"}>
            <div
              className={
                "grid w-72 grid-cols-4 text-xs text-gray-500 dark:text-gray-50"
              }
            >
              <p className={"text-center"}>Weight</p>
              <p className={"text-center"}>Billed</p>
              <p className={"text-center"}>Paid</p>
              <p className={"text-center"}>Remain</p>
            </div>
            <div
              className={
                "grid divide-x divide-gray-300  w-72 grid-cols-4 text-xs font-semibold text-gray-600 dark:text-gray-100"
              }
            >
              <p className={"text-center"}>
                {details?.item_details?.quantity}
                {details?.item_details?.unit}
              </p>
              <p className={"text-center"}>{details.payment?.tp.toFixed(0)}</p>
              <p className={"text-center "}>
                {details.payment?.paidU.toFixed(0)}
              </p>
              <p className={"text-center "}>
                {details.payment?.remain.toFixed(0)}
              </p>
            </div>
          </div>
          <div className={"mt-5 flex flex-col   gap-0.5"}>
            <div className={"flex text-xs "}>
              <span className={"w-16  text-gray-500 dark:text-green-50"}>
                Contacts :
              </span>
              <span
                className={
                  "ml-1  text-xs font-medium text-gray-600 dark:text-lightBlue-100"
                }
              >
                {details.customer_contact ? (
                  details.customer_contact.toUpperCase()
                ) : (
                  <span className={"text-gray-400"}> Not Provided</span>
                )}
              </span>
            </div>
            <div className={"flex flex-row text-xs"}>
              <span
                className={
                  "w-16 flex-shrink-0  text-gray-500 dark:text-green-50"
                }
              >
                Remarks :
              </span>
              <span
                className={
                  "ml-1 h-8 overflow-hidden w-72  text-xs font-medium text-gray-600 dark:text-lightBlue-100"
                }
              >
                Some info about the product will go here like if it was for
                repairing.
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={"flex"}>
        <Link
          onClick={handleOnLinkClick}
          to={`/bill/billlist/${details._id}`}
          hidden={isViewButtonHidden}
          className={
            "text-center flex-grow rounded-b-md focus:outline-none focus:border-none px-4 py-1.5 text-sm text-green-50 dark:text-green-50 font-medium bg-gray-600 dark:bg-lightBlue-600 hover:bg-gray-700 dark:hover:bg-lightBlue-500 shadow-md"
          }
        >
          view
        </Link>
      </div>
    </div>
  );
};

const SuperMini = ({ details, onClick }) => {
  const onIClick = () => {
    onClick(details._id);
  };
  return (
    <div
      onClick={onIClick}
      className={
        "transition-colors ease-in-out duration-200 cursor-pointer dark:bg-coolGray-700 flex px-3 py-1.5 flex-row hover:bg-gray-300 dark:hover:bg-coolGray-800 justify-between"
      }
    >
      <p
        className={
          "text-gray-700 dark:text-gray-50 font-medium text-sm flex items-baseline "
        }
      >
        <span className={"overflow-x-auto"}>
          {details.customer_name.toUpperCase()}
        </span>
        <span
          className={
            "group-hover:text-red-600 dark:group-hover:text-yellow-300 text-xs ml-1.5 text-gray-600  font-bold"
          }
        >
          {details.item_details.name
            ? details.item_details.name.toUpperCase()
            : ""}
        </span>
      </p>
      <div className={"flex  gap-1 items-center"}>
        <p className={"text-xs"}>
          <span
            className={`px-1 py-0.5  rounded-tr-sm rounded-br-sm ${
              details.payment.status === "paid"
                ? "text-green-700  font-medium  bg-green-300 "
                : "text-red-700 font-medium  bg-red-300 "
            }" uppercase `}
          >
            {details.payment.status}
          </span>
        </p>
        <p className={"text-xs hidden flex-row sm:flex"}>
          <span
            className={
              "px-1 hidden sm:block py-0.5 rounded-tl-sm rounded-bl-sm text-white  bg-gray-500 "
            }
          >
            BCD
          </span>
          <span
            className={
              "px-1 py-0.5  rounded-tr-sm rounded-br-sm  text-blue-700 font-medium bg-blue-300 "
            }
          >
            {`${moment.utc(details?.bill_date).format("DD-MM-YYYY")}`}
          </span>
        </p>
        <p className={"text-xs flex flex-row"}>
          <span
            className={
              " hidden sm:block px-1.5  py-0.5 rounded-tl-sm rounded-bl-sm text-white  bg-gray-500 "
            }
          >
            LUD
          </span>
          <span
            className={
              "px-1.5 py-0.5  rounded-tr-sm rounded-br-sm  text-pink-700 font-medium bg-pink-300 "
            }
          >
            {`${moment
              .utc(details?.payment?.last_pay_date)
              .format("DD-MM-YYYY")}`}
          </span>
        </p>
      </div>
    </div>
  );
};

export { BillItems };
