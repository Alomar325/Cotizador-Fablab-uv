import { Row, Col, Input, Table, DatePicker,} from "antd";
//import { SvgIcon } from "../../../common/SvgIcon";
//import { ContentBlockProps } from "../types";
//import { AudioOutlined } from '@ant-design/icons';
//import { Slide } from "react-awesome-reveal";
import { useParams } from "react-router-dom";
import Web3 from 'web3';
import lockerABI from '../../../contracts/lockerABI.json';
import tokenABI from '../../../contracts/tokenABI.json';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils/types'
import { useWeb3React } from "@web3-react/core"
import { injected } from "../../../MMConnect"
import { Button } from "../../../common/Buttons/Button";
import { useState, useEffect } from 'react';
import {
  LeftContentSection,
  CardWrap,
} from "./styles";

const web3 = new Web3(Web3.givenProvider);

  

function Locker(){

  //URL Params
  interface RouteParams {
    token: string
    owner: string
  }
  const params = useParams<RouteParams>();
  
  //console.log(params.token);
  //console.log(params.owner);

  const columns = [
    {
      title: 'Amount',
      dataIndex: 'amnt',
      key: 'amnt',
    },
    {
      title: 'Release Date',
      dataIndex: 'rDate',
      key: 'rDate',
    },
  ];
  const [data,setData] = useState([{}])
  
  
  //Web3 Stuff
  const { active, account, activate} = useWeb3React()
 
  
  async function connect() {
    try {
      await activate(injected)
      const lockCostVal = await contract.methods.lockCost().call();  
      //const unlockCostVal = await contract.methods.unlockCost().call();  
      setLockCost(lockCostVal);
      //setUnlockCost(unlockCostVal);
    } catch (ex) {
      //console.log(ex)
    }
  }

  /*async function disconnect() {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }*/

  //Field hooks
  const [wallet,setWallet] = useState("");
  const [walletField, setWalletField] = useState("");
  const [tokenV,setTokenV] = useState("");
  const [tokenL,setTokenL] = useState("");
  const [tokenVField,setTokenVField] = useState("");
  const [tokenLField,setTokenLField] = useState("");
  const [tAmount,setTAmount] = useState("");
  const [futureDate,setFutureDate] = useState(0);
  const [isErrorV, setIsErrorV] = useState(false);
  const [errorVTxt, setErrorVTxt] = useState('');
  const [isErrorL, setIsErrorL] = useState(false);
  const [errorLTxt, setErrorLTxt] = useState('');
  const [lockCost, setLockCost] = useState(0);
  //const [unlockCost, setUnlockCost] = useState(0);
  const [unlockable, setUnlockable] = useState(false);
  const [ownerViewing, setOwnerViewing] = useState(false);
  const [isRef, setRef] = useState(false);

  //Locker address
  const [ contract, setContract ] = useState<Contract | null>(null);
  const [ tcontract, setTContract ] = useState<Contract | null>(null);
  const [ vcontract, setVContract ] = useState<Contract | null>(null);


  const lockerAddy = "0x707D00B9363d921CfCC44158910180BE49B81bAd";
  const connectToWeb3 = async () => {
    const lockerContract = new web3.eth.Contract(lockerABI as AbiItem[], lockerAddy);
    setContract(lockerContract);
    
  }

  const connectToToken = (taddy) => 
  {
    try 
    {
      const tokenContract = new web3.eth.Contract(tokenABI as AbiItem[], taddy);
      setTContract(tokenContract);
      setTokenL(taddy);
      
      
    }catch(ex) 
    {
      //console.log(ex);
    }
  }

  const connectToTokenV = (taddy) => 
  {
    try 
    {
      const tokenContract = new web3.eth.Contract(tokenABI as AbiItem[], taddy);
      setVContract(tokenContract);
      setTokenV(taddy);
      
    }catch(ex) 
    {
      //console.log(ex);
    }
  }

    
    //Field data
    //View Wallet
    const handleWalletChange = (event) => {
      setWalletField(event.target.value);
      if(web3.utils.isAddress(event.target.value))
      {
        setWallet(event.target.value);
      }
      else
      {
        setWallet('');
      }
    };
    //View Token
    const handleTokenVChange = (event) => {
      setTokenVField(event.target.value);
      if(web3.utils.isAddress(event.target.value))
      {
        connectToTokenV(event.target.value);    
      }
      else
      {
        setVContract(null)
        setTokenV('');
      }
    };

    //Locker Token
    const handleTokenLChange = (event) => {
      setTokenLField(event.target.value);
      if(web3.utils.isAddress(event.target.value))
      {
        connectToToken(event.target.value);    
      }
      else
      {
        setTContract(null)
        setTokenL('');
      }
      
    };
    
    const handleAmountChange = (event) => {
      setTAmount(event.target.value);
    };

    const handleInsertAddress = () =>
    {
      setWallet(account);
      setWalletField(account);
      
    }

    function onOk(value) {
      const future=Math.floor(value._d/1000); 
      setFutureDate(future);
    }

  //Retrieve contract 
  useEffect(() => {
    connectToWeb3();
    const web3 = new Web3(Web3.givenProvider);
    if(web3.utils.isAddress(params.token))
      {
        setTokenV(params.token);
        setTokenL(params.token);
        setTokenVField(params.token);
        setTokenLField(params.token);
        connectToToken(params.token);
        connectToTokenV(params.token);
      }
      if(web3.utils.isAddress(params.owner))
      {
        setWallet(params.owner);
        setWalletField(params.owner);
      }
  }, [])

  //Viewer
  const fetchLock = async () => 
  {
    if(!!contract && !!vcontract)
    {
      if(wallet === '')
      {
        setIsErrorV(true);
        setErrorVTxt('You have not specified a valid wallet address.')
        return;
      }
      if(tokenV === '')
      {
        setIsErrorV(true);
        setErrorVTxt('You have not specified a valid token address.')
        return;
      }
      var lockAmnt = 0;
      var releaseDate = 0;
      try{
        lockAmnt = await contract.methods.lockedTokenAmount(wallet,tokenV).call();
        lockAmnt = Number(web3.utils.fromWei(String(lockAmnt),'ether'));
        releaseDate = await contract.methods.releaseTime(wallet,tokenV).call();
      }catch(ex){
        setIsErrorV(true);
        setErrorVTxt('Invalid wallet or token address.')
        return;
      }
      //If the unlock date has passed and the owner is viewing
      if(releaseDate < new Date().getTime()/1000 && lockAmnt !== 0)
      {
        setUnlockable(true);
        
      }
      if(account === wallet && lockAmnt !== 0)
      {
        setOwnerViewing(true);
      }

      const dateString = new Date(releaseDate*1000)
      

      var ticker = ''
      try
      {
        ticker = await vcontract.methods.name().call();  
      }catch(ex)
      {
        setIsErrorV(true);
        setErrorVTxt('Invalid token address')
        return;
      }
      var amount = lockAmnt.toString();
      amount = lockAmnt +' '+ticker
      if(lockAmnt === 0)
      {
        setData([{amnt:'None',rDate:'No '+ ticker+' tokens locked by this wallet'}]) 
        setIsErrorV(false);
      }
      else
      {
        setData([{amnt:amount,rDate:dateString.toUTCString()}]) 
        setIsErrorV(false);
        setRef(true);
      }
      
    }
    else
    {
      setIsErrorV(true);
      setErrorVTxt('You have not specified a valid token address.')
    }
  };
  //Unlocker
  const unlockTokens = async () => {
    if(!!contract && !!vcontract)
    {
        await contract.methods.release(tokenV).send({from:account});  
        setIsErrorV(false);
        setUnlockable(false);
        setOwnerViewing(false);
    }
    else
    {
      setIsErrorV(true);
      setErrorVTxt("Error.")
    }
  }

  //Locker 
  const lockApprove = async () => {
    
    if(!!tcontract)
    {
        try{
          await tcontract.methods.balanceOf(account).call();
        }
        catch(ex){
          setIsErrorL(true);
          setErrorLTxt('Invalid or unsupported token address.')
          return;
        }
        try {
          await tcontract.methods.approve(lockerAddy,'115792089237316195423570985008687907853269984665640564039457584007913129639935').send({from:account});  
        }catch(ex){
          setIsErrorL(true);
          setErrorLTxt('Invalid or unsupported token address.')
          return;
        } 
        setIsErrorL(false);
    }
    else
    {
      setIsErrorL(true);
      setErrorLTxt('You have not specified a valid token address.')
    }
  }

  const tokenLock = async () =>{
    if(!!contract && !!tcontract)
    {
      
         
      
      if(futureDate === 0)
      {
        setIsErrorL(true);
        setErrorLTxt('Insert a valid date.')
        return;
      }
      if(futureDate < Math.round(new Date().getTime()/1000))
      {
        setIsErrorL(true);
        setErrorLTxt('The specified date must be in the future.')
        return;
      }
      if(isNaN(parseInt(tAmount)))
      {
        setIsErrorL(true);
        setErrorLTxt('Insert a valid token amount.')
        return;
      }
      var tokenBalance = '0';
      try{
        tokenBalance = await tcontract.methods.balanceOf(account).call();
      }
      catch(ex){
        setIsErrorL(true);
        setErrorLTxt('Invalid or unsupported token address.')
        return;
      }
      
      //this extra conditional is needed ALRIGHT?
      if(tokenBalance === '0')
      {
        setIsErrorL(true);
        setErrorLTxt('You do not own any amount of the specified token.')
        return;
      }
      //console.log(tokenBalance);
      //console.log(tAmount);
      //  console.log(parseInt(tokenBalance)/(10**18));
      if(parseInt(tAmount) > parseInt(tokenBalance)/(10**18))
      {
      //  console.log(tAmount);
      //  console.log(tokenBalance);
        setIsErrorL(true);
        setErrorLTxt('You do not own the specified amount of tokens.')
        return;
      }
      if(tAmount < '0')
      {
        setIsErrorL(true);
        setErrorLTxt('You cannot use a negative amount of tokens.')
        return;
      }
      //console.log(web3.utils.toWei(tAmount,"ether"));
      try{
        await contract.methods.lockTokens(tokenL,web3.utils.toWei(tAmount,"ether"),futureDate).send({from:account,value:lockCost});
        
      }catch(ex){
        //console.log(ex);
        setIsErrorL(true);
        setErrorLTxt('Contract Error. You may need to approve the Contract.')
        return;
      }
      setIsErrorL(false);
        
      
    }
    else
    {
      setIsErrorL(true);
      setErrorLTxt('You have not specified a valid token address.')
    }
    
  };







  




  return (
    
    <LeftContentSection >

      <Row gutter={12} id='intro'>
          <Col lg={24} md={24} sm={24} xs={24} style={{display:'flex', justifyContent:'center'}}>
              <h6>Liquidity Locker</h6>
          </Col>
          
        </Row>
            <Row gutter={12} style={{paddingTop:'48px'}}>
              <Col lg={24} md={24} sm={24} xs={24} >
                <CardWrap>
                  <div style={{backgroundColor: 'rgba(11,11,11,0.8)', color: '#fff',border:"2px solid #fff ",borderRadius:"10px",padding:"20px"}} >
                  <Row gutter={24} style={{display:'flex', textAlign:"center", justifyContent:'center', color:'#fff', fontSize:32, textShadow:"1px 1px 6px rgba(255, 255, 255, 0.8)",paddingBottom:'24px'}}>
                    <b>View/Unlock Liquidity Lockers</b>
                  </Row>
                  {active ? 
                  <>
                    <Row onClick={handleInsertAddress} gutter={24} style={{display:'flex', justifyContent:'center', color:'#ec4344', fontSize:12, textShadow:"2px 2px 6px rgba(236, 67, 68, 0.5)"}}>
                      <a href="#/" style={{color:'#00dbde'}}>Click to insert your address.</a>
                    </Row>

                  
                  <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                  <Col>Wallet Address</Col> <Col><Input onChange={handleWalletChange} value={walletField} placeholder="Insert Wallet Address"  style={{ width: 250, backgroundColor:'#fff', borderColor:'#000', color:'#000' }} /></Col>
                  </Row>
                  <Row gutter={22} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18}}>
                  <Col>Token Address:</Col><Col> <Input onChange={handleTokenVChange} value={tokenVField} placeholder="Insert Token Address"  style={{ width: 250, backgroundColor:'#fff', borderColor:'#000', color:'#000' }} /></Col>
                  </Row>
                  <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingTop:'24px'}}>
                    <Button onClick={fetchLock}>Search</Button>
                  </Row>
                  <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingTop:'12px'}}>
                      <Col style={{color:'#00dbde'}}>{isErrorV ? <>{errorVTxt}</> : <></> }</Col>
                  </Row>
                  <div style={{paddingTop:'12px'}}>
                    <Table columns={columns} dataSource={data} pagination={{ pageSize: 3, position:['bottomCenter']}} />
                  </div>
                  {isRef ? 
                  <p style={{wordWrap:"break-word",  textAlign:"center", color:'#fff', fontSize:16, paddingTop:'12px'}}>
                    Share Link: https://polaristoken.io/Locker/{tokenV}/{wallet}
                  </p>
                  :
                  <></>}
                  
                  {unlockable ?
                    <>{ownerViewing ? 
                        <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingTop:'0px'}}>
                          <Button onClick={unlockTokens}> Unlock Tokens</Button>
                        </Row>
                      :
                      <></>
                      }
                      
                    </>
                  :
                  <>
                    {ownerViewing ? <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingTop:'0px'}}>
                      You can't unlock these tokens yet.
                      </Row> : <></>}
                  </>
                  }
                  </>
                  :
                  <>
                    <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                        <Button onClick={connect} >Connect Wallet</Button>
                    </Row>
                  </>
                  }
                  </div>
                  
                </CardWrap>
              </Col>
          </Row>

          <Row gutter={12} id="locker" style={{paddingTop:'48px'}}>
              <Col lg={24} md={24} sm={24} xs={24}>
                <CardWrap>
                  <div style={{backgroundColor: 'rgba(11,11,11,0.8)', color: '#fff',border:"2px solid #fff ",borderRadius:"10px",padding:"20px"}} >
                    <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:32, textShadow:"1px 1px 6px rgba(255, 255, 255, 0.5)",paddingBottom:'24px'}}>
                      <b>Create Locker</b>
                    </Row>
                    {active ? 
                    <>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                      <Col>Token Address:</Col> <Col><Input onChange={handleTokenLChange} value={tokenLField} placeholder="Insert Token Address"  style={{ width: 250, backgroundColor:'#fff', borderColor:'#000', color:'#000' }} /></Col>
                      </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                      <Col>Token Amount:</Col><Col> <Input onChange={handleAmountChange} placeholder="Insert Amount to Lock"  style={{ width: 250, backgroundColor:'#fff', borderColor:'#000', color:'#000' }} /></Col>
                      </Row>
                      <Row gutter={30} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18}}>
                      <Col>Release Time:</Col><Col> <DatePicker style={{ width: 250, backgroundColor:'#fff', borderColor:'#000', color:'#000' }} showTime onOk={onOk} /></Col>
                      </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingTop:'24px'}}>
                        <Col style={{width:'120px'}}><Button onClick={lockApprove}> Approve</Button></Col><Col style={{width:'120px'}}><Button onClick={tokenLock}>Lock </Button></Col> 
                      </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#fff', fontSize:18, paddingTop:'24px'}}>
                        <Col style={{color:'#00dbde'}}>{isErrorL ? <>{errorLTxt}</> : <></> }</Col>
                      </Row>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center', color:'#00DBDE', fontSize:18, paddingTop:'24px'}}>
                        <Col>Lock Fee: {lockCost/(10**18)} ETH</Col>
                      </Row>
                    </> : 
                    <>
                      <Row gutter={24} style={{display:'flex', justifyContent:'center',  color:'#fff', fontSize:18, paddingBottom:'12px'}}>
                        <Button onClick={connect} >Connect Wallet</Button>
                      </Row>
                    </>
                    }
                    
                    
                    
                    
                    
                  </div>
                  
                </CardWrap>
              </Col>
          </Row>
          


          
    </LeftContentSection>
  );
};

export default Locker;
