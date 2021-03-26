export default function Item(props) {
  //props
  const iteminfo = props.billinfo;
  const removebtn = (
    <input type={"button"} value={"Remove"} hidden={!iteminfo.isremovable} />
  );
  return (
    <div>
      <p>{iteminfo.itemname}</p>
      {removebtn}
    </div>
  );
}
