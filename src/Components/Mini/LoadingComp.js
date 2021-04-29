import React, { useState, useEffect } from "react";
import { CogIcon } from "@heroicons/react/solid";
export default function LoadingComp({
  onerrortext,
  onloadingtext = "Loading...",
}) {
  //on receving onerror text  hide the loading.. text and the animation
  const [isAnimationVisiable, setisAnimationVisiable] = useState("flex");
  useEffect(() => {
    if (onerrortext !== "") {
      setisAnimationVisiable("hidden");
    }
  }, [onerrortext]);
  return (
    <div className={"flex flex-col items-center justify-center"}>
      <div className={`${isAnimationVisiable} flex-col items-center`}>
        <CogIcon
          className={
            "animate-spin  an h-8 w-8 text-gray-500 dark:text-coolGray-300"
          }
        />
        <p
          className={"mt-1 font-semibold text-gray-600 dark:text-coolGray-300"}
        >
          {onloadingtext}
        </p>
      </div>
      <p
        className={
          "mt-1 font-semibold text-gray-600 dark:text-coolGray-300 w-64"
        }
      >
        {onerrortext ? onerrortext : ""}
      </p>
    </div>
  );
}
