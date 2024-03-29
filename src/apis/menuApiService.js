import axios from "axios";
import { BASE_URL, MENU, PRODUCT } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/byMode?modeId=1
export const getListMenuByMode = (modeId) => {
    return axios.get(`${BASE_URL}${MENU}/byMode?modeId=${modeId}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/product-management/products/1/products?pageIndex=1&pageSize=20
export const getListMenuByMenuId = (menuId, page, size) => {
    return axios.get(`${BASE_URL}product-management/${PRODUCT}/${menuId}/${PRODUCT}?pageIndex=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menu-management/menus/menuId?menuId
export const getMenuDetail = (menuId) => {
    return axios.get(`${BASE_URL}menu-management/menus/menuId?menuId=${menuId}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/filter?storeId=s4&page=1&pageSize=20
export const getListProductMenu = (menuId, storeId, page, size) => {
    return axios.get(`${BASE_URL}${MENU}/${menuId}/filter?storeId=${storeId}&page=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/products/byCategoryId?categoryId=11&page=1&pageSize=20
export const getListProductMenuByCate = (menuId, categoryId, page, size) => {
    return axios.get(`${BASE_URL}${MENU}/${menuId}/products/byCategoryId?categoryId=${categoryId}&page=${page}&pageSize=${size}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menu-management/menus
export const postMenu = (menu) => {
    return axios.post(`${BASE_URL}menu-management/${MENU}`, menu, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menu-management/menus/s
export const putMenu = (menu, menuId) => {
    return axios.put(`${BASE_URL}menu-management/${MENU}/${menuId}`, menu, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menu-management/menus/z
export const deleteMenu = (menuId) => {
    return axios.delete(`${BASE_URL}menu-management/${MENU}/${menuId}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/menus/1/products?productId=5
export const deleteProductInMenu = (productId, menuId) => {
    return axios.delete(`${BASE_URL}${MENU}/${menuId}/products?productId=${productId}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
