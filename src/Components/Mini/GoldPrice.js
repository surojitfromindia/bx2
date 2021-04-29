import { useEffect, useState } from "react";
import API from "../../Controllers/APIs/API";
import LoadingComp from "./LoadingComp";
import getErrorMessage from "../../Controllers/ErroHandeler/HandelErro";
import {
  ReloadFromLocal,
  saveToLocal,
  isInLocal,
} from "../../Controllers/LoadFromLocal";

export default function GoldPriceCard(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [pricerow, setPricerow] = useState();
  const [errortext, setErrorText] = useState("");
  useEffect(() => {
    let mounted = true;
    if (!isInLocal("gold")) {
      getAllGoldPrice()
        .then((doc) => {
          if (mounted) {
            //save to session storage
            saveToLocal("gold", JSON.stringify(doc.data));
            setPricerow(doc.data);
            setIsLoading(false);
          }
        })
        .catch((err) => {
          setErrorText(getErrorMessage(err));
        });
    } else {
      setPricerow(JSON.parse(ReloadFromLocal("gold")));
      setIsLoading(false);
    }
    return () => {
      mounted = false;
    };
  }, []);

  const getAllGoldPrice = async () => {
    return await API().get("/price/gold");
  };

  return (
    <div
      className={
        "select-none max-h-72  py-4 px-6 transition-colors bg-white dark:bg-coolGray-700 rounded-md "
      }
    >
      <h2 className={"text-xl text-indigo-500 dark:text-gray-100 font-bold "}>
        Gold <span className={"text-sm"}>(viewing cached)</span>
      </h2>
      {isLoading ? (
        <div>
          <LoadingComp
            onerrortext={errortext}
            onloadingtext="Fetching Data..."
          />
        </div>
      ) : (
        <div>
          <table className={"my-4 max-h-52 flex flex-col table-fixed w-full "}>
            <thead>
              <tr className={"flex w-full text-left dark:text-pink-400"}>
                <th className={"w-2/4"}>Date</th>
                <th className={"w-1/4"}>24K/g</th>
                <th className={"w-1/4"}>22K/g</th>
                <th className={"w-1/4"}>HM/g</th>
              </tr>
            </thead>

            <GoldPriceList pricerow={pricerow} />
          </table>
        </div>
      )}
    </div>
  );
}

function GoldPriceList(props) {
  return (
    <tbody
      className={"font-semibold mt-2 overflow-y-scroll  no-scrollbar"}
      style={{ height: "50vh" }}
    >
      {props.pricerow?.map((price, index) => {
        return index < 2 ? (
          <GoldPriceRow
            key={price.day}
            hightlight={"text-blue-500 dark:text-yellow-300"}
            pricerow={price}
          />
        ) : (
          <GoldPriceRow key={price.day} pricerow={price} />
        );
      })}
    </tbody>
  );
}

function GoldPriceRow(props) {
  let h = props.hightlight
    ? `${props.hightlight} flex w-full py-1`
    : `flex w-full py-1`;

  return (
    <tr className={`dark:text-gray-300 ${h} text-left `}>
      <td className={"w-2/4"}>
        {props.pricerow?.day ? props.pricerow.day : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.tfk ? props.pricerow.tfk : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.ttk ? props.pricerow.ttk : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.hm ? props.pricerow.hm : "-"}
      </td>
    </tr>
  );
}
