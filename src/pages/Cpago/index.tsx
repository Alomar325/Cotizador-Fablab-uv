import { lazy } from "react";
import {
  BackgroundContainer
} from "./styles";


const Container = lazy(() => import("../../common/Container"));
const ScrollToTop = lazy(() => import("../../common/ScrollToTop"));
const IntroBlock = lazy(() => import ("../../components/Cpago/IntroBlock"));

//const ChartBlock = lazy(() => import ("../../components/Home/ChartBlock"));


const Home = () => {
  return (
    <>
    <BackgroundContainer>
        <div style={{
              backgroundImage: `url(/bgs/bg.png)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              zIndex:0
              
        }}>
          <Container>
            <IntroBlock/>
          </Container>
        </div>
      {/*  <div style={{

        }}>
        <Container>
        <AboutBlock/>
        </Container>
        </div>
        <div style={{
          background: "linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(/bgs/bg3.png)",
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          zIndex:0
        }}>
        <Container>
        <PunkBlock/>
        </Container>
        </div>
        <div style={{
          
        }}>
        <Container>
        <TokenomicsBlock/>
        </Container>
        </div>
        <div style={{
              backgroundImage: `url(/bgs/bg1.jpg)`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed',
              zIndex:0
              
        }}>
        <Container>
        <RoadmapBlock/>
        </Container>
        </div>
        <Container>
        <TeamBlock/>
        </Container>
      */}
        <ScrollToTop />
    </BackgroundContainer>
    </>
  );
};
export default Home;
