import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Row, Spinner } from "reactstrap";
import { getOrderDetail } from "../../../apis/orderApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { getModeName, getTimeConvert } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";

const OrderDetail = () => {
    // const { , ,  } = useContext(AppContext);
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
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
    const [dateCreated, setDateCreated] = useState("");
    let location = useLocation();
    let history = useHistory();
    useEffect(() => {
        const id = location.pathname.split("/")[3];
        if (id) {
            console.log("load");
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
                        setModeName(getModeName(order.modeId));
                        setListProduct(order.listProInMenu);
                        setDateCreated(getTimeConvert(order.time));
                        setService(order.serviceId === "1" ? "Ho??a t????c" : "Hub");

                        if (listShipper.length > 0) {
                            setShipperCollecter(listShipper[0].shipperName + " - " + listShipper[0].phone);
                            if (listShipper[1]) {
                                setShipperDelivery(listShipper[1].shipperName + " - " + listShipper[1].phone);
                            } else {
                                setShipperDelivery(listShipper[0].shipperName + " - " + listShipper[0].phone);
                            }
                        }
                        console.log(order.listShipper);

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
    }, []);
    const getStatusMessage = (statusId) => {
        switch (statusId) {
            case 0:
                return "????n h??ng ???????c t???o th??nh c??ng";
            case 1:
                return "C???a h??ng ???? x??c nh???n ????n h??ng";
            case 2:
                return "??ang t??m t??i x???";
            case 3:
                return "T??i x??? x??c nh???n";
            case 4:
                return "??ang giao h??ng";
            case 5:
                return "Giao h??ng th??nh c??ng";
            case 6:
                return "????n h??ng ???? h???y";
            case 7:
                return "T??i x??? ??ang l???y h??ng";
            case 8:
                return "????n h??ng ???? ?????n Hub";
            case 9:
                return "T??i x??? ??ang giao h??ng";
            case 10:
                return "????n h??ng b??? h???y do h???t th???i gian ?????i";
            case 11:
                return "T??i x??? ???? h???y ????n h??ng";
            case 12:
                return "C???a h??ng ???? h???y ????n h??ng ";
            case 13:
                return "Kh??ch h??ng ???? h???y ????n h??ng";
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
    return (
        <div>
            <SimpleHeader name="Chi ti???t ????n h??ng" parentName="Qu???n L??" />
            <Container className="mt--6" fluid>
                <Row>
                    <div className="col-lg-4">
                        <Card style={{ minHeight: 605 }}>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                <CardHeader className="border-0" style={{ padding: "15px" }}>
                                    <h2 className="mb-0">L??? tr??nh ????n h??ng </h2>
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
                                    <h2 className="mb-0">Th??ng tin ????n h??ng </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">M?? ????n h??ng</label>
                                                <Input className="form-control" type="search" id="example-search-input" value={orderId} readOnly onChange={() => {}} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">C???a h??ng </label>
                                                <Input className="form-control" type="search" id="example-search-input" readOnly value={`${storeName}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">?????a ch??? l???y h??ng</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={`${storeBuilding}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">T??i x??? l????y ha??ng</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={`${shipperCollecter}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">T??i x??? giao ha??ng</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={`${shipperDelivery}`} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Lo???i th???c ????n</label>
                                                <Input className="form-control" type="text" id="example-search-input" readOnly value={modeName} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-8">
                                            <div className="form-group">
                                                <label className="form-control-label">Danh s??ch m??n</label>
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
                                    <h2 className="mb-0">Th??ng tin kh??ch h??ng </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">?????a ??i???m giao</label>
                                                <Input className="form-control" type="search" id="example-search-input" value={cusBuilding} readOnly onChange={() => {}} />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">T??n kh??ch h??ng </label>
                                                <Input className="form-control" type="search" id="example-search-input" readOnly value={`${cusName}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">S??? ??i???n tho???i</label>
                                                <Input className="form-control" type="number" id="example-search-input" readOnly value={`${phoneNumber}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label className="form-control-label">Ghi ch?? </label>
                                                <textarea className="form-control" type="text" id="example-search-input" readOnly value={`${note}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                <CardHeader className="border-0" style={{ padding: "0 15px 15px 15px" }}>
                                    <h2 className="mb-0">Th??ng tin thanh to??n </h2>
                                </CardHeader>
                            </div>
                            <div className="col-md-12">
                                <form>
                                    <div className="row">
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Ph????ng th???c thanh to??n</label>
                                                <Input
                                                    className="form-control"
                                                    type="search"
                                                    id="example-search-input"
                                                    value={paymentName === 0 ? "Ti???n m???t" : "VN Pay"}
                                                    readOnly
                                                    onChange={() => {}}
                                                />
                                            </div>
                                        </div>

                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Gi?? tr??? ????n h??ng </label>
                                                <Input className="form-control" type="search" id="example-search-input" readOnly value={`${total}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Ph?? ship</label>
                                                <Input className="form-control" type="number" id="example-search-input" value={`${shipCost}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Di??ch vu??</label>
                                                <Input className="form-control" type="text" id="example-search-input" value={`${service}`} onChange={(e) => {}} />
                                            </div>
                                        </div>
                                        <div className="col-md-4">
                                            <div className="form-group">
                                                <label className="form-control-label">Nga??y ??????t ha??ng</label>
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
                                    <span>Tr??? V???</span>
                                </div>
                            </Button>
                            <Button
                                onClick={() => {
                                    // handleSubmit();
                                }}
                                className="btn-neutral"
                                color="default"
                                size="lg"
                                disabled={isLoadingCircle}
                                style={{ background: "red", color: "#000", padding: "0.875rem 1rem" }}
                            >
                                <div className="flex" style={{ alignItems: "center", width: 130, justifyContent: "center" }}>
                                    {isLoadingCircle ? (
                                        <Spinner style={{ color: "#fff", width: "1.31rem", height: "1.31rem" }}>Loading...</Spinner>
                                    ) : (
                                        <>
                                            <i className="fa-regular fa-rectangle-xmark" style={{ fontSize: 18, color: "#fff" }}></i>
                                            <span style={{ color: "#fff" }}>Hu??y ????n ha??ng</span>
                                        </>
                                    )}
                                </div>
                            </Button>
                        </Col>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default OrderDetail;
