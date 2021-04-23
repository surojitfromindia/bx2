import React, { useEffect, useState } from "react";
import { GetMiniBills } from "../../Controllers/Bill";
import { BillItems } from "./BillList";

export default function RecentlyCreatedBill() {
  const [billlist, setbilllis] = useState([]);
  useEffect(async () => {
    let mounted = true;

    try {
      let miniBillInfos = await GetMiniBills();
      if (mounted) {
        setbilllis(miniBillInfos);
        fixedList = miniBillInfos;
      }
    } catch (err) {
      console.log(err);
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div className={"flex flex-row gap-3 "}>
      {billlist.slice(0, 4).map((billdetails, index) => (
        <div className={`${index === 0 ? "ml-1" : ""}  flex-shrink-0 w-96`}>
          {" "}
          <BillItems details={billdetails} key={billdetails._id} />
        </div>
      ))}
    </div>
  );
}
