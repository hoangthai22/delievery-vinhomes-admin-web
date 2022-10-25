import axios from "axios";
import { BASE_URL, CATEGORY } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/category-management/categories?pageIndex=1&pageSize=10
export const getListCategorys = (page, size) => {
    return axios.get(`${BASE_URL}${CATEGORY}/categories?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategory-management/storeCategories?pageIndex=1&pageSize=100
export const getListStoreCategorys = (page, size) => {
    return axios.get(`${BASE_URL}${"storeCategory-management"}/storeCategories?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/category-management/categories/search-name?cateName=K&pageIndex=1&pageSize=100
export const getListStoreCategorysByKey = (key, page, size) => {
    return axios.get(`${BASE_URL}${"category-management"}/categories/search-name?cateName=${key}&pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/category-management/categories
export const postCategory = (category) => {
    return axios.post(`${BASE_URL}${CATEGORY}/categories`, category);
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/category-management/categories/999
export const putCategory = (category, imgUpdate) => {
    return axios.put(`${BASE_URL}${CATEGORY}/categories/${category.id}?imgUpdate=${imgUpdate}`, category);
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategory-management/storeCategories/10
export const putStoreCategory = (storeCategory) => {
    return axios.put(`${BASE_URL}${"storeCategory-management"}/storeCategories/${storeCategory.id}`, storeCategory);
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/storeCategory-management/storeCategories/10
export const postStoreCategory = (storeCategory) => {
    return axios.post(`${BASE_URL}${"storeCategory-management"}/storeCategories`, storeCategory);
};
