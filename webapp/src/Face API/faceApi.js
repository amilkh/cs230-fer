import * as faceapi from "face-api.js";
import Jimp from "jimp";
import * as tf from "@tensorflow/tfjs"



export const loadModels = () => {
  const MODEL_URL = `${process.env.PUBLIC_URL}/models`;

  return Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
  ]).then(()=>{
    console.log("loaded")
  });
};

export const detectFaces = async image => {
  if (!image) {
    return;
  }

  const imgSize = image.getBoundingClientRect();
  const displaySize = {width: imgSize.width, height: imgSize.height};
  if (displaySize.height === 0) {
    return;
  }

  const faces = await faceapi
    .detectAllFaces(
      image,
      new faceapi.TinyFaceDetectorOptions({inputSize: 320})
    )

  return faceapi.resizeResults(faces, displaySize);
};

var result;

export const drawResults = async (image, canvas, results, type,tocrop,facecanvas,model) => {
  if (image && canvas && results) {
    const imgSize = image.getBoundingClientRect();
    const displaySize = {width: imgSize.width, height: imgSize.height};
    faceapi.matchDimensions(canvas, displaySize);
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    var resizedDetections;
    if(displaySize.width!==0){
    resizedDetections = faceapi.resizeResults(results, displaySize);  
    if(resizedDetections[0]){
    const box =resizedDetections[0].box
    const drawOptions = {
      lineWidth: 2
    }
    const drawBox = new faceapi.draw.DrawBox(box, drawOptions)
    drawBox.draw(canvas)
  

Jimp.read(tocrop)
 .then(image => {
   image.crop( resizedDetections[0].box.x, resizedDetections[0].box.y, resizedDetections[0].box.width,resizedDetections[0].box.height ); 
   image.resize(48,48)
image=image.bitmap.data
image = tf.tensor3d(image,[48,48,4])
image = image.mean(2)
image = image.expandDims(2)
image = image.div(255)
image = image.reshape([1,48,48,1])
var output = model.predict(image)
output = output.dataSync()
result = output
})
}
  return result 
      }
    
  }
  
};
