import { useEffect, useState, Suspense, lazy } from "react";
import useToken from "../../Hooks/useToken";
import API from "../../Controllers/APIs/API";
import HandleError from "../../Controllers/ErroHandeler/HandelErro";


export default function SilverPriceCard(props) {
  const [pricerow, setPricerow] = useState();
  const { token } = useToken();
  useEffect(() => {
    let mounted = true;
    getAllSilverPrice(token)
      .then((doc) => {
        if (mounted) {
          setPricerow(doc.data);
        }
      })
      .catch((err) => {
        document.querySelector("#erromessage").innerHTML = HandleError(
          err.response.status
        );
      });
    return () => {
      mounted = false;
    };
  }, [token]);

  const getAllSilverPrice = async () => {
    return await API().get("/price/silver");
  };

  const fallbackBody = (
    <tbody>
      <tr>
        <td>Loading</td>
      </tr>
    </tbody>
  );
  //props
  return (
    <div className={"py-4 px-6 bg-white rounded-md "}>
      <h2 className={"text-xl text-indigo-500 font-bold"}>Silver (Kolkata)</h2>
      <p id="erromessage"></p>
      <table className={"my-4 flex flex-col table-fixed w-full max-h-50"}>
        <thead>
          <tr className={"flex w-full text-left"}>
            <th className={"w-1/2"}>Date</th>
            <th className={"w-1/4"}>Tnk/g</th>
            <th className={"w-1/4"}>Slab/g</th>
          </tr>
        </thead>

        <Suspense fallback={fallbackBody}>
          <SilverPriceList pricerow={pricerow} />
        </Suspense>
      </table>
    </div>
  );
}

function SilverPriceList(props) {
  return (
    <tbody
      className={"font-semibold mt-2 overflow-y-scroll"}
      style={{ height: "50vh" }}
    >
      {props.pricerow?.map((price, index) => {
        return index < 2 ? (
          <SilverPriceRow
            key={price.day}
            hightlight={"text-blue-500"}
            pricerow={price}
          />
        ) : (
          <SilverPriceRow key={price.day} pricerow={price} />
        );
      })}
    </tbody>
  );
}

function SilverPriceRow(props) {
  let h = props.hightlight
    ? `${props.hightlight} flex w-full py-1`
    : `flex w-full py-1`;

  return (
    <tr className={`${h} text-left`}>
      <td className={"w-2/4"}>
        {props.pricerow?.day ? props.pricerow.day : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.tinker ? props.pricerow.tinker : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.slab ? props.pricerow.slab : "-"}
      </td>
    </tr>
  );
}
