import axios from "axios";
import { BASE_URL } from "./constants";

//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas
export const postArea = (store) => {
    return axios.post(`${BASE_URL}areas`, store, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/buildings/ByArea?AreaId=1&ClusterId=2
export const postBuilding = (AreaId, ClusterId, building) => {
    return axios.post(`${BASE_URL}buildings/ByArea?AreaId=${AreaId}&ClusterId=${ClusterId}`, building, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas/9
export const putArea = (area) => {
    return axios.put(`${BASE_URL}areas/${area.id}`, area, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/areas/e2176f96-6e98-4cfa-a528-fa1b7cb073dd
export const deleteArea = (id) => {
    return axios.delete(`${BASE_URL}areas/${id}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
//https://deliveryvhgp-webapi.azurewebsites.net/api/v1/buildings/a
export const deleteBuilding = (id) => {
    return axios.delete(`${BASE_URL}buildings/${id}`, {
        Accept: "application/json",
        "Content-Type": "application/json",
    });
};
