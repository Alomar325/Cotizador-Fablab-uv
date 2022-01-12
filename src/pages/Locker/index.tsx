import { lazy } from "react";
import {
  BackgroundContainer
} from "./styles";

const Container = lazy(() => import("../../common/LockerContainer"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const LockerBlock = lazy(() => import ("../../components/Locker/LockerBlock"));


const Locker = () => {
  return (
  <BackgroundContainer>
    <div style={{
              backgroundImage: `url(/bgs/bg2.jpg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              zIndex:0,
              minHeight:'100vh',
              
        }}>
    <Container>
      
      <ScrollToTop />
      
      <LockerBlock/>
      
      
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
export default Locker;
