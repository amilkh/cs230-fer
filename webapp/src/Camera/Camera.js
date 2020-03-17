import React, { useState, useEffect, useRef } from "react";
import "../App.css"
import Webcam from 'react-webcam'




function App(props){
  const videoConstraints = {
    width: 720,
    height: 1280,
    facingMode: "user"
  };

  const aspectRatio=window.innerWidth/window.innerHeight
 

    return(

     
      <div className="camera__wrapper" style={{width:aspectRatio>1 ? "80%" : "33vh"}}>
        <Webcam  screenshotFormat="image/jpeg" audio={false} ref={props.camera} width="100%" height="auto" className="camera" />
        <canvas
          className="webcam-overlay"
          ref={props.cameraCanvas}
      
        />
        </div>
    
      
    )
}

export default App