import React from "react";
import { useParams } from "react-router-dom";

export default function SingleBill() {
  const { id } = useParams();
  return (
    <div className={"px-4 py-2"}>
      <BillInfo />
      <TimeLine />
      <NewPayment />
      <AuthSignature />
    </div>
  );
}

const BillInfo = () => {
  return <div>Work in Progress</div>;
};

const TimeLine = () => {
  return <div>Work in Progress</div>;
};

const NewPayment = () => {
  return <div>Work in Progress</div>;
};

const AuthSignature = () => {
  return <div>Work in Progress</div>;
};
