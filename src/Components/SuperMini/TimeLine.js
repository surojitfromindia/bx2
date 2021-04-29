import React, { useEffect, useState, useRef } from "react";
import { utc } from "moment";
export default function TimeLine({ timeline, tp, paidU, dataState, payClick }) {
  //three posaiable dataState
  //1. pending
  //2. faild
  //3. succesfull
  //4. ""
  const payRef = useRef();
  const [buttonText, setButtonText] = useState("");
  useEffect(() => {
    setButtonText(dataState);
    timeline.reduce((sum, x) => {
      var f = sum - x.paid;
      x.remain = f;
      return f;
    }, tp);
  }, [dataState]);

  const onPayClick = () => {
    payClick(Number(payRef.current.value));
  };
  return (
    <div className={"flex flex-col "}>
      <div className={"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"}>
        <div
          className={
            "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          }
        >
          <div
            className={
              "shadow overflow-hidden bg-gray-50 dark:bg-coolGray-700 border-gray-100 rounded-md"
            }
          >
            <table className={"min-w-full"}>
              <thead className={"bg-blue-500 dark:bg-lightBlue-600"}>
                <tr>
                  <th
                    scope="col"
                    className={
                      "px-6 py-3 text-left text-xs font-medium text-gray-50 uppercase tracking-wider"
                    }
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className={
                      "px-6 py-3 text-center text-xs font-medium text-gray-50 uppercase tracking-wider"
                    }
                  >
                    Remain
                  </th>
                  <th
                    scope="col"
                    className={
                      "px-6 py-3 text-right text-xs font-medium text-gray-50 uppercase tracking-wider"
                    }
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody
                className={"divide-y divide-gray-300 dark:divide-gray-600"}
              >
                {timeline.map((time, index) => (
                  <tr
                    key={index}
                    className={
                      " transition-colors ease-in-out duration-300 transform bg-none hover:bg-gray-300 dark:hover:bg-gray-800"
                    }
                  >
                    <td className={"px-6 py-2 whitespace-nowrap"}>
                      <div className={"flex items-center"}>
                        <div className={""}>
                          <div
                            className={
                              "text-sm font-semibold text-gray-500 dark:text-gray-50"
                            }
                          >
                            {utc(time.date).format("DD-MM-YYYY")}
                          </div>
                          <div className={"text-sm  text-gray-500"}></div>
                        </div>
                      </div>
                    </td>

                    <td className={"px-6 py-2 whitespace-nowrap"}>
                      <div className={"flex flex-col items-center"}>
                        <span
                          className={`w-14 justify-center py-0.5 inline-flex   text-xs leading-5 font-semibold rounded-sm ${
                            time.remain <= 10
                              ? " bg-green-200 text-green-700 "
                              : " bg-blue-200 text-blue-700 dark:bg-lightBlue-400 dark:text-lightBlue-900"
                          } `}
                        >
                          {time.remain?.toFixed(0)}
                        </span>
                      </div>
                    </td>
                    <td className={"px-6 text-right py-2 whitespace-nowrap"}>
                      <div
                        className={
                          "text-sm tracking-wider font-semibold text-blue-700 dark:text-blue-200"
                        }
                      >
                        {index === timeline.length - 1 ? (
                          <span
                            className={`text-xs font-medium mr-1 inline-flex items-center ${
                              time.remain <= 10
                                ? " text-green-700 dark:text-yellow-300 "
                                : " text-red-700 dark:text-white  dark:bg-pink-500 px-1.5"
                            }  `}
                          >
                            +{paidU}
                          </span>
                        ) : (
                          ""
                        )}
                        {time.paid}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className={
                "shadow-md rounded-md flex flex-row sm:justify-start gap-2 px-3 py-2"
              }
            >
              <input
                placeholder="Input Amount"
                min={0}
                ref={payRef}
                type="number"
                className={
                  "outline-none bg-gray-200  dark:bg-gray-800 dark:text-gray-50 dark:placeholder-gray-300 rounded-sm border-none focus:ring-2  focus:ring-blue-400 px-3 py-2 text-sm  flex-1 sm:flex-grow-0 "
                }
              ></input>
              <button
                onClick={onPayClick}
                type="button"
                className={
                  "w-24 focus:outline-none border-none px-1 py-2 text-sm bg-blue-500 dark:bg-lightBlue-600 hover:opacity-80 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 font-medium tracking-wider"
                }
              >
                <span
                  className={
                    "text-sm hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-gray-50 font-medium tracking-wider"
                  }
                >
                  {buttonText}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
