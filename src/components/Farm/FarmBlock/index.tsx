import { Row, Col, Input} from "antd";
//import { SvgIcon } from "../../../common/SvgIcon";
//import { ContentBlockProps } from "../types";
//import { AudioOutlined } from '@ant-design/icons';
//import { Slide } from "react-awesome-reveal";
//import { useParams } from "react-router-dom";
import Web3 from 'web3';
import farmABI from '../../../contracts/farmABI.json';
import tokenABI from '../../../contracts/tokenABI.json';
//import uniABI from '../../../contracts/uniABI.json';
//import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils/types'
import { useWeb3React } from "@web3-react/core"
import { injected } from "../../../MMConnect"
import { Button } from "../../../common/Buttons/Button";
import { useState, useEffect } from 'react';
import {
  LeftContentSection,
  CardDiv,
} from "./styles";

const web3 = new Web3(Web3.givenProvider);

  

function Farm(){
  
  //Web3 Stuff
  const { active, account, activate} = useWeb3React()
 
  
  async function connect() {
    try {
      await activate(injected)
    } catch (ex) {
    }
    
  }

  /*async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
    }
  }*/




  //polarLP States
  //const [isFarmLoading, setIsFarmLoading ] = useState(true);
  const [polarPrice,setPolarPrice] = useState(0);
  const [lpPrice,setLPPrice] = useState(0);
  //const [ethPrice,setEthPrice] = useState(0);
  const [hasPolarLPAllowance, setHasPolarLPAllowance] = useState(false);
  const [periodFinishPolarLP, setPeriodFinishPolarLP] = useState('');
  const [isErrorPolarLP, setIsErrorPolarLP] = useState(false);
  const [errorPolarLPTxt, setErrorPolarLPTxt] = useState('');
  const [polarLPAPR , setPolarLPAPR ] = useState(0);
  const [polarLPTotalStake, setPolarLPTotalStake] = useState('0');
  const [polarLPEarnings , setPolarLPEarnings ] = useState('0');
  const [polarLPStake, setPolarLPStake ] = useState('0');
  const [polarLPBalance, setPolarLPBalance ] = useState('0');
  const [polarLPRewardPool, setPolarLPRewardPool ] = useState('0');
  const [polarLPStakeField, setPolarLPStakeField ] = useState('');
  const [polarLPWithdrawField, setPolarLPWithdrawField ] = useState('');
  const [isPolarLPStake, setIsPolarLPStake ] = useState(false);
  const [isPolarLPWithdraw, setPolarLPWithdraw ] = useState(false);

  //polarLP States
  //const [isFarmLoading, setIsFarmLoading ] = useState(true);
  //const [brlPrice,setBrlPrice] = useState(0);
  const [brlLPPrice,setBrlLPPrice] = useState(0);
  //const [ethPrice,setEthPrice] = useState(0);
  const [hasBrlLPAllowance, setHasBrlLPAllowance] = useState(false);
  const [periodFinishBrlLP, setPeriodFinishBrlLP] = useState('');
  const [isErrorBrlLP, setIsErrorBrlLP] = useState(false);
  const [errorBrlLPTxt, setErrorBrlLPTxt] = useState('');
  const [brlLPAPR , setBrlLPAPR ] = useState(0);
  const [brlLPTotalStake, setBrlLPTotalStake] = useState('0');
  const [brlLPEarnings , setBrlLPEarnings ] = useState('0');
  const [brlLPStake, setBrlLPStake ] = useState('0');
  const [brlLPBalance, setBrlLPBalance ] = useState('0');
  const [brlLPRewardPool, setBrlLPRewardPool ] = useState('0');
  const [brlLPStakeField, setBrlLPStakeField ] = useState('');
  const [brlLPWithdrawField, setBrlLPWithdrawField ] = useState('');
  const [isBrlLPStake, setIsBrlLPStake ] = useState(false);
  const [isBrlLPWithdraw, setBrlLPWithdraw ] = useState(false);




  //Router Contract
  //const [ uniRouterContract, setUniRouterContract ] = useState<Contract | null>(null);
  
  //Metamask states
  const [isNetwork, setIsNetwork] = useState(false);
  const [isLoadingNetwork, setIsLoadingNetwork] = useState(true);
  const [isMetamask, setIsMetamask] = useState(true);

  //Tickers that don't need their own state variable
  const polarLPTicker = 'ETH-PLRS LP';
  const brlLPTicker = 'BRL-USDC LP';
  const polarTicker = '$PLRS';
  //Polar-LP FARM ADDYS
  const polarLPFarmAddy = "0x8E63608f790BDeB509365ec7A615E00e3141c0F3";
  const polarLPAddy = "0x51A5BB6882c56De7E3C508c2AB9d3Bd24740A7A7";
  const polarAddy = "0x631edd14bb0b2505c91176fEeDC5f082D27Dd5B8";
  //BRL-USDC LP
  const brlLPFarmAddy = "0xAfd252576180e2aEe4B7f0C156915494243c8f8c";
  const brlLPAddy = "0x30C3D6C114a350026ea0aa770788374Ad6c6f765";
  const brlAddy = "0x12c87331f086c3C926248f964f8702C0842Fd77F";

  const polarLPFarmContract = new web3.eth.Contract(farmABI as AbiItem[], polarLPFarmAddy);
  const polarLPContract = new web3.eth.Contract(tokenABI as AbiItem[], polarLPAddy);
  const polarContract = new web3.eth.Contract(tokenABI as AbiItem[], polarAddy);

  const brlLPFarmContract = new web3.eth.Contract(farmABI as AbiItem[], brlLPFarmAddy);
  const brlLPContract = new web3.eth.Contract(tokenABI as AbiItem[], brlLPAddy);
  const brlContract = new web3.eth.Contract(tokenABI as AbiItem[], brlAddy);


  //UNISWAP ROUTER CONTRACT, PRICE DATA
  //const uniAddy = "0xeC0A7a0C2439E8Cb67b992b12ecd020Ea943c7Be";

  function networkCheck(id){
    //BSC Testnet
    if(id === 1313161554)
    {
      setIsNetwork(true);
      
    }
    else
    {
      setIsNetwork(false);
    }
    setIsLoadingNetwork(false);
  }

  //Retrieve contract 
  useEffect(() => {
    if (web3.givenProvider !== null) 
    {

      connectToWeb3();
      web3.eth.net.getId()
      .then(function (result){
        networkCheck(result);  
    })
    }
    else
    {
      setIsMetamask(false);
    }
    
    
    
  }, []);
  

    ////////////////////////////
   //REAL TIME DATA TRACKING///
  ////////////////////////////
  useEffect(() => {
    // (1) define within effect callback scope
    if (web3.givenProvider !== null) 
    {
      const fetchData = async () => 
      {
        
        web3.eth.net.getId()
        .then(async function (result){
          networkCheck(result);  
          
          if(active && !!polarLPFarmContract && !!polarLPContract && result === 1313161554)
          {

              /////////////
              //POLARLPDATA///
            /////////////
            try{
              const polarLPAllowance = await polarLPContract.methods.allowance(account,polarLPFarmAddy).call();
              const polarLPEarnings = await polarLPFarmContract.methods.earned(account).call();
              const polarLPStake = await polarLPFarmContract.methods.balanceOf(account).call();
              const polarLPBalance = await polarLPContract.methods.balanceOf(account).call();
              setPolarLPBalance(polarLPBalance);
              setPolarLPEarnings(polarLPEarnings);
              setPolarLPStake(web3.utils.fromWei(polarLPStake));
              if(polarLPAllowance > 0)
              {
                setHasPolarLPAllowance(true)
              }
              getPolarLPData(polarContract,polarLPFarmContract);
              /////////////
              //BRLLPDATA///
            /////////////
              ////////////////////
              ///End BRLLPDATA///
              /////////////////
              const brlLPAllowance = await brlLPContract.methods.allowance(account,brlLPFarmAddy).call();
              const brlLPEarnings = await brlLPFarmContract.methods.earned(account).call();
              const brlLPStake = await brlLPFarmContract.methods.balanceOf(account).call();
              const brlLPBalance = await brlLPContract.methods.balanceOf(account).call();
              setBrlLPBalance(brlLPBalance);
              setBrlLPEarnings(brlLPEarnings);
              setBrlLPStake(web3.utils.fromWei(brlLPStake));
              if(brlLPAllowance > 0)
              {
                setHasBrlLPAllowance(true)
              }
              getBrlLPData(brlContract,brlLPFarmContract);
              ////////////////////
              ///End BRLLPDATA///
              /////////////////
            }
            
            catch(ex)
            {
            }
            //setIsFarmLoading(false);
              
          }
        })
      
      
    };

    const id = setInterval(() => {
      fetchData(); // <-- (3) invoke in interval callback
    }, 10000);
  
    fetchData(); // <-- (2) invoke on mount
  
    return () => clearInterval(id);
  }
  }, [active]);

  const connectToWeb3 = async () => {
    getPolarLPData(polarContract,polarLPFarmContract)
    getBrlLPData(brlContract,brlLPFarmContract)
  }
  
  const getPolarLPData = async (tokenContract,farmContract) => {
    try
    {
      let settings = { method: "Get" };
      let urlPolar = "https://api.coingecko.com/api/v3/simple/price?ids=polaris-token&vs_currencies=usd";
      let jsonPolar = await fetch(urlPolar, settings).then(res => res.json())
      //let urlETH = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
      //let jsonETH = await fetch(urlETH, settings).then(res => res.json())

      let polarPrice = jsonPolar['polaris-token']['usd'];
      //let ethPrice = jsonETH['ethereum']['usd'];
      setPolarPrice(polarPrice);
      //setEthPrice(ethPrice);

      //Calculate LP ratio and deduce price
      let polarLPSup = await polarLPContract.methods.totalSupply().call();
      let polarPairSup = await polarContract.methods.balanceOf(polarLPAddy).call();
      let polarPerLP = Number(web3.utils.fromWei(polarPairSup)) / Number(web3.utils.fromWei(polarLPSup));
      let pricePerLP = (polarPerLP*polarPrice)*2;
      setLPPrice(pricePerLP);

    const secondsInYear = 31536000
    const periodFinish = await farmContract.methods.periodFinish().call();
    const totalSupply = await farmContract.methods.totalSupply().call();
    const rewardRate = await farmContract.methods.rewardRate().call();
    const rewardPool = await tokenContract.methods.balanceOf(polarLPFarmAddy).call();
    const APRalt = ((parseFloat(web3.utils.fromWei(rewardRate))*polarPrice)/(parseFloat(web3.utils.fromWei(totalSupply))*pricePerLP))*secondsInYear*100
    setPolarLPAPR(APRalt);
    setPolarLPTotalStake(web3.utils.fromWei(String(totalSupply)));
    setPolarLPRewardPool(web3.utils.fromWei(rewardPool));
    const dateString = String(new Date(periodFinish*1000))
    setPeriodFinishPolarLP(dateString)
  }
    catch(ex){
  }
}

const getBrlLPData = async (tokenContract,farmContract) => {
  try
  {
    let settings = { method: "Get" };
    let urlBrl = "https://api.coingecko.com/api/v3/simple/price?ids=borealis&vs_currencies=usd";
    let jsonBrl = await fetch(urlBrl, settings).then(res => res.json())
    //let urlETH = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
    //let jsonETH = await fetch(urlETH, settings).then(res => res.json())

    let brlPrice = jsonBrl['borealis']['usd'];


      let urlPolar = "https://api.coingecko.com/api/v3/simple/price?ids=polaris-token&vs_currencies=usd";
      let jsonPolar = await fetch(urlPolar, settings).then(res => res.json())
      //let urlETH = "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";
      //let jsonETH = await fetch(urlETH, settings).then(res => res.json())

      let polarPrice = jsonPolar['polaris-token']['usd'];
      //let ethPrice = jsonETH['ethereum']['usd'];
    //let ethPrice = jsonETH['ethereum']['usd'];
   

    //Calculate LP ratio and deduce price
    let brlLPSup = await brlLPContract.methods.totalSupply().call();
    let brlPairSup = await brlContract.methods.balanceOf(brlLPAddy).call();
    let brlPerLP = Number(web3.utils.fromWei(brlPairSup)) / Number(web3.utils.fromWei(brlLPSup));
    let pricePerLP = (brlPerLP*brlPrice)*2;
    

    const secondsInYear = 31536000
    const periodFinish = await farmContract.methods.periodFinish().call();
    const totalSupply = await farmContract.methods.totalSupply().call();
    
    const rewardRate = await farmContract.methods.rewardRate().call();
    const rewardPool = await polarContract.methods.balanceOf(brlLPFarmAddy).call();
    console.log(rewardPool);
    const APRalt = ((parseFloat(web3.utils.fromWei(rewardRate))*polarPrice)/(parseFloat(web3.utils.fromWei(totalSupply))*pricePerLP))*secondsInYear*100
    setPolarPrice(polarPrice);
    setBrlLPPrice(pricePerLP);
    setBrlLPAPR(APRalt);
    setBrlLPTotalStake(web3.utils.fromWei(String(totalSupply)));
    setBrlLPRewardPool(web3.utils.fromWei(rewardPool));
    const dateString = String(new Date(periodFinish*1000))
    setPeriodFinishBrlLP(dateString)
}
  catch(ex){
}
}

   /////////////////////////////
   ///General Farm Functions//
   ///////////////////////////
   const handleApprove = async (tokenContract,farmAddy,ticker) => {
    
    if(!!tokenContract)
    {
        try {
          await tokenContract.methods.approve(farmAddy,'115792089237316195423570985008687907853269984665640564039457584007913129639935').send({from:account});  
          if(ticker === polarLPTicker)
          {
            setHasPolarLPAllowance(true);
          }
          if(ticker === brlLPTicker)
          {
            setHasBrlLPAllowance(true);
          }
          
        }catch(ex){
          return;
        } 
    }
  }

  const handleWithdrawRewards = async (farmContract) => {
    
    if(!!farmContract)
    {
        try {
          let earned = await farmContract.methods.earned(account).call();
          if(earned <= 0)
          {
            return;
          }
          await farmContract.methods.getReward().send({from:account});
        }catch(ex){
          return;
        } 
    }
  }
  const handleError = (ticker,errorTxt) =>
  {
    if(ticker === polarLPTicker)
    {
      setIsErrorPolarLP(true);
      setErrorPolarLPTxt(errorTxt);
    }
    if(ticker === brlLPTicker)
    {
      setIsErrorBrlLP(true);
      setErrorBrlLPTxt(errorTxt);
    }
  }

  const handleWithdraw = async (farmContract, amount, ticker) => {
    
    if(!!farmContract)
    {
        let staked = await farmContract.methods.balanceOf(account).call();
        if(isNaN(parseFloat(amount)))
        {
          let errorTxt=("Insert a valid "+ticker+" amount.")
          handleError(ticker,errorTxt);
          return;
        }
        if(parseFloat(web3.utils.toWei(String(amount))) > parseFloat(staked))
        {
          let errorTxt=("You don't have the specified amount of "+ticker+".")
          handleError(ticker,errorTxt)
          return;
        }
        if(parseFloat(amount) <= 0)
        {
          let errorTxt=('Invalid '+ticker+' Amount,')
          handleError(ticker,errorTxt)
          return;
        }

        try {
          await farmContract.methods.withdraw(web3.utils.toWei(String(parseFloat(amount)),'ether')).send({from:account});
        }catch(ex){
                  
          return;
        } 
    }
  }


  const handleMaxWithdraw = async (farmContract,ticker) => {
    
    if(!!farmContract)
    {
        try {
          let staked = await farmContract.methods.balanceOf(account).call();
          if(staked > 0)
          {
            await farmContract.methods.withdraw(staked).send({from:account});
          }
          else
          {
            let errorTxt =("You don't have any "+ticker+" tokens staked")
            handleError(ticker,errorTxt)
            return;
          }
          
        }catch(ex){
          return;
        } 
    }
  }

  const handleStake = async (farmContract,amount,ticker,balance) => {
    
    if(active && !!farmContract)
    {
        if(isNaN(parseFloat(amount)))
        {
          let errorTxt=("Insert a valid "+ticker+" amount.")
          handleError(ticker,errorTxt);
          return;
        }
        if(parseFloat(web3.utils.toWei(String(parseFloat(amount)))) > parseFloat(balance))
        {
          let errorTxt=("You don't have the specified amount of "+ticker+".")
          handleError(ticker,errorTxt)
          return;
        }
        if(amount <= '0')
        {
          let errorTxt=('Invalid '+ticker+' Amount,')
          handleError(ticker,errorTxt)
          return;
        }
        try {
          let cost = 0;
          await farmContract.methods.stake(web3.utils.toWei(amount,'ether')).send({from:account,value:cost});
          
          
        }catch(ex){
          return;
        } 
    }
  }

  const handleMaxStake = async (balance, farmContract, ticker) =>
  {
    try {
      let cost = 0;
      if(balance > 0)
      {
        await farmContract.methods.stake(balance).send({from:account,value:cost});
      }
      else
      {
        let errorTxt =("You don't have any "+ticker+" tokens to Stake")
        handleError(ticker,errorTxt)
        return;
      }
      
    }catch(ex){
    } 
  }

  /////////////////////////
  ////Text INPUT fields///
  //////////////////////

  const handlePolarLPStakeField = (event) => {
    setPolarLPStakeField(event.target.value);
    
  };
  const handlePolarLPWithdrawField = (event) => {
    setPolarLPWithdrawField(event.target.value);
    
  };

  const handleBrlLPStakeField = (event) => {
    setBrlLPStakeField(event.target.value);
    
  };
  const handleBrlLPWithdrawField = (event) => {
    setBrlLPWithdrawField(event.target.value);
    
  };

  ///GENERAL STAKE BUTTON HANDLING ///

  const handleStakeClose = (ticker) => {
    if(ticker === polarLPTicker)
    {
      setIsPolarLPStake(false);    
      setIsErrorPolarLP(false);
    }
    if(ticker === brlLPTicker)
    {
      setIsBrlLPStake(false);    
      setIsErrorBrlLP(false);
    }
  };
  const handleStakeOpen = (ticker) => {
    if(ticker === polarLPTicker)
    {
      setPolarLPWithdraw(false);
      setIsPolarLPStake(true);    
      setIsErrorPolarLP(false);
    }
    if(ticker === brlLPTicker)
    {
      setBrlLPWithdraw(false);
      setIsBrlLPStake(true);    
      setIsErrorBrlLP(false);
    }
      
  };

  const handleWithdrawClose = (ticker) => {
    if(ticker === polarLPTicker)
    {
      setPolarLPWithdraw(false);  
      setIsErrorPolarLP(false);  
    }
    if(ticker === brlLPTicker)
    {
      setBrlLPWithdraw(false);  
      setIsErrorBrlLP(false);  
    }
  };
  const handleWithdrawOpen = (ticker) => {
    if(ticker === polarLPTicker)
    {
      setIsPolarLPStake(false);    
      setPolarLPWithdraw(true);    
      setIsErrorPolarLP(false);
    }
    if(ticker === brlLPTicker)
    {
      setIsBrlLPStake(false);    
      setBrlLPWithdraw(true);    
      setIsErrorBrlLP(false);
    }
  };

  //////////////////////////////////
   ///END POLAR BUTTONS AND FIELDS//
   ///////////////////////////////

  return (

    <LeftContentSection style={{paddingTop:"128px"}}>
          <Row style={{display:'flex', justifyContent:'center'}}>
              <h6>Farming</h6>
          </Row>
          {isNetwork ? 
                  <>
        
        {/* ETH-PLRS LP FARM*/}      
        <Row gutter={12} style={{paddingBottom:'64px'}}>
              <Col lg={24} md={24} sm={24} xs={24} >
                  <CardDiv>
                  {/*active ?*/ } 

                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:24,paddingBottom:'0px'}}>
                    <b>{polarLPTicker} Pool</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'24px'}}>
                    <a href="https://swap.auroraswap.finance/#/add/BNB/0x631edd14bb0b2505c91176fEeDC5f082D27Dd5B8" target="_blank" rel="noreferrer">Create {polarLPTicker} (Add Liquidity on AuroraSwap)</a>
                  </Row>
                  <Row gutter={24} style={{display:'flex',  textAlign:"center", justifyContent:'center', fontSize:24,paddingBottom:'0px'}}>
                    <b>APR: {polarLPAPR.toFixed(2)}%</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'0px'}}>
                    <b>Total {polarLPTicker} Staked: {Number(polarLPTotalStake).toFixed(2)}</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex',  textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'0px'}}>
                    <b>Total Value Locked: ${(Number(polarLPTotalStake)*lpPrice).toFixed(0)}</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex',  textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'0px'}}>
                    <b>{polarTicker} Reward Pool: {Number(polarLPRewardPool).toFixed(2)} (${(Number(polarLPRewardPool)*polarPrice).toFixed(0)})</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'24px'}}>
                    <b>{polarTicker} Rewards Given: {(2000000000000-Number(Number(polarLPRewardPool).toFixed(2))).toFixed(2)} (${(Number((2000000000000-Number(Number(polarLPRewardPool).toFixed(2))).toFixed(2))*polarPrice).toFixed(0)})</b>
                  </Row>
                  {active ?
                    <>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', fontSize:18, paddingBottom:'12px'}}>
                        <Col>
                          <b>Your Stake: {Number(polarLPStake).toFixed(2)} ({((Number(polarLPStake)/Number(polarLPTotalStake))*100).toFixed(1)}%) {polarLPTicker} </b>
                        </Col>
                      </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', fontSize:18, paddingBottom:'12px'}}>
                        <Col>
                          <b>Your Earnings: {Number(web3.utils.fromWei(polarLPEarnings)).toFixed(2)} {polarTicker} (${(Number((Number(web3.utils.fromWei(polarLPEarnings)).toFixed(2)))*polarPrice).toFixed(0)})</b>
                        </Col>
                      </Row>
                      <Row gutter={24} style={{display:'flex', color:"#ff0000", textAlign:"center", justifyContent:'center', fontSize:16,paddingTop:'8px'}}>
                        <b>*2% Withdraw fee </b>
                        </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingTop:'12px',paddingBottom:'24px'}}>
                        <Col>
                          <div style={{width:"150px"}}>{!hasPolarLPAllowance ? <Button onClick={() => handleApprove(polarLPContract,polarLPFarmAddy,polarLPTicker)}>Approve {polarLPTicker} for Staking</Button> : <Button onClick={() =>handleStakeOpen(polarLPTicker)} >Stake your {polarLPTicker} </Button> }</div>
                        </Col>
                        
                        <Col>
                        <div style={{width:"150px"}}><Button onClick={() =>handleWithdrawOpen(polarLPTicker)}>Withdraw Staked {polarLPTicker}</Button></div>
                        </Col>
                        <Col>
                          <div style={{width:"150px"}}><Button onClick={() =>handleWithdrawRewards(polarLPFarmContract)}>Redeem {polarTicker} Rewards</Button></div>
                        </Col>
                      
                      </Row>
                      {isPolarLPStake ?//Yes
                      <>
                        <Row gutter={24} style={{borderTop:"3px solid #fff", display:'flex', textAlign:"center", justifyContent:'center', fontSize:14,paddingTop:'12px'}}>
                          STAKE {polarLPTicker}
                        </Row>
                        <Row gutter={24} style={{display:'flex', color:"#fff", textAlign:"center", justifyContent:'center', fontSize:18,paddingTop:'8px'}}>
                        <b>Your {polarLPTicker} Balance: {Number(web3.utils.fromWei(polarLPBalance)).toFixed(2)}</b>
                        </Row>
             
                        <Row gutter={22} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:20, paddingTop:"12px",}}>
                          <Col><b>Amount to Stake:</b></Col><Col> <Input onChange={handlePolarLPStakeField} value={polarLPStakeField} placeholder="Insert Amount to Stake"  style={{ width: 250, backgroundColor:'#fff', borderColor:'#fff', color:'#000' }} /></Col>
                        </Row>
                        <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                          <Col style={{width:"120px"}}><Button onClick={() => handleStake(polarLPFarmContract,polarLPStakeField,polarLPTicker,polarLPBalance)} >Stake {polarLPStakeField}</Button></Col><Col style={{width:"120px"}}><Button onClick={() => handleMaxStake(polarLPBalance,polarLPFarmContract,polarLPTicker)} >Stake MAX</Button></Col>
                        </Row>
                        <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                          <Col style={{width:"120px"}}><Button onClick={() =>handleStakeClose(polarLPTicker)} >Close</Button></Col>
                        </Row>
                      </>
                      ://No
                      <></>
                      }
                      {isPolarLPWithdraw ?//Yes
                      <>
                        <Row gutter={24} style={{borderTop:"3px solid #fff", display:'flex', textAlign:"center", justifyContent:'center', fontSize:14,paddingTop:'12px'}}>
                          WITHDRAW STAKED {polarLPTicker}
                        </Row>
                        <Row gutter={24} style={{display:'flex', color:"#fff", textAlign:"center", justifyContent:'center', fontSize:18,paddingTop:'8px'}}>
                        <b>Your Staked {polarLPTicker}: {Number(polarLPStake).toFixed(2)}</b>
                        </Row>
                        
                        <Row gutter={22} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:20, paddingTop:"12px",}}>
                          <Col><b>Amount to Withdraw:</b></Col><Col> <Input onChange={handlePolarLPWithdrawField} value={polarLPWithdrawField} placeholder="Insert Amount to Withdraw"  style={{ width: 250, backgroundColor:'#fff', borderColor:'#fff', color:'000' }} /></Col>
                        </Row>
                        <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                          <Col style={{width:"160px"}}><Button onClick={() => handleWithdraw(polarLPFarmContract,polarLPWithdrawField,polarLPTicker)} >Withdraw {polarLPWithdrawField}</Button></Col><Col style={{width:"160px"}}><Button onClick={() => handleMaxWithdraw(polarLPFarmContract,polarLPTicker)} >Withdraw MAX</Button></Col>
                        </Row>
                        <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                          <Col style={{width:"120px"}}><Button onClick={() =>handleWithdrawClose(polarLPTicker)} >Close</Button></Col>
                        </Row>
                      </>
                      ://No
                      <></>
                      }
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', fontSize:18, paddingTop:'12px'}}>
                            <Col style={{color:'#ff0000'}}>{isErrorPolarLP ? <>{errorPolarLPTxt}</> : <></> }</Col>
                      </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', fontSize:14, paddingTop:'12px'}}>
                            <Col style={{color:'#fff'}}>Rewards end {periodFinishPolarLP}</Col>
                      </Row>
                      
                    </>
                    :
                    <>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                        <Button onClick={connect} >Connect Wallet</Button>
                      </Row>
                    </>
                  }
                  
                  <div style={{paddingTop:'12px'}}>
                  </div>
                  {/*:*/}
                  {/*<>
                    <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                        <Button onClick={connect} >Connect Wallet</Button>
                    </Row>
                  </>*/}
                  
                  </CardDiv>
                  
              </Col>
          </Row>
        {/*END ETH-PLRS LP  STAKING */}
        {/* BRL-USDC LP FARM*/}      
        <Row gutter={12} style={{paddingBottom:'64px'}}>
              <Col lg={24} md={24} sm={24} xs={24} >
                  <CardDiv>
                  {/*active ?*/ } 

                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:24,paddingBottom:'0px'}}>
                    <b>{brlLPTicker} Pool</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'24px'}}>
                    <a href="https://swap.auroraswap.finance/#/add/0x12c87331f086c3C926248f964f8702C0842Fd77F/0xB12BFcA5A55806AaF64E99521918A4bf0fC40802" target="_blank" rel="noreferrer">Create {brlLPTicker} (Add Liquidity on AuroraSwap)</a>
                  </Row>
                  <Row gutter={24} style={{display:'flex',  textAlign:"center", justifyContent:'center', fontSize:24,paddingBottom:'0px'}}>
                    <b>APR: {brlLPAPR.toFixed(2)}%</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'0px'}}>
                    <b>Total {brlLPTicker} Staked: {Number(brlLPTotalStake).toFixed(10)}</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex',  textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'0px'}}>
                    <b>Total Value Locked: ${(Number(brlLPTotalStake)*brlLPPrice).toFixed(0)}</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex',  textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'0px'}}>
                    <b>{polarTicker} Reward Pool: {Number(brlLPRewardPool).toFixed(2)} (${(Number(brlLPRewardPool)*polarPrice).toFixed(0)})</b>
                  </Row>
                  
                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:18,paddingBottom:'24px'}}>
                    <b>{polarTicker} Rewards Given: {(500000000000-Number(Number(brlLPRewardPool).toFixed(2))).toFixed(2)} (${(Number((500000000000-Number(Number(brlLPRewardPool).toFixed(2))).toFixed(2))*polarPrice).toFixed(0)})</b>
                  </Row>
                  {active ?
                    <>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', fontSize:18, paddingBottom:'12px'}}>
                        <Col>
                          <b>Your Stake: {Number(brlLPStake)} ({((Number(brlLPStake)/Number(brlLPTotalStake))*100)}%) {brlLPTicker} </b>
                        </Col>
                      </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', fontSize:18, paddingBottom:'12px'}}>
                        <Col>
                          <b>Your Earnings: {Number(web3.utils.fromWei(brlLPEarnings)).toFixed(2)} {polarTicker} (${(Number((Number(web3.utils.fromWei(brlLPEarnings)).toFixed(2)))*polarPrice).toFixed(0)})</b>
                        </Col>
                      </Row>
                      <Row gutter={24} style={{display:'flex', color:"#FFFF00", textAlign:"center", justifyContent:'center', fontSize:16,paddingTop:'8px'}}>
                        <b>*No fees </b>
                        </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingTop:'12px',paddingBottom:'24px'}}>
                        <Col>
                          <div style={{width:"150px"}}>{!hasBrlLPAllowance ? <Button onClick={() => handleApprove(brlLPContract,brlLPFarmAddy,brlLPTicker)}>Approve {brlLPTicker} for Staking</Button> : <Button onClick={() =>handleStakeOpen(brlLPTicker)} >Stake your {brlLPTicker} </Button> }</div>
                        </Col>
                        
                        <Col>
                        <div style={{width:"150px"}}><Button onClick={() =>handleWithdrawOpen(brlLPTicker)}>Withdraw Staked {brlLPTicker}</Button></div>
                        </Col>
                        <Col>
                          <div style={{width:"150px"}}><Button onClick={() =>handleWithdrawRewards(brlLPFarmContract)}>Redeem {polarTicker} Rewards</Button></div>
                        </Col>
                      
                      </Row>
                      {isBrlLPStake ?//Yes
                      <>
                        <Row gutter={24} style={{borderTop:"3px solid #fff", display:'flex', textAlign:"center", justifyContent:'center', fontSize:14,paddingTop:'12px'}}>
                          STAKE {brlLPTicker}
                        </Row>
                        <Row gutter={24} style={{display:'flex', color:"#fff", textAlign:"center", justifyContent:'center', fontSize:18,paddingTop:'8px'}}>
                        <b>Your {brlLPTicker} Balance: {Number(web3.utils.fromWei(brlLPBalance)).toFixed(10)}</b>
                        </Row>
             
                        <Row gutter={22} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:20, paddingTop:"12px",}}>
                          <Col><b>Amount to Stake:</b></Col><Col> <Input onChange={handleBrlLPStakeField} value={brlLPStakeField} placeholder="Insert Amount to Stake"  style={{ width: 250, backgroundColor:'#fff', borderColor:'#fff', color:'#000' }} /></Col>
                        </Row>
                        <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                          <Col style={{width:"120px"}}><Button onClick={() => handleStake(brlLPFarmContract,brlLPStakeField,brlLPTicker,brlLPBalance)} >Stake {brlLPStakeField}</Button></Col><Col style={{width:"120px"}}><Button onClick={() => handleMaxStake(brlLPBalance,brlLPFarmContract,brlLPTicker)} >Stake MAX</Button></Col>
                        </Row>
                        <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                          <Col style={{width:"120px"}}><Button onClick={() =>handleStakeClose(brlLPTicker)} >Close</Button></Col>
                        </Row>
                      </>
                      ://No
                      <></>
                      }
                      {isBrlLPWithdraw ?//Yes
                      <>
                        <Row gutter={24} style={{borderTop:"3px solid #fff", display:'flex', textAlign:"center", justifyContent:'center', fontSize:14,paddingTop:'12px'}}>
                          WITHDRAW STAKED {brlLPTicker}
                        </Row>
                        <Row gutter={24} style={{display:'flex', color:"#fff", textAlign:"center", justifyContent:'center', fontSize:18,paddingTop:'8px'}}>
                        <b>Your Staked {brlLPTicker}: {Number(brlLPStake).toFixed(10)}</b>
                        </Row>
                        
                        <Row gutter={22} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:20, paddingTop:"12px",}}>
                          <Col><b>Amount to Withdraw:</b></Col><Col> <Input onChange={handleBrlLPWithdrawField} value={brlLPWithdrawField} placeholder="Insert Amount to Withdraw"  style={{ width: 250, backgroundColor:'#fff', borderColor:'#fff', color:'000' }} /></Col>
                        </Row>
                        <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                          <Col style={{width:"160px"}}><Button onClick={() => handleWithdraw(brlLPFarmContract,brlLPWithdrawField,brlLPTicker)} >Withdraw {brlLPWithdrawField}</Button></Col><Col style={{width:"160px"}}><Button onClick={() => handleMaxWithdraw(brlLPFarmContract,brlLPTicker)} >Withdraw MAX</Button></Col>
                        </Row>
                        <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                          <Col style={{width:"120px"}}><Button onClick={() =>handleWithdrawClose(brlLPTicker)} >Close</Button></Col>
                        </Row>
                      </>
                      ://No
                      <></>
                      }
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', fontSize:18, paddingTop:'12px'}}>
                            <Col style={{color:'#ff0000'}}>{isErrorBrlLP ? <>{errorBrlLPTxt}</> : <></> }</Col>
                      </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', fontSize:14, paddingTop:'12px'}}>
                            <Col style={{color:'#fff'}}>Rewards end {periodFinishBrlLP}</Col>
                      </Row>
                      
                    </>
                    :
                    <>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                        <Button onClick={connect} >Connect Wallet</Button>
                      </Row>
                    </>
                  }
                  
                  <div style={{paddingTop:'12px'}}>
                  </div>
                  {/*:*/}
                  {/*<>
                    <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                        <Button onClick={connect} >Connect Wallet</Button>
                    </Row>
                  </>*/}
                  
                  </CardDiv>
                  
              </Col>
          </Row>
        {/*END ETH-PLRS LP  STAKING */}
          
        </>
                  
        :
        <>
        <CardDiv>
          {!isMetamask ?
          <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingTop:'12px'}}>
            <Col><b>Please install the Metamask Browser Extension or use the Metamask Mobile App.</b></Col>
          </Row>
          :
          <>
          {isLoadingNetwork ?
          <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18,paddingTop:'12px'}}>
            <Col><b>Checking Network.</b></Col>
          </Row>
          :
          <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingTop:'12px'}}>
            <Col><b>Wrong network! Please switch to the Aurora Chain Mainnet.</b></Col>
          </Row>
          }
          </>
        }
        </CardDiv>
        </>
        } 
        <Row gutter={12} style={{paddingBottom:'64px'}}>
              <Col lg={24} md={24} sm={24} xs={24} >
                  <CardDiv>
                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:24,paddingBottom:'0px'}}>
                    <b>Also check the BRL-PLRS LP farm on AuroraSwap!</b>
                  </Row>
                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', fontSize:24,paddingBottom:'0px'}}>
                    <a href="https://app.auroraswap.finance/farms" target="_blank" rel="noreferrer">Link to AuroraSwap farms</a>
                  </Row>
                  </CardDiv>
              </Col>
        </Row>
    
          <div style={{paddingTop:'96px',paddingBottom:'48px'}}>

          </div>
          


          
    </LeftContentSection>
  );
};

export default Farm;
