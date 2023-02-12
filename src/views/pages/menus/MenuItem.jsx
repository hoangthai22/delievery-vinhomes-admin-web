import React, { useContext, useState } from "react";
import { Tooltip } from "reactstrap";
import { NOT_FOUND_IMG } from "../../../constants";
import { AppContext } from "../../../context/AppProvider";

export const MenuItem = ({ data, index, handleUpdate }) => {
    const { setOpenModal, setCategoryModal } = useContext(AppContext);
    const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
    const toggleEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
    return (
        <>
            <tr>
                <td className="budget table-text-product bold">{index + 1}</td>
                <td className="budget table-text-product bold">
                    <div style={{ width: 60, height: 60, borderRadius: "5%", overflow: "hidden", margin: "20px 0" }}>
                        <img src={data.image || NOT_FOUND_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                </td>

                <td className="budget table-text-product bold">{data.name}</td>
                <td className="budget table-text-product bold">{data.pricePerPack.toLocaleString()}</td>
                {/* <td className="budget table-text-product bold">{data.id}</td> */}
                <td className="budget table-text-product bold">{data.productCategory}</td>
                <td className="budget table-text-product bold" style={{ whiteSpace: "unset", padding: "1.7rem 0rem 1.7rem 1.5rem", minWidth: 200 }}>
                    {data.storeName}
                </td>

                {/* <td>
        <span className="badge badge-lg badge-primary " style={{ color: "var(--secondary)", fontSize: 11, padding: "1em 1.4em" }}>
            {data.brandStoreName}
        </span>
    </td> */}
                <td>
                    {data.status ? (
                        <span className={`badge  status-success`} style={{ padding: "0.8em 1em", fontSize: 10 }}>
                            Hoạt Động
                        </span>
                    ) : (
                        <span className={`badge  status-cancel`} style={{ padding: "0.8em 1em", fontSize: 10 }}>
                            Tạm Ngưng Bán
                        </span>
                    )}
                </td>
                <td className="budget table-text" style={{ textAlign: "center", position: "absolute", right: 0, background: "#fff", padding: "38px 1.7rem 36px 1.7rem" }}>
                    <i
                        id={"Edit-" + index}
                        className="fa-regular fa-trash-can mr-3  cusor"
                        style={{ fontSize: 22 }}
                        onClick={() => {
                            handleUpdate(data);
                        }}
                    ></i>
                    <Tooltip placement="bottom" isOpen={tooltipOpenEdit} autohide={false} target={"Edit-" + index} toggle={toggleEdit}>
                        Xóa sản phẩm
                    </Tooltip>
                    {/* <i className="fa-regular fa-trash-can mr-3 cusor" style={{ fontSize: 22, color: "red" }}></i> */}
                </td>
                {/* <td className="text-right">
                    <i
                        className="fa-solid fa-pen-to-square mr-3 cusor"
                        style={{ fontSize: 22 }}
                        onClick={() => {
                            // setCategoryModal(data);
                            // setOpenModal(true);
                        }}
                    ></i>
                </td> */}
            </tr>
        </>
    );
};
