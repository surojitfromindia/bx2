import { useEffect, useState, Suspense, lazy } from "react";
import API from "../../Controllers/APIs/API";
import HandleError from "../../Controllers/ErroHandeler/HandelErro";

export default function GoldPriceCard(props) {
  const [pricerow, setPricerow] = useState();
  useEffect(() => {
    let mounted = true;
    getAllGoldPrice()
      .then((doc) => {
        if (mounted) {
          setPricerow(doc.data);
        }
      })
      .catch((err) => {
        document.querySelector("#erromessageGold").innerHTML = HandleError(err);
      });
    return () => {
      mounted = false;
    };
  }, []);

  const getAllGoldPrice = async () => {
    return await API().get("/price/gold");
  };

  //props
  return (
    <div className={"py-4 px-6 bg-white rounded-md "}>
      <h2 className={"text-xl text-indigo-500 font-bold "}>Gold</h2>
      <p id="erromessageGold"></p>
      <table className={"my-4 flex flex-col table-fixed w-full "}>
        <thead>
          <tr className={"flex w-full text-left"}>
            <th className={"w-2/4"}>Date</th>
            <th className={"w-1/4"}>24K/g</th>
            <th className={"w-1/4"}>22K/g</th>
            <th className={"w-1/4"}>HM/g</th>
          </tr>
        </thead>

        <Suspense
          fallback={
            <tbody>
              <tr>
                <td>Loading</td>
              </tr>
            </tbody>
          }
        >
          <GoldPriceList pricerow={pricerow} />
        </Suspense>
      </table>
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
            hightlight={"text-blue-500"}
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
    <tr className={`${h} text-left`}>
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
