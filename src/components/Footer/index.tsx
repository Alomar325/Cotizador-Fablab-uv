
import Container from "../../common/Container";
import { Row, Col } from "antd";


const Footer = () => {
  return (
    <>
      <div style={{backgroundColor:"#111111",color:"#fff",paddingTop:"24px"}}>
        <Container>
        <Row justify="space-between">
          <Col>
            <Row style={{paddingBottom:"16px"}}>
              <img src="logo.png" alt="logo.png" style={{display: "block",maxWidth:"171px",maxHeight:"72px",width:"auto",height:"auto"}}/>
            </Row>
            <Row >
            <p style={{color: "#fff"}}>© 2022, Fablab UV</p>
            </Row>
        
          </Col>
          <Col>
              <Row style={{paddingBottom:"8px",justifyContent:"center"}}>
                <p style={{color: "#fff"}}>Unete a nuestras redes sociales</p>
              </Row>
              <Row style={{justifyContent:"center"}}>
              <a style={{justifyContent:"center",paddingRight:"12px"}} href="https://medium.com/@Polaris_Token" target="_blank" rel="noreferrer">
                <Col style={{border:"2px solid white",borderRadius:"50px"}}>
                  
                    <img src="/img/medium.svg" alt="medium.svg"  style={{width:"48px",height:"48px", padding:"6px"}}/>
                  
                </Col>
                </a>
                <a style={{justifyContent:"center", paddingRight:"12px"}} href="https://t.me/PolarisTokenEntry" target="_blank" rel="noreferrer">
                <Col style={{border:"2px solid white",borderRadius:"50px"}}>
                  
                    <img src="/img/tg.svg" alt="tg.svg"  style={{width:"48px",height:"48px", padding:"6px"}}/>
                  
                </Col>
                </a>
                <a style={{justifyContent:"center", paddingRight:"12px"}} href="https://discord.gg/ZjCUgaQQcC" target="_blank" rel="noreferrer">
                <Col style={{border:"2px solid white",borderRadius:"50px"}}>
                  
                    <img src="/img/dsc.svg" alt="discord.svg"  style={{width:"48px",height:"48px", padding:"6px"}}/>
                  
                </Col>
                </a>
                <a style={{justifyContent:"center", paddingRight:"12px"}} href="https://twitter.com/PolarisToken" target="_blank" rel="noreferrer">
                <Col style={{border:"2px solid white",borderRadius:"50px"}}>
                  
                    <img src="/img/twt.svg" alt="twt.svg"  style={{width:"48px",height:"48px", padding:"6px"}}/>
                  
                </Col>
                </a>
                <a style={{justifyContent:"center", paddingRight:"12px"}} href="https://github.com/PolarisToken/" target="_blank" rel="noreferrer">
                <Col style={{border:"2px solid white",borderRadius:"50px"}}>
                  
                    <img src="/img/github.svg" alt="git.svg"  style={{width:"48px",height:"48px", padding:"6px"}}/>
                  
                </Col>
                </a>
                
                <a style={{justifyContent:"center", paddingRight:"12px"}} href="https://www.coingecko.com/en/coins/polaris-token" target="_blank" rel="noreferrer">
                <Col style={{border:"2px solid white",borderRadius:"50px"}}>
                  
                    <img src="/img/cg.svg" alt="cg.svg"  style={{width:"48px",height:"48px", padding:"6px"}}/>
                  
                </Col>
                </a>
              </Row>


              
              
          </Col>
        </Row>
        </Container>
      </div>

    </>
  );
};

export default (Footer);
