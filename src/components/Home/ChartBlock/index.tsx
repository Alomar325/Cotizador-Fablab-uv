import { Row } from "antd";
//import { SvgIcon } from "../../../common/SvgIcon";
import { Slide } from "react-awesome-reveal";
import {
  LeftContentSection,
} from "./styles";

const LeftContentBlock = () => {
  return (
    <LeftContentSection>
      <Slide direction="up">
        <Row justify="space-between" align="middle" >
          <h6 style={{textShadow:"2px 4px 8px rgba(255, 255, 255, 0.5)"}}>CHARTS V4 COMING SOON: FULLY FEATURED, FANCY, MEATY. <img src={`/img/svg/loading.gif`} alt={'loading.gif'} width={'64px'} height={'64px'}/></h6>
        </Row>
      </Slide>
    </LeftContentSection>
  );
};

export default (LeftContentBlock);
