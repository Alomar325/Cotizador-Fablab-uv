import { Row, Col } from "antd";
import { useRanger } from "react-ranger";
import { useState } from "react";
import FadeIn from 'react-fade-in';
import ComboBox from 'react-responsive-combo-box';
import 'react-responsive-combo-box/dist/index.css';
import styled from "styled-components";
import ModelViewer from "../ModelViewer";


 // npm i --save react-ranger, npm i --save three
import {
  RightBlockContainer,
  Content,
  //ContentWrapper,
  Cimg,
} from "./styles";
/*

*/



 /* <ComboBox options={data}
  placeholder='Elige Impresora.' enableAutocomplete 
  style={{ width: '100px', margin: '30px' }}
  inputStyles={{ border: '1px solid #333' }}
  />*/

function RightBlock() {



  const [selectedOptionIm, setSelectedOptionIm] = useState("");
  const [material, setMaterial] = useState("");
  const [infill, setInfill] = useState("");
  const [values, setValues] = useState([0]);

  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);

  


  const changeImage = (e) => {
    setImageSelectedPrevious(null);
    console.log(e.target.files);
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }
  };

  const { getTrackProps, ticks, handles } = useRanger({
    values,
    onChange: setValues,
    min: 0,
    max: 100,
    stepSize: 1,
    ticks: [""]
  });

  const dataIM = [
    'Impresora 1',
    'Impresora 2'
  ]


  const materiales = [
    'PLA',
    'ABS'
  ]
  const relleno = [
    '10%',
    '20%',
    '30%',
    '40%',
    '50%',
    '60%',
    '70%',
    '80%',
    '90%',
    '100%'
  ]
  
  function handleSelect(option){ 

    if(option == "PLA" || option == "ABS")
    {
      setMaterial(option);
    }
    else
    {
      setMaterial("");
    }
  }
 


  return (
    
    <RightBlockContainer id="intro" style={{paddingTop:"100px"}}>
      <FadeIn >
        <Row style={{justifyContent:"center"}} >
        <Col lg={11} md={11} sm={12} xs={24}>
            <Cimg src={"logo.png"} alt="logo.png" width="268px" height="168px" style={{}} />
          </Col>
          
          </Row>
          <h6 style={{color:"#000", textShadow:"2px 4px 8px rgba(0,0,0,0.5)",textAlign:"center"}}>Cotizador 3D Fablab UV</h6>
          {/*aqui empiesa el Drag and Drop */}
          <div >
            <StyleDragArea>
              <br />
              <div className="image-upload-wrap">
                <input
                  className="file-upload-input"
                  type="file"
                  accept=".stl"
                  multiple
                  onChange={(e) => {
                    changeImage(e);
                  }}
                />
                <div className="text-information">
                  <p>Seleccione su archivo</p>
                </div>
              </div>
              {ImageSelectedPrevious != null ? 
                  <div className="center">
                  <ModelViewer
                  model={ImageSelectedPrevious}
                  />
                
                </div>
                
              : <></>}
            </StyleDragArea>
          </div>
{/* y aqui termina el drag and drop */}
          

          <Row style={{justifyContent:"flex-start"}} >
          <Col lg={11} md={11} sm={11} xs={24} style={{justifyContent:"flex-start"}}>
              
              
              <Row style={{justifyContent:"flex-end"}}>
                <Col  style={{justifyContent:"flex-end",paddingRight:"10px"}}>
                <p style={{textAlign:"left"}} >Impresora:</p>
                <ComboBox
        
                  options={dataIM}
                  placeholder="Elige tu impresora"
                  optionsListMaxHeight={300}
                  style={{
                    width: "300px"
                  }}
                  renderOptions={(option) => (
                    <div className="comboBoxOption">{option}</div>
                  )}
                  onSelect={(option) => setSelectedOptionIm(option)}
                  onChange={(event) => console.log(event.target.value)}
                  enableAutocomplete
                  selectedOptionColor='#68D391'
                />
                  {selectedOptionIm}
                  <span>
                    {" "}
                    {/*Lo de  abajo son if  si requieren que muestre cosas dependiendo de la impresora solo se debe colocar en la parte de codigo a la izquierda de ":" el lado derecho es el lado falso*/}
                    {selectedOptionIm == "Impresora 1" ? <div>
                    <p style={{textAlign:"left"}} >Material:</p>
                    <ComboBox
                      options={materiales}
                      placeholder="Elige el material."
                      optionsListMaxHeight={300}
                      style={{
                        width: "300px"
                      }}
                      renderOptions={(option) => (
                        <div className="comboBoxOption">{option}</div>
                      )}
                      onSelect={(option) => handleSelect(option)}
                      onChange={(event) => console.log(event.target.value)}
                      enableAutocomplete
                      selectedOptionColor='#68D391'
                    />
                      {material}
                    </div>
                    
                    : <></>}

                    {selectedOptionIm == "Impresora 2" ? <div>opciones de {selectedOptionIm}
                    <ComboBox
          
                      options={materiales}
                      placeholder="Elige el material."
                      optionsListMaxHeight={300}
                      style={{
                        width: "300px"
                      }}
                      renderOptions={(option) => (
                        <div className="comboBoxOption">{option}</div>
                      )}
                      onSelect={(option) => handleSelect(option)}
                      onChange={(event) => console.log(event.target.value)}
                      enableAutocomplete
                      selectedOptionColor='#68D391'
                    />
                      {material}

                    </div>
                    
                    
                    : <></>}

                  </span>
                  <p style={{textAlign:"left"}} >Relleno:</p>
                  <ComboBox
        
                    options={relleno}
                    placeholder="Elige el relleno."
                    optionsListMaxHeight={300}
                    style={{
                      width: "300px"
                    }}
                    renderOptions={(option) => (
                      <div className="comboBoxOption">{option}</div>
                    )}
                    onSelect={(option) => setInfill(option)}
                    onChange={(event) => console.log(event.target.value)}
                    enableAutocomplete
                    selectedOptionColor='#68D391'
                  />  
                  {infill}
                  <p>Calidad:</p>
                  <div
                    {...getTrackProps({
                      style: {
                        height: "4px",
                        background: "#ddd",
                        boxShadow: "inset 0 10px 2px rgba(0,0,0,.6)",
                        borderRadius: "2px",
                        margin: "0 100px"
                      }
                    })}
                  >
                    {ticks.map(({ value, getTickProps }) => (
                      <div {...getTickProps()}>{value}</div>
                    ))}
                    {handles.map(({ getHandleProps }) => (
                      <button
                        {...getHandleProps({
                          style: {
                            width: "14px",
                            height: "14px",
                            outline: "none",
                            borderRadius: "100%",
                            background: "linear-gradient(to bottom, #eee 45%, #ddd 55%)",
                            border: "solid 1px #888"
                          }
                        })}
                      />
                    ))}
                  </div>
                  <br />
                  <br />
                  <br />
                  {values <= [33] ? <div>Baja </div> : ""}
                  {values > [33] && values <= [66]  ? <div>Media </div> : ""}
                  {values > [66]  ? <div>Alta </div> : ""}
                  <pre
                    style={{
                      display: "inline-block",
                      textAlign: "left"
                    }}
                  ></pre>
                </Col>

                
                
              </Row>
              
          </Col>
          <Col style={{justifyContent:"flex-end",paddingLeft:"10px"}}>
            <Col style={{justifyContent:"flex-end",paddingLeft:"10px"}}>
              <Col style={{justifyContent:"flex-end",paddingLeft:"10px"}}>
                {selectedOptionIm != "" && material != "" && infill != "" ? 
                  <div>
{/*entremedio del texto se le pueden llamar las variables ej: "mi edad es {edad}" */}
                    <p>Dimensiones x: 5mm, y: 3 mm, z: 2mm</p>
                    <p>tiempo de impreción: 03:43:32</p>
                    <p>etc.....</p>
                  </div>
                : 
                <></>
                }
                
          {/*debo encontrar la forma de colocar un viewer de STL */}
             </Col>
            </Col>
          </Col>
        </Row>
        <Row style={{justifyContent:"center"}}>
          <button>cotizar</button>
        </Row>
        
      </FadeIn>
    </RightBlockContainer>
  );
};

export default RightBlock;

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
