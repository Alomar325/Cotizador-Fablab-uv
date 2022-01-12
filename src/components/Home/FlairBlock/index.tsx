import { Row} from "antd";
//import { SvgIcon } from "../../../common/SvgIcon";
//import { Button } from "../../../common/Buttons/Button";
import { Fade } from "react-awesome-reveal";
import {
  RightBlockContainer,
  //Content,
  //ContentWrapper,
  //Cimg,
} from "./styles";
/*

*/
const RightBlock = () => {
  return (
    
    <RightBlockContainer id="intro" style={{height:"88vh"}}>
      <Fade direction="up" >
          <Row style={{justifyContent:"center"}} >
              <h6 style={{color:"#fff", textShadow:"2px 4px 8px rgba(255,255,255,0.5)",textAlign:"center"}}>Rising to the stars and beyond.</h6>
        </Row>
      </Fade>
    </RightBlockContainer>
  );
};

export default RightBlock;
