import axios from "axios";

export default axios.create({
    baseURL: "https://zobaba.com/fitness/json",
    responseType: "json"
});