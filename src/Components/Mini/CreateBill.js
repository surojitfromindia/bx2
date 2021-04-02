import { useState } from "react";
import { useHistory } from "react-router-dom";
import PriceSelect from "./PriceSelect";
import BottomBar from "./BottomBar";
let pgv = 0;

export default function CreateBill() {
  let history = useHistory();
  const handleback = () => {
    history.goBack();
  };

  const [itemType, setItemType] = useState("Select");
  const [isAutoPrice, setAutoPrice] = useState(true);
  const [priceModel, setPriceModel] = useState({
    price: { value: 3500, unit: "gm" },
  });

  const [calculatedText, setCalculatedText] = useState("Des");
  const handleOnAutoPriceToggle = () => {
    setAutoPrice(!isAutoPrice);
  };
  const onvalueselect = (value, valueType) => {
    pgv = value;
    setItemType(valueType);
  };

  const onreqNewPrice = (quan, unit) => {
    calculateNewModelAndText(quan, unit);
  };

  let price = {
    gold: 4500,
    silver: 600,
    other: 300,
  };

  const calculateNewModelAndText = (quan, unit) => {
    //per gram price from db (always gram)
    let ppgv = pgv;
    //deposite quantity and unit
    let dpaq = {
      qua: 1.5,
      unit: "gm",
    };

    // let buypricmodel = priceModel;

    function toGram(unit, amount) {
      let uppeUnit = unit.toUpperCase();
      switch (uppeUnit) {
        case "MG":
          return (amount * 0.001).toFixed(5);
        case "GM":
          return amount;
        default:
          return 0;
      }
    }

    let dpaqVal = Number(toGram(dpaq.unit, Number(dpaq.qua)));
    let buypricmodelVal = Number(toGram(unit, Number(quan)));
    setPriceModel({
      price: {
        value: Math.abs(dpaqVal - buypricmodelVal).toFixed(2) * ppgv,
        unit: "gm",
      },
    });
    let sellval =
      buypricmodelVal > 1 ? buypricmodelVal.toFixed(0) : buypricmodelVal;
    setCalculatedText(`(${dpaqVal.toFixed(1)}-${sellval}) Gm * ${ppgv}`);
  };

  return (
    <div>
      <div className={"flex flex-row  justify-between"}>
        <button
          className={"text-xl font-semibold text-indigo-600"}
          onClick={handleback}
        >
          Back
        </button>

        <div className={"flex flex-row items-center"}>
          <input
            id="autoprice"
            type={"checkbox"}
            checked={isAutoPrice ? true : false}
            onChange={handleOnAutoPriceToggle}
            className={"form-checkbox mr-2 text-indigo-600"}
          />
          <label htmlFor="autoprice">Auto Price</label>
        </div>
      </div>
      <div className={"h-full flex flex-col gap-5 mt-5 mb-36 md:w-2/3"}>
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
            <label htmlFor="select">({itemType})/gm</label>
            <div className={"mt-2"}>
              <PriceSelect
                id="select"
                price={price}
                onvalueselect={onvalueselect}
                isAutoPrice={isAutoPrice}
              />
            </div>
          </div>
        </div>
        {/*Third Row */}

        <div className={"flex flex-col gap-3 w-full bg-gray-300 px-2 py-4 "}>
          <p className={"text-xl font-semibold"}>Deposite Box</p>
          <DepositeCom price={price} />
          <DepositeCom price={price} />
        </div>
        {/*Forth Row */}
        <TotalQCal
          onreqNewPrice={onreqNewPrice}
          pricemodel={priceModel}
          calText={calculatedText}
        />
      </div>
      <BottomBar />
    </div>
  );
}

const DepositeCom = ({ price }) => {
  return (
    <div className={"flex flex-row w-full gap-1"}>
      <div className={"flex flex-col w-2/3"}>
        <label htmlFor="item">Enter Item Quantity in gm </label>
        <input
          type="number"
          className={
            "uppercase rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-300 w-full"
          }
          placeholder="Item Quantity"
        />
      </div>
      <div className={"flex flex-col w-1/3"}>
        <label htmlFor="select">Select Unit</label>
        <select
          className={
            "appearance-none bg-indigo-600 form-select px-4 py-3  mt-1 text-white text-center"
          }
          name="items"
          id="itemsid"
        >
          <option value="">Select</option>
          <option id="Gold" value={"GM"}>
            GM
          </option>
          <option value={`MG`}>MG</option>
        </select>
      </div>
    </div>
  );
};

const TotalQCal = ({ pricemodel, calText, onreqNewPrice }) => {
  //
  /**
   * pricemodel = {
   * price: {value : 1500, unit : mg/gm}
   * }
   */
  const onunitchange = (ev) => {
    let quan = Number(document.getElementById("iqua").value);
    onreqNewPrice(quan, `${ev.target.value}`.toUpperCase());
  };

  const handleValueChangeOfQuan = (ev) => {
    console.log(ev.target.value);
    let unit = document.getElementById("unitoncal").value;
    console.log(unit);
    onreqNewPrice(ev.target.value, unit);
  };

  return (
    <div className={"flex flex-col gap-3 w-full bg-gray-300 px-2 py-4 "}>
      <p className={"text-xl font-semibold"}>Price Box</p>
      <div className={"flex gap-1"}>
        <div className={"flex flex-col w-2/5"}>
          <label htmlFor="item">Quantity </label>
          <input
            onChange={handleValueChangeOfQuan}
            id="iqua"
            type="number"
            min={0}
            className={
              " uppercase rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-300 w-full"
            }
            placeholder="Quantity"
          />
        </div>
        <div className={"flex flex-col w-1/3"}>
          <label htmlFor="select">Select unit</label>
          <select
            className={
              "appearance-none bg-indigo-600 form-select px-4 py-3  mt-1 text-white text-center"
            }
            onChange={onunitchange}
            name="unitoncal"
            id="unitoncal"
          >
            <option value="">Select</option>
            <option id="Gold" value={"GM"}>
              GM
            </option>
            <option value={`MG`}>MG</option>
          </select>
        </div>
        <div className={"flex flex-col w-2/5"}>
          <label htmlFor="item">{calText}</label>
          <input
            type="number"
            value={pricemodel.price.value}
            min={0}
            className={
              " uppercase rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-300 w-full"
            }
            placeholder="Quantity"
          />
        </div>
      </div>
    </div>
  );
};
