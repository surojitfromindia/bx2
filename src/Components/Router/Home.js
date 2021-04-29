import GoldPriceCard from "../Mini/GoldPrice";
import SilverPriceCard from "../Mini/SilverPrice";
import RecentlyCreatedBill from "../Mini/RecentlyCreatedBill";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
export default function Home({ de }) {
  //props
  let infos = {
    tbc: 3,
    yebc: 6,
    wbc: 9,
    mbc: 21,
    ybc: 80,
  };
  const srcollByLeft = () => {
    document
      .getElementById("recard")
      .scrollBy({ left: -50, behavior: "smooth" });
  };
  const srcollByRight = () => {
    document
      .getElementById("recard")
      .scrollBy({ left: 50, behavior: "smooth" });
  };
  return (
    <div className={"px-4 py-4 grid gap-3 "}>
      <span className={" -mb-1 font-semibold text-gray-600 dark:text-gray-50"}>
        Recently Added
      </span>
      <div id="recard" className={"relative overflow-x-auto no-scrollbar  "}>
        <RecentlyCreatedBill list={de} />
      </div>
      <div className="hidden sm:flex justify-between -mt-9 z-10 pointer-events-none">
        <span className={" pointer-events-auto  "}>
          <ArrowCircleLeftIcon
            onClick={srcollByLeft}
            className={"w-12 h-12 dark:text-gray-50"}
          />
        </span>
        <span className={" pointer-events-auto  "}>
          <ArrowCircleRightIcon
            onClick={srcollByRight}
            className={"w-12 h-12 dark:text-gray-50"}
          />
        </span>
      </div>
      <div className={" grid gap-3 sm:grid-cols-2"}>
        <GoldPriceCard />
        <SilverPriceCard />
      </div>
    </div>
  );
}
