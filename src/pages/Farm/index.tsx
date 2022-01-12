import { lazy } from "react";
import {
  BackgroundContainer
} from "./styles";

const Container = lazy(() => import("../../common/LockerContainer"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const FarmBlock = lazy(() => import ("../../components/Farm/FarmBlock"));


const Farm = () => {
  return (
  <BackgroundContainer>
    <div style={{
              backgroundImage: `url(/bgs/bg3.jpg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              zIndex:0,
              minHeight:'100vh',
              
        }}>
    <Container>
      
      <ScrollToTop />
      
      <FarmBlock/>
      
      
    </Container>
    </div>
  </BackgroundContainer>
  );
};
/*<Contact
title={ContactContent.title}
content={ContactContent.text}
id="contact"
/>*/
export default Farm;
