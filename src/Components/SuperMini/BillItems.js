import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
export default function BillItems({
  index,
  details,
  onlinkClick,
  isViewButtonHidden = false,
}) {
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
          to={`/bill/billlist/${details._id}/${index}`}
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
}
