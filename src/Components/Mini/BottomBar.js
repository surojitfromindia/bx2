import React from "react";

export default function BottomBar() {
  return (
    <div
      className={
        "p-3 fixed right-0 left-0 bottom-0 h-30  bg-indigo-700 text-white"
      }
    >
      <h2 className={"text-xl"}>Total</h2>
      <div className={"flex gap-3"}>
        <p>Some Infos</p>
        <p>Some Infos</p>
        <p>Some Infos</p>
      </div>
    </div>
  );
}
