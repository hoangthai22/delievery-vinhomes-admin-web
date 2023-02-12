import React, { useContext, useEffect, useState } from "react";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Container, Input, Modal, Row, Spinner } from "reactstrap";
import { getListBrands, getStoreDetail, putStore } from "../../apis/storeApiService";
import { AppContext } from "../../context/AppProvider";
import ImageUploading from "react-images-uploading";
import { getBase64Ima, getBase64Image, getBase64ImageNotType } from "../../constants";
import { notify } from "../Toast/ToastCustom";
import axios from "axios";

export const StoreModal = ({ handleReload }) => {
    const { openModal, setOpenModal, brandList, storeModal, storeCategoryList, buildingList, setStoreModal } = useContext(AppContext);
    const [storeName, setStoreName] = useState("");
    const [storeNameState, setStoreNameState] = useState("");
    const [phone, setPhone] = useState("");
    const [building, setBuilding] = useState("");
    const [buildingState, setBuildingState] = useState("");
    const [account, setAccount] = useState("");
    const [creditAccount, setCreditAccount] = useState("");
    const [status, setStatus] = useState(0);
    const [brand, setBrand] = useState("");
    const [openTime, setOpenTime] = useState("");
    const [closeTime, setCloseTime] = useState("");
    const [slogan, setSlogan] = useState("");
    const [imageState, setimageState] = useState("");
    const [images, setImages] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [imgUpdate, setImgUpdate] = useState(false);
    const [description, setDescription] = useState("");
    const [brandState, setBrandState] = useState("");
    const [commissionRate, setCommissionRate] = useState("");
    const [commissionRateState, setCommissionRateState] = useState("");
    const [commission, setCommission] = useState(0);
    const [password, setPassword] = useState("");
    const [storeCategoryState, setStoreCategoryState] = useState("");
    // const [brand, setBrand] = useState("");
    const maxNumber = 69;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        if (imageList.length > 0) {
            setimageState("valid");
            setImgUpdate(true);
        } else {
            setimageState("invalid");
        }
        setImages(imageList);
    };
    const validateCustomStylesForm = () => {
        let valid = true;
        if (storeName === "") {
            valid = false;
            setStoreNameState("invalid");
        } else {
            // valid = true;
            setStoreNameState("valid");
        }

        if (images.length === 0) {
            valid = false;
            setimageState("invalid");
        } else {
            // valid = true;
            setimageState("valid");
        }
        if (brand === "") {
            valid = false;
            setBrandState("invalid");
        } else {
            // valid = true;
            setBrandState("valid");
        }
        if (storeCategory === "") {
            valid = false;
            setStoreCategoryState("invalid");
        } else {
            // valid = true;
            setStoreCategoryState("valid");
        }
        if (building === "") {
            valid = false;
            setBuildingState("invalid");
        } else {
            // valid = true;
            setBuildingState("valid");
        }
        if (commissionRate === "") {
            valid = false;
            setCommissionRateState("invalid");
        } else {
            // valid = true;
            setCommissionRateState("valid");
        }

        return valid;
    };
    const [storeCategory, setStoreCategory] = useState("");
    useEffect(() => {
        if (storeModal.id) {
            setIsLoading(true);
            setStoreName(storeModal.name);
            setPhone(storeModal.phone || "");
            setBuilding({ label: storeModal.buildingStore, value: storeModal.buildingId });
            setBrand({ label: storeModal.brandStoreName, value: storeModal.brandStoreId });
            setStoreCategory({ label: storeModal.storeCateName, value: storeModal.storeCateId });
            setAccount("");
            getStoreDetail(storeModal.id)
                .then((res) => {
                    if (res.data) {
                        const store = res.data;
                        console.log(store.creditAccount);
                        setOpenTime(store.openTime);
                        setCloseTime(store.closeTime);
                        setSlogan(store.slogan);
                        setPassword(store.account.password);
                        setImages(store.image);
                        setCommissionRate(store.commissionRate);
                        setCreditAccount(store.creditAccount || "");
                        setCommission(store.amount || 0);
                        setDescription(store.description !== null ? store.description : "");
                        setStatus({ label: store.status ? "Hoạt động" : "Ngừng hoạt động", value: store.status ? true : false });
                        setIsLoading(false);
                        if (store.image) {
                            setImages([{ data_url: store.image }]);
                        } else {
                            setImages([]);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                    setIsLoadingCircle(false);
                });
        }
    }, [storeModal]);
    const hanldeUpdate = () => {
        if (validateCustomStylesForm()) {
            setIsLoadingCircle(true);

            let store = {
                id: storeModal.id,
                name: storeName,
                buildingId: building.value,
                brandId: brand.value,
                rate: "",
                closeTime: closeTime,
                openTime: openTime,
                image: getBase64Image(images[0].data_url || "", images[0]?.file?.type) || "",
                storeCategoryId: storeCategory.value,
                slogan: slogan,
                phone: phone,
                commissionRate: commissionRate,
                status: status.value,
                description: description,
                password: password,
            };
            console.log({ store, imgUpdate });
            putStore(store, storeModal.id, imgUpdate)
                .then((res) => {
                    if (res.data) {
                        if (res.data.message === "Successful") {
                            setIsLoadingCircle(false);
                            handleReload();
                            notify("Cập nhật thành công", "Success");
                            setOpenModal(false);
                            setStoreModal({});
                            setImages([]);
                            setImgUpdate(false);
                        } else {
                            notify(res.data.message, "Error");
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoadingCircle(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                });
        }
    };
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
    const optionsBuilding = buildingList.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const optionsBrand = brandList.map((item) => {
        return {
            label: item.name,
            value: item.id,
        };
    });
    const optionsCategoryStore = storeCategoryList.map((item) => {
        // console.log(item);
        return {
            label: item.name,
            value: item.id,
        };
    });

    const optionsStatus = [
        { label: "Hoạt động", value: true },
        { label: "Ngưng hoạt động", value: false },
    ];
    return (
        <>
            <Row>
                <Col md="4">
                    <Modal
                        className="modal-dialog-centered"
                        size="xl"
                        isOpen={openModal}
                        toggle={() => {
                            setStoreModal({});
                            setImages([]);
                            setOpenModal(false);
                            setImgUpdate(false);
                            setimageState("");
                            setStoreCategoryState("");
                            setCommissionRateState("");
                            setBrandState("");
                            setBuildingState("");
                            setStoreNameState("");
                        }}
                    >
                        <div className="modal-body p-0">
                            <Card className="bg-secondary border-0 mb-0">
                                <CardHeader className="bg-transparent " style={{ border: "none" }}>
                                    <h3>Chi tiết</h3>
                                </CardHeader>
                                <CardBody className="" style={{ paddingTop: 0 }}>
                                    <Container className="" fluid style={{ padding: "0 0px" }}>
                                        <Row>
                                            <div className="col-lg-4 modal-product">
                                                <Card>
                                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                                        <CardHeader className="border-0">
                                                            <h2 className="mb-0">Hình ảnh</h2>
                                                        </CardHeader>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <form>
                                                            <div className="row">
                                                                <div className="" id="dropzone-single" style={{ width: "100%", padding: "0 30px 30px 30px" }}>
                                                                    <div className="" style={{ height: "100%" }}>
                                                                        {/* <div className="view-img" onClick={() => {}}>
                                                                            <div className="view-img">
                                                                                <img
                                                                                    src={
                                                                                        storeModal.image ||
                                                                                        "https://firebasestorage.googleapis.com/v0/b/deliveryfood-9c436.appspot.com/o/food%2Ftopic-2.webp?alt=media&token=54a5086f-f2ea-4009-9479-28624019703e"
                                                                                    }
                                                                                    alt=""
                                                                                    width="100"
                                                                                />
                                                                            </div>
                                                                        </div> */}
                                                                        <ImageUploading
                                                                            value={images}
                                                                            onChange={onChange}
                                                                            maxNumber={maxNumber}
                                                                            dataURLKey="data_url"
                                                                            acceptType={["jpg", "png", "jpeg"]}
                                                                        >
                                                                            {({ imageList, onImageUpload, onImageRemoveAll, onImageUpdate, onImageRemove, isDragging, dragProps }) => (
                                                                                // write your building UI
                                                                                <div className="upload-img" onClick={onImageUpload}>
                                                                                    {images.length <= 0 && (
                                                                                        <span style={isDragging ? { color: "red" } : null} {...dragProps}>
                                                                                            Tải ảnh
                                                                                        </span>
                                                                                    )}
                                                                                    {imageList.map((image, index) => (
                                                                                        <div key={index} className="upload-img">
                                                                                            <img id="image-url" src={image.data_url} alt="" width="100" />
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            )}
                                                                        </ImageUploading>
                                                                        {imageState === "invalid" && (
                                                                            <div className="invalid" style={{ textAlign: "center", fontSize: "80%", color: "#fb6340", marginTop: "0.25rem" }}>
                                                                                Hình ảnh không được để trống
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Card>
                                                <Card className="card-stats" style={{ padding: "1.5rem 0.5rem" }}>
                                                    <CardBody>
                                                        <Row>
                                                            <div className="col">
                                                                <CardTitle tag="h5" className="text-uppercase text-muted mb-0" style={{ fontSize: "0.8rem", paddingBottom: "5px" }}>
                                                                    Hoa hồng Cần Hoàn Lại ({commissionRate}%)
                                                                </CardTitle>
                                                                <span className="h2 font-weight-bold mb-0" style={{ fontSize: "1.5rem" }}>
                                                                    {commission.toLocaleString()}
                                                                </span>
                                                            </div>
                                                            <Col className="col-auto">
                                                                <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow" style={{ width: 45, height: 45 }}>
                                                                    <i className="fa-solid fa-wallet" style={{ fontSize: 20 }} />
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    </CardBody>
                                                </Card>
                                            </div>
                                            <div className="col-lg-8 modal-product">
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
                                                                        <label className="form-control-label">Tên đăng nhập</label>
                                                                        <Input className="form-control" type="search" id="example-search-input" value={storeModal.id} readOnly onChange={() => {}} />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Mật khẩu</label>
                                                                        <Input
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={password}
                                                                            readOnly
                                                                            onChange={(e) => {
                                                                                setPassword(e.target.value);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Tên cửa hàng </label>
                                                                        <Input
                                                                            valid={storeNameState === "valid"}
                                                                            invalid={storeNameState === "invalid"}
                                                                            className="form-control"
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
                                                                        <Input
                                                                            className="form-control"
                                                                            type="number"
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
                                                                        <label className="form-control-label">Building(Tòa nhà)</label>
                                                                        <Select
                                                                            options={optionsBuilding}
                                                                            placeholder="Tòa nhà"
                                                                            styles={customStylesPayment}
                                                                            value={building}
                                                                            onChange={(e) => {
                                                                                setBuilding(e);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    {buildingState === "invalid" && (
                                                                        <div className="invalid" style={{ fontSize: "80%", color: "#fb6340", marginTop: "0.25rem" }}>
                                                                            Địa chỉ không được để trống
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Thương hiệu</label>
                                                                        <Select
                                                                            options={optionsBrand}
                                                                            placeholder="Thương hiệu"
                                                                            styles={customStylesPayment}
                                                                            value={brand}
                                                                            onChange={(e) => {
                                                                                setBrand(e);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    {brandState === "invalid" && (
                                                                        <div className="invalid" style={{ fontSize: "80%", color: "#fb6340", marginTop: "0.25rem" }}>
                                                                            Thương hiệu không được để trống
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Loại cửa hàng</label>
                                                                        <Select
                                                                            options={optionsCategoryStore}
                                                                            placeholder="Loại cửa hàng"
                                                                            styles={customStylesPayment}
                                                                            value={storeCategory}
                                                                            onChange={(e) => {
                                                                                setStoreCategory(e);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                    {storeCategoryState === "invalid" && (
                                                                        <div className="invalid" style={{ fontSize: "80%", color: "#fb6340", marginTop: "0.25rem" }}>
                                                                            Loại cửa hàng không được để trống
                                                                        </div>
                                                                    )}
                                                                </div>

                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Số tài khoản </label>
                                                                        <Input
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={`${creditAccount}`}
                                                                            onChange={(e) => {
                                                                                setCreditAccount(e.target.value);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-control-label">Tỷ lệ hoa hồng (%)</label>
                                                                    <Input
                                                                        valid={commissionRateState === "valid"}
                                                                        invalid={commissionRateState === "invalid"}
                                                                        className="form-control"
                                                                        type="number"
                                                                        id="example-search-input"
                                                                        value={`${commissionRate}`}
                                                                        onChange={(e) => {
                                                                            setCommissionRate(e.target.value);
                                                                        }}
                                                                    />
                                                                    <div className="invalid-feedback">Tỷ lệ hoa hồng không được để trống</div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <label className="form-control-label">Giờ mở cửa </label>
                                                                    <Input
                                                                        className="form-control"
                                                                        type="text"
                                                                        id="example-search-input"
                                                                        value={`${openTime}`}
                                                                        onChange={(e) => {
                                                                            setOpenTime(e.target.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <div className="form-group">
                                                                            <label className="form-control-label">Giờ đóng cửa </label>
                                                                            <Input
                                                                                className="form-control"
                                                                                type="text"
                                                                                id="example-search-input"
                                                                                value={`${closeTime}`}
                                                                                onChange={(e) => {
                                                                                    setCloseTime(e.target.value);
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-3">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Trạng Thái</label>
                                                                        <Select
                                                                            options={optionsStatus}
                                                                            placeholder="Trạng Thái"
                                                                            styles={customStylesPayment}
                                                                            value={status}
                                                                            defaultValue={status}
                                                                            onChange={(e) => {
                                                                                console.log(e);
                                                                                setStatus(e);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Miêu tả cửa hàng</label>
                                                                        <div>
                                                                            <textarea
                                                                                className="form-control"
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
                                                                {/* <div className="col-md-12">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Slogan </label>
                                                                        <Input
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={`${slogan}`}
                                                                            onChange={(e) => {
                                                                                setSlogan(e.target.value);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div> */}
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Card>
                                            </div>
                                        </Row>
                                        <Col className="text-md-right mb-3" lg="12" xs="5">
                                            <Button
                                                onClick={() => {
                                                    setOpenModal(false);
                                                }}
                                                // className="btn-neutral"
                                                color="default"
                                                size="lg"
                                                style={{ background: "#fff", color: "#000", padding: "0.875rem 2rem", border: "none" }}
                                            >
                                                <div className="flex" style={{ alignItems: "center" }}>
                                                    <i className="fa-solid fa-backward" style={{ fontSize: 18 }}></i>
                                                    <span>Đóng</span>
                                                </div>
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    hanldeUpdate();
                                                }}
                                                className="btn-neutral"
                                                disabled={isLoadingCircle}
                                                color="default"
                                                size="lg"
                                                style={{ background: "var(--primary)", color: "#000", padding: "0.875rem 2rem" }}
                                            >
                                                <div className="flex" style={{ alignItems: "center", width: 99, justifyContent: "center" }}>
                                                    {isLoadingCircle ? (
                                                        <Spinner style={{ color: "#fff", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
                                                    ) : (
                                                        <>
                                                            <i className="fa-solid fa-square-plus" style={{ fontSize: 18, color: "#fff" }}></i>
                                                            <span style={{ color: "#fff" }}>Chỉnh Sửa</span>
                                                        </>
                                                    )}
                                                </div>
                                            </Button>
                                        </Col>
                                    </Container>
                                </CardBody>
                            </Card>
                        </div>
                    </Modal>
                </Col>
            </Row>
        </>
    );
};
