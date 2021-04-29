import React, { useEffect, useState } from "react";
import { GetMiniBills } from "../../Controllers/Bill";
import BillItems from "../SuperMini/BillItems";
import LoadingComp from "./LoadingComp";
import getErrorMessage from "../../Controllers/ErroHandeler/HandelErro";

export default function RecentlyCreatedBill({ list }) {
  const [billlist, setbilllis] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errortext, setErrorText] = useState("");

  useEffect(async () => {
    let mounted = true;
    try {
      if (mounted) {
        setbilllis(list);
        setIsLoading(false);
      }
    } catch (err) {
      setErrorText(getErrorMessage(err));
    }
    return () => {
      mounted = false;
    };
  }, [list]);
  return (
    <div>
      {isLoading ? (
        <LoadingComp onerrortext={errortext} />
      ) : (
        <div className={"flex flex-row"}>
          {billlist.slice(0, 4).map((billdetails, idx) => (
            <div
              key={idx}
              className={`${idx === 0 ? "pl-0" : ""}  flex-shrink-0 px-1.5`}
              style={{ width: "340px" }}
            >
              {" "}
              <BillItems index={idx} details={billdetails} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
