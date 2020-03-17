import React, { useRef, useState, useEffect } from 'react';
import './App.css';
import { loadModels, detectFaces, drawResults } from "./Face API/faceApi";
import * as tf from '@tensorflow/tfjs';
import loading from './Assets/loading.gif'
import Camera from "./Camera/Camera"
import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { createFaLibrary } from "./icons";






loadModels();
createFaLibrary();
function App() {

  const MODEL_PATH = './jsmodel/model.json';

  const INDEXEDDB_DB = 'tensorflowjs';
  const INDEXEDDB_STORE = 'model_info_store';
  const INDEXEDDB_KEY = 'web-model';

  const photoMode = false
  useEffect(() => {
    loadmodel().then(() => {
      setisDownloadingModel(false)
      getResults()
    })
  }, []);




  const clearOverlay = canvas => {
    canvas.current
      .getContext("2d")
      .clearRect(0, 0, canvas.width, canvas.height);
  };


  const getResults = () => {
    if (!photoMode && camera !== null) {
      const ticking = setInterval(async () => {
        await getFaces();
      }, 200);
      return () => {
        clearOverlay(cameraCanvas);
        clearInterval(ticking);
      };
    } else {
      return clearOverlay(cameraCanvas);
    }
  }


  const getFaces = async () => {
    if (camera.current !== null) {
      const faces = await detectFaces(camera.current.video);
      var src = camera.current.getScreenshot();
      var results = await drawResults(
        camera.current.video,
        cameraCanvas.current,
        faces,
        "boxLandmarks",
        src,
        facecanvas,
        model
      )

      var expressions = ["angry", "disgusted", "afraid", "happy", "sad", "surprised", "neutral"]

      if (results !== undefined) {
        var max = results.reduce(function (a, b) {
          return Math.max(a, b);
        });
        var index = results.indexOf(max)
        setoutput(expressions[index])

      }
      setResult(faces);

    }
  };
  var model = null
  var modelLastUpdated = null;
  const aspectRatio = window.innerWidth / window.innerHeight

  const getExpression = () => {
    setexpression(output)
    if (camera) {
      var src = camera.current.getScreenshot();
    }
    setvideo(false)
    setcurrent(src)


  }

  const reCapture = () => {
    setvideo(true)
  }



  const loadmodel = async () => {
    console.log(window.innerWidth, "innnnnnnner")
    if ('indexedDB' in window) {
      try {
        model = await tf.loadLayersModel('indexeddb://' + INDEXEDDB_KEY);

      }
      catch (e) {
        console.log(e)
        model = await tf.loadLayersModel(MODEL_PATH);
        model.save('indexeddb://' + INDEXEDDB_KEY)

      }
    }
    // If no IndexedDB, then just download like normal.
    else {
      console.warn('IndexedDB not supported.');
      model = await tf.loadLayersModel(MODEL_PATH);
    }
    setmodelLoaded(true)
    console.log("model loaded")
  }



  const camera = useRef();
  const cameraCanvas = useRef();
  const facecanvas = useRef()
  const [result, setResult] = useState([]);
  const [isDownloadingModel, setisDownloadingModel] = useState(true)
  const [modelLoaded, setmodelLoaded] = useState(false)
  const [output, setoutput] = useState("")
  const [expression, setexpression] = useState("")
  const [current, setcurrent] = useState(null)
  const [video, setvideo] = useState(true)
  const [mode, setMode] = useState(false)


  return (


    <div>
      {isDownloadingModel && <div style={{ textAlign: "center", marginTop: "30vh" }}>
        <img src={loading} />
        <h2 style={{ color: "#007c6c" }}>Downloading Model</h2>

      </div>}

      {!isDownloadingModel && <div>

        <div className="titleDiv">

          <div style={{ marginLeft: "10px", marginTop: "1vh" }}>
            <h4 style={{ fontSize: "4vh" }}>Facial Emotion Detector</h4>



            <a className="nostyle" href={"https://github.com/amilkh/cs230-fer"}>Deep learning model</a>
            <p className="nostyle">&nbsp;by&nbsp;</p>
            <a className="nostyle" href={"https://cs230.stanford.edu/"}>Stanford University</a>
            <br />



            <a className="nostyle" href={"https://github.com/amilkh/cs230-fer/tree/master/webapp"}>Web app</a>
            <p className="nostyle">&nbsp;by&nbsp;</p>
            <a className="nostyle" href={"https://se.neduet.edu.pk/"}>NED University</a>



            <div style={{ marginLeft: aspectRatio > 1 ? "92vw" : "80vw" }}>
              <Switch
                onChange={() => { setMode(!mode); reCapture() }}
                uncheckedIcon={<FontAwesomeIcon style={{ marginLeft: "8px", marginTop: "5px" }} icon="video" />}
                checkedIcon={<FontAwesomeIcon style={{ marginLeft: "10px", marginTop: "5px" }} icon="camera" />}
                checked={!mode}
                className="App__switcher-switch"
                offColor={"#b3f5e5"}
                onColor={"#b3f5e5"}
                width={60}
              />
            </div>

          </div>







        </div>



        <div className="camera" align="center">
          <div id="cam_input">
            <div style={{ display: video ? "block" : "none" }}>
              <Camera camera={camera} cameraCanvas={cameraCanvas} />
            </div>
            {!video && <img className="camera" src={current} />}
          </div>
          {!mode && <div>
            {video && <button style={{ width: aspectRatio > 1 ? (window.innerWidth / 100) * 80 : "33vh" }} className="detect" onClick={() => getExpression()}>Detect My Emotion</button>}
            {!video && <button style={{ width: aspectRatio > 1 ? (window.innerWidth / 100) * 80 : "33vh" }} className="detect" onClick={() => reCapture()}>Capture Again</button>}
          </div>}
        </div>




        <div className="footer">
          {mode && output !== "" && <h3>I think you look {output}.</h3>}
          {!mode && expression !== "" && <h3>I think you look {expression}.</h3>}

        </div>


      </div>}
    </div>

  );

}

export default App;
