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
        reject(new Error(err));
      });
  });
}

export { InsetBill };
