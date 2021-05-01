import GoldPriceCard from "../Mini/GoldPrice";
import SilverPriceCard from "../Mini/SilverPrice";
import RecentlyCreatedBill from "../Mini/RecentlyCreatedBill";
import {
  ArrowCircleLeftIcon,
  ArrowCircleRightIcon,
} from "@heroicons/react/solid";
import ShortCut from "../Mini/ShortCut";
export default function Home({ de }) {
  const srcollByLeft = () => {
    document
      .getElementById("recard")
      .scrollBy({ left: -200, behavior: "smooth" });
  };
  const srcollByRight = () => {
    document
      .getElementById("recard")
      .scrollBy({ left: 200, behavior: "smooth" });
  };
  return (
    <div className={"px-4 py-4 grid gap-3 "}>
      <div className={" -mb-1 flex justify-between items-center"}>
        <span className={" font-semibold text-gray-600 dark:text-gray-50"}>
          Recently Added
        </span>
        <div className="sm:flex flex justify-end  pointer-events-none">
          <span className={" pointer-events-auto  "}>
            <ArrowCircleLeftIcon
              onClick={srcollByLeft}
              className={"w-6 h-6 text-blue-500 dark:text-coolGray-200"}
            />
          </span>
          <span className={" pointer-events-auto  "}>
            <ArrowCircleRightIcon
              onClick={srcollByRight}
              className={"w-6 h-6 text-blue-500 dark:text-coolGray-200"}
            />
          </span>
        </div>
      </div>
      <div id="recard" className={"relative overflow-x-auto no-scrollbar"}>
        <RecentlyCreatedBill list={de} />
      </div>

      <div
        className={" grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"}
      >
        <GoldPriceCard />
        <SilverPriceCard />
        <ShortCut />
      </div>
    </div>
  );
}
