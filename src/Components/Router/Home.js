import GoldPriceCard from "../Mini/GoldPrice";
import SilverPriceCard from "../Mini/SilverPrice";
import RecentlyCreatedBill from "../Mini/RecentlyCreatedBill";

export default function Home(props) {
  //props
  let infos = {
    tbc: 3,
    yebc: 6,
    wbc: 9,
    mbc: 21,
    ybc: 80,
  };
  return (
    <div className={"px-4 py-4 grid gap-3 "}>
      <span className={"px-2 -mb-1 font-semibold text-gray-600"}>
        Recently Added
      </span>
      <div className={"overflow-x-scroll "}>
        <RecentlyCreatedBill />
      </div>
      <div className={"grid gap-3 sm:grid-cols-2"}>
        <GoldPriceCard />
        <SilverPriceCard />
      </div>
    </div>
  );
}
