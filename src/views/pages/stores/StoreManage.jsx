import React, { useCallback, useEffect, useState } from "react";
import SimpleHeader from "../../../components/Headers/SimpleHeader";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Col,
    Container,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Form,
    FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Spinner,
    Table,
} from "reactstrap";
import { useHistory } from "react-router";
import { StoreItem } from "./StoreItem";
import { getListStoreByKey, getListStores } from "../../../apis/storeApiService";
import { StoreModal } from "../../../components/Modals/storeModal";
import { DeleteModal } from "../../../components/Modals/deleteModal";
import { debounce } from "lodash";

export const StoreManage = () => {
    const [storeLists, setStoreLists] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [keyword, setKeyword] = useState("");
    function fetchDropdownOptions(key) {
        setIsLoading(true);
        setStoreLists([]);
        if (key !== "") {
            getListStoreByKey(key, 1, 100)
                .then((res) => {
                    const stores = res.data;
                    setTimeout(() => {
                        setStoreLists(stores);
                        setIsLoading(false);
                    }, 1);
                })
                .catch((error) => console.log(error));
        } else {
            hanldeGetListStore();
        }
    }
    const debounceDropDown = useCallback(
        debounce((nextValue) => fetchDropdownOptions(nextValue), 1000),
        []
    );
    function handleInputOnchange(e) {
        const { value } = e.target;
        setKeyword(value);
        debounceDropDown(value);
    }
    let history = useHistory();
    const hanldeGetListStore = () => {
        setIsLoading(true);
        setStoreLists([]);
        getListStores(1, 100)
            .then((res) => {
                const stores = res.data;
                console.log(stores);
                setTimeout(() => {
                    setStoreLists(stores);
                    setIsLoading(false);
                }, 1);
            })
            .catch((error) => console.log(error));
    };
    useEffect(() => {
        hanldeGetListStore();
    }, []);

    const handleReload = () => {
        hanldeGetListStore();
    };
    return (
        <>
            <StoreModal handleReload={handleReload} />
            <DeleteModal handleReload={handleReload} />
            <SimpleHeader name="Danh Sách Cửa Hàng" parentName="Quản Lý" />
            <Container className="mt--6" fluid>
                <Row>
                    <div className="col">
                        <Card>
                            <div style={{ display: "flex", justifyContent: "space-between", width: "100%", padding: "20px 0px" }} className="align-items-center">
                                <CardHeader className="" style={{ padding: "0 0 0 20px" }}>
                                    <Form className="flex" style={{ alignItems: "center", gap: 20 }}>
                                        <FormGroup className="mb-0">
                                            <InputGroup className="input-group-lg input-group-flush" style={{ border: "1px solid #9e9e9e" }}>
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText style={{ padding: "0 15px" }}>
                                                        <span className="fas fa-search" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input placeholder="Tìm kiếm bằng tên cửa hàng" type="search" onChange={handleInputOnchange} className="btn-lg" style={{ height: 46, width: 250 }} />
                                            </InputGroup>
                                        </FormGroup>
                                        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                                            <DropdownToggle
                                                className="dropdown"
                                                caret
                                                size="lg"
                                                style={{
                                                    height: 42,
                                                    borderRadius: "0.25rem",
                                                    boxShadow: "none",
                                                    border: "1px solid rgb(200,200,200)",
                                                    transition: "none",
                                                    padding: "10px 20px",
                                                    // background: "#fff",
                                                }}
                                            >
                                                Danh Mục
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                <DropdownItem>Header</DropdownItem>
                                                <DropdownItem>Action</DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown> */}
                                    </Form>
                                </CardHeader>

                                <Col className="mt-3 mt-md-0 text-md-right" lg="6" xs="5">
                                    <Button
                                        onClick={() => history.push("/admin/store")}
                                        className="btn-neutral"
                                        color="default"
                                        size="lg"
                                        style={{ background: "var(--primary)", color: "#000", fontWeight: 700 }}
                                    >
                                        Thêm Cửa Hàng Mới
                                    </Button>
                                </Col>
                            </div>
                            <Table className="align-items-center table-flush" responsive hover={true}>
                                <thead className="thead-light">
                                    <tr>
                                        <th className="sort table-title" scope="col">
                                            STT
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Tên Thương Hiệu
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Tên Cửa Hàng
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Số Điện Thoại
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Số Tài Khoản
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Building
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Loại Của Hàng
                                        </th>

                                        <th className="sort table-title" scope="col">
                                            Trạng Thái
                                        </th>
                                        <th className="sort table-title" scope="col">
                                            Hành động
                                        </th>
                                        {/* <th scope="col">Users</th>
                                        <th className="sort" data-sort="completion" scope="col">
                                            Completion
                                        </th>
                                        <th scope="col" /> */}
                                    </tr>
                                </thead>
                                <tbody className="list">
                                    {storeLists.map((item, index) => {
                                        return <StoreItem data={item} key={index} index={index} />;
                                    })}
                                </tbody>
                            </Table>
                            {storeLists.length === 0 && !isLoading && (
                                <>
                                    <div className="center_flex" style={{ padding: "50px 0 0 0" }}>
                                        <img src="/icons/empty.png" alt="" style={{ textAlign: "center", width: 300 }} />
                                    </div>
                                    <h1 className="description" style={{ fontSize: 18, textAlign: "center", padding: "20px 0 50px 0" }}>
                                        Không có sản phẩm nào!!!
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
                            {/* {!isLoading && storeLists.length > 0 && (
                                <CardFooter className="py-4">
                                    <nav aria-label="...">
                                        <Pagination className="pagination justify-content-end mb-0" listClassName="justify-content-end mb-0">
                                            <PaginationItem className="disabled">
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()} tabIndex="-1">
                                                    <i className="fas fa-angle-left" />
                                                    <span className="sr-only">Previous</span>
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem className="active">
                                                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    1
                                                </PaginationLink>
                                            </PaginationItem>
                                            <PaginationItem>
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
