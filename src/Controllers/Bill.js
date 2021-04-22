import API from "./APIs/API";

function InsetBill(payLoad) {
  return new Promise((resolve, reject) => {
    API()
      .post("/bill/new", {
        data: payLoad,
      })
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
      .get("/bill/")
      .then((miniBills) => {
        resolve(miniBills.data);
      })
      .catch((err) => {
        reject(new Error(err));
      });
  });
}

export { InsetBill };
export { GetMiniBills };
