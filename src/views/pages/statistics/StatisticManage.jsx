import { useContext, useState } from "react";
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
const StatisticManage = () => {
    const { storeCategoryModal, setOpenDeleteModal, openDeleteModal, setOpenNewHubModal } = useContext(AppContext);
    let history = useHistory();
    const options = [
        { label: "Hôm nay", value: 0 },
        { label: "Tháng này", value: 1 },
    ];
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState(Date.now());
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [transactionModal, setTransactionModal] = useState(false);
    const [transactionType, setTransactionType] = useState(0);
    const [transaction, setTransaction] = useState("");
    const [transactionState, setTransactionState] = useState("");
    const [dateFilter, setDateFilter] = useState();
    const [statisticDrivers, setStatisticDrivers] = useState([
        {
            name: "Văn Dương",
            phone: "0353280393",
            distance: 2000,
            totalOrder: 10,
            totalOrderDone: 8,
            totalOrderFail: 2,
            account: 450000,
        },
        {
            name: "Bá Tâm",
            phone: "09832838723",
            distance: 2500,
            totalOrder: 14,
            totalOrderDone: 14,
            totalOrderFail: 0,
            account: 750000,
        },
        {
            name: "Chí Công",
            phone: "0355481232",
            distance: 1800,
            totalOrder: 12,
            totalOrderDone: 11,
            totalOrderFail: 1,
            account: 300000,
        },
        {
            name: "Hoàng Thái",
            phone: "035383033",
            distance: 2200,
            totalOrder: 14,
            totalOrderDone: 12,
            totalOrderFail: 2,
            account: 580000,
        },
    ]);
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    const hanldeModal = (data) => {
        setTransactionModal(true);
        console.log(data);
    };
    const hanldeSubmit = () => {
        if (validateCustomStylesForm()) {
            console.log(transaction);
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
                }}
            >
                <div className="modal-body p-0">
                    <Card className="bg-secondary border-0 mb-0">
                        <CardHeader className="bg-transparent " style={{ border: "none" }}>
                            <h3>{transactionType === 0 ? "Nạp tiền" : "Rút tiền"}</h3>
                        </CardHeader>
                        <CardBody className="" style={{ paddingTop: 0 }}>
                            <Container className="" fluid style={{ padding: "0 0px" }}>
                                <form>
                                    <Row>
                                        <div className="col-lg-12 modal-product">
                                            <Card>
                                                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                                    <CardHeader className="border-0" style={{ padding: "15px" }}>
                                                        <h2 className="mb-0">Nhập số tiền cần {transactionType === 0 ? " nạp" : " rút"} </h2>
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
                                                                        type="search"
                                                                        id="example-search-input"
                                                                        value={`${transaction}`}
                                                                        onChange={(e) => {
                                                                            setTransaction(e.target.value);
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
                <Row>
                    <div className="col">
                        <Card>
                            <div style={{ display: "flex", justifyContent: "center", width: "100%", padding: "30px 0px 0px 0" }} className="align-items-center">
                                <span style={{ fontWeight: 700, fontSize: 20 }}>06/12/2022</span>
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
                                        <span style={{ fontWeight: 700, fontSize: 18 }}>Toàn bộ đơn hàng</span>
                                        <span style={{ fontWeight: 600, fontSize: 15 }}>
                                            50 <span style={{ fontWeight: 500, fontSize: 15 }}>đơn</span>
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
                                        <span style={{ fontWeight: 700, fontSize: 18 }}>Đơn giao thành công</span>
                                        <span style={{ fontWeight: 600, fontSize: 15 }}>
                                            45 <span style={{ fontWeight: 500, fontSize: 15 }}>đơn</span>
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
                                        <span style={{ fontWeight: 700, fontSize: 18 }}>Đơn đã hủy</span>
                                        <span style={{ fontWeight: 600, fontSize: 15 }}>
                                            5 <span style={{ fontWeight: 500, fontSize: 15 }}>đơn</span>
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
                                <ReactDatetime
                                    // inputProps={{
                                    //     placeholder: "Lọc theo ngày",
                                    // }}
                                    value={date}
                                    className="ReactDatetime"
                                    // style={{ border: "none", fontSize: 19 }}
                                    timeFormat={false}
                                    closeOnSelect={true}
                                    onChange={(e) => {
                                        let date = new Date(e._d + "");
                                        moment.locale("en");
                                        let dateConvert = moment(date).format("ll");
                                        date = dateConvert.split(",")[0] + dateConvert.split(",")[1];
                                        setDate(e);
                                        // setFilter({ ...filter, date: date });
                                        // handleGetOrder(date, filter.payment, filter.status, filter.mode, 1, pageSize);
                                        // setPage(1);
                                    }}
                                />
                                <Select
                                    options={options}
                                    placeholder="Lọc theo"
                                    styles={customStyles}
                                    value={dateFilter}
                                    onChange={(e) => {
                                        console.log(e);
                                        setDateFilter(e);
                                        // setIsLoading(true);
                                        // setOrders([]);
                                    }}
                                />
                            </div>
                            {!isLoading && (
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
                                                Tổng đơn
                                            </th>
                                            <th className="sort table-title" scope="col">
                                                Đơn giao thành công
                                            </th>
                                            <th className="sort table-title" scope="col">
                                                Đơn đã hủy
                                            </th>
                                            <th className="sort table-title" scope="col">
                                                Tài khoản
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
                            )}
                            {/* {hubs.length === 0 && !isLoading && (
                                <>
                                    <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                        <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 300 }} />
                                    </div>
                                    <h1 className="description" style={{ fontSize: 18, textAlign: "center", padding: "20px 0 50px 0" }}>
                                        Không có tòa nhà nào!!!
                                    </h1>
                                </>
                            )} */}
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
