import { useState } from "react";

export default function PriceSelect({ price, onItemTypeSelect, isAutoPrice }) {
  const [selectvalue, setValue] = useState("");
  const handleSelectedOptionChange = (ev) => {
    let indexval = ev.target.options.selectedIndex;
    let valueType = ev.target.options[indexval].text;
    if (isAutoPrice) {
      setValue(ev.target.value);
      onItemTypeSelect(ev.target.value, valueType);
    }
  };
  const handlevaluemanualChange = (ev) => {
    ev.preventDefault();
    if (!isAutoPrice) {
      setValue(ev.target.value);
      let inx = document.querySelector("#itemsid").options.selectedIndex;
      let valueType = document.querySelector("#itemsid").options[inx].text;
      onItemTypeSelect(ev.target.value, valueType);
    }
  };

  return (
    <div className={"grid grid-cols-2"}>
      <input
        onChange={handlevaluemanualChange}
        type="number"
        min="1"
        id="select"
        value={selectvalue}
        className={
          "uppercase rounded-sm px-4 py-3  focus:outline-none bg-gray-300 dark:bg-coolGray-800"
        }
        placeholder="Type"
      />
      <select
        className={
          "bg-blue-600 dark:bg-lightBlue-500  px-2  text-white "
        }
        name="items"
        id="itemsid"
        onChange={handleSelectedOptionChange}
      >
        <option value="">Select</option>
        <option id="Gold" value={`${price.gold}`}>
          Gold
        </option>
        <option value={`${price.silver}`}>Silver</option>
        <option value={`${price.other}`}>Other</option>
      </select>
    </div>
  );
}
