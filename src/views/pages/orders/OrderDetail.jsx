import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Row } from "reactstrap";
import { getOrderDetail } from "../../../apis/orderApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { getModeName } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";

const OrderDetail = () => {
    // const { , ,  } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [orderId, setOrderId] = useState("");
    const [storeName, setStoreName] = useState("");
    const [cusBuilding, setCusBuilding] = useState("");
    const [total, setTotal] = useState("");
    const [shipCost, setShipCost] = useState("");
    const [cusName, setCusName] = useState("");
    const [shipperName, setshipperName] = useState("");
    const [shipperPhone, setshipperPhone] = useState("");
    const [storeBuilding, setStoreBuilding] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [paymentName, setPaymentName] = useState("");
    const [statusList, setStatusList] = useState([]);
    const [modeName, setModeName] = useState("");
    let location = useLocation();
    let history = useHistory();
    useEffect(() => {
        const id = location.pathname.split("/")[3];
        if (id) {
            getOrderDetail(id)
                .then((res) => {
                    if (res.data) {
                        console.log(res.data);
                        const order = res.data;
                        setOrderId(id);
                        setStoreName(order.storeName);
                        setshipperPhone(order.shipperPhone);
                        setshipperName(order.shipperName);
                        setStoreBuilding(order.storeBuilding);
                        setPhoneNumber(order.phoneNumber);
                        setCusName(order.fullName);
                        setCusBuilding(order.buildingName);
                        setPaymentName(order.paymentName);
                        setShipCost(order.shipCost);
                        setTotal(order.total);
                        setModeName(getModeName(order.modeId));
                        let newStatus = [];
                        let flag = true;
                        for (let index = 0; index < order.listStatusOrder.length; index++) {
                            const element = order.listStatusOrder[index];
                            if (element.status === 5) {
                                flag = false;
                                newStatus = order.listStatusOrder.filter((item) => item.status !== 5);
                                newStatus.push(element);
                                setStatusList(newStatus);
                                break;
                            }
                        }
                        if (flag) {
                            setStatusList(order.listStatusOrder);
                        }
                    }
                })
                .catch((error) => {
                    console.log(error);
                    setIsLoading(false);
                    setIsLoadingCircle(false);
                });
        }
    }, [location]);
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
        let day = "";
        let result = "";
        if (time) {
            day = time.split(" ")[0];
            if (day) {
                let month = day.split("/")[1];
                let date = day.split("/")[2];

                result = date + " Tháng " + month;
            } else {
                result = day;
            }
        }
        return result;
    };
    const getStatusHour = (time) => {
        let hour = "";
        if (time) {
            hour = time.split(" ")[1];
        }
        return hour;
    };
    return (
        <div>
            <SimpleHeader name="Chi tiết đơn hàng" parentName="Quản Lý" />
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
                                                            <div style={{ display: "flex", flexDirection: "column", justifyContent: "start", alignItems: "flex-end", fontSize: active ? 16 : 15 }}>
                                                                <span style={{ color: error ? "#ed4337" : active ? "green" : "#525f7f", fontWeight: active ? 600 : 500 }}>
                                                                    {getStatusMessage(item.status)}
                                                                </span>
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
                                                <label className="form-control-label">Tài xế </label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={`${shipperName}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Số điện thoại</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={`${shipperPhone}`} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Loại thực đơn</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={modeName} onChange={(e) => {}} />
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
                                                <Input className="form-control" type="search" id="example-search-input" value={paymentName} readOnly onChange={() => {}} />
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
                                                <label className="form-control-label">Phí ship</label>
                                                <Input className="form-control" type="number" id="example-search-input" value={`${shipCost}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Card>
                    </div>
                </Row>
                <Col className="text-md-right mb-3" lg="12" xs="5">
                    <Button
                        onClick={() => {
                            history.push("/admin/orders");
                        }}
                        className="btn-neutral"
                        color="default"
                        size="lg"
                        style={{ background: "#fff", color: "#000", padding: "0.875rem 2rem" }}
                    >
                        <div className="flex" style={{ alignItems: "center" }}>
                            <i className="fa-solid fa-backward" style={{ fontSize: 18 }}></i>
                            <span>Trở lại</span>
                        </div>
                    </Button>
                </Col>
            </Container>
        </div>
    );
};

export default OrderDetail;
