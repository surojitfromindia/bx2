import React, { useState, useEffect } from "react";

export default function SortSwicth({ valuesProps, onchange }) {
  const [tvaluesProps, settValuesProps] = useState(valuesProps);
  const handleClick = (ev) => {
    let mutatedValueFrom = valuesProps;
    mutatedValueFrom.forEach((it) => {
      //reset everything
      it.isActive = false;
      //then turn on
      if (it.propName === ev.target.id) {
        it.isActive = !it.isActive;
        onchange?.(it.propName);
      }
    });

    settValuesProps([...mutatedValueFrom]);
  };
  return (
    <div
      className={
        "select-none justify-between text-xs transition-colors flex flex-row border-[1px] items-center  border-gray-400 dark:border-gray-300 h-5 overflow-hidden"
      }
    >
      {tvaluesProps.map((item, index) => (
        <div
          onClick={handleClick}
          id={item.propName}
          key={index}
          className={`cursor-pointer text-xs  flex  transition-colors p-1  ${
            item.isActive
              ? "dark:bg-gray-200 dark:text-coolGray-700 bg-lightBlue-500 text-gray-50 "
              : " dark:bg-transparent dark:text-coolGray-200  bg-transparent text-lightBlue-500-50"
          }  `}
        >
          {item.propShort}
        </div>
      ))}
    </div>
  );
}
