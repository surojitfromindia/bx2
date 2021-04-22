import axios from "axios";

function API() {
  return axios.create({
    baseURL: "http://192.168.0.5:5000",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Atoken")}` },
  });
}
export default API;
