import { Timeline } from "antd";
import {
  RightBlockContainer,
  Content,
  CircleP,
} from "./styles";

const RightContentBlock = () => {
  return (
    <RightBlockContainer id={"roadmap"}>
            <h6 style={{textAlign:"center",paddingBottom:"48px"}}>Roadmap</h6>
            
            <Content>
              <Timeline mode="alternate">
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                      Website Launch ✅
                    </span>
                  </CircleP>
                </Timeline.Item>
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                      Establish the first Liquidity Locker on the Aurora Chain ✅
                    </span>
                  </CircleP>
                </Timeline.Item>
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                      Acquire partnership with a DEX (AuroraSwap) ✅
                    </span>
                  </CircleP>
                </Timeline.Item>
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                    Launch NFT project (AuroraPunks.art) ✅
                      
                    </span>
                  </CircleP>
                </Timeline.Item>
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                    Launch $PLRS LP farming pool ✅
                    </span>
                  </CircleP>
                </Timeline.Item>
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                    Launch NFT staking pool
                    </span>
                  </CircleP>
                </Timeline.Item>
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                      Establish collaborations with other projects
                    </span>
                  </CircleP>
                </Timeline.Item>
                
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                      Launch Multi-Sender Utility 
                    </span>
                  </CircleP>
                </Timeline.Item>
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                      Launch NFT Minter
                    </span>
                  </CircleP>
                </Timeline.Item>
                
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                      Pursue other utilities
                    </span>
                  </CircleP>
                </Timeline.Item>
                <Timeline.Item color="white">
                  <CircleP>
                    <span>
                      Pursue CEX listing
                    </span>
                  </CircleP>
                </Timeline.Item>
                

              </Timeline>
            </Content>

    </RightBlockContainer>
  );
};

export default RightContentBlock;
