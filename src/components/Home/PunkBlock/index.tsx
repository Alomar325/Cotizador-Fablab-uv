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

    <h6 style={{textAlign:"center",paddingBottom:"48px", WebkitTextStroke: "2px black", textShadow:"0 0 0 rgba(0,0,0,0)"}}>AuroraPunks</h6>
      <p style={{textAlign:"center", backgroundColor:"rgba(0,0,0,0.9)",borderRadius:"50px", border:"2px solid #fff",padding:"24px"}}>
      AuroraPunks is a Punks themed NFT collection based on Larvalabs' original made by the #PolarisToken Team and 
      aimed at tying the Aurora Chain ecosystem together.
      <br/><br/>
      There is a total of 10,000 AuroraPunks available to mint and 50% of the mint profits will be used to buy back the $PLRS Token
        

      </p>
      <DeskDiv>
        <Row gutter={64} style={{alignItems:"center",paddingTop:"24px"}}>
          
          <Col style={{paddingBottom:"24px"}} lg={8} md={12} sm={12} xs={24}>

          </Col>
          <Col style={{paddingBottom:"24px"}} lg={8} md={11} sm={11} xs={24}>
          <a href="https://www.aurorapunks.art" target="_blank" rel="noreferrer">
            <CircleBlock>
            <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '24px 0px 0px'}}>
            <img src={"/img/0.svg"} alt="nft.png" width="128px" height="128px" style={{borderRadius:"45px"}} />
              </p>
              <p style={{  display:'flex', justifyContent:'center', fontSize:24, color:"#000"}}>
              <b>Mint yours now!</b>
              </p>
            </CircleBlock>
          </a>
          </Col>
          <Col style={{}} lg={8} md={11} sm={11} xs={24}>

          </Col>
        </Row>
      </DeskDiv>

      <Row>
      <MobileDiv>
      <a href="https://www.aurorapunks.art" target="_blank" rel="noreferrer">
      <CircleBlock>
      <p style={{ display:'flex', justifyContent:'center', fontSize:32, padding: '24px 0px 0px'}}>
      <img src={"/img/0.svg"} alt="nft.png" width="128px" height="128px" style={{borderRadius:"45px"}} />
        </p>
        <p style={{  display:'flex', justifyContent:'center', fontSize:24, color:"#000"}}>
        <b>Mint yours now!</b>
        </p>
      </CircleBlock>
      </a>
      </MobileDiv>
      </Row>

    </LeftContentSection>
  );
};

export default (LeftContentBlock);
