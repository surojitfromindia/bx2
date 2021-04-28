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
    <div className={"flex flex-col rounded-md bg-gray-50 shadow-md px-3 py-2"}>
      <div
        onClick={() => {
          window.scrollBy(0, document.body.scrollHeight);
          setisExpanded((t) => !t);
        }}
        className={"flex flex-row justify-between items-center px-1"}
      >
        <span
          className={"my-0.5 text-lg text-gray-600 tracking-wide font-medium"}
        >
          Options
        </span>
        <ChevronDownIcon
          className={`transition-all delay-200 ease-in-out h-4 w-4 my-0.5 transform ${
            isExpanded ? "rotate-0" : "-rotate-90"
          }  text-lg text-gray-600 tracking-wide font-medium`}
        />
      </div>

      <div
        className={`flex flex-col divide-y divide-gray-200 transition-height transform ${
          isExpanded ? "h-0" : "h-52"
        }  overflow-hidden `}
      >
        <div className="flex-shrink flex flex-row justify-between items-center py-2 px-1">
          <div className={"flex-1 flex flex-col pr-20"}>
            <span className={"text-sm font-semibold gap-2 text-green-600"}>
              Print
            </span>
            <span className={"text-xs  text-gray-400"}>
              Download this bill as a printable pdf format & save into device or
              share to a customer.
            </span>
          </div>
          <div>
            <button
              disabled={isAllActionDisable}
              onClick={onPrint}
              type="button"
              className={
                "w-14 flex items-center  rounded-sm focus:outline-none border-none px-1.5 py-1.5 text-sm bg-green-500 hover:opacity-80 focus:ring-2 focus:ring-green-400 focus:ring-offset-1 text-red-700 font-medium tracking-wider"
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
            <span className={"text-sm font-semibold text-gray-600"}>
              Archive
            </span>
            <span className={"text-xs text-gray-400"}>
              Archive this bill. This bill will not show-up in list. Best use
              this when a bill has been paid long ago.
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
            <span className={"text-sm font-medium gap-2 text-red-600"}>
              Delete
            </span>
            <span className={"text-xs   text-gray-400"}>
              delete this bill will remove this bill from database, recovering
              is not possible.
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
