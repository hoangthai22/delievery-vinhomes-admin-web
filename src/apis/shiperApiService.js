import axios from "axios";
import { BASE_URL, SHIP } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shipper-management/shippers?pageIndex=1&pageSize=20
export const getListShipper = (page, size) => {
    return axios.get(`${BASE_URL}${SHIP}/shippers?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shippers/report?Month=12&Year=2022&page=1&pageSize=20
export const getListShipperStatistic = (dateFilter, month, year, page, size) => {
    let url = "";
    if (dateFilter !== "") {
        url = `&DateFilter=${dateFilter}`;
    } else {
        url = `&Month=${month}&Year=${year}`;
    }
    return axios.get(`${BASE_URL}/shippers/report?page=${page}&pageSize=${size}${url}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shipper-management/shippers
export const postShipper = (shipper) => {
    return axios.post(`${BASE_URL}${SHIP}/shippers`, shipper, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shipper-management/shippers/1
export const putShipper = (shipper) => {
    return axios.put(`${BASE_URL}${SHIP}/shippers/${shipper.id}`, shipper, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/transactions?AccountId=1&walletType=1&amonut=1
export const putTransaction = (accountId, walletType, amonut) => {
    return axios.put(`${BASE_URL}transactions?AccountId=${accountId}&walletType=${walletType}&amonut=${amonut}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shipper-management/shippers/status/1
export const disableShipper = (shipper) => {
    return axios.put(`${BASE_URL}${SHIP}/shippers/status/${shipper.id}`, shipper, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/shipper-management/shippers/1
export const deleteShipper = (shipperId) => {
    return axios.delete(`${BASE_URL}${SHIP}/shippers/${shipperId}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
