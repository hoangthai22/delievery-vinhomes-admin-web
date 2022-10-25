import React from "react";

export const OrderItem = ({ data, handleCallback }) => {
    const statusType = [
        {
            id: 0,
            value: "Đang chuẩn bị",
            class: "status-shiper",
            statusName: "ShopAccept",
        },
        {
            id: 1,
            value: "Đang Giao",
            class: "status-processing",
            statusName: "Shipping",
        },
        {
            id: 2,
            value: "Hoàn Thành",
            class: "status-success",
            statusName: "Done",
        },
        {
            id: 3,
            value: "Đã Hủy",
            class: "status-cancel",
            statusName: "Cancel",
        },
    ];

    const getStatus = (status) => {
        switch (status) {
            case "CreateOrder":
                return statusType[0];
            case "Shipping":
                return statusType[1];
            case "Done":
                return statusType[2];
            case "Cancel":
                return statusType[3];
            default:
                return statusType[0];
        }
    };

    return (
        <tr>
            <td className="budget table-text">{data.id}</td>
            <td className="budget table-text bold">{data.buildingName}</td>
            <td className="budget table-text bold">{data.customerName}</td>
            <td className="budget table-text bold">{data.phone}</td>
            <td className="budget table-text bold">{data.total.toLocaleString()}</td>
            <td className="budget table-text">{data.time}</td>
            <td className="budget table-text">{data.paymentName}</td>
            <td className="budget table-text bold" style={{ color: "var(--secondary)" }}>
                {data.shipper}
            </td>
            <td className="budget table-text">
                {
                    <span className={`badge  ${getStatus(data.statusName).class}`} style={{ padding: "0.8em 1.2em", fontSize: 11 }}>
                        {getStatus(data.statusName).value}
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

            <td className="budget table-text">
                {/* <UncontrolledDropdown>
                    <DropdownToggle className="btn-icon-only text-light" color="" role="button" size="sm">
                        <i className="fas fa-ellipsis-v" />
                    </DropdownToggle>
                    <DropdownMenu className="dropdown-menu-arrow" right>
                        <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Action
                        </DropdownItem>
                        <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Another action
                        </DropdownItem>
                        <DropdownItem href="#pablo" onClick={(e) => e.preventDefault()}>
                            Something else here
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown> */}
                <i className="fa-solid fa-pen-to-square mr-3 cusor" style={{ fontSize: 22 }} onClick={() => handleCallback(data)}></i>
                <i className="fa-regular fa-trash-can mr-3 cusor" style={{ fontSize: 22, color: "red" }}></i>
            </td>
        </tr>
    );
};
