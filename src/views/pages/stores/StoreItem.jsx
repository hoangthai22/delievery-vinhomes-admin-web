import { Tooltip } from "reactstrap";
import { getAuth } from "firebase/auth";
import React, { useContext, useState } from "react";
import { Button, Media } from "reactstrap";
import { AppContext } from "../../../context/AppProvider";
import { useHistory } from "react-router";

export const StoreItem = ({ data, index }) => {
    const { setOpenModal, setDeleteModal, setOpenDeleteModal, setStoreModal, setIsLoadingMain } = useContext(AppContext);
    const [tooltipOpenEdit, setTooltipOpenEdit] = useState(false);
    const [tooltipView, setTooltipView] = useState(false);
    const [tooltipOpenDelete, setTooltipOpenDelete] = useState(false);
    const toggleView = () => setTooltipView(!tooltipView);
    const toggleEdit = () => setTooltipOpenEdit(!tooltipOpenEdit);
    const toggleDelete = () => setTooltipOpenDelete(!tooltipOpenDelete);
    let history = useHistory();
    return (
        <>
            <tr>
                <td className="budget table-text bold" style={{ padding: "1.5rem 0rem 1.5rem 1.5rem" }}>
                    {index + 1}
                </td>
                <td className="budget table-text bold" style={{}}>
                    {data.brandStoreName}
                </td>
                <td className="budget table-text bold" style={{ whiteSpace: "unset", minWidth: 200 }}>
                    {data.name}
                </td>
                <td className="budget table-text ">{data.phone}</td>
                <td className="budget table-text bold">{data.buildingStore}</td>
                <td className="budget table-text ">{data.storeCateName}</td>
                <td className="budget table-text ">{data.commissionRate}%</td>
                <td className="budget table-text ">{data.amount || 0}</td>
                {/* <td>
                    <span className="badge badge-lg badge-primary " style={{ color: "var(--secondary)", fontSize: 11, padding: "1em 1.4em" }}>
                        {data.brandStoreName}
                    </span>
                </td> */}
                <td style={{ minWidth: 190 }}>
                    {data.status ? (
                        <span className={`badge  status-success`} style={{ padding: "0.8em 1em", fontSize: 10 }}>
                            Hoạt Động
                        </span>
                    ) : (
                        <span className={`badge  status-cancel`} style={{ padding: "0.8em 1em", fontSize: 10 }}>
                            Ngưng Hoạt Động
                        </span>
                    )}
                </td>

                <td className="budget table-text" style={{ textAlign: "center", position: "absolute", right: 0, background: "#fff", padding: "25px 5px 25px 10px" }}>
                    <i
                        className="fa-regular fa-eye  mr-3 cusor"
                        style={{ fontSize: 22 }}
                        id={"View-" + index}
                        onClick={() => {
                            setIsLoadingMain(true);
                            history.push(`/admin/store/${data.id}`);
                        }}
                    ></i>
                    <Tooltip placement="bottom" isOpen={tooltipView} autohide={false} target={"View-" + index} toggle={toggleView}>
                        Xem chi tiết
                    </Tooltip>
                    <i
                        className="fa-solid fa-pen-to-square mr-3 cusor"
                        style={{ fontSize: 22 }}
                        id={"Edit-" + index}
                        onClick={() => {
                            console.log({ data });
                            setStoreModal(data);
                            setOpenModal(true);
                        }}
                    ></i>
                    <Tooltip placement="bottom" isOpen={tooltipOpenEdit} autohide={false} target={"Edit-" + index} toggle={toggleEdit}>
                        Điều chỉnh
                    </Tooltip>
                    <i
                        className="fa-regular fa-trash-can mr-3 cusor"
                        style={{ fontSize: 22, color: "red" }}
                        id={"Delete-" + index}
                        onClick={() => {
                            console.log({ data });
                            setDeleteModal({ data });
                            setOpenDeleteModal(true);
                        }}
                    ></i>
                    <Tooltip placement="bottom" isOpen={tooltipOpenDelete} autohide={false} target={"Delete-" + index} toggle={toggleDelete}>
                        Xóa
                    </Tooltip>
                </td>
            </tr>
        </>
    );
};
