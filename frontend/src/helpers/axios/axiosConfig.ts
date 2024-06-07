import axios from "axios";

const instance = axios.create({
    baseURL: "https://localhost:8080",
    timeout: 5000,
    headers: {
        Authorization: "",
        "Content-Type": "application/json",
    },
});

export default instance;
