import axios from "axios";
import { BASE_URL, SHIP } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shipper-management/shippers?pageIndex=1&pageSize=20
export const getListShipper = (page, size) => {
    return axios.get(`${BASE_URL}${SHIP}/shippers?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
