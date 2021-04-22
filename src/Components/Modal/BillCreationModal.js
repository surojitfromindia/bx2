import React, { useState } from "react";
import {} from "../../Controllers/Bill";

export default function BillCreationModal({
  handleClose,
  show,
  infos,
  handlePurchase,
  checkintext,
}) {
  const showhideClassName = show ? "block" : "hidden";
  const [finalPrice, setFinalPrice] = useState(infos.prices.gt);
  const [paymentPrice, setPaymentPrice] = useState("");
  const handlechange = (ev) => {
    switch (ev.target.id) {
      case "finalPrice": {
        setFinalPrice(ev.target.value);
        break;
      }
      case "firstPay": {
        setPaymentPrice(ev.target.value);
        break;
      }
    }
  };
  const onPurchaseButtonPress = () => {
    handlePurchase({
      tp: Number(finalPrice),
      firstPay: Number(paymentPrice),
    });
  };
  return (
    <div
      className={`bg-gray-800 bg-opacity-70 shadow-lg flex justify-center fixed top-0 bottom-0 left-0 right-0 z-10 ${showhideClassName}`}
    >
      <section
        className={
          "bg-gray-100 px-5 py-4 w-4/5 md:w-2/4 my-8 flex flex-col justify-between "
        }
      >
        <div className={"overflow-y-auto px-1"}>
          <div>
            <h2 className={"text-2xl text-blue-600"}>Final</h2>
            <p
              className={`${
                checkintext.statustext === "Purchased"
                  ? "text-green-600"
                  : checkintext.statustext === "Failed"
                  ? "text-red-600"
                  : "text-indigo-600"
              }`}
            >
              {checkintext.statustext}
            </p>
          </div>

          <div className={"grid grid-cols-8 my-3 gap-3  "}>
            <p
              className={
                "col-span-4 px-0 pr-2 py-1 text-gray-600 text-base font-medium  "
              }
            >
              Name
            </p>
            <p className={"col-span-4 flex justify-start  py-1 "}>
              {infos.item_details.name ? (
                <span>{infos.item_details.name}</span>
              ) : (
                <span className={"text-red-600 font-semibold"}>Empty</span>
              )}
            </p>
            <p
              className={
                "col-span-4 px-0 pr-2 py-1 text-gray-600 text-base font-medium"
              }
            >
              Type
            </p>
            <p className={"col-span-4 flex justify-start py-1"}>
              {infos.item_details.type ? (
                <span>{infos.item_details.type}</span>
              ) : (
                <span className={"text-red-600 font-semibold"}>Empty</span>
              )}
            </p>
            <p
              className={
                "col-span-4 px-0 pr-2 py-1 text-gray-600 text-base font-medium"
              }
            >
              Weight
            </p>
            <p className={"col-span-4 flex justify-start py-1"}>
              {infos.item_details.quantity ? (
                <span>
                  {infos.item_details.quantity} {infos.item_details.unit}
                </span>
              ) : (
                <span className={"text-red-600 font-semibold"}>Empty</span>
              )}
            </p>
            <p
              className={
                "col-span-4 px-0 pr-2 py-1 text-gray-600 text-base font-medium"
              }
            >
              Deposited
            </p>
            <p className={"col-span-4  flex justify-start py-1"}>
              {infos.deposite.quantity ? (
                <span>
                  {infos.deposite.quantity} {infos.deposite.unit}
                </span>
              ) : (
                <span className={"text-red-600 font-semibold"}>Empty</span>
              )}
            </p>
            <p
              className={
                "col-span-4 px-0 pr-2 py-1 text-gray-600 text-base font-medium"
              }
            >
              Subtotal
            </p>
            <p className={"col-span-4  flex justify-start py-1"}>
              {infos.prices.st ? (
                <span>{infos.prices.st}</span>
              ) : (
                <span className={"text-red-600 font-semibold"}>Empty</span>
              )}
            </p>
            <p
              className={
                "col-span-4 px-0 pr-2 py-1 text-gray-600 text-base font-medium"
              }
            >
              MC
            </p>
            <p className={"col-span-4 flex justify-start py-1"}>
              {infos.prices.mc ? (
                <span>{infos.prices.mc}</span>
              ) : (
                <span className={"text-red-600 font-semibold"}>Empty</span>
              )}
            </p>
            <p
              className={
                "col-span-4 px-0 pr-2 py-1 text-gray-600 text-base font-medium"
              }
            >
              GST
            </p>
            <p className={"col-span-4 flex justify-start py-1"}>
              {infos.prices.gst ? (
                <span>{infos.prices.gst}</span>
              ) : (
                <span className={"text-red-600 font-semibold"}>Empty</span>
              )}
            </p>
            <p className={"col-span-4 px-3 py-1 bg-blue-600 text-white"}>
              Grand total
            </p>
            <p className={"col-span-4 flex justify-start py-1 text-blue-700"}>
              {infos.prices.gt ? (
                <span>{infos.prices.gt}</span>
              ) : (
                <span className={"text-red-600 font-semibold"}>Empty</span>
              )}
            </p>
          </div>
          <div>
            <div className={"flex flex-col"}>
              <div className={"grid grid-cols-2 gap-1"}>
                <input
                  id="finalPrice"
                  onChange={handlechange}
                  type="number"
                  className={""}
                  value={finalPrice}
                />
                <input
                  id="firstPay"
                  onChange={handlechange}
                  placeholder="First Payment"
                  type="number"
                  required={true}
                  value={paymentPrice}
                  className={""}
                />
              </div>
              <div className={"flex mt-3"}>
                <input
                  type="button"
                  value={checkintext.buttontext}
                  onClick={onPurchaseButtonPress}
                  disabled={
                    checkintext.buttontext === "Purchased" ? true : false
                  }
                  className={`w-full outline-none px-3 py-2 md:w-40 uppercase ${
                    checkintext.buttontext === "Purchased"
                      ? "bg-green-600"
                      : "bg-blue-600"
                  }  text-white  `}
                />
              </div>
            </div>
          </div>
        </div>
        <input
          type="button"
          className={
            "outline-none mt-5 py-2 md:w-40 uppercase bg-transparent" +
            "text-blue-700 sha0 pr-2ow-md  text-base  font-medium hover:text-white hover:bg-red-600  focus:bg-red-700 focus:ring-4"
          }
          value={"close"}
          onClick={handleClose}
        />
      </section>
    </div>
  );
}
