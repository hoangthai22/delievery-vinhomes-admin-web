import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import { Tooltip } from "reactstrap";
import { getModeName, statusType } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";

export const OrderItem = ({ data, index }) => {
    const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
    const toggleEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
    const { setOpenModal, setorderModal } = useContext(AppContext);
    let history = useHistory();
    const getStatus = (status) => {
        return statusType[status];
        // switch (status) {
        //     case 0:
        //         return statusType[0];
        //     case 1:
        //         return statusType[1];
        //     case 2:
        //         return statusType[2];
        //     case 3:
        //         return statusType[3];
        //     case 4:
        //         return statusType[4];
        //     case 4:
        //         return statusType[4];
        //     case 4:
        //         return statusType[4];
        //     case 4:
        //         return statusType[4];
        //     case 4:
        //         return statusType[4];
        //     case 4:
        //         return statusType[4];
        //     case 4:
        //         return statusType[4];
        //     default:
        //         return statusType[0];
        // }
    };

    return (
        <tr>
            <td className="budget table-text">{data.id}</td>
            <td className="budget table-text bold" style={{ whiteSpace: "unset" }}>
                {data.storeName}
            </td>
            <td className="budget table-text bold">{data.buildingName}</td>
            <td className="budget table-text bold">{data.customerName}</td>
            <td className="budget table-text bold">{data.phone}</td>
            <td className="budget table-text bold">{data.total.toLocaleString()}</td>
            <td className="budget table-text" style={{ whiteSpace: "unset" }}>
                {data.time}
            </td>
            <td className="budget table-text">{data.paymentName}</td>

            <td className="budget table-text bold" style={{ color: "var(--secondary)" }}>
                {data.shipper}
            </td>
            <td className="budget table-text">{getModeName(data.modeId)}</td>
            <td className="budget table-text">
                {
                    <span className={`badge  ${getStatus(data.status).class}`} style={{ padding: "0.8em 1.2em", fontSize: 11 }}>
                        {getStatus(data.status).value}
                    </span>
                }
            </td>

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

            <td className="budget table-text" style={{ textAlign: "center" }}>
                <i
                    id={"Edit-" + index}
                    className="fa-solid fa-pen-to-square  cusor"
                    style={{ fontSize: 22 }}
                    onClick={() => {
                        // handleCallback(data);
                        // setOpenModal(true);
                        setorderModal(data);

                        history.push(`/admin/order/${data.id}`);
                    }}
                ></i>
                <Tooltip placement="bottom" isOpen={tooltipOpenEdit} autohide={false} target={"Edit-" + index} toggle={toggleEdit}>
                    Xem chi tiết
                </Tooltip>
                {/* <i className="fa-regular fa-trash-can mr-3 cusor" style={{ fontSize: 22, color: "red" }}></i> */}
            </td>
        </tr>
    );
};
