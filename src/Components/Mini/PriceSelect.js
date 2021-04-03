import { useState } from "react";

export default function PriceSelect({ price, onvalueselect, isAutoPrice }) {
  const [selectvalue, setValue] = useState("");
  const handleSelectedOptionChange = (ev) => {
    let indexval = ev.target.options.selectedIndex;
    let valueType = ev.target.options[indexval].text;
    if (isAutoPrice) {
      setValue(ev.target.value);
      onvalueselect(ev.target.value, valueType);
    }
  };
  const handlevaluemanualChange = (ev) => {
    ev.preventDefault();
    if (!isAutoPrice) {
      setValue(ev.target.value);
      let inx = document.querySelector("#itemsid").options.selectedIndex;
      let valueType = document.querySelector("#itemsid").options[inx].text;
      onvalueselect(ev.target.value, valueType);
    }
  };

  return (
    <div className={"w-full flex flex-row "}>
      <input
        onChange={handlevaluemanualChange}
        type="number"
        min="1"
        id="select"
        value={selectvalue}
        className={
          "uppercase rounded-sm px-4 py-3 w-full focus:outline-none bg-gray-300"
        }
        placeholder="Select Type"
      />
      <select
        className={
          "appearance-none bg-indigo-600 form-select text-white text-center"
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
