import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { BillItems } from "./BillList";
import { getOneBillById, updateOneBill } from "../../Controllers/Bill";
import LoadingComp from "./LoadingComp";
import {
  AcademicCapIcon,
  ArrowCircleLeftIcon,
  ArrowLeftIcon,
} from "@heroicons/react/solid";
import { utc } from "moment";

export default function SingleBill() {
  const [BillDetails, setBillDetails] = useState();
  const [payValue, setPayValue] = useState(0);
  //three posaiable dataState
  //1. pending
  //2. faild
  //3. succesfull
  //4. pay
  var t;
  const [tranStatus, setTranStatus] = useState("pay");
  const { id } = useParams();
  useEffect(() => {
    getOneBillById(id)
      .then((bill) => {
        setBillDetails(bill);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (payValue !== 0 && tranStatus !== "pending") {
      setTranStatus("pending");
      updateOneBill(id, { paid: payValue })
        .then((bill) => {
          setBillDetails(bill);
          setTranStatus("succesfull");
          t = setTimeout(() => {
            setTranStatus("Pay");
            setPayValue(0); //trigger for next effect
          }, 1500);
        })
        .catch((err) => {
          setTranStatus("faild");
        });
    }
  }, [payValue]);

  const handlePayment = (value) => {
    setPayValue(value);
  };
  return BillDetails ? (
    <div className={"px-4 py-2 grid gap-5"}>
      <BillInfo details={BillDetails} />
      <TimeLine
        timeline={BillDetails.payment.timeline}
        tp={BillDetails.payment.tp}
        dataState={tranStatus}
        payClick={handlePayment}
      />

      <AuthSignature />
    </div>
  ) : (
    <div>
      <LoadingComp onerrortext="Oops!" />
    </div>
  );
}

const BillInfo = ({ details }) => {
  return <BillItems details={details} />;
};

const TimeLine = ({ timeline, tp, dataState, payClick }) => {
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
    <div className={"flex flex-col"}>
      <div className={"-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8"}>
        <div
          className={
            "py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8"
          }
        >
          <div
            className={
              "shadow  overflow-hidden border-b border-gray-200 rounded-md"
            }
          >
            <table className={"min-w-full"}>
              <thead className={"bg-red-300"}>
                <tr>
                  <th
                    scope="col"
                    className={
                      "px-6 py-3 text-left text-xs font-medium text-red-700 uppercase tracking-wider"
                    }
                  >
                    Date
                  </th>
                  <th
                    scope="col"
                    className={
                      "px-6 py-3 text-center text-xs font-medium text-red-700 uppercase tracking-wider"
                    }
                  >
                    Remain
                  </th>
                  <th
                    scope="col"
                    className={
                      "px-6 py-3 text-right text-xs font-medium text-red-700 uppercase tracking-wider"
                    }
                  >
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className={"divide-y divide-gray-300"}>
                {timeline.map((time, index) => (
                  <tr key={index}>
                    <td className={"px-6 py-2 whitespace-nowrap"}>
                      <div className={"flex items-center"}>
                        <div className={""}>
                          <div
                            className={"text-sm font-semibold text-gray-500"}
                          >
                            {utc(time.date).format("DD-MM-YYYY")}
                          </div>
                          <div className={"text-sm  text-gray-500"}></div>
                        </div>
                      </div>
                    </td>

                    <td className={"px-6 py-2 whitespace-nowrap text-center"}>
                      <span
                        className={`px-2 w-14 justify-center py-0.5 inline-flex  text-xs leading-5 font-semibold rounded-lg ${
                          time.remain <= 10
                            ? " bg-green-300 text-green-700 "
                            : " bg-blue-300 text-blue-700"
                        } `}
                      >
                        {time.remain}
                      </span>
                    </td>
                    <td className={"px-6 text-right py-2 whitespace-nowrap"}>
                      <div
                        className={
                          "text-sm tracking-wider font-medium text-blue-700"
                        }
                      >
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
                  "outline-none rounded-sm border-none focus:ring-2  focus:ring-red-300 px-3 py-1.5 text-sm  flex-1 sm:flex-grow-0 "
                }
              ></input>
              <button
                onClick={onPayClick}
                type="button"
                className={
                  "focus:outline-none border-none px-5 py-1.5 text-sm bg-red-300 hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-red-700 font-medium tracking-wider"
                }
              >
                <span
                  className={
                    " flex-shrink-0 px-5 py-1.5 w-28 text-sm bg-red-300 hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-red-700 font-medium tracking-wider"
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
};

const NewPayment = () => {
  return (
    <div className={"shadow-md rounded-md flex flex-row gap-2 px-3 py-2"}>
      <input
        type="number"
        value="Pay"
        className={"outline-none border-none px-5 py-1.5 text-sm  flex-1"}
      ></input>
      <input
        type="button"
        value="Pay"
        className={"outline-none border-none px-5 py-1.5 text-sm bg-red-300"}
      ></input>
    </div>
  );
};

const AuthSignature = () => {
  return <div>Work in Progress</div>;
};
