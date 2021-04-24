export default function HandleError(err) {
  console.log(err.message);
  if (err.message === "Network Error") return "Your not connected to Network !";
  else {
    let errcode = err.request.status;
    switch (errcode) {
      case 404:
        return "Cannot Fetch Record,\nCheck Your Device Connection!\nRefresh this page";
      case 400:
        "Bad Post request";
    }
  }
}
