import React, { useContext, useEffect, useState } from "react";
import ImageUploading from "react-images-uploading";
import { useHistory, useLocation } from "react-router";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Input, Modal, Row, Spinner } from "reactstrap";
import { putTransaction } from "../../../apis/shiperApiService";
import { getStoreDetail, getWalletStore } from "../../../apis/storeApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { notify } from "../../../components/Toast/ToastCustom";
import { AppContext } from "../../../context/AppProvider";
import { COMMISSION_WALLET } from "../../../constants";
const unitData = ["Gam", "Kg", "Chai", "Hủ", "Hộp", "Cái"];

export const ViewStore = () => {
    const { brandList, storeCategoryList, buildingList, setIsLoadingMain } = useContext(AppContext);
    const [storeName, setStoreName] = useState("");
    const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [account, setAccount] = useState("");
    const [openTime, setOpenTime] = useState("");
    const [creditAccount, setCreditAccount] = useState("");
    const [slogan, setSlogan] = useState("");
    const [closeTime, setCloseTime] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [transactionModal, setTransactionModal] = useState(false);
    const [transaction, setTransaction] = useState("");
    const [transactionState, setTransactionState] = useState("");
    // const [status, setStatus] = useState(0);
    const [brand, setBrand] = useState("");
    const [description, setDescription] = useState("");
    const [isLoadingCircle, setIsLoadingCircle] = useState();
    const [storeCategory, setStoreCategory] = useState("");
    const [commissionRate, setCommissionRate] = useState("");
    const [commission, setCommission] = useState("");
    const [images, setImages] = React.useState([]);
    const maxNumber = 69;
    let history = useHistory();
    let location = useLocation();

    const customStylesPayment = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            borderColor: "#dee2e6",
            minHeight: "30px",
            height: "46px",
            // width: "200px",
            boxShadow: state.isFocused ? null : null,
            borderRadius: "0.5rem",
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "5px",
        }),
    };
    const optionsBrand = brandList.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const optionsCategoryStore = storeCategoryList.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const optionsBuilding = buildingList.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const optionsStatus = [
        { label: "Hoạt động", value: true },
        { label: "Ngưng hoạt động", value: false },
    ];
    const validateCustomStylesForm = () => {
        let valid = true;
        if (transaction === "") {
            valid = false;
            setTransactionState("invalid");
        } else {
            // valid = true;
            setTransactionState("valid");
        }

        return valid;
    };
    const hanldeSubmit = () => {
        if (validateCustomStylesForm()) {
            setIsLoadingCircle(true);
            putTransaction(userName, COMMISSION_WALLET, transaction)
                .then((res) => {
                    if (res.data) {
                        let result = res.data;
                        if (result.statusCode === "Successful") {
                            setTransactionModal(false);
                            setTransaction("");
                            setTransactionState("");
                            const id = location.pathname.split("/")[3];
                            hanldeGetStore(id);
                            notify("Hoàn tiền thành côn.g", "Success");
                        }
                        setIsLoadingCircle(false);
                    } else {
                        setIsLoadingCircle(false);
                        notify("Đã xảy ra lỗi gì đó!!", "Error");
                    }
                })

                .catch((error) => {
                    console.log(error);
                    setIsLoadingCircle(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                });
        }
    };
    const hanldeGetStore = (id) => {
        getStoreDetail(id)
            .then((res) => {
                if (res.data) {
                    const store = res.data;

                    let indexBuilding = buildingList?.map((object) => object.id).indexOf(store.buildingId);
                    let indexBrand = brandList?.map((object) => object.id).indexOf(store.brandId);
                    let indexCate = storeCategoryList?.map((object) => object.id).indexOf(store.storeCategoryId);
                    setBuilding({ label: buildingList[indexBuilding].name, value: store.buildingId });
                    setBrand({ label: brandList[indexBrand].name, value: store.brandId });
                    setStoreCategory({ label: storeCategoryList[indexCate].name, value: store.storeCategoryId });
                    setOpenTime(store.openTime);
                    setCloseTime(store.closeTime);
                    setSlogan(store.slogan);
                    setPassword(store.account.password);
                    setStoreName(store.name);
                    setUserName(store.id);
                    setPhone(store.phone);
                    setImages(store.image);
                    setCommissionRate(store.commissionRate);
                    setCreditAccount(store.creditAccount);
                    setDescription(store.description !== null ? store.description : "");
                    setCommission(store.amount || 0);
                    // setStatus({ label: store.status ? "Hoạt động" : "Ngừng hoạt động", value: store.status ? true : false });
                    setIsLoadingMain(false);
                    if (store.image) {
                        setImages([{ data_url: store.image }]);
                    } else {
                        setImages([]);
                    }
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoadingMain(false);
                setIsLoadingCircle(false);
            });
    };
    useEffect(() => {
        const id = location.pathname.split("/")[3];
        // setIsLoadingMain(true);
        hanldeGetStore(id);

        return () => {};
    }, [brandList, buildingList, storeCategoryList]);

    return (
        <>
            <SimpleHeader name="Chi Tiết Cửa Hàng" parentName="Quản Lý" />
            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={transactionModal}
                toggle={() => {
                    setTransactionModal(false);
                    setTransaction("");
                    setTransactionState("");
                }}
            >
                <div className="modal-body p-0">
                    <Card className="bg-secondary border-0 mb-0">
                        <CardHeader className="bg-transparent " style={{ border: "none" }}>
                            <h3>{"Thanh toán"}</h3>
                        </CardHeader>
                        <CardBody className="" style={{ paddingTop: 0 }}>
                            <Container className="" fluid style={{ padding: "0 0px" }}>
                                <form>
                                    <Row>
                                        <div className="col-lg-12 modal-product">
                                            <Card>
                                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                                    <CardHeader className="border-0" style={{ padding: "15px" }}>
                                                        <h2 className="mb-0">Nhập số tiền cần thực hiện </h2>
                                                    </CardHeader>
                                                </div>
                                                <div className="col-md-12">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    {/* <label className="form-control-label">Tên loại cửa hàng </label> */}
                                                                    <Input
                                                                        valid={transactionState === "valid"}
                                                                        invalid={transactionState === "invalid"}
                                                                        className="form-control"
                                                                        type="number"
                                                                        id="example-search-input"
                                                                        value={`${transaction}`}
                                                                        onChange={(e) => {
                                                                            if (e.target.value < 0) {
                                                                                setTransaction(0);
                                                                            } else if (e.target.value > commission) {
                                                                                setTransaction(commission);
                                                                            } else {
                                                                                setTransaction(e.target.value);
                                                                            }
                                                                        }}
                                                                    />
                                                                    <div className="invalid-feedback">Vui lòng nhập số tiền cần thực hiện</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </Card>
                                        </div>
                                    </Row>
                                    <Col className="text-md-right mb-3 flex" lg="12" xs="5" style={{ padding: 0 }}>
                                        <Button
                                            onClick={() => {
                                                setTransaction("");
                                                setTransactionState("");
                                                setTransactionModal(false);
                                            }}
                                            // className="btn-neutral"
                                            color="default"
                                            size="lg"
                                            style={{ background: "#fff", color: "#000", padding: "0.875rem 2rem", border: "none", flex: 1 }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", justifyContent: "center" }}>
                                                {/* <i className="fa-solid fa-backward" style={{ fontSize: 18 }}></i> */}
                                                <span>Đóng</span>
                                            </div>
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                hanldeSubmit();
                                            }}
                                            className="btn-neutral"
                                            disabled={isLoadingCircle}
                                            color="default"
                                            size="lg"
                                            style={{ background: "var(--primary)", color: "#000", padding: "0.875rem 2rem", flex: 1 }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", justifyContent: "center" }}>
                                                {isLoadingCircle ? (
                                                    <Spinner style={{ color: "#fff", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
                                                ) : (
                                                    <>
                                                        {/* <i className="fa-solid fa-square-plus" style={{ fontSize: 18, color: "#fff" }}></i> */}
                                                        <span style={{ color: "#fff" }}>Xác nhận</span>
                                                    </>
                                                )}
                                            </div>
                                        </Button>
                                    </Col>
                                </form>
                            </Container>
                        </CardBody>
                    </Card>
                </div>
            </Modal>
            <Container className="mt--6" fluid>
                <Row style={{ gap: 30 }}>
                    {/* <div className="col-lg-4">
                        <Card>
                            <CardHeader>
                                <h2 className="mb-0">Hình ảnh</h2>
                            </CardHeader>
                            <CardBody>
                                <div className="dropzone dropzone-single mb-3" id="dropzone-single">
                                    <div className="" style={{ height: "100%" }}>
                                        <ImgCrop style={{width: "100%"}} aspect={375/250}  quality={1}>
                                            <Upload style={{width: "100%"}} action="https://www.mocky.io/v2/5cc8019d300000980a055e76" listType="picture-card" fileList={fileList} onChange={onChange} onPreview={onPreview}>
                                                {fileList.length < 1 && "+ Upload"}
                                            </Upload>
                                        </ImgCrop>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div> */}
                    <div className="">
                        <Card>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                <CardHeader className="border-0" style={{ padding: "1rem" }}>
                                    <h2 className="mb-0">
                                        Hình ảnh <span style={{ color: "red" }}>*</span>
                                    </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="" id="dropzone-single" style={{ width: "100%", padding: "0 30px 30px 30px" }}>
                                            <div className="" style={{ height: "100%" }}>
                                                <ImageUploading value={images} maxNumber={maxNumber} dataURLKey="data_url" acceptType={["jpg", "png", "jpeg"]}>
                                                    {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                                        // write your building UI
                                                        <div className="upload-img" style={{ width: 400 }}>
                                                            {images.length <= 0 && (
                                                                <span style={isDragging ? { color: "red" } : null} {...dragProps}>
                                                                    Không có hình ảnh
                                                                </span>
                                                            )}
                                                            {imageList.map((image, index) => (
                                                                <div key={index} className="upload-img">
                                                                    <img src={image.data_url} alt="" width="100" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </ImageUploading>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card>{" "}
                        <Card className="card-stats" style={{ padding: "20px 8px" }}>
                            <CardBody>
                                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                                    <Row style={{ display: "flex", justifyContent: "space-between" }}>
                                        <Col className="col">
                                            <CardTitle tag="h5" className="text-uppercase text-muted mb-0" style={{ fontSize: "0.8rem", paddingBottom: "5px" }}>
                                                Hoa hồng Cần Hoàn Lại ({commissionRate}%)
                                            </CardTitle>
                                            <span className="h2 font-weight-bold mb-0" style={{ fontSize: "1.5rem" }}>
                                                {commission.toLocaleString()}
                                            </span>
                                        </Col>
                                        <Col className="col-auto">
                                            <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow" style={{ width: 45, height: 45 }}>
                                                <i className="fa-solid fa-wallet" style={{ fontSize: 20 }} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <div style={{ display: "flex", justifyContent: "flex-start" }}>
                                        <Button
                                            onClick={() => {
                                                setTransactionModal(true);
                                            }}
                                            className="btn-neutral"
                                            disabled={isLoadingCircle}
                                            color="default"
                                            size="lg"
                                            style={{ background: "var(--primary)", color: "#000", padding: "0.675rem 2rem" }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", width: 99, justifyContent: "center" }}>
                                                <>
                                                    <span style={{ color: "#fff" }}>Thanh toán</span>
                                                </>
                                            </div>
                                        </Button>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="" style={{ flex: 1 }}>
                        <Card>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                <CardHeader className="border-0" style={{ padding: "15px" }}>
                                    <h2 className="mb-0">Thông tin cửa hàng </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">
                                                    Tên cửa hàng <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    readOnly
                                                    type="search"
                                                    id="example-search-input"
                                                    value={`${storeName}`}
                                                    onChange={(e) => {
                                                        setStoreName(e.target.value);
                                                    }}
                                                />
                                                <div className="invalid-feedback">Tên cửa hàng không được để trống</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">Số điện thoại </label>
                                                <input
                                                    className="form-control"
                                                    type="number"
                                                    readOnly
                                                    id="example-search-input"
                                                    value={`${phone}`}
                                                    onChange={(e) => {
                                                        setPhone(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">
                                                    Tên đăng nhập <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    readOnly
                                                    type="search"
                                                    id="example-search-input"
                                                    value={`${userName}`}
                                                    onChange={(e) => {
                                                        setUserName(e.target.value);
                                                    }}
                                                />
                                                <div className="invalid-feedback">Tên đăng nhập không được để trống</div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="form-control-label">
                                                    Mật khẩu <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <Input
                                                    className="form-control"
                                                    type="search"
                                                    readOnly
                                                    id="example-search-input"
                                                    value={`${password}`}
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                />
                                                <div className="invalid-feedback">Mật khẩu không được để trống</div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Giờ mở cửa </label>
                                                <input
                                                    className="form-control"
                                                    type="search"
                                                    id="example-search-input"
                                                    readOnly
                                                    value={`${openTime}`}
                                                    onChange={(e) => {
                                                        setOpenTime(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Giờ đóng cửa </label>
                                                <input
                                                    className="form-control"
                                                    type="search"
                                                    id="example-search-input"
                                                    readOnly
                                                    value={`${closeTime}`}
                                                    onChange={(e) => {
                                                        setCloseTime(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Số tài khoản </label>
                                                <input
                                                    className="form-control"
                                                    type="search"
                                                    readOnly
                                                    id="example-search-input"
                                                    value={`${creditAccount}`}
                                                    onChange={(e) => {
                                                        setCreditAccount(e.target.value);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">
                                                    Building <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <div className="">
                                                    <Select
                                                        options={optionsBuilding}
                                                        placeholder="Tòa nhà"
                                                        styles={customStylesPayment}
                                                        value={building}
                                                        isDisabled
                                                        onChange={(e) => {
                                                            setBuilding(e);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">
                                                    Thương hiệu <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <div>
                                                    <Select
                                                        options={optionsBrand}
                                                        placeholder="Thương hiệu"
                                                        styles={customStylesPayment}
                                                        value={brand}
                                                        isDisabled
                                                        onChange={(e) => {
                                                            setBrand(e);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">
                                                    Loại cửa hàng <span style={{ color: "red" }}>*</span>
                                                </label>
                                                <div>
                                                    <Select
                                                        options={optionsCategoryStore}
                                                        placeholder="Loại cửa hàng"
                                                        styles={customStylesPayment}
                                                        value={storeCategory}
                                                        isDisabled
                                                        onChange={(e) => {
                                                            setStoreCategory(e);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>{" "}
                                        {/* <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Trạng Thái</label>
                                                <Select
                                                    options={optionsStatus}
                                                    placeholder="Trạng Thái"
                                                    styles={customStylesPayment}
                                                    value={status}
                                                    defaultValue={status}
                                                    readOnly
                                                    onChange={(e) => {
                                                        console.log(e);
                                                        setStatus(e);
                                                    }}
                                                />
                                            </div>
                                        </div> */}
                                        <div className="col-md-12" style={{ paddingBottom: 35 }}>
                                            <div className="form-group">
                                                <label className="form-control-label">Miêu tả cửa hàng</label>
                                                <div>
                                                    <textarea
                                                        className="form-control"
                                                        readOnly
                                                        type="search"
                                                        id="example-search-input"
                                                        value={`${description}`}
                                                        onChange={(e) => {
                                                            setDescription(e.target.value);
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card>
                        <Col className="mt-3  text-md-right mb-4" lg="12" xs="5">
                            <Button
                                onClick={() => {
                                    history.push("/admin/stores");
                                }}
                                // className="btn-neutral"
                                color="default"
                                size="lg"
                                style={{ background: "#fff", color: "#000", padding: "0.875rem 2rem", border: "none" }}
                            >
                                <div className="flex" style={{ alignItems: "center" }}>
                                    <i className="fa-solid fa-backward" style={{ fontSize: 18 }}></i>
                                    <span>Trở Về</span>
                                </div>
                            </Button>
                        </Col>
                    </div>
                </Row>
            </Container>
        </>
    );
};
