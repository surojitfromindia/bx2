import React, { useRef, useEffect } from "react";
import { MinusCircleIcon } from "@heroicons/react/outline";

export default function DeleteActionModal({
  modalProps,
  action,
  isShowing,
  onClose,
}) {
  const actionButtonRef = useRef();

  useEffect(() => {
    actionButtonRef.current.focus();
  }, [action]);
  const onActionClick = (ev) => {
    action();
  };
  const handleClose = () => {
    onClose();
  };
  let StyleMap = {};
  switch (modalProps?.actionName.toLowerCase()) {
    case "delete": {
      StyleMap.textColor = "-red-500";
      StyleMap.hoverColor = "-red-500";
      StyleMap.bgColor = "-red-500";
      break;
    }
    case "archive": {
      StyleMap.textColor = "-blue-500";
      StyleMap.hoverColor = "-blue-500";
      StyleMap.bgColor = "-blue-500";
      break;
    }
    case "print": {
      StyleMap.textColor = "-green-500";
      StyleMap.hoverColor = "-green-500";
      StyleMap.bgColor = "-green-500";
      break;
    }
  }

  return (
    <div
      className={`transition-all delay-100 ease-in-out  transform ${
        isShowing ? "h-36  opacity-100" : "h-0 opacity-0"
      } fixed bottom-0 left-0 right-0 overflow-hidden sm:w-min  bg-gray-100 mb-6 mx-2.5  rounded-md shadow-md border-t-2`}
    >
      <div className={"flex justify-between px-4 py-4"}>
        <div className={"flex flex-col"}>
          <span
            className={`text-sm font-semibold leading-6 tracking-wider text${StyleMap.textColor}`}
          >
            {modalProps?.actionName}?
          </span>
          <span
            className={"text-xs  tracking-wide break-words w-64 text-gray-500"}
          >
            {modalProps?.message}
          </span>
          <div className={"mt-2.5"}>
            <button
              ref={actionButtonRef}
              onClick={onActionClick}
              type="button"
              className={`flex items-center rounded-sm focus:outline-none border-none px-1.5 py-1.5 text-sm bg${StyleMap.bgColor} hover:opacity-80 focus:ring-2 focus:ring${StyleMap.bgColor} focus:ring-offset-1  font-medium`}
            >
              <span
                className={
                  "text-xs  hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-gray-50 font-medium  tracking-widest"
                }
              >
                {modalProps?.actionName}
              </span>
            </button>
          </div>
        </div>
        <MinusCircleIcon
          tabIndex={0}
          onClick={handleClose}
          onKeyDown={handleClose}
          className={`h-4 w-4 text-gray-500 hover:text${StyleMap.hoverColor} focus:outline-none focus:text${StyleMap.hoverColor}`}
        />
      </div>
    </div>
  );
}
