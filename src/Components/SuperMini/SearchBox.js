import React, { useRef, useState } from "react";
import SuperMini from "./SuperMini";
import {
  SearchCircleIcon,
  ArrowCircleUpIcon,
  ArrowCircleDownIcon,
} from "@heroicons/react/outline";
import SortSwicth from "../Reusable/SortSwicth";

export default function SearchBox({ billlist, onSearch, onSort, onClick }) {
  const searchRef = useRef("");
  const onTextChange = (ev) => {
    ev.preventDefault();
    onSearch(searchRef.current.value);
  };
  const handleSortRequest = (name) => {
    switch (name) {
      case "Asc":
        onSort("Asc");
        break;
      case "Desc":
        onSort("Desc");
        break;
    }
  };
  return (
    <div className={"group shadow-2xl  bg-white dark:bg-coolGray-700 "}>
      {/**Search box */}
      <div className={"h-10 flex p-0  items-center"}>
        <SearchCircleIcon
          className={"dark:text-gray-50 text-lightBlue-500  w-6 h-6 ml-4"}
        />
        <input
          onChange={onTextChange}
          ref={searchRef}
          className={
            "transition-all bg-transparent  dark:text-gray-50 dark:placeholder-gray-50 duration-400 ease-in-out flex-1 px-2 md:text-center transform rounded-sm group-hover:rounded-b-none outline-none"
          }
          placeholder="Search..."
        ></input>
      </div>
      {/**Searchbox drop down */}
      <div
        className={
          "flex flex-col items-center gap-1.5 transition-height duration-300 ease-in-out transform h-0 group-hover:h-32 max-h-44   bg-white bg-transparent rounded-b-sm overflow-scroll no-scrollbar"
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
      {/**Seach Stats */}
      <div
        className={
          "text-sm dark:text-gray-300 flex flex-row items-center justify-between mx-4 transition-height duration-300 ease-in-out transform overflow-hidden h-0 group-hover:h-8"
        }
      >
        {/**Left Row */}
        <div>
          {searchRef.current.value === "" ? (
            ""
          ) : (
            <div className={"flex flex-col"}>
              <span>
                Record(s) :{" "}
                <span className={"text-lightBlue-500 dark:text-yellow-400"}>
                  {" "}
                  {billlist.length}
                </span>
              </span>
            </div>
          )}
        </div>
        {/**Right Row */}
        <div className={"flex justify-between items-center gap-2.5"}>
          <div>
            <SortSwicth
              valuesProps={[
                {
                  propName: "Asc",
                  propShort: "A",
                  isActive: true,
                },
                {
                  propName: "Desc",
                  propShort: "Z",
                },
              ]}
              onchange={handleSortRequest}
            />
          </div>
          <div className="flex flex-row gap-0.5">
            <div className={"flex items-center justify-center"}>
              <ArrowCircleUpIcon
                className={"h-5 w-5 text-lightBlue-500 dark:text-gray-50"}
              />
            </div>
            <div className={"flex items-center justify-center"}>
              <ArrowCircleDownIcon
                className={"h-5 w-5 text-lightBlue-500 dark:text-gray-50"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
