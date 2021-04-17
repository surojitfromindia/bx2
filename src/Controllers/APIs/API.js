import axios from "axios";

function API() {
  return axios.create({
    baseURL: "http://localhost:5000",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Atoken")}` },
  });
}
export default API;
