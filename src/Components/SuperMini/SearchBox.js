import React, { useRef } from "react";
import SuperMini from "./SuperMini";
import { SearchCircleIcon } from "@heroicons/react/outline";

export default function SearchBox({ billlist, onSearch, onClick }) {
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
}
