import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { getListCategorys } from "../apis/categoryApiService";
import { getListBrands, getListBuilding, getListStoreCategory } from "../apis/storeApiService";
import { notify } from "../components/Toast/ToastCustom";

export const AppContext = React.createContext();

export default function AppProvider({ children }) {
    const [openModal, setOpenModal] = useState(false);
    const [openModalNewCateStore, setOpenModalNewCateStore] = useState(false);
    const [productModal, setProductModal] = useState({});
    const [storeModal, setStoreModal] = useState({});
    const [categoryModal, setCategoryModal] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState({});
    const [storeCategoryModal, setStoreCategoryModal] = useState({});
    const [categoryList, setCategoryList] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [menu, setMenu] = useState(1);
    const [mode, setMode] = useState(1);
    const [buildingList, setBuildingList] = useState([]);
    // const [reloadCategories, setReloadCategories] = useState(false);
    const [storeCategoryList, setStoreCategoryList] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({});
    const handleGetListCategory = () => {
        getListCategorys(1, 100).then((res) => {
            const categorys = res.data;
            setCategoryList(categorys);
            // setReloadCategories(false);
        });
    };

    useEffect(() => {
        getListBuilding(1, 100)
            .then((res) => {
                const buildings = res.data;
                setBuildingList(
                    buildings.sort(function (a, b) {
                        console.log();
                        return parseInt(a.id.split("b")[1]) - parseInt(b.id.split("b")[1]);
                    })
                );
            })
            .catch((error) => {
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
        handleGetListCategory();
        getListBrands(1, 100)
            .then((res) => {
                const brands = res.data;
                setBrandList(brands);
            })
            .catch((error) => console.log(error));
        getListStoreCategory(1, 100)
            .then((res) => {
                const storeCategory = res.data;
                setStoreCategoryList(storeCategory);
            })
            .catch((error) => console.log(error));
        return () => {};
    }, []);

    return (
        <AppContext.Provider
            value={{
                openModal,
                setOpenModal,
                user,
                setUser,
                isLogin,
                setIsLogin,
                productModal,
                setProductModal,
                categoryList,
                setCategoryList,
                storeModal,
                setStoreModal,
                brandList,
                setBrandList,
                storeCategoryList,
                setStoreCategoryList,
                categoryModal,
                setCategoryModal,
                menu,
                setMenu,
                buildingList,
                setBuildingList,
                storeCategoryModal,
                setStoreCategoryModal,
                openModalNewCateStore,
                setOpenModalNewCateStore,
                deleteModal,
                setDeleteModal,
                openDeleteModal,
                setOpenDeleteModal,
                mode,
                setMode,
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
