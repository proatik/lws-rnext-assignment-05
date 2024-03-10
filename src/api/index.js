import axios from "axios";

// base URL.
import { baseURL } from "../configs";

const axiosInstance = axios.create({ baseURL });

export default axiosInstance;
