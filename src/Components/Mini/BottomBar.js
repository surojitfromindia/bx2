import React from "react";

export default function BottomBar({ billinfo, oncheckin }) {
  const handleCheckIn = (ev) => {
    oncheckin(true);
  };

  return (
    <div
      className={
        "p-3 fixed right-0 left-0 bottom-0 h-30  bg-indigo-700 text-white"
      }
    >
      <div className={"flex justify-between items-center"}>
        <h2 className={"text-xl"}>Total</h2>
        <h2 className={"tex-xl bg-pink-400 rounded-full px-3 py-1"}>
          <span className={"text-pink-900 font-semibold text-lg"}>
            {" "}
            {billinfo.billprice}
          </span>
        </h2>
      </div>

      <div className={"flex gap-3 mt-3 justify-between items-center"}>
        <div className={"flex gap-3"}>
          <div className={"flex flex-col items-start"}>
            <p
              className={
                "bg-yellow-400 text-yellow-800 text-md font-semibold rounded-md px-3 py-1"
              }
            >
              {billinfo.mc}
            </p>
            <span>MC</span>
          </div>
          <div className={"flex flex-col items-start"}>
            <p
              className={
                "bg-red-400 text-red-800 text-md font-semibold rounded-md px-3 py-1"
              }
            >
              {billinfo.gst}
            </p>
            <span>GST</span>
          </div>
          <div className={"flex flex-col items-stretch"}>
            <p
              className={
                "bg-green-400 text-green-800 text-md font-semibold rounded-md px-3 py-1"
              }
            >
              {billinfo.billprice - billinfo.gst}
            </p>
            <span>Without gst</span>
          </div>
        </div>
        <input
          type="button"
          onClick={handleCheckIn}
          className={
            "tex-xl hover:bg-pink-700 focus:outline-none  hover:outline-none bg-indigo-500 rounded-full px-3 py-1"
          }
          value="Check-Out"
        />
      </div>
    </div>
  );
}
