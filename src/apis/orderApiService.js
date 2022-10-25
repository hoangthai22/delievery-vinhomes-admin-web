import axios from "axios";
import { BASE_URL, ORDER } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/order-management/orders?pageIndex=1&pageSize=200
export const getListOrder = (page, size) => {
    return axios.get(`${BASE_URL}${ORDER}/orders?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/order-management/orders/search-status?statusName=ShopAccept&pageIndex=1&pageSize=20
export const getListOrderByStatus = (statusName, page, size) => {
    return axios.get(`${BASE_URL}${ORDER}/orders/search-status?statusName=${statusName}&pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/order-management/orders/search-payment?paymentType=Ti%E1%BB%81n%20m%E1%BA%B7t&pageIndex=1&pageSize=20
export const getListOrderByPayment = (payment, page, size) => {
    return axios.get(`${BASE_URL}${ORDER}/orders/search-payment?paymentType=${payment}&pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
