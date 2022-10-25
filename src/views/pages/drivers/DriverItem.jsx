import React from "react";

export const DriverItem = ({ data, index }) => {
    return (
        <>
            <tr>
                <td className="budget table-text bold">{index + 1}</td>
                <td className="budget table-text bold">{data.email}</td>
                <td className="budget table-text bold">{data.fullName}</td>
                <td className="budget table-text ">{data.phone}</td>
                <td className="budget table-text ">{data.deliveryTeam}</td>
                <td className="budget table-text ">{data.vehicleType}</td>

                {/* <td>
        <span className="badge badge-lg badge-primary " style={{ color: "var(--secondary)", fontSize: 11, padding: "1em 1.4em" }}>
            {data.brandStoreName}
        </span>
    </td> */}
                <td>
                    {!data.status ? (
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
                            // setStoreModal(data);
                            // setOpenModal(true);
                        }}
                    ></i>
                    <i className="fa-regular fa-trash-can mr-3 cusor" style={{ fontSize: 22 }}></i>
                </td>
            </tr>
        </>
    );
};
