import { useState } from "react";
import { Link, useLocation  } from "react-router-dom";
import { Row, Col, Drawer } from "antd";
import Container from "../../common/Container";
//import { SvgIcon } from "../../common/SvgIcon";
import { AltButton } from "../../common/Buttons/altButton";
//import { BlackButton } from "../../common/Buttons/BlackButton";
import "antd/dist/antd.css";
import "./index.css";
import {
  HeaderSection,
  LogoContainer,
  Burger,
  NotHidden,
  Menu,
  CustomNavLinkSmall,
  Label,
  Outline,
  Span,
  GlowImg,
} from "./styles";

function Header(){
  const [visible, setVisibility] = useState(false);

  
 /* const { active, account, library, connector, activate, deactivate } = useWeb3React()
  <Button onClick={connect} >Connect to MetaMask</Button>
      {active ? <p>Connected with {account}</p> : <p>no funca la wea</p>}
      <Button onClick={disconnect} >Disconnect</Button>
  */
  useLocation()
  var Home = true;

  const showDrawer = () => {
    setVisibility(!visible);
  };

  const onClose = () => {
    setVisibility(!visible);
  };

  const RedirectItem = () => {
    
    return (
      <>
        <CustomNavLinkSmall
          style={{ width: "140px" }}
        >
          <Span>
          <div className="dropdown" style={{float:"left"}}>
          </div>
           {/* >
          </Link>*/}
          </Span>
        </CustomNavLinkSmall>
        
  
        
        
  
        
      </>
    );
    }

  const MenuItem = () => {
    const scrollTo = (id: string) => {
      const element = document.getElementById(id) as HTMLDivElement;
      element.scrollIntoView({
        behavior: "smooth",
      });
      setVisibility(false);
      
    };
    return (
      <>
          
          <CustomNavLinkSmall >
            <Span><Link to="/" >Cotizador</Link></Span>
        </CustomNavLinkSmall>
        <CustomNavLinkSmall >
            <Span><Link to="/criptopago" >CriptoPago</Link></Span>
        </CustomNavLinkSmall>
          
          {/*<CustomNavLinkSmall >
            <a href="https://gateway.boba.network/">
              <Span>Bridge</Span>
            </a>
          </CustomNavLinkSmall>
        <><CustomNavLinkSmall onClick={() => scrollTo("about")}>
        <Span style={{color:"#fff"}}>Ayuda</Span>
          </CustomNavLinkSmall></>*/}
          
              


      </>
    );
  };

  return (

    
    <HeaderSection style={{zIndex:5}}>
      <Container>
        <Row justify="space-between">
          <Col span={4} >
          <LogoContainer to="/" aria-label="homepage" >
            <GlowImg src="logo.png" alt="logo.png" style={{display: "block",maxWidth:"171px",maxHeight:"72px",width:"auto",height:"auto"}} /> 
          </LogoContainer>
          </Col>
          
          <Col span={12}  style={{justifyContent:"center"}}>
          <NotHidden>

              <MenuItem />
              

            </NotHidden>
          </Col>
          <Col span={4} >
          <NotHidden>
            <RedirectItem/>
          </NotHidden>
          </Col>

          
          <Burger onClick={showDrawer}>
            <Outline />
          </Burger>
        </Row>
        <Drawer closable={false} visible={visible} onClose={onClose}>
          <Col style={{ marginBottom: "2.5rem" }}>
            <Label onClick={onClose}>
              <Col span={12}>
                <Menu>Menu</Menu>
              </Col>
              <Col span={12}>
                <Outline />
              </Col>
            </Label>
          </Col>
          <Col span={12}>
          <RedirectItem/>
          <MenuItem />
            
          </Col>
        </Drawer>
      </Container>
    </HeaderSection>
  );
};

export default Header;
