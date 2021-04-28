import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { BillItems } from "./BillList";
import { useHistory } from "react-router-dom";
import {
  getOneBillById,
  updateOneBill,
  deleteOneBillById,
} from "../../Controllers/Bill";
import LoadingComp from "./LoadingComp";
import getErrorMessage from "../../Controllers/ErroHandeler/HandelErro";
import { utc } from "moment";
import AuthSing from "./AuthSing";
import DeleteActionModal from "../Modal/DeleteActionModal";

export default function SingleBill() {
  const [BillDetails, setBillDetails] = useState();
  const [payValue, setPayValue] = useState(0);
  const [errortext, setErrorText] = useState("");
  const [actionModals, setActionModals] = useState();
  const [deleteModalShowing, setDeleteModalShowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const timelineref = useRef();
  const history = useHistory();
  //three posaiable dataState
  //1. pending
  //2. faild
  //3. succesfull
  //4. pay
  var t;
  const [tranStatus, setTranStatus] = useState("PAY");
  const { id } = useParams();
  useEffect(() => {
    getOneBillById(id)
      .then((bill) => {
        setBillDetails(bill);
        window.scrollTo({
          top: timelineref.current.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        setErrorText(getErrorMessage(err));
      });
  }, []);

  useEffect(() => {
    if (payValue !== 0 && tranStatus !== "PENDING") {
      setTranStatus("PENDING");
      setIsEditing(true);
      updateOneBill(id, { paid: payValue })
        .then((bill) => {
          setBillDetails(bill);
          setTranStatus("DONE");
          setIsEditing(false);
          t = setTimeout(() => {
            setTranStatus("PAY");
            setPayValue(0); //trigger for next effect
          }, 1500);
        })
        .catch((err) => {
          setTranStatus("FAILD");
          setIsEditing(false);
          t = setTimeout(() => {
            setTranStatus("PAY");
            setPayValue(0); //trigger for next effect
          }, 700);
        });
    }
    return () => {
      clearTimeout(t);
    };
  }, [payValue]);

  let DeleteModalProperties = {
    action: () => {
      setIsEditing(true);
      deleteOneBillById(id)
        .then((m) => {
          setIsEditing(false);
          setTimeout(() => {
            history.goBack();
          }, 1000);
        })
        .catch((err) => setErrorText(err));
    },
    actionName: "Delete",
    message:
      "Delete this record! This operation is irreversiable. A best practise is to achive a record before remove.",
  };
  const handleDelete = () => {
    setDeleteModalShowing(true);
    setActionModals(DeleteModalProperties);
  };

  let PrintModalProperties = {
    action: () => {
      console.log("Printing");
    },
    actionName: "Print",
    message:
      "This will print this bill via a color printer. But go green. This software can store many records without using a single paper.",
  };
  const handlePrint = () => {
    setDeleteModalShowing(true);
    setActionModals(PrintModalProperties);
  };

  let ArchiveModalProperties = {
    action: () => {
      console.log("Hello");
    },
    actionName: "Archive",
    message:
      "Archiving will remove this bill from visiable list. But you can still explore it from AxArchive.",
  };
  const handleArchive = () => {
    setDeleteModalShowing(true);
    setActionModals(ArchiveModalProperties);
  };

  const handleDeleteModalClose = () => {
    setDeleteModalShowing(false);
  };

  const handlePayment = (value) => {
    setPayValue(value);
  };

  return BillDetails ? (
    <div className={"flex items-center justify-center "}>
      <div className={"px-4 py-2  flex flex-col gap-5  md:w-max pb-4 "}>
        <BillInfo details={BillDetails} />

        <div ref={timelineref}>
          <TimeLine
            timeline={BillDetails.payment.timeline}
            tp={BillDetails.payment.tp}
            paidU={BillDetails.payment.paidU}
            dataState={tranStatus}
            payClick={handlePayment}
          />
        </div>
        <AuthSing
          deleteAction={handleDelete}
          ArchiveAction={handleArchive}
          printAction={handlePrint}
          isAllActionDisable={isEditing}
        />
        <DeleteActionModal
          modalProps={actionModals}
          action={actionModals?.action}
          isShowing={deleteModalShowing}
          onClose={handleDeleteModalClose}
        />
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen justify-center">
      <LoadingComp onerrortext={errortext} />
    </div>
  );
}

const BillInfo = ({ details }) => {
  return <BillItems details={details} />;
};

const TimeLine = ({ timeline, tp, paidU, dataState, payClick }) => {
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
              "shadow  overflow-hidden border-b bg-gray-50 border-gray-100 rounded-md"
            }
          >
            <table className={"min-w-full"}>
              <thead className={"bg-blue-500"}>
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
              <tbody className={"divide-y divide-gray-300"}>
                {timeline.map((time, index) => (
                  <tr
                    key={index}
                    className={
                      " transition-colors ease-in-out duration-300 transform bg-none hover:bg-gray-300"
                    }
                  >
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

                    <td className={"px-6 py-2 whitespace-nowrap"}>
                      <div className={"flex flex-col items-center"}>
                        <span
                          className={`w-14 justify-center py-0.5 inline-flex   text-xs leading-5 font-semibold rounded-sm ${
                            time.remain <= 10
                              ? " bg-green-200 text-green-700 "
                              : " bg-blue-200 text-blue-700"
                          } `}
                        >
                          {time.remain?.toFixed(0)}
                        </span>
                      </div>
                    </td>
                    <td className={"px-6 text-right py-2 whitespace-nowrap"}>
                      <div
                        className={
                          "text-sm tracking-wider font-semibold text-blue-700"
                        }
                      >
                        {index === timeline.length - 1 ? (
                          <span
                            className={`text-xs font-medium mr-1 ${
                              time.remain <= 10
                                ? " text-green-700 "
                                : " text-red-700"
                            }  `}
                          >
                            + {paidU}
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
                  "outline-none bg-gray-200 rounded-sm border-none focus:ring-2  focus:ring-blue-400 px-3 py-2 text-sm  flex-1 sm:flex-grow-0 "
                }
              ></input>
              <button
                onClick={onPayClick}
                type="button"
                className={
                  "w-24 focus:outline-none border-none px-1 py-2 text-sm bg-blue-500 hover:opacity-80 focus:ring-2 focus:ring-blue-400 focus:ring-offset-1 font-medium tracking-wider"
                }
              >
                <span
                  className={
                    " text-sm hover:opacity-80 focus:ring-2 focus:ring-red-400 focus:ring-offset-1 text-gray-50 font-medium tracking-wider"
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
