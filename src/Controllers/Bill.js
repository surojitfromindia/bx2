import API from "./APIs/API";

function InsetBill(payLoad) {
  return new Promise((resolve, reject) => {
    API()
      .post("/bill/new", payLoad)
      .then((createdBill) => {
        resolve(createdBill.data);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        reject(new Error(err));
      });
  });
}

function GetMiniBills() {
  return new Promise((resolve, reject) => {
    API()
      .get("/bill")
      .then((miniBills) => {
        resolve(miniBills.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function updateOneBill(id, payload) {
  return new Promise((resolve, reject) => {
    API()
      .put(`/bill/edit/${id}`, payload)
      .then((updatedBill) => {
        resolve(updatedBill.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}

function getOneBillById(id) {
  return new Promise((resolve, reject) => {
    API()
      .get(`/bill/${id}`)
      .then((bill) => {
        resolve(bill.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function deleteOneBillById(id) {
  return new Promise((resolve, reject) => {
    API()
      .delete(`/bill/${id}`)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

export { InsetBill, updateOneBill, deleteOneBillById };
export { GetMiniBills, getOneBillById };
