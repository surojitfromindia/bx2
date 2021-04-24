import React, { useEffect, useState } from "react";
import { GetMiniBills } from "../../Controllers/Bill";
import { BillItems } from "./BillList";
import LoadingComp from "./LoadingComp";
import getErrorMessage from "../../Controllers/ErroHandeler/HandelErro";

export default function RecentlyCreatedBill() {
  const [billlist, setbilllis] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errortext, setErrorText] = useState("");

  useEffect(async () => {
    let mounted = true;
    try {
      let miniBillInfos = await GetMiniBills();
      if (mounted) {
        setbilllis(miniBillInfos);
        setIsLoading(false);
      }
    } catch (err) {
      setErrorText(getErrorMessage(err));
    }
    return () => {
      mounted = false;
    };
  }, []);
  return (
    <div>
      {isLoading ? (
        <LoadingComp onerrortext={errortext} />
      ) : (
        <div className={"flex flex-row"}>
          {billlist.slice(0, 4).map((billdetails, index) => (
            <div
              key={index}
              className={`${index === 0 ? "pl-0" : ""}  flex-shrink-0 px-1.5`}
              style={{ width: "340px" }}
            >
              {" "}
              <BillItems details={billdetails} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
