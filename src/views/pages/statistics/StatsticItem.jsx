import moment from "moment";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { DropdownItem, DropdownMenu, DropdownToggle, Tooltip, UncontrolledDropdown } from "reactstrap";
import { getModeName, getPaymentStatusName, getTimeConvert, statusType } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";
import "moment/locale/vi";
export const StatisticItem = ({ data, index, hanldeModal, setTransactionType }) => {
    const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
    const toggleEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
    const { setOpenModal, setorderModal } = useContext(AppContext);
    let history = useHistory();
    const getStatus = (status) => {
        return statusType[status];
    };

    return (
        <tr>
            <td className="budget table-text" style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {index + 1}
            </td>
            <td className="budget table-text" style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.name}
            </td>
            <td className="budget table-text " style={{ whiteSpace: "unset", padding: "1.7rem 0rem 1.7rem 1.5rem", minWidth: 200 }}>
                {data.phone}
            </td>
            <td className="budget table-text " style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.distance + "m"}
            </td>
            <td className="budget table-text " style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.totalOrder}
            </td>
            <td className="budget table-text bold" style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.totalOrderDone}
            </td>
            <td className="budget table-text bold" style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.totalOrderFail}
            </td>
            <td className="budget table-text " style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.account.toLocaleString() + " VND"}
            </td>
            {/* <td className="budget table-text" style={{ whiteSpace: "unset", padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {getTimeConvert(data.time)}
            </td> */}
            {/* <td
                className="budget table-text bold"
                style={{ padding: "1.7rem 0rem 1.7rem 1.5rem", whiteSpace: "unset", color: data.paymentName !== 0 ? (data.paymentStatus === 0 || data.paymentStatus === 2 ? "red" : null) : null }}
            >
                {data.paymentName === 0 ? "Tiền mặt" : getPaymentStatusName(data.paymentStatus)}
            </td> */}
            {/* <td className="budget table-text" style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {
                    <span className={`badge  ${getStatus(data.status).class}`} style={{ padding: "0.8em 1.2em", fontSize: 11 }}>
                        {getStatus(data.status).value}
                    </span>
                }
            </td> */}
            {/* <td className="budget table-text bold" style={{ color: "var(--secondary)", padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.shipper}
            </td> */}
            {/* <td className="budget table-text" style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {getModeName(data.modeId)}
            </td>

            <td className="budget table-text" style={{ padding: "1.7rem 0rem 1.7rem 1.5rem", minWidth: 84 }}></td> */}

            {/* <Badge color="" className="badge-dot mr-4">
                    <i className="bg-warning" />
                    <span className="status">pending</span>
                </Badge> */}
            {/* <td>
                {data.isActive ? (
                    <span className="badge " style={{ color: "green", fontSize: 11, fontWeight: 700, padding: "0.9em 1.6em", background: "rgba(0, 171, 85, 0.2)" }}>
                        Còn hàng
                    </span>
                ) : (
                    <span className="badge" style={{ color: "red", fontSize: 11, padding: "0.9em 1.6em", background: "rgba(255, 0, 0, 0.2)" }}>
                        Hết hàng
                    </span>
                )}
            </td> */}

            <td className="budget table-text" style={{ textAlign: "center", position: "absolute", right: 0, background: "#fff", padding: "25px 1.7rem 25px 1.7rem" }}>
                <UncontrolledDropdown>
                    <DropdownToggle size="sm" className="mr-0" style={{ background: "unset", border: "none", boxShadow: "none", padding: 0 }}>
                        <i
                            id={"Edit-" + index}
                            className="fa-solid fa-money-bill-transfer  cusor"
                            style={{ fontSize: 22 }}
                            onClick={() => {
                                // handleCallback(data);
                                // setOpenModal(true);
                                setorderModal(data);

                                // history.push(`/admin/order/${data.id}`);
                            }}
                        ></i>
                    </DropdownToggle>
                    <DropdownMenu left>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => {
                                e.preventDefault();
                                setTransactionType(0);
                                hanldeModal(data);
                                // setAreaModal(areaSelected);
                                // console.log(areaSelected);
                                // setStoreCategoryModal(item);
                            }}
                        >
                            Nạp tiền
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => {
                                e.preventDefault();
                                setTransactionType(1);
                                hanldeModal(data);
                                // setStoreCategoryModal(item);
                            }}
                        >
                            Rút tiền
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>

                {/* <i className="fa-regular fa-trash-can mr-3 cusor" style={{ fontSize: 22, color: "red" }}></i> */}
            </td>
        </tr>
    );
};
