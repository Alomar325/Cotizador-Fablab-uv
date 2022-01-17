
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
        </Row>
        </Container>
      </div>

    </>
  );
};

export default (Footer);
