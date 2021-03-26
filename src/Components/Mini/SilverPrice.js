import { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import useToken from "../../Hooks/useToken";
//import GoldPriceList from "./GoldPriceList";
//const GoldPriceRow = lazy(() => import("./GoldPriceRow"));
const GoldPriceList = lazy(() => import("./GoldPriceList"));

export default function SilverPriceCard(props) {
  const [pricerow, setPricerow] = useState();
  const { token } = useToken();
  useEffect(() => {
    let mounted = true;
    getAllGoldPrice(token)
      .then((doc) => {
        if (mounted) {
          setPricerow(doc.data);
        }
      })
      .catch((err) => {});
    return () => {
      mounted = false;
    };
  }, [token]);

  const getAllGoldPrice = async (token) => {
    return await axios.get("https://gl7be.sse.codesandbox.io/price/gold", {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  //props
  return (
    <div className={"py-4 px-6 bg-gray-300 rounded-md "}>
      <h2 className={"text-2xl text-indigo-500 font-bold"}>Silver (Kolkata)</h2>
      <table className={"my-4 flex flex-col table-fixed w-full  max-h-40"}>
        <thead>
          <tr className={"flex w-full text-left"}>
            <th className={"w-1/2"}>Date</th>
            <th className={"w-1/4"}>Tinker/g</th>
            <th className={"w-1/4"}>Slab/g</th>
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
          <tbody>
            <tr className={"flex w-full py-1 text-left"}>
              <td className={"w-2/4"}>
                {props.pricerow?.day ? props.pricerow.day : "-"}
              </td>
              <td className={"w-1/4"}>
                {props.pricerow?.tfk ? props.pricerow.tfk : "-"}
              </td>
              <td className={"w-1/4"}>
                {props.pricerow?.ttk ? props.pricerow.ttk : "-"}
              </td>
            </tr>
          </tbody>
        </Suspense>
      </table>
    </div>
  );
}
