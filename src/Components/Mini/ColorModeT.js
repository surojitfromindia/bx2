import React, { useState } from "react";
import { SunIcon, MoonIcon } from "@heroicons/react/solid";
export default function ColorModeT({ onTog }) {
  const [isDark, setIsDark] = useState(
    JSON.parse(localStorage.getItem("isDark"))
  );
  const handleTog = () => {
    onTog();
    setIsDark((t)=>!t);
  };
  return (
    <div onClick={handleTog} className={"transition-all "}>
      {isDark ? (
        <SunIcon className={"w-6 h-6 text-gray-50"} />
      ) : (
        <MoonIcon className={"w-6 h-6 text-gray-50"} />
      )}
    </div>
  );
}
