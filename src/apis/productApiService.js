import axios from "axios";
import { BASE_URL, CATEGORY, PRODUCT } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/products/s4/products?pageIndex=1&pageSize=10
export const getListProducts = (shopId, page, size) => {
    return axios.get(`${BASE_URL}/${PRODUCT}/${shopId}/${PRODUCT}?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

export const putProductInStore = (product) => {
    return axios.put(`${BASE_URL}/${PRODUCT}/${product.id}`, product);
};
