import GoldPriceCard from "../Mini/GoldPrice";
import SilverPriceCard from "../Mini/SilverPrice";

export default function Home(props) {
  //props

  return (
    <div className={"flex flex-col gap-3 md:flex-row"}>
      <div className={"h-1/2 md:w-1/2 "}>
        <GoldPriceCard />
      </div>
      <div className={"h-1/2  md:w-1/2"}>
        <SilverPriceCard />
      </div>
    </div>
  );
}
