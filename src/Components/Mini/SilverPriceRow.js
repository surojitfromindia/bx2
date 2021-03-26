export default function SilverPriceRow(props) {
  let h = props.hightlight
    ? `${props.hightlight} flex w-full py-1`
    : `flex w-full py-1`;

  return (
    <tr className={`${h} text-left`}>
      <td className={"w-2/4"}>
        {props.pricerow?.day ? props.pricerow.day : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.tinker ? props.pricerow.tinker : "-"}
      </td>
      <td className={"w-1/4"}>
        {props.pricerow?.slab ? props.pricerow.slab : "-"}
      </td>
    </tr>
  );
}
