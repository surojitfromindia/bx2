import { useState } from "react";

export default function PriceSelect({ price, onvalueselect }) {
  const [selectvalue, setValue] = useState();

  const handleSelectedOptionChange = (ev) => {
    setValue(ev.target.value);

    let indeval = ev.target.options.selectedIndex;
    let valueType = ev.target.options[indeval].text;
    onvalueselect(ev.target.value, valueType);
  };
  const handlevaluemanualChange = (ev) => {
    setValue(ev.target.value);
    onvalueselect(ev.target.value);
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
        className={"bg-indigo-600 text-white  text-center p-2"}
        name="items"
        id="itemsid"
        onClick={handleSelectedOptionChange}
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
