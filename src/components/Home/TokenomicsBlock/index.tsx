import { Row, Col } from "antd";
//import { SvgIcon } from "../../../common/SvgIcon";
import {
  LeftContentSection,
  CircleBlock,
  DeskDiv,
  MobileDiv,
} from "./styles";

const LeftContentBlock = () => {
  return (
    <LeftContentSection id={"tokenomics"}>
      
              <h6 style={{textAlign:"center",paddingBottom:"48px",textShadow:"0px 0px 0px 0px rgba(0,0,0,0)"}}>Tokenomics</h6>
          <p style={{textAlign:"center", paddingBottom:"24px"}}>10,000,000,000,000 Total $PLRS Supply<br/>
             <b>No tax on transactions</b>

          </p>
          <p style={{textAlign:"center",fontSize:"32px"}}>Token Distribution</p>
      <DeskDiv>
        <Row gutter={12} style={{alignItems:"center"}}>
          
          <Col style={{paddingBottom:"48px"}} lg={8} md={12} sm={12} xs={24}>
            <CircleBlock >
              <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '60px 0px 0px'}}>
                    <b>60% $PLRS</b>
              </p>
              <p style={{ display:'flex', justifyContent:'center', fontSize:16}}>
                Initial circulating supply
                </p>
            </CircleBlock>
          </Col>
          <Col style={{paddingBottom:"48px"}} lg={8} md={11} sm={11} xs={24}>
            <CircleBlock>
            <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '60px 0px 0px'}}>
                    <b>25% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center', fontSize:16}}>
                Reserved for LP farming
                </p>
            </CircleBlock>
          </Col>
          <Col style={{paddingBottom:"48px"}} lg={8} md={11} sm={11} xs={24}>
            <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
                    <b>5% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:16}}>
                Supply burn
              </p>
            </CircleBlock>
          </Col>
          <Col style={{paddingBottom:"48px"}} lg={8} md={11} sm={11} xs={24}>
            <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
                    <b>5% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center', textAlign:"center",  fontSize:16}}>
                Reserved for partnerships/marketing/influecers
              </p>
            </CircleBlock>
          </Col>
          <Col style={{paddingBottom:"48px"}} lg={8} md={11} sm={11} xs={24}>
            <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
                    <b>5% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:16}}>
                CEX Listing reserve
              </p>
            </CircleBlock>
          </Col>
          <Col style={{paddingBottom:"48px"}} lg={8} md={11} sm={11} xs={24}>
            <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
                    <b>5% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:16}}>
                Team wallet
              </p>
            </CircleBlock>
          </Col>
        </Row>
      </DeskDiv>
      <Row>
      <MobileDiv>
        
        <CircleBlock >
              <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '60px 0px 0px'}}>
                    <b>40% $PLRS</b>
              </p>
              <p style={{ display:'flex', justifyContent:'center', fontSize:16}}>
                Initial circulating supply
                </p>
            </CircleBlock>
        
      </MobileDiv>
      </Row>
      <Row>
      <MobileDiv>
      
      <CircleBlock>
            <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '60px 0px 0px'}}>
                    <b>30% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center', fontSize:16}}>
                Reserved for LP farming
                </p>
            </CircleBlock>
        
      </MobileDiv>
      </Row>
      <Row>
      <MobileDiv >
      
      <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
                    <b>10% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:16}}>
                Supply burn
              </p>
        </CircleBlock>
      
      </MobileDiv>
      </Row>
      <Row>
      <MobileDiv>
      
      <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
                    <b>10% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center', textAlign:"center",  fontSize:16}}>
                Reserved for partnerships/marketing/influecers
              </p>
            </CircleBlock>
        
      </MobileDiv>
      </Row>
      <Row>
      <MobileDiv >
      
      <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
                    <b>5% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:16}}>
                CEX Listing reserve
              </p>
            </CircleBlock>
      
      </MobileDiv>
      </Row>
      <Row>
      <MobileDiv>
      
      <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
                    <b>5% $PLRS</b>
              </p>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:16}}>
                Team wallet
              </p>
            </CircleBlock>
        
      </MobileDiv>
      </Row>
    </LeftContentSection>
    
  );
};

export default (LeftContentBlock);
