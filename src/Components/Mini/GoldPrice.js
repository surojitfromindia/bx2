import { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import useToken from "../../Hooks/useToken";
//import GoldPriceList from "./GoldPriceList";
//const GoldPriceRow = lazy(() => import("./GoldPriceRow"));
const GoldPriceList = lazy(() => import("./GoldPriceList"));

export default function GoldPriceCard(props) {
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
    <div className={"py-4 px-6 bg-white rounded-md "}>
      <h2 className={"text-xl text-indigo-500 font-bold"}>Gold (Kolkata)</h2>
      <table className={"my-4 flex flex-col table-fixed w-full  max-h-50"}>
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
