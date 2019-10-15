import faceapi from 'https://cdn.pika.dev/face-api.js';

const loadSsdMobilenetv1 = () => {
    return faceapi.nets.ssdMobilenetv1.loadFromUri('https://raw.githubusercontent.com/justadudewhohacks/face-api.js-models/master/ssd_mobilenetv1/ssd_mobilenetv1_model-weights_manifest.json');
};

const calculateImageDetections = async (imgEl) => {
    const canvasEl = imgEl.nextElementSibling;
    const imageDetections = await faceapi.detectAllFaces(imgEl);
    faceapi.matchDimensions(canvasEl, imgEl);
    faceapi.draw.drawDetections(canvasEl, faceapi.resizeResults(imageDetections, imgEl));
}

const boostrap = async () => {
    const imgEls = document.querySelectorAll('.img-container img');
    await loadSsdMobilenetv1();
    imgEls.forEach(imgEl => calculateImageDetections(imgEl));
};

boostrap();
