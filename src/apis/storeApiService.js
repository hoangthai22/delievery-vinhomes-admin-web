import axios from "axios";
import { BASE_URL, BASE_URL_V2, STORE } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores?pageIndex=1&pageSize=10
export const getListStores = (page, size) => {
    return axios.get(`${BASE_URL}/${STORE}/${"stores"}?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v2/brands?pageIndex=1&pageSize=10
export const getListBrands = (page, size) => {
    return axios.get(`${BASE_URL_V2}/${"brands"}?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategory-management/storeCategories?pageIndex=1&pageSize=10
export const getListStoreCategory = (page, size) => {
    return axios.get(`${BASE_URL}${"storeCategory-management"}/storeCategories?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores/storeId?storeId=s1
export const getStoreDetail = (storeId) => {
    return axios.get(`${BASE_URL}${STORE}/stores/${"storeId"}?storeId=${storeId}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/buildings?pageIndex=1&pageSize=100
export const getListBuilding = (page, size) => {
    return axios.get(`${BASE_URL}${"buildings"}?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores/search-name?storeName=H%E1%BA%B1ng&pageIndex=1&pageSize=20
export const getListStoreByKey = (key, page, size) => {
    return axios.get(`${BASE_URL}${"store-management"}/stores/search-name?storeName=${key}&pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores/1
export const putStore = (store, id, imgUpdate) => {
    return axios.put(
        `${BASE_URL}${STORE}/stores/${id}?imgUpdate=${imgUpdate}
    `,
        store,
        {
            Accept: "application/json",
            "Content-Type": "application/json",
        }
    );
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores
export const postStore = (store) => {
    return axios.post(`${BASE_URL}${STORE}/stores`, store, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/store-management/stores/bunthitnuong1%40gmail.com
export const deleteStore = (id) => {
    return axios.delete(`${BASE_URL}${STORE}/stores/${id}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
