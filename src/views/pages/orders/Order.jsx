import React, { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import { Card, CardBody, CardFooter, CardHeader, Container, Form, Input, Pagination, PaginationItem, PaginationLink, Row, Spinner, Table } from "reactstrap";
import { getListOrder, getListOrderByPayment, getListOrderByStatus } from "../../../apis/orderApiService";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import { OrderModal } from "../../../components/Modals/orderModal";
import { statusType } from "../../../constants";
import ReactDatetime from "react-datetime";
import Odata from "./OData";
import { OrderItem } from "./OrderItem";
import moment from "moment";
// import "moment/locale/en";

export const Order = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [payment, setPayment] = useState("");
    const [status, setStatus] = useState("");
    const [dateType, setDateType] = useState("text");
    const [dateOrder, setDateOrder] = useState("");
    const interviewDateRef = useRef();
    const options = [
        { label: "Tất cả", value: -1 },
        { label: "Tiền Mặt(COD)", value: 0 },
        { label: "VN Pay", value: 1 },
    ];
    const optionsMode = [
        { label: "Tất cả", value: "0" },
        { label: "Gọi Món", value: "1" },
        { label: "Đi Chợ", value: "2" },
        { label: "Đặt Hàng", value: "3" },
    ];

    const optionsStatus = statusType.map((item) => {
        return { label: item.value, value: item.id };
    });

    const { orderItem } = Odata;
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return () => {};
    }, []);
    const handleGetOrder = (date) => {
        setIsLoading(true);
        if (date === "") {
            date = "";
        }
        getListOrder(date.replace("-", "/").replace("-", "/"), 1, 100)
            .then((res) => {
                const orders = res.data;
                setOrders(orders);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        // const date = new Date();
        // const futureDate = date.getDate();
        // date.setDate(futureDate);
        // const defaultValue = date.toLocaleDateString("en-CA");
        // setDateOrder("");
        handleGetOrder("");

        return () => {};
    }, []);

    let history = useHistory();
    const customStylesPayment = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            borderColor: "#9e9e9e",
            minHeight: "30px",
            height: "46px",
            width: "200px",
            boxShadow: state.isFocused ? null : null,
            borderRadius: "0.5rem",
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "5px",
        }),
    };
    const customStylesStatus = {
        control: (provided, state) => ({
            ...provided,
            background: "#fff",
            borderColor: "#9e9e9e",
            minHeight: "30px",
            height: "46px",
            width: "250px",
            boxShadow: state.isFocused ? null : null,
            borderRadius: "0.5rem",
        }),

        input: (provided, state) => ({
            ...provided,
            margin: "5px",
        }),
    };
    const handleInterviewDateClick = () => {
        interviewDateRef.current.focus();
    };
    return (
        <>
            <SimpleHeader name="Danh Sách Đơn Hàng" parentName="Quản Lý" />
            <OrderModal />
            <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <Card>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "20px 0px" }} className="align-items-center">
                                <CardHeader className="" style={{ padding: "0 0 0 20px", border: "none" }}>
                                    <Form className="flex" style={{ alignItems: "center", gap: 20 }}>
                                        {/* <FormGroup className="mb-0">
                                            <InputGroup className="input-group-lg input-group-flush" style={{ border: "2px solid #dce0e8" }}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText style={{ padding: "0 15px" }}>
                                                        <span className="fas fa-search" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    placeholder="Tìm kiếm bằng tên sản phẩm"
                                                    type="search"
                                                    className="btn-lg input-search"
                                                    style={{ height: 44, width: 250, fontSize: "1.2rem !important" }}
                                                />
                                            </InputGroup>
                                        </FormGroup> */}
                                        <ReactDatetime
                                            inputProps={{
                                                placeholder: "Lọc theo ngày",
                                            }}
                                            className="ReactDatetime"
                                            style={{ border: "none" }}
                                            timeFormat={false}
                                            onChange={(e) => {
                                                let date = new Date(e._d + "");
                                                moment.locale("en");
                                                let dateConvert = moment(date).format("ll");
                                                date = dateConvert.split(",")[0] + dateConvert.split(",")[1];
                                                handleGetOrder(date);
                                            }}
                                        />

                                        <Select
                                            options={options}
                                            placeholder="Thanh Toán"
                                            styles={customStylesPayment}
                                            value={payment}
                                            onChange={(e) => {
                                                console.log(e);
                                                setIsLoading(true);
                                                setOrders([]);
                                                setPayment(e);
                                                if (e.value !== -1) {
                                                    getListOrderByPayment(e.value, 1, 100)
                                                        .then((res) => {
                                                            const orders = res.data;
                                                            setOrders(orders);
                                                            setIsLoading(false);
                                                        })
                                                        .catch((error) => console.log(error));
                                                } else {
                                                    getListOrder("", 1, 100)
                                                        .then((res) => {
                                                            const orders = res.data;
                                                            setOrders(orders);
                                                            setIsLoading(false);
                                                        })
                                                        .catch((error) => console.log(error));
                                                }
                                                setStatus("");
                                            }}
                                        />
                                        <Select
                                            options={optionsStatus}
                                            placeholder="Trạng Thái Đơn Hàng"
                                            styles={customStylesStatus}
                                            value={status}
                                            onChange={(e) => {
                                                console.log(e);
                                                setIsLoading(true);
                                                setOrders([]);
                                                setStatus(e);
                                                if (e.value !== "Tất cả") {
                                                    getListOrderByStatus(e.value, 1, 100)
                                                        .then((res) => {
                                                            const orders = res.data;
                                                            setOrders(orders);
                                                            setIsLoading(false);
                                                        })
                                                        .catch((error) => console.log(error));
                                                } else {
                                                    getListOrder(1, 100)
                                                        .then((res) => {
                                                            const orders = res.data;
                                                            setOrders(orders);
                                                            setIsLoading(false);
                                                        })
                                                        .catch((error) => console.log(error));
                                                }

                                                setPayment("");
                                            }}
                                        />
                                        <Select
                                            options={optionsMode}
                                            placeholder="Hình thức đặt hàng"
                                            styles={customStylesStatus}
                                            value={status}
                                            onChange={(e) => {
                                                console.log(e);
                                                // setIsLoading(true);
                                                // setOrders([]);
                                                // setStatus(e);
                                                // // if (e.value !== "Tất cả") {
                                                //     getListOrderByStatus(e.value, 1, 100)
                                                //         .then((res) => {
                                                //             const orders = res.data;
                                                //             setOrders(orders);
                                                //             setIsLoading(false);
                                                //         })
                                                //         .catch((error) => console.log(error));
                                                // } else {
                                                //     getListOrder(1, 100)
                                                //         .then((res) => {
                                                //             const orders = res.data;
                                                //             setOrders(orders);
                                                //             setIsLoading(false);
                                                //         })
                                                //         .catch((error) => console.log(error));
                                                // }

                                                setPayment("");
                                            }}
                                        />
                                    </Form>
                                </CardHeader>
                                {/* <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                                    <Button onClick={() => history.push("/admin/product")} className="btn-neutral" color="default" size="lg" style={{ background: "var(--secondary)", color: "#fff" }}>
                                        Thêm Sản Phẩm Mới
                                    </Button>
                                </Col> */}
                            </div>
                            <Table className="align-items-center table-flush" responsive hover={true}>
                                <thead className="thead-light">
                                    <tr>
                                        <th className="sort table-title" scope="col">
                                            Mã Đơn Hàng
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Cửa hàng
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Điểm Giao Hàng
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Khách Hàng
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            SDT
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Giá trị Đơn hàng
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Ngày Tạo
                                        </th>

                                        <th className="sort table-title" scope="col">
                                            Thanh Toán
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Trạng Thái
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Shipper
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Mode
                                        </th>

                                        <th className="sort table-title" scope="col">
                                            {/* Hành động */}
                                        </th>
                                        {/* <th scope="col">Users</th>
                                        <th className="sort table-title" data-sort="completion" scope="col">
                                            Completion
                                        </th>
                                        <th scope="col" /> */}
                                    </tr>
                                </thead>

                                <tbody className="list">
                                    {orders.length > 0 &&
                                        orders.map((item, index) => {
                                            return <OrderItem data={item} index={index} key={index} />;
                                        })}
                                </tbody>
                            </Table>
                            {orders.length === 0 && !isLoading && (
                                <>
                                    <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                        <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 300 }} />
                                    </div>
                                    <h1 className="description" style={{ fontSize: 18, textAlign: "center", padding: "20px 0 50px 0" }}>
                                        Không có đơn hàng nào!!!
                                    </h1>
                                </>
                            )}

                            {isLoading && (
                                <CardBody className="loading-wrapper center_flex">
                                    <Spinner className="loading" type="grow"></Spinner>
                                    <Spinner className="loading" type="grow"></Spinner>
                                    <Spinner className="loading" type="grow"></Spinner>
                                </CardBody>
                            )}
                            {/* {!isLoading && orders.length > 0 && (
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                                            <PaginationItem className="disabled">
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()} tabIndex="1">
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    2 <span className="sr-only">(current)</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    3
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <i className="fas fa-angle-right" />
                                                    <span className="sr-only">Next</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                        </Pagination>
                                    </nav>
                                </CardFooter>
                            )} */}
                        </Card>
                    </div>
                </Row>
            </Container>
        </>
    );
};
