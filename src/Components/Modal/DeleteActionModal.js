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
    // actionButtonRef.current.focus();
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
      StyleMap.textColor = "-red-50";
      StyleMap.textColorLight = "-red-100";
      StyleMap.IntextColor = "-red-500";
      StyleMap.hoverColor = "-red-500";
      StyleMap.bgColor = "-red-500";
      StyleMap.InbgColor = "-red-50";
      break;
    }
    case "archive": {
      StyleMap.textColor = "-blue-50";
      StyleMap.textColorLight = "-blue-100";
      StyleMap.IntextColor = "-blue-500";
      StyleMap.hoverColor = "-blue-500";
      StyleMap.bgColor = "-blue-500";
      StyleMap.InbgColor = "-blue-50";
      break;
    }
    case "print": {
      StyleMap.textColor = "-green-50";
      StyleMap.textColorLight = "-green-100";
      StyleMap.IntextColor = "-green-500";
      StyleMap.hoverColor = "-green-500";
      StyleMap.bgColor = "-green-500";
      StyleMap.InbgColor = "-green-50";
      break;
    }
  }

  return (
    <div
      className={`transition-all duration-700 delay-75 ease-in-out  transform ${
        isShowing ? "max-h-52" : "max-h-0 "
      } fixed bottom-0 bg${
        StyleMap.bgColor
      } left-0 box-content right-0 mx-2 overflow-hidden sm:w-80 mb-7  rounded-md shadow-lg `}
    >
      <div className={`flex justify-between px-4 py-4`}>
        <div className={"flex flex-col w-3/4"}>
          <span
            className={`text-lg font-semibold leading-6 tracking-wider text${StyleMap.textColor}`}
          >
            {modalProps?.actionName}?
          </span>
          <span
            className={`text-sm  overflow-hidden max-h-20 tracking-wide break-words  text${StyleMap.textColorLight}`}
          >
            {modalProps?.message}
          </span>
          <div className={"mt-2.5 "}>
            <button
              ref={actionButtonRef}
              onClick={onActionClick}
              type="button"
              className={`flex items-center rounded-sm focus:outline-none  border-none px-2 py-2 text-sm bg${StyleMap.InbgColor} hover:opacity-80 focus:ring-2 focus:ring${StyleMap.bgColor} focus:ring-offset-1 font-medium`}
            >
              <span
                className={`text-xs hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text${StyleMap.IntextColor} font-medium  tracking-widest`}
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
          className={`h-5 w-5 transition-transform duration-500 transform  ${
            isShowing ? "rotate-0" : "rotate-90"
          } text-gray-200  focus:outline-none `}
        />
      </div>
    </div>
  );
}
