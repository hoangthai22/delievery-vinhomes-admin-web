import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Modal, Row, Spinner } from "reactstrap";
import { getOrderDetail, putCancelOrder } from "../../../apis/orderApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { getModeName, getTimeConvert, listCancelOrderMessage } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";
import Select from "react-select";
import { notify } from "../../../components/Toast/ToastCustom";
const OrderDetail = () => {
    const { setIsLoadingMain } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const [orderId, setOrderId] = useState("");
    const [storeName, setStoreName] = useState("");
    const [cusBuilding, setCusBuilding] = useState("");
    const [listProduct, setListProduct] = useState([]);
    const [total, setTotal] = useState("");
    const [shipCost, setShipCost] = useState("");
    const [note, setNote] = useState("");
    const [cusName, setCusName] = useState("");
    const [shipperDelivery, setShipperDelivery] = useState("");
    const [shipperCollecter, setShipperCollecter] = useState("");
    // const [shipperName, setshipperName] = useState("");
    // const [shipperPhone, setshipperPhone] = useState("");
    const [storeBuilding, setStoreBuilding] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [paymentName, setPaymentName] = useState("");
    const [statusList, setStatusList] = useState([]);
    const [modeName, setModeName] = useState("");
    const [service, setService] = useState("");
    const [messageFail, setMessageFail] = useState("");
    const [message, setMessage] = useState("");
    const [messageInput, setMessageInput] = useState("");
    const [messageState, setMessageState] = useState("");
    const [dateCreated, setDateCreated] = useState("");
    const [radioStatus, setRadioStatus] = useState(11);
    const [isCancelButton, setIsCancelButton] = useState(true);

    let location = useLocation();
    let history = useHistory();
    useEffect(() => {
        setIsLoadingMain(true);
        const id = location.pathname.split("/")[3];
        if (id) {
            hanldeGetOrderDetail(id);
        }
        return () => {
            setIsLoadingMain(false);
        };
    }, []);
    const hanldeGetOrderDetail = (id) => {
        setIsLoadingMain(true);
        let listShipper = [];
        getOrderDetail(id)
            .then((res) => {
                if (res.data) {
                    const order = res.data;
                    setOrderId(id);
                    setStoreName(order.storeName);
                    listShipper = order.listShipper;
                    setStoreBuilding(order.storeBuilding);
                    setPhoneNumber(order.phoneNumber);
                    setCusName(order.fullName);
                    setCusBuilding(order.buildingName);
                    setPaymentName(order.paymentName);
                    setNote(order.note);
                    setShipCost(order.shipCost);
                    setTotal(order.total);
                    setMessageFail(order.messageFail || "");
                    setModeName(getModeName(order.modeId));
                    setListProduct(order.listProInMenu);
                    setDateCreated(getTimeConvert(order.time));
                    setService(order.serviceId === "1" ? "Hỏa tốc" : "Hub");

                    if (listShipper.length > 0) {
                        setShipperCollecter(listShipper[0].shipperName + " - " + listShipper[0].phone);
                        if (listShipper[1]) {
                            setShipperDelivery(listShipper[1].shipperName + " - " + listShipper[1].phone);
                        }
                        // else {
                        //     setShipperDelivery(listShipper[0].shipperName + " - " + listShipper[0].phone);
                        // }
                    }

                    let newStatus = [];
                    let flag = true;
                    for (let index = 0; index < order.listStatusOrder.length; index++) {
                        const element = order.listStatusOrder[index];
                        if (element.status === 6 || element.status === 10 || element.status === 11 || element.status === 12 || element.status === 13) {
                            setIsCancelButton(false);
                            break;
                        }
                        if (element.status === 5) {
                            flag = false;
                            newStatus = order.listStatusOrder.filter((item) => item.status !== 5);
                            newStatus.push(element);
                            setIsCancelButton(false);
                            setStatusList(newStatus);
                            break;
                        }
                    }
                    if (flag) {
                        setStatusList(order.listStatusOrder);
                    }
                    setIsLoadingMain(false);
                } else {
                    setIsLoading(false);
                    setIsLoadingCircle(false);
                    setIsLoadingMain(false);
                }
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                setIsLoadingCircle(false);
                setIsLoadingMain(false);
            });
    };
    const getStatusMessage = (statusId) => {
        switch (statusId) {
            case 0:
                return "Đơn hàng được tạo thành công";
            case 1:
                return "Cửa hàng đã xác nhận đơn hàng";
            case 2:
                return "Đang tìm tài xế";
            case 3:
                return "Tài xế xác nhận";
            case 4:
                return "Đang giao hàng";
            case 5:
                return "Giao hàng thành công";
            case 6:
                return "Đơn hàng đã hủy";
            case 7:
                return "Tài xế đang lấy hàng";
            case 8:
                return "Đơn hàng đã đến Hub";
            case 9:
                return "Tài xế đang giao hàng";
            case 10:
                return "Đơn hàng bị hủy do hết thời gian đợi";
            case 11:
                return "Tài xế đã hủy đơn hàng";
            case 12:
                return "Cửa hàng đã hủy đơn hàng ";
            case 13:
                return "Khách hàng đã hủy đơn hàng";
            default:
                return "";
        }
    };
    const getStatusDay = (time) => {
        moment.locale("vi");
        let dateConvert = moment(time).format("DD MMM");

        return dateConvert;
    };
    const getStatusHour = (time) => {
        moment.locale("vi");
        let hourConvert = moment(time).format(" H:mm");
        return hourConvert;
    };
    const customStylesBuilding = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            borderColor: "#dee2e6",
            minHeight: "30px",
            height: "46px",
            width: "100%",
            boxShadow: state.isFocused ? null : null,
            borderRadius: "0.5rem",
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "5px",
        }),
    };
    const optionsBuilding = () =>
        listCancelOrderMessage.map((item) => {
            return {
                label: item.message,
                value: item.id,
            };
        });
    const validateCustomStylesForm = () => {
        let valid = true;

        if (messageInput === "" && message.value === 18) {
            valid = false;
            setMessageState("invalid");
        } else {
            // valid = true;
            setMessageState("valid");
        }

        return valid;
    };
    function capitalize(s) {
        return s[0].toUpperCase() + s.slice(1);
    }
    const hanldeCancel = (orderId, status, messageFail) => {
        if (validateCustomStylesForm()) {
            setIsLoadingCircle(true);
            putCancelOrder(orderId, status, capitalize(messageFail))
                .then((res) => {
                    if (res.data) {
                        let statusCode = res.data.statusCode;
                        if (statusCode === "Successful") {
                            notify("Hủy đơn hàng thành công", "Success");
                            setOpenCancelModal(false);
                            const id = location.pathname.split("/")[3];
                            hanldeGetOrderDetail(id);
                        } else {
                            notify(res.data.message, "Error");
                        }
                    }
                    setIsLoadingCircle(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoadingCircle(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                });
        }
    };
    return (
        <div>
            <SimpleHeader name="Chi tiết đơn hàng" parentName="Quản Lý" />
            <Modal
                className="modal-dialog-centered"
                size="md"
                isOpen={openCancelModal}
                toggle={() => {
                    setOpenCancelModal(false);
                    setMessage("");
                    setMessageState("");
                    setMessageInput("");
                }}
            >
                <div className="modal-body p-0">
                    <Card className="bg-secondary border-0 mb-0">
                        <div className="" style={{ paddingTop: 0 }}>
                            <Container className="" fluid style={{ padding: "1.5rem 1.5rem 1rem 1.5rem " }}>
                                <Row>
                                    <div className="col-lg-12 ">
                                        <h2>Chọn lý do hủy đơn hàng</h2>
                                        <Card>
                                            <div style={{ padding: "25px 15px 25px 15px" }}>
                                                <div className="form-control-label" style={{ margin: "0px 0 15px 0" }}>
                                                    Người hủy đơn:
                                                </div>
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 20 }}>
                                                    <div className="custom-control custom-radio mb-3">
                                                        <input
                                                            className="custom-control-input"
                                                            type="radio"
                                                            id="driver"
                                                            onChange={() => {
                                                                setRadioStatus(11);
                                                            }}
                                                            name="fav_language"
                                                            checked={radioStatus === 11}
                                                            value={11}
                                                        />
                                                        <label for="driver" className="custom-control-label" style={{ fontSize: 16, color: "#000" }}>
                                                            Cửa Hàng
                                                        </label>
                                                    </div>
                                                    <div className="custom-control custom-radio mb-3">
                                                        <input
                                                            className="custom-control-input"
                                                            type="radio"
                                                            id="store"
                                                            name="fav_language"
                                                            onChange={() => {
                                                                setRadioStatus(12);
                                                            }}
                                                            value={12}
                                                            checked={radioStatus === 12}
                                                            style={{ backgroundColor: "red" }}
                                                        />
                                                        <label for="store" className="custom-control-label" style={{ fontSize: 16, color: "#000" }}>
                                                            Tài Xế
                                                        </label>
                                                    </div>
                                                    <div className="custom-control custom-radio mb-3">
                                                        <input
                                                            className="custom-control-input"
                                                            type="radio"
                                                            id="cus"
                                                            onChange={() => {
                                                                setRadioStatus(13);
                                                            }}
                                                            name="fav_language"
                                                            checked={radioStatus === 13}
                                                            value={13}
                                                        />
                                                        <label for="cus" className="custom-control-label" style={{ fontSize: 16, color: "#000" }}>
                                                            Khách hàng
                                                        </label>
                                                    </div>
                                                </div>
                                                <label className="form-control-label">Lý do:</label>
                                                <Select
                                                    options={optionsBuilding()}
                                                    placeholder="Lý do"
                                                    styles={customStylesBuilding}
                                                    value={message}
                                                    onChange={(e) => {
                                                        setMessage(e);
                                                    }}
                                                />
                                                <div style={{ paddingTop: 15, opacity: message.value === 18 ? 1 : 0, height: message.value === 18 ? 110 : 0, transition: "0.2s all" }}>
                                                    <label className="form-control-label">Lý do khác: </label>
                                                    <Input
                                                        valid={messageState === "valid"}
                                                        invalid={messageState === "invalid"}
                                                        className="form-control"
                                                        type="textarea"
                                                        id="example-search-input"
                                                        value={`${messageInput}`}
                                                        onChange={(e) => {
                                                            setMessageInput(e.target.value);
                                                        }}
                                                    />
                                                    <div className="invalid-feedback">Lý do không được để trống</div>
                                                </div>
                                            </div>
                                        </Card>
                                    </div>
                                </Row>
                                <Col className="text-md-right mb-3" lg="12" xs="5">
                                    <Row style={{ justifyContent: "flex-end" }}>
                                        <Button
                                            onClick={() => {
                                                setOpenCancelModal(false);
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
                                                // setIsLoadingCircle(true);
                                                hanldeCancel(orderId, radioStatus, message.value === 18 ? messageInput : message.label);
                                            }}
                                            className="btn-cancel"
                                            disabled={isLoadingCircle || message === ""}
                                            color="default"
                                            size="lg"
                                            style={{ background: "red", color: "#fff", padding: "0.875rem 1rem" }}
                                        >
                                            <div className="flex" style={{ alignItems: "center", width: 80, justifyContent: "center" }}>
                                                {isLoadingCircle ? (
                                                    <Spinner style={{ color: "rgb(250,250,250)", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
                                                ) : (
                                                    <>
                                                        <span>Đồng ý</span>
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
                    <div className="col-lg-4">
                        <Card style={{ minHeight: 605 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                <CardHeader className="border-0" style={{ padding: "15px" }}>
                                    <h2 className="mb-0">Lộ trình đơn hàng </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row" style={{ padding: "0 15px 15px 15px" }}>
                                        {statusList.length > 0 &&
                                            statusList.map((item, ind) => {
                                                let line = true;
                                                let error = false;
                                                let active = false;
                                                if (ind === statusList.length - 1) {
                                                    line = false;
                                                    active = true;
                                                }
                                                if (item.status === 6 || item.status === 10 || item.status === 11 || item.status === 12 || item.status === 13) {
                                                    error = true;
                                                }
                                                return (
                                                    <>
                                                        <div className="col-md-12" style={{ display: "flex", gap: 15, opacity: active ? 1 : 0.5 }} key={ind}>
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    justifyContent: "start",
                                                                    alignItems: "flex-end",
                                                                    fontSize: active ? 16 : 15,
                                                                    width: 90,
                                                                }}
                                                            >
                                                                <span>{getStatusDay(item.time)}</span>
                                                                <span>{getStatusHour(item.time)}</span>
                                                            </div>
                                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "center" }}>
                                                                <div style={{ width: 14, display: "flex", justifyContent: "center", alignItems: "center" }}>
                                                                    <div
                                                                        style={{
                                                                            height: active ? 12 : 9,
                                                                            width: active ? 12 : 9,
                                                                            background: error ? "#ed4337" : active ? "green" : "#525f7f",
                                                                            borderRadius: 50,
                                                                            marginTop: 5,
                                                                            marginBottom: 5,
                                                                        }}
                                                                    ></div>
                                                                </div>
                                                                <div style={{ width: 1, height: 45, background: "rgb(200,200,200)", display: line ? "block" : "none" }}></div>
                                                            </div>
                                                            <div
                                                                style={{
                                                                    flex: 1,
                                                                    display: "flex",
                                                                    flexDirection: "column",
                                                                    justifyContent: "start",
                                                                    // alignItems: "flex-end",
                                                                    fontSize: active ? 16 : 15,
                                                                }}
                                                            >
                                                                <span style={{ color: error ? "#ed4337" : active ? "green" : "#525f7f", fontWeight: active ? 600 : 500 }}>
                                                                    {getStatusMessage(item.status)}
                                                                </span>
                                                                {error && <span style={{ color: "#ed4337", fontWeight: 500, fontSize: 14 }}>{`Lý do: ${messageFail}`}</span>}
                                                            </div>
                                                        </div>
                                                    </>
                                                );
                                            })}
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </div>
                    <div className="col-lg-8 ">
                        <Card>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                <CardHeader className="border-0" style={{ padding: "15px" }}>
                                    <h2 className="mb-0">Thông tin đơn hàng </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Mã đơn hàng</label>
                                                <Input className="form-control" type="search" id="example-search-input" value={orderId} readOnly onChange={() => {}} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Cửa hàng </label>
                                                <Input className="form-control" type="search" id="example-search-input" readOnly value={`${storeName}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Địa chỉ lấy hàng</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={`${storeBuilding}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Tài xế lấy hàng</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={`${shipperCollecter}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Tài xế giao hàng</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={`${shipperDelivery}`} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Loại thực đơn</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={modeName} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label className="form-control-label">Danh sách món</label>
                                                <div style={{ border: "1px solid #dee2e6", borderRadius: "0.5rem" }}>
                                                    {listProduct.map((item, index) => {
                                                        return (
                                                            <div
                                                                key={index}
                                                                style={{
                                                                    display: "flex",
                                                                    gap: 15,
                                                                    justifyContent: "space-between",
                                                                    borderBottom: index !== listProduct.length - 1 ? "1px solid rgb(230,230,230)" : null,
                                                                    padding: "15px 0",
                                                                    margin: "0 15px",
                                                                }}
                                                            >
                                                                <div style={{ display: "flex", gap: 15, fontSize: 15 }}>
                                                                    <span>{item.quantity}x</span>
                                                                    <span>{item.productName}</span>
                                                                </div>
                                                                <span>{item.price}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                <CardHeader className="border-0" style={{ padding: "0 15px 15px 15px" }}>
                                    <h2 className="mb-0">Thông tin khách hàng </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Địa điểm giao</label>
                                                <Input className="form-control" type="search" id="example-search-input" value={cusBuilding} readOnly onChange={() => {}} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Tên khách hàng </label>
                                                <Input className="form-control" type="search" id="example-search-input" readOnly value={`${cusName}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Số điện thoại</label>
                                                <Input className="form-control" type="number" id="example-search-input" readOnly value={`${phoneNumber}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-control-label">Ghi chú </label>
                                                <textarea className="form-control" type="text" id="example-search-input" readOnly value={`${note}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                <CardHeader className="border-0" style={{ padding: "0 15px 15px 15px" }}>
                                    <h2 className="mb-0">Thông tin thanh toán </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Phương thức thanh toán</label>
                                                <Input
                                                    className="form-control"
                                                    type="search"
                                                    id="example-search-input"
                                                    value={paymentName === 0 ? "Tiền mặt" : "VN Pay"}
                                                    readOnly
                                                    onChange={() => {}}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Giá trị đơn hàng </label>
                                                <Input className="form-control" type="search" id="example-search-input" readOnly value={`${total}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Phí vận chuyển</label>
                                                <Input className="form-control" type="number" id="example-search-input" value={`${shipCost}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Dịch vụ</label>
                                                <Input className="form-control" type="text" id="example-search-input" value={`${service}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Ngày đặt hàng</label>
                                                <Input className="form-control" type="text" id="example-search-input" value={`${dateCreated}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card>
                        <Col className="mt-3  text-md-right mb-4" lg="12" xs="5">
                            <Button
                                onClick={() => {
                                    history.push("/admin/orders");
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
                            {isCancelButton && (
                                <Button
                                    onClick={() => {
                                        // handleSubmit();
                                        setOpenCancelModal(true);
                                    }}
                                    className="btn-cancel"
                                    color="default"
                                    size="lg"
                                    disabled={isLoadingCircle}
                                    style={{ background: "red", color: "#000", padding: "0.875rem 1rem" }}
                                >
                                    <div className="flex" style={{ alignItems: "center", width: 130, justifyContent: "center" }}>
                                        <i className="fa-regular fa-rectangle-xmark" style={{ fontSize: 18, color: "#fff" }}></i>
                                        <span style={{ color: "#fff" }}>Hủy đơn hàng</span>
                                    </div>
                                </Button>
                            )}
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default OrderDetail;
