import axios from "axios"
import CONST from "../utils/contants"

const config = {
    baseURL: CONST.BASE_URL,
    headers: {
        "Content-Type": "application/json"
    },
}

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
    (config) => {
        config.headers["Authorization"] = `Bearer ${CONST.AUTHORIZATION}`;
        return config;
    },
    (error) => {
        // console.log("REQUEST ERROR")
        return Promise.reject(error);
    }
)

export default axiosInstance;