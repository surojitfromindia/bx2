const saveBill = (billData) => {
  let dbbillData = {
    bill_date: "9/8/2021",
    customer_name: billData.customer_name,
    //push from avaliable option
    // customer_contact: billData.customer_contact,
    item_name: billData.item_name,
    item_type: billData.item_type,
    item_rate: billData.item_rate,
    item_valuation: {
      require_quantity: billData.require_quantity,
      require_quantity_unit: billData.require_quantity_unit,
      making_charge: billData.making_charge,
      gst: billData.gst,
    },
    item_deposite_valuation: {
      deposite_quantity: billData.deposite_quantity,
      deposite_quantity_unit: billData.deposite_quantity_unit,
    },
    total_valuation: {
      total_without_gst: billData.total_without_gst,
      grand_total: billData.grand_total,
    },
  };

  if (billData.customer_contact !== "") {
    dbbillData.customer_contact = billData.customer_contact;
  }
};
