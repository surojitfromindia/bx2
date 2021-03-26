export default function GoldPriceRow(props) {
  let h = props.hightlight
    ? `${props.hightlight} flex w-full py-1`
    : `flex w-full py-1`;

  return (
    <tr className={`${h} text-left`}>
      <td className={"w-2/4"}>
        {props.pricerow?.day ? props.pricerow.day : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.tfk ? props.pricerow.tfk : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.ttk ? props.pricerow.ttk : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.hm ? props.pricerow.hm : "-"}
      </td>
    </tr>
  );
}
