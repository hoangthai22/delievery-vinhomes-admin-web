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
                {data.fullname}
            </td>
            <td className="budget table-text " style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.phone}
            </td>
            <td className="budget table-text " style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.distance + "m"}
            </td>
            <td className="budget table-text " style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.totalOrder}
            </td>
            <td className="budget table-text bold" style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.successfulOrder}
            </td>
            <td className="budget table-text bold" style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.canceledOrder}
            </td>
            <td className="budget table-text " style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.debitBalance.toLocaleString()}
            </td>
            <td className="budget table-text " style={{ padding: "1.7rem 0rem 1.7rem 1.5rem" }}>
                {data.refundBalance.toLocaleString()}
            </td>

            <td className="budget table-text" style={{ textAlign: "center", position: "absolute", right: 0, background: "#fff", padding: "25px 1.7rem 25px 1.7rem" }}>
                <UncontrolledDropdown>
                    <DropdownToggle size="sm" className="mr-0" style={{ background: "unset", border: "none", boxShadow: "none", padding: 0 }}>
                        <i
                            id={"Edit-" + index}
                            className="fa-solid fa-money-bill-transfer cusor"
                            style={{ fontSize: 22, color: "rgb(50,50,50)" }}
                            onClick={() => {
                                setorderModal(data);
                            }}
                        ></i>
                    </DropdownToggle>
                    <DropdownMenu left>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => {
                                e.preventDefault();
                                setTransactionType(0);
                                hanldeModal(data, 0);
                            }}
                        >
                            Trả tiền thu hộ
                        </DropdownItem>
                        <DropdownItem
                            href="#pablo"
                            onClick={(e) => {
                                e.preventDefault();
                                setTransactionType(1);
                                hanldeModal(data, 1);
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
