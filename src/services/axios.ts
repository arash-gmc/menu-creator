import axios from "axios";

const axiosConfig = () => {
  axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
  axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
};

export default axiosConfig;
