import React from "react";
import { MailIcon } from "@heroicons/react/solid";

export default function NotificationComp() {
  return (
    <div
      className={
        "flex flex-col w-full justify-center items-center overflow-y-auto"
      }
    >
      <MailIcon className={"h-6 w-6 text-gray-50 mb-2"} />
      <span className={"text-lg font-semibold text-gray-50"}>
        Your Notification Will Be Here.
      </span>
      <span className={"text-sm font-medium text-gray-100"}> (WoIP)</span>
    </div>
  );
}
