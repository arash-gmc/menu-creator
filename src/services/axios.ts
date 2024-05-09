import axios from "axios";

const axiosConfig = () => {
  axios.defaults.baseURL = "http://localhost:5000/";
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
};

export default axiosConfig;
