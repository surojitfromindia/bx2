import React, { useState, useEffect } from "react";
import SearchBox from "../SuperMini/SearchBox";
import BillItems from "../SuperMini/BillItems";
import LoadingComp from "./LoadingComp";
import getErrorMessage from "../../Controllers/ErroHandeler/HandelErro";

let globalid;
export default function BillList({ list }) {
  const [billlist, setbilllis] = useState(list);
  const [seachFillterList, setseachFillterList] = useState([]);
  const [sortOrder, setSortOrder] = useState("Asc");
  const [isLoading, setIsLoading] = useState(true);
  const [errortext, setErrorText] = useState("");
  const [searchText, setSearchtext] = useState("");
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

  useEffect(() => {
    if (globalid) {
      document.getElementById(globalid)?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "center",
      });
    }
    () => {
      globalid = undefined;
    };
  });

  //search and sort
  useEffect(() => {
    let temp = [];
    let fillterdList = billlist.filter((info) =>
      info.customer_name.toUpperCase().startsWith(searchText)
    );
    if (searchText !== "") {
      temp = fillterdList;
    }
    if (sortOrder === "Asc") {
      setseachFillterList([...temp]);
    } else {
      setseachFillterList([...temp.reverse()]);
    }
  }, [searchText, sortOrder]);

  const onSearch = (searchedText) => {
    setSearchtext(searchedText.toUpperCase());
  };

  const onSeachedItemClick = (idToScroll) => {
    document.getElementById(idToScroll).scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "center",
    });
  };

  const onCardItemViewClick = (id) => {
    globalid = id;
  };

  const Sort = (order) => {
    setSortOrder(order);
  };
  return (
    <div>
      {isLoading ? (
        <div className={"grid place-items-center h-screen"}>
          <LoadingComp onerrortext={errortext} />
        </div>
      ) : (
        <div>
          <div className={"sticky top-0  md:mx-14 md:mt-5 lg:mx-48"}>
            <SearchBox
              billlist={seachFillterList}
              onSearch={onSearch}
              onClick={onSeachedItemClick}
              onSort={Sort}
            />
          </div>
          <div
            className={
              "px-4 py-2 mt-2 grid grid-cols-1 gap-2 md:grid-cols-2 md:mx-12 lg:mx-44"
            }
          >
            {billlist.map((billdetails, idx) => (
              <BillItems
                index={idx}
                details={billdetails}
                key={billdetails._id}
                onlinkClick={onCardItemViewClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
