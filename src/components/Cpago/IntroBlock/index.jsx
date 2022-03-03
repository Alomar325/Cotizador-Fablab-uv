import { Row, Col } from "antd";
import styled from "styled-components";
import ComboBox from 'react-responsive-combo-box';
import { useState } from "react";


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

  const dataIM = [
    'Litecoin',
    'Ethereum',
    'Bitcoin'
  ]

  return (
    
    <RightBlockContainer id="intro" style={{paddingTop:"100px"}}>
        <Row style={{justifyContent:"center"}} >
          <Col lg={11} md={11} sm={12} xs={24}>
            <Cimg src={"logo.png"} alt="logo.png" width="100%" maxHeight="168px" style={{}} />
          </Col>
        </Row>
        <Row style={{justifyContent:"center"}}>
                <Col  style={{justifyContent:"center",paddingRight:"10px"}}>
                <p style={{textAlign:"left"}} >Seleccione Criptomoneda:</p>
                <ComboBox
        
                  options={dataIM}
                  placeholder="Selecciona tu Criptomoneda"
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
                </Col>
        </Row>
    </RightBlockContainer>
  );
};

export default RightBlock;
