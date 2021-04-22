import React from "react";

export default function BottomBar({ billinfo, oncheckin }) {
  const handleCheckIn = (ev) => {
    oncheckin();
  };

  return (
    <div
      className={
        "py-1 px-3 fixed  left-0 right-0 bottom-0  bg-blue-800 text-white"
      }
    >
      <div className={"flex gap-3 mt-3 justify-between items-baseline"}>
        <div className={"flex gap-3"}>
          <div className={"flex flex-col items-start"}>
            <p
              className={
                "bg-yellow-400 text-yellow-800 text-md font-semibold rounded-sm px-3 py-1"
              }
            >
              {billinfo.mc}
            </p>
            <span>MC</span>
          </div>
          <div className={"flex flex-col items-start"}>
            <p
              className={
                "bg-red-400 text-red-800 text-md font-semibold rounded-sm px-3 py-1"
              }
            >
              {billinfo.gst}
            </p>
            <span>GST</span>
          </div>
          {/*<div className={"flex flex-col "}>
            <p
              className={
                "bg-green-400 text-green-800 text-md font-semibold rounded-sm px-3 py-1"
              }
            >
              {billinfo.billprice - billinfo.gst}
            </p>
            <span>WGST</span>
          </div>*/}
          <div className={"flex flex-col"}>
            <p
              className={
                "text-md font-semibold flex items-center justify-center bg-green-400 text-green-800 rounded-sm px-3 py-1"
              }
            >
              {billinfo.billprice}
            </p>
            <span>Total</span>
          </div>
        </div>
        <div className={"flex gap-3"}>
          <input
            type="button"
            onClick={handleCheckIn}
            className={
              "text-md hover:bg-blue-600 focus:outline-none  hover:outline-none bg-blue-500 rounded-sm px-3 py-1"
            }
            value="Check-Out"
          />
          <p> </p>
        </div>
      </div>
    </div>
  );
}
