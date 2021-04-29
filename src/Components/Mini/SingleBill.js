import React, { useEffect, useState, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";
import LoadingComp from "./LoadingComp";
import BillItems from "../SuperMini/BillItems";
import TimeLine from "../SuperMini/TimeLine";
import AuthSing from "./AuthSing";
import DeleteActionModal from "../Modal/DeleteActionModal";
import {
  getOneBillById,
  updateOneBill,
  deleteOneBillById,
} from "../../Controllers/Bill";
import getErrorMessage from "../../Controllers/ErroHandeler/HandelErro";

export default function SingleBill({ onUpdate, onDelete }) {
  const [BillDetails, setBillDetails] = useState();
  const [payValue, setPayValue] = useState(0);
  const [errortext, setErrorText] = useState("");
  const [actionModals, setActionModals] = useState();
  const [deleteModalShowing, setDeleteModalShowing] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const history = useHistory();
  const { index } = useParams();
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
          onUpdate(index); // delegate to card item
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
      onDelete(id);
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
    <div className={"flex flex-col py-2.5 items-center"}>
      <div className={"px-4 py-2   flex flex-col gap-5 md:w-max pb-4 "}>
        <BillInfo details={BillDetails} />
        <TimeLine
          timeline={BillDetails.payment.timeline}
          tp={BillDetails.payment.tp}
          paidU={BillDetails.payment.paidU}
          dataState={tranStatus}
          payClick={handlePayment}
        />

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
  return <BillItems details={details} isViewButtonHidden={true} />;
};
