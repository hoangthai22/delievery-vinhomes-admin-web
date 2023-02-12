import { useContext, useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useHistory } from "react-router";
import { Button, Card, CardBody, CardHeader, Col, Container, FormGroup, Input, InputGroup, InputGroupAddon, InputGroupText, Modal, Row, Spinner, Table } from "reactstrap";
import animationData from "../../../assets/loading.json";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { AppContext } from "../../../context/AppProvider";
import ReactDatetime from "react-datetime";
import Select from "react-select";
import moment from "moment";
import { StatisticItem } from "./StatsticItem";
import { getOrderReport } from "../../../apis/orderApiService";
import { notify } from "../../../components/Toast/ToastCustom";
import { getListShipperStatistic, putTransaction } from "../../../apis/shiperApiService";
import { DEBIT_WALLET, REFUND_WALLET } from "../../../constants";
const StatisticManage = () => {
    const { storeCategoryModal, setOpenDeleteModal, openDeleteModal, setOpenNewHubModal } = useContext(AppContext);
    let history = useHistory();
    const options = [
        { label: "Hôm nay", value: 0 },
        { label: "Tháng này", value: 1 },
        { label: "Tháng trước", value: 2 },
    ];
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState(Date.now());
    const [dateTitle, setDateTitle] = useState("");
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [transactionModal, setTransactionModal] = useState(false);
    const [transactionType, setTransactionType] = useState(0);
    const [transaction, setTransaction] = useState("");
    const [transactionState, setTransactionState] = useState("");
    const [dayFilter, setDayFilter] = useState(options[1]);
    const [countOrder, setCountOrder] = useState(0);
    const [countOrderDone, setCountOrderDone] = useState(0);
    const [countOrderFail, setCountOrderFail] = useState(0);
    const [shipperTransaction, setShipperTransaction] = useState({
        account: "",
        name: "",
        limit: 0,
    });
    const [statisticDrivers, setStatisticDrivers] = useState([]);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const hanldeModal = (data, type) => {
        setShipperTransaction({ name: data.fullname, account: data.id, limit: type === 0 ? data.refundBalance : data.debitBalance });
        setTransactionModal(true);
        console.log(data);
    };
    const hanldeSubmit = (accountId) => {
        setIsLoadingCircle(true);
        if (validateCustomStylesForm()) {
            putTransaction(accountId, transactionType === 0 ? REFUND_WALLET : DEBIT_WALLET, transaction)
                .then((res) => {
                    if (res.data) {
                        console.log(res.data);
                        let result = res.data;
                        if (result.statusCode === "Successful") {
                            setTransactionModal(false);
                            setTransaction("");
                            setTransactionState("");
                            setShipperTransaction({});
                            notify(transactionType === 0 ? "Hoàn tiền thành công." : "Rút tiền thành công.", "Success");
                            hanldeGetReport("", moment().format("MM"), moment().format("YYYY"));
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
    const customStyles = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            borderColor: "#9e9e9e",
            minHeight: "30px",
            height: "49px",
            width: "180px",
            boxShadow: state.isFocused ? null : null,
            borderRadius: "0.5rem",
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "5px",
        }),
    };
    const hanldeGetReport = (day, month, year) => {
        setIsLoading(true);
        setStatisticDrivers([]);
        getListShipperStatistic(day, month, year, 1, 100)
            .then((res) => {
                if (res.data) {
                    let report = res.data;
                    if (report.statusCode === "Successful") {
                        console.log(report.data);
                        setCountOrder(report.data.total);
                        setCountOrderDone(report.data.success);
                        setCountOrderFail(report.data.cancel);
                        setStatisticDrivers(report.data.shipperInReports);
                    }
                    setIsLoading(false);
                } else {
                    setIsLoading(false);
                    notify("Đã xảy ra lỗi gì đó!!", "Error");
                }
            })

            .catch((error) => {
                console.log(error);
                setIsLoading(false);
                notify("Đã xảy ra lỗi gì đó!!", "Error");
            });
    };
    useEffect(() => {
        moment.locale("vi");
        setDateTitle("Tháng " + moment(Date.now()).format("MM"));
        // moment().format("MM") + "/" + moment().format("DD") + "/" + moment().format("YYYY")
        hanldeGetReport("", moment().format("MM"), moment().format("YYYY"));
        return () => {};
    }, []);

    return (
        <div>
            {/* <NewHub handleReload={handleReload} /> */}
            {/* <NewCluster handleReload={handleReload} /> */}
            {/* <HubModal handleReload={handleReload} /> */}
            {/* <ProductModal openModal={openModal} handleReload={handleReload} /> */}
            <SimpleHeader name="Thống kê" parentName="Quản Lý" />
            <Modal
                className="modal-dialog-centered"
                size="sm"
                isOpen={transactionModal}
                toggle={() => {
                    setTransactionModal(false);
                    setTransaction("");
                    setTransactionState("");
                    setShipperTransaction({});
                }}
            >
                <div className="modal-body p-0">
                    <Card className="bg-secondary border-0 mb-0">
                        <CardHeader className="bg-transparent " style={{ border: "none" }}>
                            <h3>{transactionType === 0 ? "Trả tiền thu hộ" : "Rút tiền"}</h3>
                        </CardHeader>
                        <CardBody className="" style={{ paddingTop: 0 }}>
                            <Container className="" fluid style={{ padding: "0 0px" }}>
                                <form>
                                    <Row>
                                        <div className="col-lg-12 modal-product">
                                            <Card>
                                                {/* <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                                    <CardHeader className="border-0" style={{ padding: "15px" }}>
                                                        <h2 className="mb-0">Nhập số tiền cần {transactionType === 0 ? " thực hiện" : " rút"} </h2>
                                                    </CardHeader>
                                                </div> */}
                                                <div className="col-md-12">
                                                    <form>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label className="form-control-label" style={{ paddingTop: 20 }}>
                                                                        Tài xế
                                                                    </label>
                                                                    <Input className="form-control" type="text" readOnly id="example-search-input" value={`${shipperTransaction.name}`} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="row">
                                                            <div className="col-md-12">
                                                                <div className="form-group">
                                                                    <label className="form-control-label">Nhập số tiền cần {transactionType === 0 ? " thực hiện" : " rút"} </label>
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
                                                                            } else if (e.target.value > shipperTransaction.limit) {
                                                                                setTransaction(shipperTransaction.limit);
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
                                                setTransactionModal(false);
                                                setTransaction("");
                                                setTransactionState("");
                                                setShipperTransaction({});
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
                                                hanldeSubmit(shipperTransaction.account);
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
                <Row>
                    <div className="col">
                        <Card>
                            <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "30px 0px 0px 0" }} className="align-items-center">
                                <span style={{ fontWeight: 700, fontSize: 20 }}>{dateTitle}</span>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "30px 0px 30px 0" }} className="align-items-center">
                                <Col className="mt-3 mt-md-0 text-md-left flex" lg="4" xs="4" style={{ alignItems: "center", justifyContent: "center", gap: 15 }}>
                                    <div
                                        style={{
                                            border: "6px solid rgb(144,198,248)",
                                            borderRadius: 50,
                                            // padding: 15,
                                            height: 70,
                                            width: 70,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <i class="fa-solid fa-box" style={{ fontSize: 24, color: "rgb(24,144,255)" }}></i>
                                    </div>
                                    <div className="flex" style={{ flexDirection: "column", gap: 8 }}>
                                        <span style={{ fontWeight: 700, fontSize: 18 }}>Toàn bộ chuyến hàng</span>
                                        <span style={{ fontWeight: 600, fontSize: 15 }}>
                                            {countOrder} <span style={{ fontWeight: 500, fontSize: 15 }}>chuyến hàng</span>
                                        </span>
                                    </div>
                                </Col>

                                <Col className="mt-3 mt-md-0 text-md-left flex" lg="4" xs="4" style={{ alignItems: "center", justifyContent: "center", gap: 15 }}>
                                    <div
                                        style={{
                                            border: "6px solid rgb(171,229,155)",
                                            borderRadius: 50,
                                            // padding: 15,
                                            height: 70,
                                            width: 70,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <i class="fa-solid fa-square-check" style={{ fontSize: 24, color: "rgb(84,214,44)" }}></i>
                                    </div>
                                    <div className="flex" style={{ flexDirection: "column", gap: 8 }}>
                                        <span style={{ fontWeight: 700, fontSize: 18 }}>Chuyến hàng thành công</span>
                                        <span style={{ fontWeight: 600, fontSize: 15 }}>
                                            {countOrderDone} <span style={{ fontWeight: 500, fontSize: 15 }}>chuyến hàng</span>
                                        </span>
                                    </div>
                                </Col>

                                <Col className="mt-3 mt-md-0 text-md-left flex" lg="4" xs="4" style={{ alignItems: "center", justifyContent: "center", gap: 15 }}>
                                    <div
                                        style={{
                                            border: "6px solid rgb(246,166,165)",
                                            borderRadius: 50,
                                            // padding: 15,
                                            height: 70,
                                            width: 70,
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <i class="fa-solid fa-rectangle-xmark" style={{ fontSize: 24, color: "rgb(255,72,66)" }}></i>
                                    </div>
                                    <div className="flex" style={{ flexDirection: "column", gap: 8 }}>
                                        <span style={{ fontWeight: 700, fontSize: 18 }}>Chuyến hàng thất bại</span>
                                        <span style={{ fontWeight: 600, fontSize: 15 }}>
                                            {countOrderFail} <span style={{ fontWeight: 500, fontSize: 15 }}>chuyến hàng</span>
                                        </span>
                                    </div>
                                </Col>

                                {/* <CardHeader className="" style={{ padding: "0 0 0 20px", borderBottom: "none" }}>
                                    <FormGroup className="mb-0">
                                        <InputGroup className="input-group-lg input-group-flush" style={{ border: "1px solid #9e9e9e" }}>
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText style={{ padding: "0 15px" }}>
                                                    <span className="fas fa-search" />
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input placeholder="Tìm kiếm bằng tên hub" type="search" className="btn-lg" style={{ height: 46, width: 250 }} />
                                        </InputGroup>
                                    </FormGroup>
                                </CardHeader> */}
                                {/* <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                                    <Button
                                        onClick={() => {
                                            setOpenNewHubModal(true);
                                        }}
                                        className="btn-neutral"
                                        color="default"
                                        size="lg"
                                        style={{ background: "var(--primary)", color: "#fff", fontWeight: 700, border: "1px solid var(--primary)" }}
                                    >
                                        + Thêm Hub Mới
                                    </Button>
                                </Col> */}
                            </div>
                            <div style={{ display: "flex", width: "100%", padding: "15px 0px 20px 0", gap: 20 }} className="">
                                <CardHeader className="" style={{ padding: "0 0 0 20px" }}>
                                    <div className="flex" style={{ alignItems: "center", gap: 20 }}>
                                        <div className="mb-0">
                                            <InputGroup className="input-group-lg input-group-flush" style={{ border: "1px solid #9e9e9e" }}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText style={{ padding: "0 15px" }}>
                                                        <span className="fas fa-search" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Tìm kiếm bằng tên tài xế" type="search" className="btn-lg" style={{ height: 47, width: 250 }} />
                                            </InputGroup>
                                        </div>
                                    </div>
                                </CardHeader>
                                {/* <ReactDatetime
                                    // inputProps={{
                                    //     placeholder: "Lọc theo ngày",
                                    // }}
                                    value={date}
                                    className="ReactDatetime"
                                    // style={{ border: "none", fontSize: 19 }}
                                    timeFormat={false}
                                    closeOnSelect={true}
                                    onChange={(e) => {
                                        setDate(e);
                                        moment.locale("vi");
                                        let date = new Date(e._d + "");
                                        setDateTitle(moment(date).format("ll"));
                                        // moment.locale("en");
                                        let dateConvert = moment(date).format("ll");
                                        date = dateConvert.split(",")[0] + dateConvert.split(",")[1];

                                        hanldeGetReport(date);
                                        // setFilter({ ...filter, date: date });
                                        // handleGetOrder(date, filter.payment, filter.status, filter.mode, 1, pageSize);
                                        // setPage(1);
                                    }}
                                /> */}
                                <Select
                                    options={options}
                                    placeholder="Lọc theo"
                                    styles={customStyles}
                                    value={dayFilter}
                                    onChange={(e) => {
                                        console.log(e);
                                        setDayFilter(e);
                                        if (e.value === 0) {
                                            hanldeGetReport(moment().format("MM") + "/" + moment().format("DD") + "/" + moment().format("YYYY"), "", "");
                                            setDateTitle(moment(Date.now()).format("ll"));
                                        } else if (e.value === 1) {
                                            setDateTitle("Tháng " + moment(Date.now()).format("MM"));
                                            hanldeGetReport("", moment().format("MM"), moment().format("YYYY"));
                                        } else {
                                            setDateTitle("Tháng " + moment().subtract(1, "month").format("MM"));
                                            hanldeGetReport("", moment().subtract(1, "month").format("MM"), moment().format("YYYY"));
                                        }
                                        // setIsLoading(true);
                                        // setOrders([]);
                                    }}
                                />
                            </div>

                            <Table className="align-items-center table-flush" responsive hover={true} style={{ position: "relative" }}>
                                <div className={`loading-spin ${!isLoading && "loading-spin-done"}`}></div>
                                <thead className="thead-light">
                                    <tr>
                                        <th className="sort table-title" scope="col">
                                            STT
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Tên tài xế
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Số điện thoại
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Quảng đường
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Tổng chuyến hàng
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Chuyến hàng thành công
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Chuyến hàng thất bại
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Tài khoản chính
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Tài khoản thu hộ
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            {/* Hành động */}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    {statisticDrivers.length > 0 &&
                                        statisticDrivers.map((item, index) => {
                                            return <StatisticItem data={item} key={index} index={index} hanldeModal={hanldeModal} setTransactionType={setTransactionType} />;
                                        })}
                                </tbody>
                            </Table>

                            {statisticDrivers.length === 0 && !isLoading && (
                                <>
                                    <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                        <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 300 }} />
                                    </div>
                                    <h1 className="description" style={{ fontSize: 18, textAlign: "center", padding: "20px 0 50px 0" }}>
                                        Không có tài xế nào!!!
                                    </h1>
                                </>
                            )}
                            {isLoading && (
                                <CardBody className=" center_flex">
                                    <Lottie options={defaultOptions} height={350} width={350} />
                                </CardBody>
                            )}
                        </Card>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default StatisticManage;
