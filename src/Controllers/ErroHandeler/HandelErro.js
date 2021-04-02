export default function HandleError(errcode) {
  switch (errcode) {
    case 404:
      return "Cannot Fetch Record, Check Your Device Connection! Refresh this page";
  }
}
