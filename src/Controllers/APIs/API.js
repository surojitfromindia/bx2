import axios from "axios";
import useToken from "../../Hooks/useToken";

function API() {
  return axios.create({
    baseURL: "https://bill2exp.herokuapp.com",
    headers: { Authorization: `Bearer ${sessionStorage.getItem("Atoken")}` },
  });
}
export default API;
