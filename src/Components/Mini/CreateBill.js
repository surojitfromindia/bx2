import { useState } from "react";
import { useHistory } from "react-router-dom";
import PriceSelect from "./PriceSelect";
import BottomBar from "./BottomBar";

export default function CreateBill() {
  let history = useHistory();
  const handleback = () => {
    history.goBack();
  };

  const [itemType, setItemType] = useState("Select");
  const onvalueselect = (value, valueType) => {
    setItemType(valueType);
  };
  let price = {
    gold: 4500,
    silver: 600,
    other: 300,
  };
  return (
    <div>
      <button
        className={"text-xl font-semibold text-indigo-600"}
        onClick={handleback}
      >
        Back
      </button>
      <div className={"h-full flex flex-col gap-5 mt-5 mb-36"}>
        {/*First input row*/}
        <div className={"flex flex-row gap-2 w-full "}>
          <div className={"flex flex-col w-1/2"}>
            <label htmlFor="username">Enter Name</label>
            <input
              type="text"
              id="username"
              className={
                "uppercase rounded-sm px-4 py-3 mt-2 focus:outline-none bg-gray-300 w-full"
              }
              placeholder="Customer Name"
            />
          </div>
          <div className={"flex flex-col w-1/2"}>
            <label htmlFor="contact">Enter Contact (op)</label>
            <input
              type={"text"}
              id="contact"
              className={
                "uppercase rounded-sm px-4 py-3 mt-2 focus:outline-none bg-gray-300 w-full"
              }
              placeholder="Customer Contact"
            />
          </div>
        </div>

        {/*Second Row*/}
        <div className={"flex flex-row gap-2 w-full "}>
          <div className={"flex flex-col w-1/2"}>
            <label htmlFor="item">Enter Item Name</label>
            <input
              type="text"
              id="item"
              className={
                "uppercase rounded-sm px-4 py-3 mt-2 focus:outline-none bg-gray-300 w-full"
              }
              placeholder="Item Name"
            />
          </div>
          <div className={"flex flex-col w-1/2"}>
            <label htmlFor="select">({itemType})</label>
            <div className={"mt-2"}>
              <PriceSelect
                id="select"
                price={price}
                onvalueselect={onvalueselect}
              />
            </div>
          </div>
        </div>
      </div>
      <BottomBar />
    </div>
  );
}
