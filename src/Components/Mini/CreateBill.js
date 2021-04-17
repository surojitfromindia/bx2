import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import PriceSelect from "./PriceSelect";
import BottomBar from "./BottomBar";
import Modal from "../Modal/BillCreationModal";

let metal_price = {
  gold: 4500,
  silver: 600,
  other: 300,
};

export default function CreateBill() {
  let history = useHistory();
  const handleback = () => {
    history.goBack();
  };
  const [showModal, setShowModal] = useState(false);
  const [itemType, setItemType] = useState({ unit: "Select", price: 0 });
  const [isAutoPrice, setAutoPrice] = useState(true);
  const [priceModel, setPriceModel] = useState({
    price: { value: 0, unit: "gm", gst: 0 },
  });
  const [bottomBarInfo, setBottomBarInfo] = useState({
    billprice: 0,
    gst: 0,
    mc: 0,
  });
  const [calculatedText, setCalculatedText] = useState("Des");
  const [deposite, setDeposite] = useState({
    qua: 0,
    unit: "gm",
  });
  const [subInfos, setSubInfos] = useState({
    qua: 0,
    unit: "gm",
    mc: 0,
  });
  const handleOnAutoPriceToggle = () => {
    setAutoPrice(!isAutoPrice);
  };
  const onItemTypeSelect = (value, valueType) => {
    setItemType({ unit: valueType, price: value });
  };

  const onreqNewPrice = (buypricmodel) => {
    console.log(buypricmodel);
    setSubInfos(buypricmodel);
  };

  useEffect(() => {
    calculateNewModelAndText();
  }, [deposite, itemType, subInfos]);

  const onNewDepositeChange = (depositepricemodel) => {
    setDeposite(depositepricemodel);
  };

  const calculateNewModelAndText = () => {
    function toGram(unit, amount) {
      let uppeUnit = unit.toUpperCase();
      switch (uppeUnit) {
        case "MG":
          return (amount * 0.001).toFixed(4);
        case "GM":
          return amount;
        default:
          return 0;
      }
    }

    let depositepriceAmount = Number(
      toGram(deposite.unit, Number(deposite.qua))
    );

    let buypricmodelAnount = Number(
      toGram(subInfos.unit, Number(subInfos.qua))
    );

    let subtotal;

    if (depositepriceAmount > buypricmodelAnount) {
      //add only making charge if customer has deposited
      //the raw material, that weight more or equal to required amount/weight
      subtotal = subInfos.mc;
    } else {
      subtotal = (
        Math.abs(depositepriceAmount - buypricmodelAnount) * itemType.price +
        subInfos.mc
      ).toFixed(3);
    }

    //value rounding
    let gst = Number(subtotal * 0.03).toFixed(0);
    let nonR = Number(subtotal + gst);
    let total = nonR.toFixed(1);

    let sellval =
      buypricmodelAnount > 1
        ? buypricmodelAnount.toFixed(3)
        : buypricmodelAnount.toFixed(3);

    setBottomBarInfo({
      billprice: total,
      gst: gst,
      mc: subInfos.mc,
    });
    setPriceModel({
      price: {
        value: total,
        unit: "gm",
        gst: gst,
      },
    });
    setCalculatedText(
      `(${sellval}-${depositepriceAmount.toFixed(3)}) gm * ${itemType.price}`
    );
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const oncheckin = (verdict) => {
    if (verdict) setShowModal(true);
    else alert("Something is Wrong Try Again");
  };

  return (
    <form>
      {showModal ? (
        <Modal show={showModal} handleClose={handleModalClose} infos={{}} />
      ) : (
        ""
      )}
      <div className={"flex flex-row  justify-between "}>
        <a
          className={
            "cursor-pointer hover:underline text-xl font-semibold text-indigo-600"
          }
          onClick={handleback}
        >
          Back
        </a>

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
            <label htmlFor="select">{itemType.unit}</label>
            <div className={"mt-2"}>
              <PriceSelect
                id="select"
                price={metal_price}
                onItemTypeSelect={onItemTypeSelect}
                isAutoPrice={isAutoPrice}
              />
            </div>
          </div>
        </div>
        {/*Third Row */}
        <TotalQCal
          onreqNewPrice={onreqNewPrice}
          pricemodel={priceModel}
          calText={calculatedText}
        />
        {/*Forth Row */}
        <div className={"flex flex-col gap-3 w-full bg-gray-300 px-2 py-4 "}>
          <p className={"text-xl font-semibold"}>Deposite Box</p>
          <DepositeCom onNewDepositeChange={onNewDepositeChange} />
        </div>
      </div>
      <BottomBar billinfo={bottomBarInfo} oncheckin={oncheckin} />
    </form>
  );
}

const DepositeCom = ({ onNewDepositeChange }) => {
  const handleChange = (ev) => {
    let unit = document.getElementById("depunit").value;
    let weight = Number(document.getElementById("inputbox").value);
    let target = ev.target;
    if (target.type === "number") {
      onNewDepositeChange({ qua: target.value, unit: unit });
    } else {
      onNewDepositeChange({ qua: weight, unit: ev.target.value });
    }
  };

  return (
    <div className={"flex flex-row w-full gap-1"}>
      <div className={"flex flex-col w-1/3"}>
        <label htmlFor="select">Select Unit</label>
        <select
          onChange={handleChange}
          className={
            "appearance-none bg-indigo-600 form-select px-4 py-3  mt-1 text-white text-center"
          }
          name="items"
          id="depunit"
        >
          <option value="">Select</option>
          <option id="Gold" value="GM">
            GM
          </option>
          <option value="MG">MG</option>
        </select>
      </div>
      <div className={"flex flex-col w-2/3"}>
        <label htmlFor="item">Enter Item Quantity in gm </label>
        <input
          id="inputbox"
          onChange={handleChange}
          type="number"
          className={
            "uppercase rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-300 w-full"
          }
          placeholder="Item Quantity"
        />
      </div>
    </div>
  );
};

let oldPrice = {
  qua: 0,
  unit: "",
  mc: 0,
};
const TotalQCal = ({ pricemodel, calText, onreqNewPrice }) => {
  const onInputChange = (ev) => {
    if (ev.target.id === "making") {
      oldPrice.mc = ev.target.value;
    }
    if (ev.target.id === "unitoncal") {
      oldPrice.unit = ev.target.value;
    }
    if (ev.target.id === "iqua") {
      oldPrice.qua = ev.target.value;
    }

    onreqNewPrice({
      qua: Number(oldPrice.qua),
      unit: oldPrice.unit,
      mc: Number(oldPrice.mc),
    });
  };

  return (
    <div className={"flex flex-col gap-3 w-full bg-gray-300 px-2 py-4 "}>
      <div>
        <p className={"text-xl font-semibold"}>Price Box</p>
        <p className={"text-xl  text-pink-500 font-bold"}>{calText}</p>
      </div>
      <div className={"flex gap-1"}>
        <div className={"flex flex-col w-44"}>
          <label htmlFor="select">Select unit</label>
          <select
            className={
              "appearance-none bg-indigo-600 form-select px-4 py-3  mt-1 text-white text-center"
            }
            onChange={onInputChange}
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
          <label htmlFor="item">Quantity (rq) </label>
          <input
            onChange={onInputChange}
            id="iqua"
            type="number"
            min={0}
            className={
              " uppercase rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-300 w-full"
            }
            placeholder="Quantity"
          />
        </div>

        <div className={"flex flex-col w-3/5"}>
          <label
            htmlFor="item"
            className={"text-right font-bold text-indigo-600"}
          >
            Billing Price
          </label>
          <input
            type="number"
            value={pricemodel.price.value}
            readOnly={true}
            className={
              " uppercase rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-300 w-full"
            }
            placeholder="Quantity"
          />
        </div>
      </div>
      <div className={"flex gap-1 w-full"}>
        <div className={"flex flex-col w-1/2"}>
          <label htmlFor="item">Making Charge </label>
          <input
            name="imc"
            onChange={onInputChange}
            id="making"
            type="number"
            min={0}
            className={
              " uppercase rounded-sm px-4 py-3 mt-1 focus:outline-none bg-gray-300 w-full"
            }
            placeholder="Making Charge"
          />
        </div>
        <div className={"flex flex-col w-1/2"}>
          <label htmlFor="item">GST </label>
          <label
            name="gst"
            className={
              "border rounded-sm px-4 py-3 mt-1 bg-gray-300 border-gray-500 w-full"
            }
          >
            {pricemodel.price.gst}
          </label>
        </div>
      </div>
    </div>
  );
};
