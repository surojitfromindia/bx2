import React from "react";
import { MailIcon } from "@heroicons/react/solid";

export default function NotificationComp() {
  return (
    <div
      className={"flex h-screen w-screen flex-col justify-center items-center "}
    >
      <MailIcon className={"h-6 w-6 text-gray-500 mb-2.5"} />
      <span className={"text-lg font-semibold text-gray-700"}>
        Your Notification Will Be Here.
      </span>
      <span className={"text-sm font-medium text-gray-500"}> (WoIP)</span>
    </div>
  );
}
