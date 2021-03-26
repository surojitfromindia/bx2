import GoldPriceRow from "./GoldPriceRow";
export default function GoldPriceList(props) {
  return (
    <tbody
      className={"font-semibold mt-2 overflow-y-scroll"}
      style={{ height: "50vh" }}
    >
      {props.pricerow?.map((price, index) => {
        return index < 2 ? (
          <GoldPriceRow
            key={price.day}
            hightlight={"text-blue-500"}
            pricerow={price}
          />
        ) : (
          <GoldPriceRow key={price.day} pricerow={price} />
        );
      })}
    </tbody>
  );
}
