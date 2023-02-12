import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import {
    Button,
    Card,
    CardBody,
    CardTitle,
    Col,
    Container,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Modal,
    Nav,
    NavItem,
    NavLink,
    Row,
    Spinner,
    TabContent,
    Table,
    TabPane,
    UncontrolledDropdown,
} from "reactstrap";
import { deleteMenu, deleteProductInMenu, getListMenuByMenuId, getListMenuByMode } from "../../../apis/menuApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { MenuUpdateModal } from "../../../components/Modals/menuUpdateModal";
import { notify } from "../../../components/Toast/ToastCustom";
import { AppContext } from "../../../context/AppProvider";
import { MenuItem } from "./MenuItem";
import Lottie from "react-lottie";
import animationData from "../../../assets/loading.json";
// import Empty from "../../../../public/icons/empty.svg";
export const Menus = () => {
    const [hTabsIcons, setHTabsIcons] = React.useState("");
    const { mode, setMode, menu, setMenu, setOpenModal } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [openDeleteMenuModal, setOpenDeleteMenuModal] = useState(false);
    const [openDeleteProductModal, setOpenDeleteProductModal] = useState(false);
    const [deleteMenuModal, setDeleteMenuModal] = useState("");
    const [deleteProductModal, setDeleteProductModal] = useState("");

    const [menuList, setMenuList] = useState([]);
    const [menuActive, setMenuActive] = useState("");
    const [productMenuList, setProductMenuList] = useState([]);
    const [productMenuListTmp, setProductMenuListTmp] = useState([]);
    const [optionsStores, setOptionsStores] = useState([]);
    const [optionsCates, setOptionsCates] = useState([]);
    const [filterStore, setFilterStore] = useState("");
    const [filterCate, setFilterCate] = useState("");
    let history = useHistory();
    const optionsCategory = menuList.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    useEffect(() => {
        getListMenuByMode(mode)
            .then((res) => {
                const menus = res.data;
                setMenuList(menus);
                if (menus && menus.length > 0) {
                    setHTabsIcons(menu.toString());
                    hanldeChangeMenu(menu.toString());
                    setMenu(menu.toString());
                } else {
                    setIsLoading(false);
                    setMenuList([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setMenuList([]);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
        return () => {};
    }, []);
    const customStylesMenu = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            borderColor: "#dee2e6",
            minHeight: "30px",
            height: "46px",
            width: "300px",
            boxShadow: state.isFocused ? null : null,
            borderRadius: "0.5rem",
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "5px",
        }),
    };
    const customStylesFilter = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            borderColor: "#dee2e6",
            minHeight: "30px",
            height: "46px",
            width: "180px",
            boxShadow: state.isFocused ? null : null,
            borderRadius: "0.5rem",
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "5px",
        }),
    };
    const hanldeChangeMode = (modeFilter) => {
        if (modeFilter !== mode) {
            setMenuList([]);
            setMode(modeFilter);
            // setIsLoading(true);

            getListMenuByMode(modeFilter)
                .then((res) => {
                    const menus = res.data;
                    setMenuActive({
                        label: menus[0].name,
                        value: menus[0].id,
                    });
                    setMenuList(menus);
                    if (menus && menus.length > 0) {
                        setHTabsIcons(menus[0].id);
                        hanldeChangeMenu(menus[0].id);
                    } else {
                        setIsLoading(false);
                        setMenuList([]);
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                    setMenuList([]);
                });
            setTimeout(() => {
                setIsLoading(false);
            }, 1);
        }
    };
    const hanldeChangeMenu = (menu) => {
        setMenu(menu);
        setOptionsStores([]);
        setFilterStore("");
        setProductMenuList([]);
        setIsLoading(true);
        setHTabsIcons(menu);
        getListMenuByMenuId(menu, 1, 100)
            .then((res) => {
                setTimeout(() => {
                    let productMenus = res.data;
                    let listCate = productMenus;
                    let storeListFilter = [
                        {
                            value: "0",
                            label: "Tất cả",
                        },
                    ];
                    let cateListFilter = [
                        {
                            value: "0",
                            label: "Tất cả",
                        },
                    ];
                    productMenus
                        .filter((value, index, self) => index === self.findIndex((t) => t.storeId === value.storeId))
                        .map((e) => {
                            storeListFilter.push({
                                value: e.storeId,
                                label: e.storeName,
                            });
                        });
                    listCate
                        .filter((value, index, self) => index === self.findIndex((t) => t.categoryId === value.categoryId))
                        .map((e) => {
                            cateListFilter.push({
                                value: e.categoryId,
                                label: e.productCategory,
                            });
                        });
                    setOptionsStores(storeListFilter);
                    setOptionsCates(cateListFilter);
                    setProductMenuList(productMenus);
                    setProductMenuListTmp(productMenus);
                    setIsLoading(false);
                }, 300);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
                setProductMenuList([]);
            });
    };
    const hanldeFilterByStoreId = (storeId) => {
        setIsLoading(true);
        setProductMenuList([]);
        setTimeout(() => {
            if (storeId !== "0") {
                let storesFilter = [];
                for (let index = 0; index < productMenuListTmp.length; index++) {
                    const element = productMenuListTmp[index];
                    if (element.storeId === storeId) {
                        storesFilter.push(element);
                    }
                }
                setProductMenuList(storesFilter);
            } else {
                setProductMenuList(productMenuListTmp);
            }
            setIsLoading(false);
        }, 300);
    };
    const hanldeFilterByCateId = (categoryId) => {
        setIsLoading(true);
        setProductMenuList([]);
        setTimeout(() => {
            if (categoryId !== "0") {
                let storesFilter = [];
                for (let index = 0; index < productMenuListTmp.length; index++) {
                    const element = productMenuListTmp[index];
                    if (element.categoryId === categoryId) {
                        storesFilter.push(element);
                    }
                }
                setProductMenuList(storesFilter);
            } else {
                setProductMenuList(productMenuListTmp);
            }
            setIsLoading(false);
        }, 300);
    };
    const handleUpdateProduct = (data) => {
        setDeleteProductModal(data);
        setOpenDeleteProductModal(true);
        // hanldeChangeMenu(menu);
    };
    const handleReload = () => {
        hanldeChangeMenu(menu);
    };
    const handleReloadMenu = () => {
        getListMenuByMode(mode)
            .then((res) => {
                const menus = res.data;
                setMenuActive({
                    label: menus[0].name,
                    value: menus[0].id,
                });
                setMenuList(menus);
                if (menus && menus.length > 0) {
                    setHTabsIcons(menu);
                    hanldeChangeMenu(menu);
                } else {
                    setIsLoading(false);
                    setMenuList([]);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
                setMenuList([]);
            });
    };
    const convertTime = (time) => {
        return time.toFixed(2).toString().replace(".", ":");
    };
    return (
        <>
            <MenuUpdateModal handleReload={handleReloadMenu} />
            <SimpleHeader name="Danh Sách Thực Đơn" parentName="Quản Lý" />
            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={openDeleteProductModal}
                toggle={() => {
                    setOpenDeleteProductModal(false);
                }}
            >
                <div className="modal-body p-0">
                    <Card className="bg-secondary border-0 mb-0">
                        <div className="" style={{ paddingTop: 0 }}>
                            <Container className="" fluid style={{ padding: "1.5rem 1.5rem 1rem 1.5rem " }}>
                                <Row>
                                    <div className="col-lg-12 ">
                                        <h3>Bạn có chắc</h3>
                                        <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "0px 0px 30px 0px" }} className="">
                                            <span className="mb-0">
                                                Sản phẩm: <span style={{ fontWeight: 700 }}>{deleteProductModal.name}</span> sẽ bị xóa!!!{" "}
                                            </span>
                                            <span className="mb-0">Bạn sẽ không thể hoàn nguyên hành động này </span>
                                        </div>
                                        <div className="col-md-12"></div>
                                    </div>
                                </Row>
                                <Col className="text-md-right mb-3" lg="12" xs="5">
                                    <Row style={{ justifyContent: "flex-end" }}>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleteProductModal(false);
                                            }}
                                            // className="btn-neutral"
                                            color="default"
                                            size="lg"
                                            style={{ background: "#fff", color: "#000", padding: "0.875rem 1rem", border: "none" }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", width: 80, justifyContent: "center" }}>
                                                <span>Đóng</span>
                                            </div>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsLoadingCircle(true);
                                                deleteProductInMenu(deleteProductModal.id, menu)
                                                    .then((res) => {
                                                        setOpenDeleteProductModal(false);
                                                        setIsLoadingCircle(false);
                                                        hanldeChangeMenu(menu);
                                                        notify("Xóa sản phẩm thành công.", "Success");
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                        setIsLoadingCircle(false);
                                                        notify("Đã xảy ra lỗi gì đó!!", "Error");
                                                    });
                                                setTimeout(() => {
                                                    setIsLoadingCircle(false);
                                                }, 2000);
                                                // hanldeDeleteStoreCate(storeCategoryModal.id, storeCategoryModal.name);
                                            }}
                                            className="btn-cancel"
                                            disabled={isLoadingCircle}
                                            color="default"
                                            size="lg"
                                            style={{ background: "red", color: "#fff", padding: "0.875rem 1rem" }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", width: 80, justifyContent: "center" }}>
                                                {isLoadingCircle ? (
                                                    <Spinner style={{ color: "rgb(250,250,250)", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
                                                ) : (
                                                    <>
                                                        <span>Chắc chắn</span>
                                                    </>
                                                )}
                                            </div>
                                        </Button>
                                    </Row>
                                </Col>
                            </Container>
                        </div>
                    </Card>
                </div>
            </Modal>
            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={openDeleteMenuModal}
                toggle={() => {
                    setOpenDeleteMenuModal(false);
                }}
            >
                <div className="modal-body p-0">
                    <Card className="bg-secondary border-0 mb-0">
                        <div className="" style={{ paddingTop: 0 }}>
                            <Container className="" fluid style={{ padding: "1.5rem 1.5rem 1rem 1.5rem " }}>
                                <Row>
                                    <div className="col-lg-12 ">
                                        <h3>Bạn có chắc</h3>
                                        <div style={{ display: "flex", flexDirection: "column", width: "100%", padding: "0px 0px 30px 0px" }} className="">
                                            <span className="mb-0">
                                                Thực đơn: <span style={{ fontWeight: 700 }}>{deleteMenuModal.name}</span> sẽ bị xóa!!!{" "}
                                            </span>
                                            <span className="mb-0">Bạn sẽ không thể hoàn nguyên hành động này </span>
                                        </div>
                                        <div className="col-md-12"></div>
                                    </div>
                                </Row>
                                <Col className="text-md-right mb-3" lg="12" xs="5">
                                    <Row style={{ justifyContent: "flex-end" }}>
                                        <Button
                                            onClick={() => {
                                                setOpenDeleteMenuModal(false);
                                            }}
                                            // className="btn-neutral"
                                            color="default"
                                            size="lg"
                                            style={{ background: "#fff", color: "#000", padding: "0.875rem 1rem", border: "none" }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", width: 80, justifyContent: "center" }}>
                                                <span>Đóng</span>
                                            </div>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                setIsLoadingCircle(true);
                                                // setIsLoadingCircle(true);
                                                deleteMenu(deleteMenuModal.id)
                                                    .then((res) => {
                                                        setOpenDeleteMenuModal(false);
                                                        setIsLoadingCircle(false);
                                                        getListMenuByMode(mode)
                                                            .then((res) => {
                                                                const menus = res.data;
                                                                setMenuActive({
                                                                    label: menus[0].name,
                                                                    value: menus[0].id,
                                                                });
                                                                setMenuList(menus);
                                                                if (menus && menus.length > 0) {
                                                                    setHTabsIcons(menus[0].id);
                                                                    hanldeChangeMenu(menus[0].id);
                                                                } else {
                                                                    setIsLoading(false);
                                                                    setMenuList([]);
                                                                }
                                                            })
                                                            .catch((error) => {
                                                                console.log(error);
                                                                setIsLoading(false);
                                                                notify("Đã xảy ra lỗi gì đó!!", "Error");
                                                                setMenuList([]);
                                                            });
                                                        notify("Xóa thực đơn thành công.", "Success");
                                                    })
                                                    .catch((error) => {
                                                        console.log(error);
                                                        setIsLoadingCircle(false);
                                                        notify("Đã xảy ra lỗi gì đó!!", "Error");
                                                    });
                                                // hanldeDeleteStoreCate(storeCategoryModal.id, storeCategoryModal.name);
                                            }}
                                            className="btn-cancel"
                                            disabled={isLoadingCircle}
                                            color="default"
                                            size="lg"
                                            style={{ background: "red", color: "#fff", padding: "0.875rem 1rem" }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", width: 80, justifyContent: "center" }}>
                                                {isLoadingCircle ? (
                                                    <Spinner style={{ color: "rgb(250,250,250)", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
                                                ) : (
                                                    <>
                                                        <span>Chắc chắn</span>
                                                    </>
                                                )}
                                            </div>
                                        </Button>
                                    </Row>
                                </Col>
                            </Container>
                        </div>
                    </Card>
                </div>
            </Modal>
            <Container className="mt--6" fluid>
                <Row>
                    <Col md="6" xl="4">
                        <Card className={`card-stats menu ${mode === 1 ? "menu-active" : ""}`} onClick={() => hanldeChangeMode(1)}>
                            <CardBody>
                                <Row>
                                    <div className="col">
                                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                            15 - 30 phút
                                        </CardTitle>
                                        <span className="h2 font-weight-bold mb-0">Gọi Đồ Ăn</span>
                                    </div>
                                    <Col className="col-auto">
                                        <div className="  text-white rounded-circle center_flex" style={{ width: 70, height: 70, border: "5px solid #fff" }}>
                                            <img style={{ width: 60, height: 60 }} src="/images/breakfast.png" alt=""></img>
                                        </div>
                                    </Col>
                                </Row>
                                <p className="mt-1 mb-0 text-sm">
                                    <span className="text-nowrap" style={{ fontSize: "1rem" }}>
                                        Sản phẩm giao ngay
                                    </span>
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" xl="4">
                        <Card className={`card-stats menu ${mode === 2 ? "menu-active" : ""}`} onClick={() => hanldeChangeMode(2)}>
                            <CardBody>
                                <Row>
                                    <div className="col">
                                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                            Giao hàng trong ngày
                                        </CardTitle>
                                        <span className="h2 font-weight-bold mb-0">Giao Hàng</span>
                                    </div>
                                    <Col className="col-auto">
                                        <div className="  text-white rounded-circle center_flex" style={{ width: 70, height: 70, border: "5px solid #fff" }}>
                                            <img style={{ width: 60, height: 60 }} src="/images/dicho-active.png" alt="" />
                                        </div>
                                    </Col>
                                </Row>
                                <p className="mt-1 mb-0 text-sm">
                                    <span className="text-nowrap" style={{ fontSize: "1rem" }}>
                                        Sản phẩm có sẵn trong ngày
                                    </span>
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" xl="4">
                        <Card className={`card-stats menu ${mode === 3 ? "menu-active" : ""}`} onClick={() => hanldeChangeMode(3)}>
                            <CardBody>
                                <Row>
                                    <div className="col">
                                        <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                                            3 - 5 ngày
                                        </CardTitle>
                                        <span className="h2 font-weight-bold mb-0">Đặt Hàng</span>
                                    </div>
                                    <Col className="col-auto">
                                        <div className="  text-white rounded-circle center_flex" style={{ width: 70, height: 70, border: "5px solid #fff", backgroundColor: "#fff" }}>
                                            <img style={{ width: 60, height: 60, borderRadius: 50 }} src="/images/giaohang.png" alt="" />
                                        </div>
                                    </Col>
                                </Row>
                                <p className="mt-1 mb-0 text-sm">
                                    <span className="text-nowrap" style={{ fontSize: "1rem" }}>
                                        Sản phẩm đặt trước
                                    </span>
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md="6" xl="12">
                        <Card className="card-stats">
                            <CardBody style={{}}>
                                <div className="nav-wrapper" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                    {mode !== 3 ? (
                                        <Nav className="nav-fill flex-column flex-md-row" pills role="tablist" style={{ flex: 1, gap: 15, zIndex: 2 }}>
                                            {menuList.length > 0 &&
                                                menuList.map((item) => (
                                                    <NavItem style={{ flex: "none", padding: 0 }} key={item.id}>
                                                        <NavLink
                                                            className={"mb-sm-3 mb-md-0 " + (hTabsIcons === item.id ? "active" : "")}
                                                            href="#pablo"
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                if (hTabsIcons !== item.id) {
                                                                    hanldeChangeMenu(item.id);
                                                                    convertTime(item.endTime);
                                                                }
                                                            }}
                                                            style={{ padding: "0px", color: "white", display: "flex", alignItems: "center", gap: 10 }}
                                                        >
                                                            <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
                                                                <span style={{}}>{item.name}</span>
                                                                <span style={{ fontSize: 14, fontWeight: 500 }}>{"(" + convertTime(item.startTime) + " - " + convertTime(item.endTime) + ")"}</span>
                                                            </div>
                                                            {hTabsIcons === item.id && (
                                                                <UncontrolledDropdown>
                                                                    <DropdownToggle
                                                                        size="sm"
                                                                        className="mr-0"
                                                                        style={{ background: "var(--primary)", border: "none", boxShadow: "none", color: "#fff" }}
                                                                    >
                                                                        <i class="fa-solid fa-ellipsis-vertical" style={{ fontSize: 18 }}></i>
                                                                    </DropdownToggle>
                                                                    <DropdownMenu left>
                                                                        <DropdownItem
                                                                            href="#pablo"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setOpenModal(true);
                                                                                // setAreaModal(areaSelected);
                                                                                // console.log(areaSelected);
                                                                                // setStoreCategoryModal(item);
                                                                            }}
                                                                        >
                                                                            Chỉnh sửa
                                                                        </DropdownItem>
                                                                        <DropdownItem
                                                                            href="#pablo"
                                                                            onClick={(e) => {
                                                                                e.preventDefault();
                                                                                setOpenDeleteMenuModal(true);
                                                                                setDeleteMenuModal(item);
                                                                                // setStoreCategoryModal(item);
                                                                            }}
                                                                        >
                                                                            Xóa
                                                                        </DropdownItem>
                                                                    </DropdownMenu>
                                                                </UncontrolledDropdown>
                                                            )}
                                                        </NavLink>
                                                    </NavItem>
                                                ))}
                                        </Nav>
                                    ) : (
                                        <Select
                                            options={optionsCategory}
                                            placeholder="Ngày"
                                            styles={customStylesMenu}
                                            value={menuActive}
                                            onChange={(e) => {
                                                setMenuActive(e);
                                                hanldeChangeMenu(e.value);
                                            }}
                                        />
                                    )}
                                    {/* <div style={{ marginRight: 15 }}>
                                        
                                    </div> */}
                                    <div style={{ display: "flex", alignItems: "center", zIndex: 2 }}>
                                        <div style={{ marginRight: 15 }}>
                                            <Select
                                                options={optionsCates}
                                                placeholder="Danh mục"
                                                styles={customStylesFilter}
                                                value={filterCate}
                                                onChange={(e) => {
                                                    setFilterCate(e);
                                                    hanldeFilterByCateId(e.value);
                                                    // setMenuActive(e);
                                                    // hanldeChangeMenu(e.value);
                                                }}
                                            />
                                        </div>
                                        <div style={{ marginRight: 15 }}>
                                            <Select
                                                options={optionsStores}
                                                placeholder="Cửa hàng"
                                                styles={customStylesFilter}
                                                value={filterStore}
                                                onChange={(e) => {
                                                    setFilterStore(e);
                                                    hanldeFilterByStoreId(e.value);
                                                    // setMenuActive(e);
                                                    // hanldeChangeMenu(e.value);
                                                }}
                                            />
                                        </div>
                                        <Button
                                            onClick={() => {
                                                // setOpenModal(true);
                                                // setModeModal(mode);
                                                setOpenModal(true);
                                            }}
                                            className=""
                                            color=""
                                            size="lg"
                                            style={{
                                                border: "1px solid var(--primary)",
                                                marginRight: 10,
                                                borderRadius: "0.5rem",
                                                background: "#fff",
                                                color: "var(--primary)",
                                                fontWeight: 700,
                                                width: 170,
                                                fontSize: 16,
                                                height: 49,
                                            }}
                                        >
                                            <i class="fa-solid fa-pen-to-square"></i> Chỉnh sửa
                                        </Button>
                                        {mode !== 3 && (
                                            <>
                                                <Button
                                                    onClick={() => {
                                                        // setOpenModal(true);
                                                        // setModeModal(mode);
                                                        history.push("/admin/menu");
                                                    }}
                                                    className="btn-neutral"
                                                    color="default"
                                                    size="lg"
                                                    style={{ background: "var(--primary)", color: "#fff", fontWeight: 700, width: 180, fontSize: 16, height: 49 }}
                                                >
                                                    + Thêm thực đơn
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </div>
                                {/* <div style={{ display: "flex", margin: "15px 0" }}>
                                    <Select
                                        options={optionsCategory}
                                        placeholder="Tòa nhà"
                                        styles={customStylesPayment}
                                        onChange={(e) => {
                                            // setBuilding(e);
                                        }}
                                    />
                                </div> */}
                                <div>
                                    <TabContent id="myTabContent" activeTab={hTabsIcons}>
                                        <div style={{}}>
                                            {/* {!isLoading &&
                                                productMenuList.map((item) => {
                                                    if (item && item.listProducts && item.listProducts.length > 0) {
                                                        return (
                                                            <div key={item.id} style={{ marginTop: 20 }}>
                                                                <h2>{item.name}</h2>
                                                                <Row xl={6}>
                                                                    {item.listProducts.length > 0 &&
                                                                        item.listProducts.map((pro, index) => (
                                                                            <Col style={{}} key={index}>
                                                                                <div
                                                                                    className=" hover-card"
                                                                                    style={{
                                                                                        display: "flex",
                                                                                        borderRadius: "0.5rem",
                                                                                        position: "relative",
                                                                                        flexDirection: "column",
                                                                                        justifyContent: "center",
                                                                                        alignItems: "center",
                                                                                    }}
                                                                                >
                                                                                    <div
                                                                                        style={{
                                                                                            display: "flex",
                                                                                            alignItems: "center",
                                                                                            justifyContent: "center",
                                                                                            width: "120px",
                                                                                            height: "120px",
                                                                                            paddingTop: 10,
                                                                                        }}
                                                                                    >
                                                                                        <img
                                                                                            style={{ width: "100%", height: "100%", objectFit: "cover", padding: "0", borderRadius: "10px" }}
                                                                                            className="description "
                                                                                            src={pro.image || NOT_FOUND_IMG}
                                                                                            alt=""
                                                                                        ></img>
                                                                                    </div>
                                                                                    <div className="center_flex" style={{ display: "flex", flexDirection: "column" }}>
                                                                                        <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1, color: "#000", textAlign: "center" }}>
                                                                                            {pro.name}
                                                                                        </span>
                                                                                        <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 2, color: "var(--primary)" }}>
                                                                                            {pro.pricePerPack / 1000 + ".000"}đ
                                                                                        </span>
                                                                                    </div>
                                                                                </div>
                                                                            </Col>
                                                                        ))}
                                                                </Row>
                                                            </div>
                                                        );
                                                    }
                                                })} */}

                                            <Table className="align-items-center table-flush" responsive hover={true} style={{}}>
                                                <div className={`loading-spin ${!isLoading && "loading-spin-done"}`}></div>
                                                <thead className="thead-light">
                                                    <tr>
                                                        <th className="sort table-title" scope="col">
                                                            STT
                                                        </th>
                                                        <th className="sort table-title" scope="col">
                                                            Hình ảnh
                                                        </th>

                                                        <th className="sort table-title" scope="col">
                                                            Tên sản phẩm
                                                        </th>
                                                        <th className="sort table-title" scope="col">
                                                            Giá
                                                        </th>

                                                        <th className="sort table-title" scope="col">
                                                            Danh mục
                                                        </th>
                                                        <th className="sort table-title" scope="col">
                                                            Tên của hàng
                                                        </th>
                                                        <th className="sort table-title" scope="col">
                                                            Trạng thái
                                                        </th>
                                                        <th className="sort table-title" scope="col">
                                                            {/* Hành động */}
                                                        </th>
                                                    </tr>
                                                </thead>
                                                {productMenuList.length > 0 && (
                                                    <tbody className="list">
                                                        {productMenuList.map((item, index) => {
                                                            return <MenuItem data={item} key={index} index={index} handleUpdate={handleUpdateProduct} />;
                                                        })}
                                                    </tbody>
                                                )}
                                            </Table>

                                            {!isLoading && productMenuList.length === 0 ? (
                                                <TabPane tabId="hTabsIcons-2" role="tabpanel" className="">
                                                    <div className="center_flex" style={{ padding: "40px 0 0 0" }}>
                                                        <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 230 }} />
                                                    </div>
                                                    <h1 className="description" style={{ fontSize: 20, textAlign: "center", padding: "20px 0 0 0" }}>
                                                        Không có sản phẩm nào
                                                    </h1>
                                                </TabPane>
                                            ) : (
                                                ""
                                            )}
                                            {isLoading && (
                                                <CardBody
                                                    className=" center_flex"
                                                    style={{ zIndex: 1, position: "absolute", top: 0, left: 0, bottom: 0, right: 0, background: "#fff", padding: "330px 0 210px 0" }}
                                                >
                                                    <Lottie options={defaultOptions} height={350} width={350} />
                                                </CardBody>
                                            )}
                                        </div>
                                        {/* <TabPane tabId="hTabsIcons-2" role="tabpanel" className="">
                                            <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                                <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 250 }} />
                                            </div>
                                            <h1 className="description" style={{ fontSize: 20, textAlign: "center", padding: "20px 0 0 0" }}>
                                                Không có sản phẩm nào
                                            </h1>
                                            <p className="description" style={{ fontSize: 17, textAlign: "center", padding: "0px 0 50px 0" }}>
                                                Vui lòng thêm sản phẩm vào thực đon
                                            </p>
                                        </TabPane>
                                        <TabPane tabId="hTabsIcons-3" role="tabpanel">
                                            <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                                <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 250 }} />
                                            </div>
                                            <h1 className="description" style={{ fontSize: 20, textAlign: "center", padding: "20px 0 0 0" }}>
                                                Không có sản phẩm nào
                                            </h1>
                                            <p className="description" style={{ fontSize: 17, textAlign: "center", padding: "0px 0 50px 0" }}>
                                                Vui lòng thêm sản phẩm vào thực đon
                                            </p>
                                        </TabPane>
                                        <TabPane tabId="hTabsIcons-4" role="tabpanel">
                                            <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                                <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 250 }} />
                                            </div>
                                            <h1 className="description" style={{ fontSize: 20, textAlign: "center", padding: "20px 0 0 0" }}>
                                                Không có sản phẩm nào
                                            </h1>
                                            <p className="description" style={{ fontSize: 17, textAlign: "center", padding: "0px 0 50px 0" }}>
                                                Vui lòng thêm sản phẩm vào thực đon
                                            </p>
                                        </TabPane> */}
                                    </TabContent>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
