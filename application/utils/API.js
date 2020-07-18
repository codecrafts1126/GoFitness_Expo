import axios from "axios";
import configs from "@utils/configs";

export default axios.create({
    baseURL: configs.baseURL + "/json",
    responseType: "json"
});