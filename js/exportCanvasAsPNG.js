function exportCanvasAsPNG(id,isTouchdevice) {

    let canvasElement = document.getElementById(id);

    let MIME_TYPE = "image/png";

    let imgData = canvasElement.toDataURL(MIME_TYPE);


    if (isTouchdevice) {
        let image = new Image()
        image.src = imgData
        image.classList.add('saveImage')
        savePhotoBox.children[1].append(image)
        savePhotoBox.classList.add('visible')
        closeSavePhotoBox.onclick=()=>{
            savePhotoBox.classList.remove('visible')

        }
    } else {
        let link = document.createElement("a");
        let blob = dataURLtoBlob(imgData);
        let objUrl = URL.createObjectURL(blob);
        link.download = "image.png";
        link.href = objUrl;
        link.click();
    }


    function dataURLtoBlob(dataurl) {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], {type: mime});
    }

}

export default exportCanvasAsPNG
