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
    <div className={"flex flex-col gap-3 md:flex-row"}>
      <div className={"h-1/2 md:w-1/3 "}>
        <GoldPriceCard />
      </div>
      <div className={"h-1/2  md:w-1/3"}>
        <SilverPriceCard />
      </div>
      <div className={"flex flex-col gap-3 h-1/2  md:w-1/3"}>
        <div >
          <CSI infos={infos} />
        </div>
        <div >
          <CSI infos={infos} />
        </div>
      </div>
    </div>
  );
}
