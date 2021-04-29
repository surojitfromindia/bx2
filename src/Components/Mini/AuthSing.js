import React, { useState } from "react";
import {
  FireIcon,
  ArchiveIcon,
  PrinterIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from "@heroicons/react/outline";

export default function AuthSing({
  deleteAction,
  printAction,
  ArchiveAction,
  isAllActionDisable = true,
}) {
  const [isExpanded, setisExpanded] = useState(false);

  const onDelete = () => {
    deleteAction();
  };
  const onPrint = () => {
    printAction();
  };
  const onArchive = () => {
    ArchiveAction();
  };

  return (
    <div
      className={
        "flex flex-col rounded-md bg-gray-50 dark:bg-gray-700 shadow-md px-3 py-2"
      }
    >
      <div
        onClick={() => {
          window.scrollBy(0, document.body.scrollHeight);
          setisExpanded((t) => !t);
        }}
        className={"flex flex-row justify-between items-center px-1"}
      >
        <span
          className={
            "my-0.5 text-lg text-gray-600 dark:text-gray-200 tracking-wide font-medium"
          }
        >
          Options
        </span>
        <ChevronDownIcon
          className={`transition-all duration-300 ease-in-out h-4 w-4 my-0.5 transform ${
            isExpanded ? "rotate-0" : "-rotate-90"
          }  text-lg text-gray-600 dark:text-gray-200 tracking-wide font-medium`}
        />
      </div>

      <div
        className={`flex flex-col divide-y divide-gray-200 dark:divide-gray-600 transition-all ease-in-out duration-200 transform ${
          isExpanded ? "max-h-72" : "max-h-0"
        }  overflow-hidden  `}
      >
        <div className="flex flex-row justify-between items-center py-2 px-1">
          <div className={"flex-1 flex flex-col pr-20"}>
            <span
              className={
                "text-sm font-semibold gap-2 text-green-600 dark:text-green-200"
              }
            >
              Print
            </span>
            <span className={"text-xs  text-gray-400"}>
              Download this bill as a printable pdf format & share with the
              customer.
            </span>
          </div>
          <div>
            <button
              disabled={isAllActionDisable}
              onClick={onPrint}
              type="button"
              className={
                "w-14 flex items-center  rounded-sm focus:outline-none border-none px-1.5 py-1.5 text-sm bg-green-500 hover:opacity-80 focus:ring-2 focus:ring-green-400 focus:ring-offset-1  font-medium tracking-wider"
              }
            >
              <span>
                <PrinterIcon className={"h-4 w-4 text-gray-50"} />
              </span>
              <span
                className={
                  "text-xs ml-0.5  hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-gray-50 font-medium tracking-wider"
                }
              >
                PRT
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center py-2 px-1">
          <div className={"flex-1 flex flex-col pr-20"}>
            <span
              className={
                "text-sm font-semibold text-gray-600 dark:text-gray-200"
              }
            >
              Archive
            </span>
            <span className={"text-xs text-gray-400"}>
              Archive this bill. This bill will not show-up in list.
            </span>
          </div>
          <div>
            <button
              disabled={isAllActionDisable}
              onClick={onArchive}
              type="button"
              className={
                "w-14 flex items-center  focus:outline-none rounded-sm border-none px-1.5 py-1.5 text-sm bg-gray-500 hover:opacity-80 focus:ring-2 focus:ring-gray-400 focus:ring-offset-1  font-medium tracking-wider"
              }
            >
              <span>
                <ArchiveIcon className={"h-4 w-4 text-gray-50"} />
              </span>
              <span
                className={
                  "text-xs ml-0.5 hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-gray-50 font-medium tracking-wider"
                }
              >
                ARC
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center py-2 px-1">
          <div className={"flex-1 flex flex-col pr-20"}>
            <span
              className={
                "text-sm font-medium gap-2 text-red-600 dark:text-red-200"
              }
            >
              Delete
            </span>
            <span className={"text-xs   text-gray-400"}>
              deleting this bill will remove this bill permanently from database
            </span>
          </div>
          <div>
            <button
              disabled={isAllActionDisable}
              onClick={onDelete}
              type="button"
              className={
                "w-14 flex items-center rounded-sm focus:outline-none border-none px-1.5 py-1.5 text-sm bg-red-500 hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1  font-medium"
              }
            >
              <span>
                <FireIcon className={"h-4 w-4 text-gray-50"} />
              </span>
              <span
                className={
                  "text-xs ml-0.5 hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-gray-50 font-medium  tracking-widest"
                }
              >
                DEL
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
