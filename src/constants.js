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
