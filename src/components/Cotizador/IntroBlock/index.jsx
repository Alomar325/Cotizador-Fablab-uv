import { Row, Col } from "antd";
import { useRanger } from "react-ranger";
import { useState } from "react";
import FadeIn from 'react-fade-in';
import ComboBox from 'react-responsive-combo-box';
import 'react-responsive-combo-box/dist/index.css';
import styled from "styled-components";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from './OrbitControls.js'
import { STLLoader } from './STLLoader'
//import Home from "./pages/Home/IntroBlock";


 // npm i --save react-ranger, npm i --save three
import {
  RightBlockContainer,
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


 
  return (
    <RightBlockContainer id="intro" style={{paddingTop:"100px"}}>
      <FadeIn>
      
      
      </FadeIn>
    </RightBlockContainer>
  );
};

export default RightBlock;
