import { getAuth } from "firebase/auth";
import React, { useContext } from "react";
import { Media } from "reactstrap";
import { AppContext } from "../../../context/AppProvider";

export const StoreItem = ({ data, index }) => {
    const { setOpenModal, setDeleteModal, setOpenDeleteModal, setStoreModal } = useContext(AppContext);
    return (
        <>
            <tr>
                <td className="budget table-text bold">{index + 1}</td>
                <td className="budget table-text bold">{data.brandStoreName}</td>
                <td className="budget table-text bold">{data.name}</td>
                <td className="budget table-text ">{data.phone}</td>
                <td className="budget table-text ">{"Không có"}</td>
                <td className="budget table-text bold">{data.buildingStore}</td>
                <td className="budget table-text ">{data.storeCateName}</td>
                {/* <td>
                    <span className="badge badge-lg badge-primary " style={{ color: "var(--secondary)", fontSize: 11, padding: "1em 1.4em" }}>
                        {data.brandStoreName}
                    </span>
                </td> */}
                <td>
                    {data.status ? (
                        <span className={`badge  status-success`} style={{ padding: "0.8em 1.2em", fontSize: 12 }}>
                            Hoạt Động
                        </span>
                    ) : (
                        <span className={`badge  status-cancel`} style={{ padding: "0.8em 1.2em", fontSize: 12 }}>
                            Ngưng Hoạt Động
                        </span>
                    )}
                </td>

                <td className="text-right">
                    <i
                        className="fa-solid fa-pen-to-square mr-3 cusor"
                        style={{ fontSize: 22 }}
                        onClick={() => {
                            console.log({ data });
                            setStoreModal(data);
                            setOpenModal(true);
                        }}
                    ></i>
                    <i
                        className="fa-regular fa-trash-can mr-3 cusor"
                        style={{ fontSize: 22 }}
                        onClick={() => {
                            console.log({ data });
                            setDeleteModal({ data });
                            setOpenDeleteModal(true);
                        }}
                    ></i>
                </td>
            </tr>
        </>
    );
};
