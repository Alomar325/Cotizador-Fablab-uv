import { Row, Col } from "antd";
import { SvgIcon } from "../../../common/SvgIcon";
import { Button } from "../../../common/Buttons/Button";
import { AltButton } from "../../../common/Buttons/altButton";
import { Link } from 'react-router-dom';
import { useState } from "react";
import FadeIn from 'react-fade-in';
import ComboBox from 'react-responsive-combo-box';
import 'react-responsive-combo-box/dist/index.css';

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
          <Content style={{textAlign:"center"}} >Aqui estara la el objeto 3D con sus dimensiones.</Content>
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
                </Col>
                
                
                
              </Row>
              
          </Col>
          <Col style={{justifyContent:"flex-end",paddingLeft:"10px"}}>
            <Col style={{justifyContent:"flex-end",paddingLeft:"10px"}}>
              <Col style={{justifyContent:"flex-end",paddingLeft:"10px"}}>
                <body>aqui estaran los datos del STL</body>{/*entremedio del texto se le pueden llamar las variables ej: "mi edad es {edad}" */}
                <p>Dimensiones x: 5mm, y: 3 mm, z: 2mm</p>
                <p>tiempo de impreción: 03:43:32</p>
                <p>etc.....</p>
          {/*debo encontrar la forma de colocar un viewer de STL */}
             </Col>
            </Col>
          </Col>
        </Row>
        
      </FadeIn>
    </RightBlockContainer>
  );
};

export default RightBlock;
