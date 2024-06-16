import axios from "axios";

const instance = axios.create({
    baseURL: process.env.BASE_URL,
    timeout: 5000,
    headers: {
        Authorization: "",
        "Content-Type": "application/json",
    },
});

export default instance;
