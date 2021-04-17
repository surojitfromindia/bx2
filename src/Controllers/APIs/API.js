import axios from "axios";

function API() {
  return axios.create({
    baseURL: "https://bill2exp.herokuapp.com",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Atoken")}` },
  });
}
export default API;
