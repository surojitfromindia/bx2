import React from "react";

export default function BillCreationModal({ handleClose, show, infos }) {
  const showhideClassName = show ? "block" : "hidden";
  return (
    <div
      className={`bg-gray-800 bg-opacity-70 shadow-lg flex justify-center fixed top-0 bottom-0 left-0 right-0 z-10 ${showhideClassName}`}
    >
      <section
        className={
          "bg-gray-100 px-5 py-4 w-4/5 md:w-2/4 my-8  flex flex-col justify-between "
        }
      >
        <div>
          <h2 className={"text-4xl text-indigo-600"}>Final</h2>
          <div>
            <div className={"grid grid-cols-8 my-5 text-lg"}>
              <p className={"col-span-3"}>ITEM NAME</p>
              <p className={"col-span-5  flex justify-start"}>
                {infos.username ? (
                  <span>{infos.username}</span>
                ) : (
                  <span className={"text-red-600 font-semibold"}>Empty</span>
                )}
              </p>
            </div>
          </div>
        </div>
        <input
          type="button"
          className={
            "outline-none px-3 py-2 md:w-40 uppercase  bg-indigo-600 text-white hover:bg-indigo-700 focus:bg-indigo-600 focus:ring-4"
          }
          value={"close"}
          onClick={handleClose}
        />
      </section>
    </div>
  );
}
