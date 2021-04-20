import GoldPriceCard from "../Mini/GoldPrice";
import SilverPriceCard from "../Mini/SilverPrice";
import CSI from "../Mini/CreateNewBillShortInfo";

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
    <div className={"grid gap-3 md:grid-cols-2 lg:grid-cols-3"}>
      <div className={""}>
        <GoldPriceCard />
      </div>
      <div className={""}>
        <SilverPriceCard />
      </div>
    </div>
  );
}
