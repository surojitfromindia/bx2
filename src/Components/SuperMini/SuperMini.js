import React from "react";
import moment from "moment";
export default function SuperMini({ details, onClick }) {
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
}
