import moment from "moment";
export const REFUND_WALLET = 1;
export const DEBIT_WALLET = 2;
export const COMMISSION_WALLET = 3;
export const NOT_FOUND_IMG = "/images/notfound.webp";
export const getBase64Image = (url, type) => {
    //image/png
    //image/jpeg

    let image = "";
    if (type === "image/png") {
        image = url?.split("data:image/png;base64,");
    } else if (type === "image/jpeg") {
        image = url?.split("data:image/jpeg;base64,");
    }
    console.log(image);
    if (image && image[1]) {
        image = image[1];
    } else {
        image = "";
    }
    return image;
};
export const getBase64ImageNotType = async (src, callback, outputFormat) => {
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = function () {
        var canvas = document.createElement("CANVAS");
        var ctx = canvas.getContext("2d");
        var dataURL;
        canvas.height = this.naturalHeight;
        canvas.width = this.naturalWidth;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
    };
    img.src = src;
    if (img.complete || img.complete === undefined) {
        img.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
        img.src = src;
    }
};
export const getBase64Ima = (imgUrl) => {
    return new Promise(function (resolve, reject) {
        var img = new Image();
        img.src = imgUrl;
        img.setAttribute("crossOrigin", "anonymous");

        img.onload = function () {
            var canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            var ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0);
            var dataURL = canvas.toDataURL("image/png");
            resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
        };
        img.onerror = function () {
            reject("The image could not be loaded.");
        };
    });
};
export const statusTypeOptions = [
    {
        id: -1,
        value: "Tất cả",
        class: "status-create",
    },
    {
        id: 0,
        value: "Mới",
        class: "status-create",
    },
    {
        id: 1,
        value: "Cửa hàng xác nhận",
        class: "status-create",
    },
    {
        id: 2,
        value: "Chưa có tài xế",
        class: "status-shiper",
    },
    {
        id: 3,
        value: "Tài xế đã nhận",
        class: "status-processing",
    },
    {
        id: 4,
        value: "Đang Giao",
        class: "status-processing",
    },
    {
        id: 5,
        value: "Hoàn Thành",
        class: "status-success",
    },
    {
        id: 6,
        value: "Đã Hủy",
        class: "status-cancel",
    },
    {
        id: 7,
        value: "Đang lấy hàng",
        class: "status-processing",
    },
    {
        id: 8,
        value: "Ở Hub",
        class: "status-processing",
    },
    {
        id: 9,
        value: "Đang giao",
        class: "status-cancel",
    },
    {
        id: 10,
        value: "Hủy do hết thời gian đợi",
        class: "status-cancel",
    },

    {
        id: 11,
        value: "Cửa hàng hủy",
        class: "status-cancel",
    },
    {
        id: 12,
        value: "Tài xế hủy",
        class: "status-cancel",
    },
    {
        id: 13,
        value: "Khách hàng hủy",
        class: "status-cancel",
    },
];
export const statusType = [
    {
        id: 0,
        value: "Mới",
        class: "status-create",
    },
    {
        id: 1,
        value: "Cửa hàng xác nhận",
        class: "status-create",
    },
    {
        id: 2,
        value: "Chưa có tài xế",
        class: "status-shiper",
    },
    {
        id: 3,
        value: "Tài xế đã nhận",
        class: "status-processing",
    },
    {
        id: 4,
        value: "Đang Giao",
        class: "status-processing",
    },
    {
        id: 5,
        value: "Hoàn Thành",
        class: "status-success",
    },
    {
        id: 6,
        value: "Đã Hủy",
        class: "status-cancel",
    },
    {
        id: 7,
        value: "Đang lấy hàng",
        class: "status-processing",
    },
    {
        id: 8,
        value: "Ở Hub",
        class: "status-processing",
    },
    {
        id: 9,
        value: "Đang giao",
        class: "status-processing",
    },
    {
        id: 10,
        value: "Hủy do hết thời gian đợi",
        class: "status-cancel",
    },
    {
        id: 11,
        value: "Cửa hàng hủy",
        class: "status-cancel",
    },
    {
        id: 12,
        value: "Tài xế hủy",
        class: "status-cancel",
    },
    {
        id: 13,
        value: "Khách hàng hủy",
        class: "status-cancel",
    },
];
export const getModeName = (mode) => {
    switch (mode) {
        case "1":
            return "Gọi món";
        case "2":
            return "Giao Hàng";
        case "3":
            return "Đặt Hàng";

        default:
            return "Gọi món";
    }
};
export const getTimeConvert = (time) => {
    moment.locale("vi");
    let date = moment(time).format("l");
    let hour = moment(time).format("LT");
    return `${date}, ${hour}`;
};
export const getPaymentStatusName = (payment) => {
    switch (payment) {
        case 0:
            return "Chưa thanh toán VN Pay";
        case 1:
            return "VN Pay";
        case 2:
            return "Thanh toán thất bại VN Pay";

        default:
            return "---";
    }
};

export const listCancelOrderMessage = [
    { id: 1, message: "Người nhận không nghe máy" },
    { id: 3, message: "Sai số điện thoại" },
    { id: 4, message: "Người nhận hẹn lại ngày giao" },
    { id: 5, message: "Người nhận hẹn giao lại trong ngày" },
    { id: 6, message: "Người nhận đổi địa chỉ giao hàng" },
    { id: 7, message: "Hàng hóa không như yêu cầu" },
    { id: 8, message: "Sai tiền thu hộ COD" },
    { id: 9, message: "Người nhận đổi ý" },
    { id: 10, message: "Không được kiểm/thử hàng" },
    { id: 11, message: "Người nhận không đặt hàng, đơn trùng" },
    { id: 12, message: "Hàng hóa hư hỏng" },
    { id: 13, message: "Hàng hóa thất lạc" },
    { id: 14, message: "Người nhận không đủ tiền thanh toán" },
    { id: 15, message: "Bất đồng ngoại ngữ" },
    { id: 16, message: "Cửa hàng hết món" },
    { id: 17, message: "Cửa hàng đã đóng cửa" },
    { id: 18, message: "Khác" },
];
