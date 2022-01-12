import { Row, Col} from "antd";
import {
  LeftContentSection,
  CardDiv,
} from "./styles";

const LeftContentBlock = () => {
  return (
    <LeftContentSection id={"team"}>

              <h6 style={{textAlign:"center"}}>The Team</h6>

            <Row gutter={128} style={{justifyContent:"center",paddingBottom:"48px"}}>
              <Col style={{paddingBottom:"24px"}} lg={8} md={11} sm={11} xs={32}>
              <a href="https://t.me/printff" target="_blank" rel="noreferrer">
                <CardDiv>
                  <p style={{display:'flex', justifyContent:'center', padding: '60px 0px 0px'}}>
                      <img src={`/img/print.jpg`} alt={'PF.jpg'} style={{borderRadius:"120px"}} width={'52%'} height={'52%'}/>
                  </p>
                  <p style={{ display:'flex', justifyContent:'center', color:'#fff', fontSize:32}}>
                    <b>Printf</b>
                  </p>
                  <p style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:16}}>
                    Team Leader
                  </p>
                </CardDiv>
              </a>
              </Col>
              <Col style={{paddingBottom:"24px"}} lg={8} md={11} sm={11} xs={24}>
              <a href="https://t.me/stephenshimel" target="_blank" rel="noreferrer">
                <CardDiv>
                  <p style={{display:'flex', justifyContent:'center', padding: '60px 0px 0px'}}>
                      <img src={`/img/steph.svg`} alt={'PF.jpg'} style={{borderRadius:"120px"}} width={'52%'} height={'52%'}/>
                  </p>
                  <p style={{textShadow:"2px 4px 8px rgba(255, 255, 255, 0.5)", display:'flex', justifyContent:'center', color:'#fff', fontSize:32}}>
                    <b>Stephen S.</b>
                  </p>
                  <p style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:16}}>
                    Co-Lead and Public Relations
                  </p>
                </CardDiv>
              </a>
              </Col>
              
              </Row>
              <Row gutter={128} style={{justifyContent:"center"}}>
              <Col style={{paddingBottom:"24px"}} lg={8} md={11} sm={11} xs={24}>
              <a href="https://t.me/st4rdust8299" target="_blank" rel="noreferrer">
                <CardDiv>
                  <p style={{display:'flex', justifyContent:'center', padding: '60px 0px 0px'}}>
                      <img src={`/img/star.png`} alt={'PF.jpg'} style={{borderRadius:"120px"}} width={'52%'} height={'52%'}/>
                  </p>
                  <p style={{textShadow:"2px 4px 8px rgba(255, 255, 255, 0.5)", display:'flex', justifyContent:'center', color:'#fff', fontSize:32}}>
                    <b>ST4RDUST</b>
                  </p>
                  <p style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:16}}>
                    Web3 Developer
                  </p>
                </CardDiv>
              </a>
              </Col>
              <Col style={{paddingBottom:"24px"}} lg={8} md={11} sm={11} xs={24}>
              <a href="https://t.me/stinkitylinkity" target="_blank" rel="noreferrer">
                <CardDiv>
                <p style={{display:'flex', justifyContent:'center', padding: '60px 0px 0px'}}>
                    <img src={`/img/LJ.jpg`} alt={'LJ.jpg'} style={{borderRadius:"120px"}} width={'50%'} height={'50%'}/>
                </p>
                <p style={{textShadow:"2px 4px 8px rgba(255, 255, 255, 0.5)", display:'flex', justifyContent:'center', color:'#fff', fontSize:32}}>
                  <b>Lord Johnson</b>
                </p>
                <p style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:16}}>
                  Solidity Dev
                </p>
                </CardDiv>
              </a>
              </Col>
              

          </Row>

    </LeftContentSection>
  );
};

export default (LeftContentBlock);
