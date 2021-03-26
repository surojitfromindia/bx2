import SilverPriceRow from "./SilverPriceRow";
export default function SilverPriceList(props) {
  return (
    <tbody
      className={"font-semibold mt-2 overflow-y-scroll"}
      style={{ height: "50vh" }}
    >
      {props.pricerow?.map((price, index) => {
        return index < 2 ? (
          <SilverPriceRow
            key={price.day}
            hightlight={"text-blue-500"}
            pricerow={price}
          />
        ) : (
          <SilverPriceRow key={price.day} pricerow={price} />
        );
      })}
    </tbody>
  );
}
