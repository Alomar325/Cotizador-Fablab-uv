import { useState } from "react";
import styled from "styled-components";

import { StlViewer } from 'react-stl-file-viewer';

function DragArea() {
  const [photo, setphoto] = useState('')
  const [volume, setvolume] = useState(0)
  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);
  const changeImage = (e) => {
    console.log(e.target.files);
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }

    function getFrame() {
      let canvas = document.getElementsByTagName('canvas')[0]
      return canvas.toDataURL()
    }
  };
  return (
    <div>
      <StyleDragArea>
        <br />
        <div className="image-upload-wrap">
          <input
            className="file-upload-input"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              changeImage(e);
            }}
          />
          <div className="text-information">
            <p>Solo se acepta archivo .stl</p>
          </div>
        </div>
        {ImageSelectedPrevious != null ? 
            <div className="center">
            <StlViewer
            width={1200}
            height={500}
            url={ImageSelectedPrevious}
            groundColor='rgb(255, 255, 255)'
            objectColor='rgb(50, 255, 255)'
            skyboxColor='rgb(255, 255, 255)'
            gridLineColor='rgb(0, 0, 0)'
            lightColor='rgb(255, 255, 255)'
            volume={setvolume}
            />
            
          </div>
          
        : <></>}
        {`Volume: ${volume}`}
        
      </StyleDragArea>
    </div>
  );
}

export default DragArea;

const StyleDragArea = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .file-upload-content {
    display: none;
    text-align: center;
  }
  .file-upload-input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }
  .image-upload-wrap {
    position: relative;
    height: 100px;
    border: 4px solid #d0d7de;
    margin-left: 10px;
    margin-right: 10px;
  }
  .image-upload-wrap:hover {
    background-color: transparent;
    border: 4px dashed #d0d7de;
  }
  .text-information {
    margin-top: 30px;
    text-align: center;
  }
`;