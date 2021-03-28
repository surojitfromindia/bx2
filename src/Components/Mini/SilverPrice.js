import { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import useToken from "../../Hooks/useToken";
const SilverPriceList = lazy(() => import("./SilverPriceList"));

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
      .catch((err) => {});
    return () => {
      mounted = false;
    };
  }, [token]);

  const getAllSilverPrice = async (token) => {
    return await axios.get("https://gl7be.sse.codesandbox.io/price/silver", {
      headers: { Authorization: `Bearer ${token}` },
    });
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
