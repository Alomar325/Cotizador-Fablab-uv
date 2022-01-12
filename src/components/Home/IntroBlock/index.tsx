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
  const [selectedOptionM, setSelectedOptionM] = useState("");
  const [material, setMaterial] = useState("");

  const dataIM = [
    'Impresora 1',
    'Impresora 2'
  ]

  const materiales = [
    'PLA',
    'ABS'
  ]
  
  
  function handleSelect(option){ 
    setSelectedOptionM(option)
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
          <Row style={{justifyContent:"center"}} >
          <Col lg={11} md={11} sm={11} xs={24} style={{justifyContent:"center"}}>
              <h6 style={{color:"#000", textShadow:"2px 4px 8px rgba(0,0,0,0.5)",textAlign:"center"}}>Cotizador 3D Fablab UV</h6>
              <Content style={{textAlign:"center"}} >Aqui estara la el objeto 3D con sus dimensiones.</Content>
              <Row style={{justifyContent:"center"}}>
                <Col  style={{justifyContent:"center",paddingRight:"10px"}}>
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
                  <span style={{ fontWeight: "bold"}}>
                  {" "}
                  {/*Lo de  abajo son if  si requieren que muestre cosas dependiendo de la impresora solo se debe colocar en la parte de codigo a la izquierda de ":" el lado derecho es el lado falso*/}
                  {selectedOptionIm == "Impresora 1" ? <div>opciones de {selectedOptionIm}
                  <ComboBox
        
                    options={materiales}
                    placeholder="Elige el material"
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
                  {selectedOptionM == "Impresora 2" ? <>opciones de {selectedOptionIm}</> : <></>}
          
        </span>
                </Col>
                {/*<Col  style={{justifyContent:"center", paddingRight:"10px"}}>
                  <div style={{width:"128px"}}><Link to="/Farms"><AltButton>Farms </AltButton></Link></div>
                </Col>
                <Col  style={{justifyContent:"center", paddingRight:"10px"}}>
                  <a href="https://www.aurorapunks.art" target="_blank" rel="noreferrer">
                  <div style={{width:"128px"}}><AltButton>AuroraPunks <img src={"/img/0.svg"} alt="punk" width="24px" height="24px" /></AltButton></div>
                  </a>
                </Col>
                </Row>
                <Row style={{justifyContent:"center"}} >
                  <Col lg={12} md={24} sm={12} xs={11} style={{justifyContent:"center", display:"flex"}}>
                    <a href="https://swap.auroraswap.finance/#/swap?outputCurrency=0x631edd14bb0b2505c91176feedc5f082d27dd5b8" target="_blank" rel="noreferrer">
                    <div style={{width:"128px"}}><Button>Buy <img src="/img/auroraswap.png" alt="auroraswap" width="24px" height="24px" /></Button></div>
                    </a>
                  </Col>
                  <Col lg={12} md={12} sm={12} xs={11} style={{justifyContent:"center", display:"flex"}}>
                    <a href="https://t.me/PolarisTokenEntry" target="_blank" rel="noreferrer">
                    <div style={{width:"128px"}}><Button>Telegram <SvgIcon src="tg.png" width="24px" height="24px" /></Button></div>
                    </a>
                  </Col>
                </Row>
                <Row style={{justifyContent:"center"}}>
                  <Col lg={8} md={12} sm={12} xs={11} style={{justifyContent:"center", display:"flex"}}>
                    <a href="https://twitter.com/PolarisToken" target="_blank" rel="noreferrer">
                    <div style={{width:"128px"}}><Button>Twitter <SvgIcon src="tw.png" width="24px" height="24px" /></Button></div>
                    </a>
                  </Col>
                  <Col lg={8} md={12} sm={12} xs={11} style={{justifyContent:"center", display:"flex"}}>
                    <a href="https://dexscreener.com/aurora/0x51a5bb6882c56de7e3c508c2ab9d3bd24740a7a7" target="_blank" rel="noreferrer">
                    <div style={{width:"128px"}}><Button>Chart <SvgIcon src="chart.jpg" width="24px" height="24px" /></Button></div>
                    </a>
  </Col>*/}
                </Row>
          </Col>
          
        </Row>
      </FadeIn>
    </RightBlockContainer>
  );
};

export default RightBlock;
