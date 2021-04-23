import React from "react";
import { CogIcon } from "@heroicons/react/solid";
export default function LoadingComp() {
  return (
    <div className={"flex flex-col items-center justify-center h-screen"}>
      <CogIcon className={"animate-spin an h-10 w-10 text-gray-600"} />
      <p className={"mt-1 font-semibold text-gray-600"}>Loading...</p>
    </div>
  );
}
