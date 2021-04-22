export default function HandleError(err) {
  if (err.message === "Network Error") return "Server is Offline";
  else {
    let errcode = err.request.status;
    switch (errcode) {
      case 404:
        return "Cannot Fetch Record, Check Your Device Connection! Refresh this page";
      case 400:
        "Bad Post request";
    }
  }
}
