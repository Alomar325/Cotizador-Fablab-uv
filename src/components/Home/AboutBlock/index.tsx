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
    <LeftContentSection id={"about"}>

    <h6 style={{textAlign:"center",paddingBottom:"48px",textShadow:"0px 0px 0px 0px rgba(0,0,0,0)"}}>About Polaris</h6>
      <p style={{textAlign:"center", paddingBottom:"24px",paddingLeft:"0.5rem",paddingRight:"0.5rem"}}>Polaris (Ticker: $PLRS) is an utility token on the Aurora Chain, our main objective is to bring security, 
        functionality, and easement of use to the average investor in the network. <br/>
        By bringing the first liquidity locker to the environment we are trying to ensure that every new investor in the chain can be protected 
        from potentially malicious developers and that token owners can reassure their buyers about the safety of their funds. <br/>
        We also care about our own investors, with an LP farming pool in the works to incentivize improving the health of our liquidity pool and to allow for bigger purchases,
        with a $PLRS-themed NFT project coming soon after to further develop our community while looking forward to creating even more utilities for the Aurora Chain.
        

      </p>
      <p style={{textAlign:"center"}}>Our products:</p>
      <DeskDiv>
        <Row gutter={64} style={{alignItems:"center"}}>
          
          <Col style={{paddingBottom:"24px"}} lg={8} md={12} sm={12} xs={24}>
          
            <CircleBlock >
              <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '60px 0px 0px'}}>
              <img src={"/img/cryptography.png"} alt="nft.png" width="72px" height="72px" style={{}} />
              </p>
              <p style={{ display:'flex', justifyContent:'center', fontSize:24}}>
                <b>Liquidity Locker</b>
                </p>
            </CircleBlock>
                
          </Col>
          <Col style={{paddingBottom:"24px"}} lg={8} md={11} sm={11} xs={24}>
            <CircleBlock>
            <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '60px 0px 0px'}}>
            <img src={"/img/growth.png"} alt="nft.png" width="72px" height="72px" style={{}} />
              </p>
              <p style={{  display:'flex', justifyContent:'center', fontSize:24}}>
              <b>LP Farming (Soon)</b>
                </p>
            </CircleBlock>
          </Col>
          <Col style={{paddingBottom:"24px"}} lg={8} md={11} sm={11} xs={24}>
            <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
              <img src={"/img/nft.png"} alt="nft.png" width="72px" height="72px" style={{}} />
              </p>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:24}}>
                
                <b>NFT</b>
                </p>
            </CircleBlock>
          </Col>
        </Row>
      </DeskDiv>

      <Row>
      <MobileDiv>
      
      <CircleBlock >
              <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '60px 0px 0px'}}>
              <img src={"/img/cryptography.png"} alt="nft.png" width="72px" height="72px" style={{}} />
              </p>
              <p style={{ display:'flex', justifyContent:'center', fontSize:24}}>
                <b>Liquidity Locker</b>
                </p>
      </CircleBlock>
      
      </MobileDiv>
      </Row>
      <Row>
      <MobileDiv>
      
      <CircleBlock>
            <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '60px 0px 0px'}}>
            <img src={"/img/growth.png"} alt="nft.png" width="72px" height="72px" style={{}} />
              </p>
              <p style={{  display:'flex', justifyContent:'center', fontSize:24}}>
              <b>LP Farming (Soon)</b>
                </p>
            </CircleBlock>
        
      </MobileDiv>
      </Row>
      <Row>
      <MobileDiv style={{paddingBottom:"0px"}}>
      
      <CircleBlock>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:32, padding: '60px 0px 0px'}}>
              <img src={"/img/nft.png"} alt="nft.png" width="72px" height="72px" style={{}} />
              </p>
              <p style={{  display:'flex', justifyContent:'center',  fontSize:24}}>
                
                <b>NFT</b>
                </p>
            </CircleBlock>
      
      </MobileDiv>
      </Row>
    </LeftContentSection>
  );
};

export default (LeftContentBlock);
