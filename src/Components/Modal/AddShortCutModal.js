import React, { useEffect, useState } from "react";
import {
  MinusCircleIcon,
  PlusCircleIcon,
  ArrowCircleLeftIcon,
  CheckCircleIcon,
  BanIcon,
} from "@heroicons/react/outline";
export default function AddShortCutModal({
  ToggleSCreation,
  AddShortCut,
  linkRes,
}) {
  const [linkName, setLinkName] = useState("");
  const [link, setLink] = useState("");
  const [linkresult, setlinkresult] = useState();
  const Add = () => {
    if ((linkName !== "") & (link !== ""))
      AddShortCut?.({ name: linkName, lstring: link });
  };
  const cleanAllField = () => {
    setLinkName("");
    setLink("");
  };
  useEffect(() => {
    setlinkresult(linkRes);
  }, [linkRes]);

  const close = () => {
    ToggleSCreation();
  };
  const handleInput = (ev) => {
    ev.preventDefault();
    switch (ev.target.name) {
      case "NlinkName":
        setLinkName(ev.target.value);
        break;
      case "NlinkString":
        setLink(ev.target.value);
        break;
    }
  };
  return (
    <div
      className={
        "py-5 px-3 shadow-xl flex flex-col w-72 justify-center items-start overflow-y-auto bg-blue-500 rounded-md dark:bg-coolGray-800"
      }
    >
      <span className={"text-lg font-semibold text-gray-50"}>
        Create Shortcuts
      </span>
      <span
        className={
          "text-sm font-medium text-gray-800 dark:text-gray-100 my-3 flex-grow w-full"
        }
      >
        <input
          value={linkName}
          onChange={handleInput}
          type={"link"}
          name="NlinkName"
          id="customer_contact"
          className={
            "uppercase w-2/3 outline-none border-0 rounded-sm px-2.5 py-2 mt-1 focus:ring-0 focus:border-0 focus:outline-none  dark:bg-coolGray-700 dark:placeholder-gray-300"
          }
          placeholder="Name"
        />
        <input
          value={link}
          type={"text"}
          onChange={handleInput}
          name={"NlinkString"}
          id="customer_contact"
          className={
            "outline-none border-0 rounded-sm px-2.5 py-2 mt-3 focus:ring-0 focus:border-0 focus:outline-none  dark:bg-coolGray-700 dark:placeholder-gray-300 w-full"
          }
          placeholder="Link"
        />
      </span>
      <div className={"flex justify-between w-full"}>
        <div
          className={
            "text-gray-800 dark:text-gray-50 flex flex-row justify-between gap-2"
          }
        >
          <MinusCircleIcon
            onClick={close}
            className={
              "object-fill  dark:text-lightBlue-400 text-gray-50 h-6 w-6"
            }
          />
          <PlusCircleIcon
            onClick={Add}
            className={
              "object-fill dark:text-lightBlue-400 text-gray-50 h-6 w-6"
            }
          />
          <ArrowCircleLeftIcon
            onClick={cleanAllField}
            className={
              "object-fill dark:text-lightBlue-400 text-gray-50 h-6 w-6"
            }
          />
        </div>
        {linkresult === "" ? (
          ""
        ) : (
          <div className={"transition-all"}>
            {linkresult ? (
              <CheckCircleIcon
                className={"w-6 h-6 text-green-300 dark:text-teal-400"}
              />
            ) : (
              <BanIcon className={"w-6 h-6 text-green-300 dark:text-red-500"} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
