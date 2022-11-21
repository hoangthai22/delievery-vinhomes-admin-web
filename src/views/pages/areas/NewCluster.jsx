import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Select from "react-select";
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Modal, Row, Spinner } from "reactstrap";
import { postArea } from "../../../apis/areaApiService";
import { postStoreCategory } from "../../../apis/categoryApiService";
import { notify } from "../../../components/Toast/ToastCustom";
import { AppContext } from "../../../context/AppProvider";
export const NewCluster = ({ handleReload, listArea }) => {
    const { openNewClusterModal, setOpenNewClusterModal } = useContext(AppContext);
    const [clusterName, setClusterName] = useState("");
    const [clusterNameState, setClusterNameState] = useState("");
    const [status, setStatus] = useState(0);
    const [area, setArea] = useState("");
    const [isLoadingCircle, setIsLoadingCircle] = useState(false);
    const [longitude, setLongitude] = useState("");
    const [latitude, setLatitude] = useState("");
    useEffect(() => {
        setStatus({ label: "Hoạt động", value: 0 });
        if (listArea.length > 0) {
            setArea({ label: listArea[0].label, value: listArea[0].value });
        }
    }, [listArea]);

    const hanldeUpdate = () => {
        if (validateCustomStylesForm()) {
            // setIsLoadingCircle(true);
            let building = { name: clusterName };
            console.log({ building });
            // post(building)
            //     .then((res) => {
            //         if (res.data) {
            //             notify("Thêm mới thành công", "Success");
            //             history.push("/admin/areas");
            //             handleReload();
            //             setOpenNewBuildingModal(false);
            //             setIsLoadingCircle(false);
            //             setBuildingName("");
            //         }
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //         setIsLoadingCircle(false);
            //         notify("Đã xảy ra lỗi gì đó!!", "Error");
            //     });
        }
    };
    const validateCustomStylesForm = () => {
        let valid = true;
        if (clusterName === "") {
            valid = false;
            setClusterNameState("invalid");
        } else {
            // valid = true;
            setClusterNameState("valid");
        }

        return valid;
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

    const optionsStatus = [
        { label: "Hoạt động", value: 0 },
        { label: "Ngưng hoạt động", value: 1 },
    ];
    const optionsArea = listArea.map((item) => {
        return { label: item.label, value: item.value };
    });
    return (
        <>
            <Row>
                <Col md="4">
                    <Modal
                        className="modal-dialog-centered"
                        size="lg"
                        isOpen={openNewClusterModal}
                        toggle={() => {
                            setOpenNewClusterModal(false);
                            setClusterName("");
                            setClusterNameState(false);
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
                                            <div className="col-lg-12 modal-product">
                                                <Card>
                                                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "10px 0px" }} className="align-items-center">
                                                        <CardHeader className="border-0" style={{ padding: "15px" }}>
                                                            <h2 className="mb-0">Thông tin cụm tòa nhà </h2>
                                                        </CardHeader>
                                                    </div>
                                                    <div className="col-md-12">
                                                        <form>
                                                            <div className="row">
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Tên cụm tòa nhà </label>
                                                                        <Input
                                                                            valid={clusterNameState === "valid"}
                                                                            invalid={clusterNameState === "invalid"}
                                                                            className="form-control"
                                                                            type="search"
                                                                            id="example-search-input"
                                                                            value={`${clusterName}`}
                                                                            onChange={(e) => {
                                                                                setClusterName(e.target.value);
                                                                            }}
                                                                        />
                                                                        <div className="invalid-feedback">Tên cụm tòa nhà không được để trống</div>
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-4">
                                                                    <div className="form-group">
                                                                        <label className="form-control-label">Khu vực</label>
                                                                        <Select
                                                                            options={optionsArea}
                                                                            placeholder="Trạng Thái"
                                                                            styles={customStylesPayment}
                                                                            value={area}
                                                                            defaultValue={area}
                                                                            onChange={(e) => {
                                                                                console.log(e);
                                                                                setArea(e);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>{" "}
                                                                <div className="col-md-4">
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
                                                            </div>
                                                        </form>
                                                    </div>
                                                </Card>
                                            </div>
                                        </Row>
                                        <Col className="text-md-right mb-3" lg="12" xs="5">
                                            <Button
                                                onClick={() => {
                                                    setOpenNewClusterModal(false);
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
                                                            <span style={{ color: "#fff" }}>Thêm mới</span>
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