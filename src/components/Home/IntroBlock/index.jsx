import { Row, Col, Input } from "antd";
import { useRanger } from "react-ranger";
import { useState } from "react";
import { Button } from "../../../common/Buttons/Button";
import FadeIn from 'react-fade-in';
import ComboBox from 'react-responsive-combo-box';
import 'react-responsive-combo-box/dist/index.css';
import styled from "styled-components";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from './OrbitControls.js';
import { STLLoader } from './STLLoader';




 // npm i --save react-ranger, npm i --save three
import {
  RightBlockContainer,
  //ContentWrapper,
  Cimg,
} from "./styles";
import { Link } from "react-router-dom";

/*

*/



 /* <ComboBox options={data}
  placeholder='Elige Impresora.' enableAutocomplete 
  style={{ width: '100px', margin: '30px' }}
  inputStyles={{ border: '1px solid #333' }}
  />*/

function RightBlock() {

  const axios = require('axios');
  const [material, setMaterial] = useState("");
  const [infill, setInfill] = useState("");
  const [Cal, setCal] = useState("");
  const [XL, setXL] = useState("");
  const [YL, setYL] = useState("");
  const [ZL, setZL] = useState("");
  const [tiempoH, setTiempoH] =useState("");
  const [tiempoM, setTiempoM] =useState("");
  const [volumen, setVolumenR] = useState("");
  const [volumenT, setVolumenT] = useState("");
  const [precio, setPrecio] = useState("");
  const [cant, setCantidad] = useState("");
  const [values, setValues] = useState([0]);
  const [cantM, setCantidadM] = useState(1);
  const [cantArrayM, setCantidadArrayM] = useState([]);
  const [nombreArch, setNombreArch] = useState("");
  //Stepper y criptopago
  const [nPaso, setNPaso] = useState(0);
  const [usdBTC, setUSDBTC] = useState(0);
  const [usdLTC, setUSDLTC] = useState(0);
  const [usdCLP, setUSDCLP] = useState(0);
  const [selectedCrypto, setSelectedCrypto] = useState("Bitcoin");
  const [emailField, setEmailField] = useState("");
  const [invoiceId, setInvoiceId] = useState("");

  //los arreglos de los datos de cada modelo
  const [precioTotal, setPrecioTotal] = useState(0);


  const [arrayModelosT, setArrayModelosT] = useState([]);

  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);

  //Generar query a backend
  async function createInvoice(price,email){
    const axiosClient = axios.create({
      baseURL: "https://www.fablabitcc.com/api",
      timeout: 5000,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
    const invoiceCreation = {
      "price": price,   
      "store_id": "XdmMnpWqgkbTHVnszjCEULqAhKeHAyyU",
      "currency": "CLP",
      "buyer_email":email,
      "status":"pending",
    };
    setNPaso(3);
    const response = await axiosClient.post("/invoices", invoiceCreation);
    const invoice = response.data.id;
    setInvoiceId(invoice);
    window.bitcart.showInvoice(invoice);
    
  }
  async function viewInvoice(){
    window.bitcart.showInvoice(invoiceId);
  }
  //Fin query backend

  const handleEmailField = (event) => {
    setEmailField(event.target.value);
    
  };
  
  function cambiarPaso(paso)
  {
    setNPaso(paso);
    if(nPaso !== 1 && nPaso !== 0)
    {
      otroModelo();
    }
    
    
  }

  function nuevaOrden()
  {
    setNPaso(0);
    otroModelo();
    setCantidadM(1);
    setCantidadArrayM([]);
    setArrayModelosT([]);
    setPrecioTotal(0);
    
  }

  useEffect(() => {
    async function obtenerPrecios(){
      const responseBTC = await axios.get("https://api.blockchain.com/v3/exchange/tickers/BTC-USD");
      const responseLTC = await axios.get("https://api.blockchain.com/v3/exchange/tickers/LTC-USD");
      const responseCLP = await axios.get("https://mindicador.cl/api/dolar");
      setUSDBTC(responseBTC.data.last_trade_price)
      setUSDLTC(responseLTC.data.last_trade_price)
      setUSDCLP(responseCLP.data.serie[0].valor)
    }
  obtenerPrecios();
  }, []);

  

  const ModelViewer = ({model}) => {
    
    const mountRef = useRef(null);
    useEffect(() => {
      //Creacion de escena
      var scene = new THREE.Scene();
      scene.background = new THREE.Color( "#0033FF" ); //color del fondo
      //Creación de camara
      var camera = new THREE.PerspectiveCamera( 40, 450 / 450, 0.1, 2000 );
      

      //Renderizador
      var renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setClearColor(0xffffff, 0);
      renderer.setSize(450, 450);
      //renderer.setSize(720, 460 );
  
      //Montar a componente funcional React
      mountRef.current.appendChild( renderer.domElement );
      
  
      //Carga de modelo 3D
      var loader = new STLLoader();
      loader.load(model, function(geometry) {
        //Opciones de modelo 3D
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
          color: "#9900FF", //color del modelo 3D
          //wireframe: true
        }));
        
        mesh.rotation.set(-Math.PI / 2, 0, 0);
        mesh.position.set( 0, 0, 0 );
        mesh.scale.set(0.1, 0.1, 0.1);
        scene.add(mesh);
        //Caja de bordes (para obtener medidas)
        var bbox = new THREE.Box3();
        
        bbox.setFromObject( mesh );
        var cent = new THREE.Vector3();
        bbox.getCenter(cent);
        //Determinación de medidas
        var YLength = bbox.max.y - bbox.min.y;
        var XLength = bbox.max.x - bbox.min.x;
        var ZLength = bbox.max.z - bbox.min.z;
        
        camera.position.set(cent.x+XLength,cent.y+5,cent.z+ZLength+15);
        console.log("stl volume is " + getVolume(geometry));
        setXL(XLength.toFixed(2));
        setYL(YLength.toFixed(2));
        setZL(ZLength.toFixed(2));  
        setVolumenT(getVolume(geometry)/1000);
        var precioModelo = 0;
        
        var volumenRestante = (((getVolume(geometry)/1000)*infill)/100).toFixed(2);
        setVolumenR(volumenRestante);
        var hora = 0;
        if(material == "Resina"){
          setCal("Alta");
        }
        if(Cal == "Alta"){
          hora = (((volumenRestante)*23).toFixed(0))/60;
        }
        if(Cal == "Media"){
          hora = ((volumenRestante*12).toFixed(0))/60;
        }
        if(Cal == "Baja"){
          hora = ((volumenRestante*9).toFixed(0))/60;
        }
        var minutos = hora - Math.trunc(hora);
        hora = hora - minutos;
        minutos = minutos * 60;
        setTiempoH(hora);
        setTiempoM(Math.trunc(minutos));
        precioModelo = Math.round((((1.27*volumenRestante).toFixed(2)*20000)/1000)+((hora+(minutos/60))*1000));
        if(material=="Resina"){
          precioModelo*=2;
        }
        if(cant !=1){
          precioModelo = precioModelo*cant;
        }
        setPrecio(precioModelo);
        //Controles orbitales
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( cent.x, cent.y, cent.z );
        controls.update();
        controls.enablePan = false;
        controls.enableDamping = true;
        //suelo es el mesh2
        const mesh2 = new THREE.Mesh( new THREE.PlaneGeometry( XLength+100, XLength+100 ), new THREE.MeshPhongMaterial( { color: "#d9d7d9", depthWrite: false } ) );
				mesh2.rotation.x = - Math.PI / 2;
				mesh2.receiveShadow = true;
        mesh2.position.set(0,bbox.min.y,0);
				scene.add( mesh2 );
        // Iluminacion
        var lightz = new THREE.DirectionalLight(0xffffff);
        lightz.position.set(0,0,ZLength*3);
        scene.add(lightz);
  
        var lightz2 = new THREE.DirectionalLight(0xffffff);
        lightz2.position.set(0,0,-ZLength*3);
        scene.add(lightz2);
  
        var lighty = new THREE.DirectionalLight(0xffffff);
        lighty.position.set(0,YLength*3,0);
        scene.add(lighty);

        var lightx = new THREE.DirectionalLight(0xffffff);
        lightx.position.set(XLength*3,0,0);
        scene.add(lightx);

        var lightx2 = new THREE.DirectionalLight(0xffffff);
        lightx2.position.set(-XLength*3,0,0);
        scene.add(lightx2);
        });
      
      // check with known volume:
      /*var hollowCylinderGeom = new THREE.LatheBufferGeometry([
        new THREE.Vector2(1, 0),
        new THREE.Vector2(2, 0),
        new THREE.Vector2(2, 2),
        new THREE.Vector2(1, 2),
        new THREE.Vector2(1, 0)
      ], 90).toNonIndexed();
      //console.log("pre-computed volume of a hollow cylinder (PI * (R^2 - r^2) * h): " + Math.PI * (Math.pow(2, 2) - Math.pow(1, 2)) * 2);
      //console.log("computed volume of a hollow cylinder: " + getVolume(hollowCylinderGeom));*/
      
      //Obtener volumen de un Modelo 3D

      
      function getVolume(geometry) {
      
        let position = geometry.attributes.position;
        let faces = position.count / 3;
        let sum = 0;
        let p1 = new THREE.Vector3(),
          p2 = new THREE.Vector3(),
          p3 = new THREE.Vector3();
        for (let i = 0; i < faces; i++) {
          p1.fromBufferAttribute(position, i * 3 + 0);
          p2.fromBufferAttribute(position, i * 3 + 1);
          p3.fromBufferAttribute(position, i * 3 + 2);
          sum += signedVolumeOfTriangle(p1, p2, p3);
          //console.log(p1,p2,p3);
        }
        return sum;
      
      }
  
      function signedVolumeOfTriangle(p1, p2, p3) {
        return p1.dot(p2.cross(p3)) / 6.0;
      }
      //Función para lidiar con el cambio de display, verificar mas adelante
      /*let onWindowResize = function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }
  
      window.addEventListener("resize", onWindowResize, false);*/
      
      renderer.setAnimationLoop(() => {
        renderer.render(scene, camera);
      });
  
    }, []);
  
    return (
      <div ref={mountRef}>
  
      </div>
    );
  }

  const changeImage = (e) => {
    setImageSelectedPrevious(null);
    console.log(e.target.files);
    setNombreArch(e.target.files[0].name)
    if (e.target.files[0] !== undefined) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = (e) => {
        e.preventDefault();
        setImageSelectedPrevious(e.target.result); // le damos el binario de la imagen para mostrarla en pantalla
      };
    }
  };

  const { getTrackProps, ticks, handles } = useRanger({
    values,
    onChange: setValues,
    min: 0,
    max: 100,
    stepSize: 1,
    ticks: [""]
  });

  const dataCryptos = [
    'Bitcoin',
    'Litecoin',
    
  ]

  const materiales = [
    'Resina',
    'FDM'
  ]
  const relleno = [
    '10',
    '20',
    '30',
    '40',
    '50',
    '60',
    '70',
    '80',
    '90',
    '100'
  ]
  
  const calidad = [
    'Alta', //altura de la capa 0,1
    'Media', //altura de la capa 0,2
    'Baja'  //altura de la capa 0,3
  ]
  
  function handleSelect(option,num){ 
    if(num==1){
      setMaterial(option);
    }
    if(num==2){
      setInfill(option);
    }
    if(num==3){
      setCal(option);
    }
    if(num==4){
      setCantidad(option);
    }
  }

  const RemoveModelo = (uid) => {
    var pr =0;
    const arregloTemp = arrayModelosT.filter((temp) => temp.id == uid);
    arregloTemp.map(item =>  pr=item.precio);
   setPrecioTotal(precioTotal-pr);
    //precioTotal = precioTotal - pr;
    const newArray = arrayModelosT.filter((arrayModelos) => arrayModelos.id !== uid);
    setArrayModelosT(newArray);
  }

  const setModelo = () => {
    setCantidadM(cantM + 1);
    setCantidadArrayM(cantArrayM.concat(cantM));
    setPrecioTotal(precio+precioTotal);
    const modeloTotal = {
      id: cantM,
      modelo: nombreArch,
      archivo: ImageSelectedPrevious,
      material: material,
      relleno: infill,
      calidad: Cal,
      cantidad: cant,
      precio: precio
    };
    setArrayModelosT(arrayModelosT.concat(modeloTotal));
    
  }

  const otroModelo = () => {
    setMaterial("");
    setInfill("");
    setCal("");
    setCantidad(0);
    setImageSelectedPrevious(null);
  }

  return (
    <RightBlockContainer id="intro" style={{paddingTop:"100px"}}>
      <FadeIn>
      
      <Row style={{justifyContent: "flex-start", paddingBottom:"45px"}}>
              <Col style={{justifyContent: "flex-start", paddingRight: "40px"}}>
                <img src={"logoalt.png"} alt="logoalt.png" width="250px" height="100px" />
              </Col>
              
              {/*arrayModelos.map(item => {
                return(<li>{item} </li>)
              }) esto es para mostrar un array de useState*/}
              <Row>
              {nPaso == 0 ?
                <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px", paddingLeft:"10px"}}>
                  <img src={"./img/icons/boton1_ON.png"} alt="boton1_ON.png" width= "50px" height= "50px"/>
                </Col>
              :
              <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px", paddingLeft:"10px"}}>
                <img src={"./img/icons/boton1_OFF.png"} alt="boton1_ON.png" width= "50px" height= "50px"/>
              </Col>
              }
              {nPaso == 1 ?
                <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px"}}>
                <img src={"./img/icons/boton2_ON.png"} alt="boton2_ON.png" width= "50px" height= "50px"/>
              </Col>
              :
              <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px"}}>
                <img src={"./img/icons/boton2_OFF.png"} alt="boton2_ON.png" width= "50px" height= "50px"/>
              </Col>
              }
              {nPaso == 2 ?
                <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px"}}>
                <img src={"./img/icons/boton3_ON.png"} alt="boton2_ON.png" width= "50px" height= "50px"/>
              </Col>
              :
              <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px"}}>
                <img src={"./img/icons/boton3_OFF.png"} alt="boton2_ON.png" width= "50px" height= "50px"/>
              </Col>
              }
              {nPaso == 3 ?
                <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px"}}>
                <img src={"./img/icons/boton4_ON.png"} alt="boton2_ON.png" width= "50px" height= "50px"/>
              </Col>
              :
              <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px"}}>
                <img src={"./img/icons/boton4_OFF.png"} alt="boton2_ON.png" width= "50px" height= "50px"/>
              </Col>
              }
              </Row>

            </Row>

        {/*Primer stepper */}
        {nPaso == 0 ? 
          <>{ImageSelectedPrevious == null ? 
            <Row style={{justifyContent:"flex-start", paddingLeft:"20px"}} >
              <Col style={{justifyContent:"flex-start"}}>
              <Row style={{backgroundColor:"#eff1f4", textAlign:"center", border: "4px solid #d4d4d4", borderRadius: "10px", width:"350px"}}  >
                <h6 style={{color:"#000", textAlign: "center" , fontSize:"25px", paddingTop: "20px", paddingLeft:"25%"}}>Carga tu modelo</h6>
                <p style={{backgroundColor:"#eff1f4", textAlign:"center", borderTop: "4px solid #d4d4d4", borderBottom: "4px solid #d4d4d4", width:"360px", padding:"10px"}}>Servicio de impresíon 3D online. Sube tu archivo <b>STL</b> para concer su costo de impresion 3D</p>
                    <StyleDragArea>
                      {/*debo aponer la imagen del mas*/}
                    
                    <div className="image-upload-wrap">
                      <input
                        className="file-upload-input"
                        type="file"
                        accept=".stl"
                        multiple
                        onChange={(e) => {
                          changeImage(e);
                        }}
                      />
                      <div className="text-information">
                        <Cimg src={"./img/upload.png"} alt="upload.png" width="100px" height="100px"/>
                      </div>
                    </div>
                    </StyleDragArea>
              </Row>
              </Col>
            </Row>
            :
  
            <Row style={{justifyContent:"flex-start", paddingBottom:"10px",paddingRight: "20px"}} >
            <div>
              
                <Row style={{justifyContent:"flex-start"}}>
                  <Col style={{justifyContent:"flex-start",}}>
                    <ModelViewer
                        model={ImageSelectedPrevious}
                      />
                  </Col>
                  <Col  style={{paddingLeft:"30px", textShadow:"2px 2px 2px rgba(150, 150, 150, 0.6)"}}>
                    <p style={{textAlign:"left"}} >Material:</p>
                              <ComboBox
                                options={materiales}
                                placeholder="Seleccione material."
                                optionsListMaxHeight={300}
                                style={{
                                  width: "160px"
                                }}
                                renderOptions={(option) => (
                                  <div className="comboBoxOption">{option}</div>
                                )}
                                onSelect={(option) => handleSelect(option,1)}
                                onChange={(event) => console.log(event.target.value)}
                                enableAutocomplete
                                selectedOptionColor='#9900FF'
                              />
                            <p style={{textAlign:"left"}} >Relleno:</p>
                            <ComboBox
                  
                              options={relleno}
                              placeholder="Seleccione relleno."
                              optionsListMaxHeight={300}
                              style={{
                                width: "160px"
                              }}
                              renderOptions={(option) => (
                                <div className="comboBoxOption">{option}%</div>
                              )}
                              onSelect={(option) => handleSelect(option,2)}
                              onChange={(event) =>console.log(event.target.value)}
                              enableAutocomplete
                              selectedOptionColor='#9900FF'
                            />
                            <p2 style={{width:"200px"}}>Se recomienda un relleno de 30%</p2>
                            {material == "Resina" ? 
                              <>
                              <p>Calidad:</p>
                              <div className="comboBoxOption" style={{padding:"10px", width: "160px", height: "40px", background: "rgba(0,0,0,0)", border: "1px solid #adabaa", borderRadius:"5px"}}>Alta</div>
                              </>
                            :
                            <>
                              <p>Calidad:</p>
                              <ComboBox
                    
                                options={calidad}
                                placeholder="Seleccione calidad."
                                optionsListMaxHeight={300}
                                style={{
                                  width: "160px"
                                }}
                                renderOptions={(option) => (
                                  <div className="comboBoxOption">{option}</div>
                                )}
                                onSelect={(option) =>  handleSelect(option,3)}
                                onChange={(event) => console.log(event.target.value)}
                                enableAutocomplete
                                selectedOptionColor='#9900FF'
                              />
                              </>
                            }
                            
  
  
                            <p>Cantidad:</p>
                            <input 
                              style={{
                                width: "100px",
                                height: "40px",
                                background: "rgba(0,0,0,0)",
                                border: "1px solid #adabaa"
                              }}
                              type="number" 
                              min="1"
                              value={cant}
                              onChange={(e) => handleSelect(e.target.value,4)}
                            />
                            <br></br>
                            <p2>Cuantas impresiones quiere.</p2>
                            <br />
                            <br />
                            <pre
                              style={{
                                display: "inline-block",
                                textAlign: "left"
                              }}
                            ></pre>
                            
                          </Col>
                          <Col style={{paddingLeft: "10px"}}>
                          {material != "" && infill != "" && cant != "" && Cal != "" ? 
                                <div style={{textShadow:"2px 2px 2px rgba(150, 150, 150, 0.5)"}}>
                                  <Row style={{justifyContent:"center",padding:"20px", backgroundColor:"rgba(255,255,255,1)", boxShadow: "5px 5px 15px 5px rgba(0,0,0,0.6)",borderRadius:"20px", border:"2px solid #0033FF"}}>
                                  <div>
                                  <b><p>Resumen de su orden</p></b>
                    {/*entremedio del texto se le pueden llamar las variables ej: "mi edad es {edad}" */}
                                    <p>Dimensiones del modelo:</p>
                                    <p> x: {XL} cm, y: {YL} cm, z: {ZL} cm</p>
                                    <br />
                                    {/*<p>Volumen: {volumen} cm<sup>3</sup></p>*/}
                                    <p>Volumen total del modelo:</p>
                                    <p>{volumenT.toFixed(2)} cm<sup>3</sup></p>
                                    <br />
                                  { /*{Cal =="Alta" ? 
                                    <p>Gramos Utilizados: {((1.27*volumen) + ((3*0.4)*4 + (8*0.1)+(volumenT*0.15))).toFixed(2)} g</p>
                                    :
                                    <>{Cal =="Media" ? 
                                    <p>Gramos Utilizados: {((1.27*volumen) + ((3*0.4)*4 + (8*0.2)+(volumenT*0.15))).toFixed(2)} g</p>
                                    :
                                    <>
                                    {Cal == "Baja" ? 
                                    <p>Gramos Utilizados: {((1.27*volumen) + ((3*0.4)*4 + (8*0.3)+(volumenT*0.15))).toFixed(2)} g</p>
                                    :
                                    <></>}
                                    </>
                                    }
                                    </>
                                    }*/}
                                    
                                    {cant>1 ? 
                                    <div>
                                    <p>Precio por los {cant} modelos:</p>
                                    <p>$ {precio}</p>
                                    <br />
                                    </div>
                                    :
                                    <div>
                                    <p>Precio:</p>
                                    <p>$ {precio}</p>
                                    <br />
                                    </div>
                                    }
                                    <br></br>
                                    <Row style={{justifyContent:"center"}}>
                                      <Col style={{paddingRight:"5px"}}>
                                        <button onClick={otroModelo} className="button">Agregar otro modelo 3D</button>
                                        
                                      </Col>
                                      <Col style={{paddingRight:"5px"}}>
                                        <button onClick={setModelo} className="button">Agregar al carrito</button>
                                      </Col>
                                    </Row>
                                  
                                  </div>
                                  </Row>
                                  </div>
                              :
                              <Row style={{justifyContent:"center",padding:"20px", backgroundColor:"rgba(255,255,255,1)", borderRadius:"30px", border:"2px solid #0033FF"}}>
                              <div style={{textShadow:"2px 2px 2px rgba(150, 150, 150, 0.6)"}}> 
                              <p>Por favor llene todos los campos.</p>
                              </div>
                              </Row>
                              }
                          </Col>
                </Row>
                <br/>
                <br/>
                <br/>
                
                
            </div>
            </Row>
            }</>
        
        :
        <></>
        }
        {/* Segundo step */}
        {nPaso == 1 ?
          <div style={{padding:"20px",justifyContent:"center", backgroundColor:"#fff",border:"2px solid #0834fc",borderRadius:"45px",boxShadow:"5px 5px 15px 5px rgba(0,0,0,0.6)",marginLeft:"15%",marginRight:"15%"}}>
            <Row style={{justifyContent:"center"}}>
            <p style={{textAlign:"center"}}><b>Elija su método de pago:</b></p>
            </Row>
            <Row style={{justifyContent:"center", padding: "20px"}}>
              <p style={{background:"rgba(8, 52, 252,0.5)",color:"rgba(255,255,255,0.5)",padding:"25px", borderRadius:"45px"}}>Pago con [Moneda tradicional]</p>
            </Row>
            <Row style={{justifyContent:"center", padding: "20px"}}>
              <p onClick={() => cambiarPaso(2)} style={{background:"rgba(8, 52, 252,1)",color:"rgba(255,255,255,1)",padding:"25px", borderRadius:"45px",cursor:"pointer"}}>Pago con Criptomoneda</p>
            </Row>
          </div>
        :
        <></> 
        }
        {/* Tercer step */}
        {nPaso == 2 ?
          <div style={{padding:"20px",justifyContent:"center", backgroundColor:"#fff",border:"2px solid #0834fc",borderRadius:"45px",boxShadow:"5px 5px 15px 5px rgba(0,0,0,0.6)",marginLeft:"15%",marginRight:"15%"}}>
            <Row style={{justifyContent:"center"}}>
            <p style={{textAlign:"center"}}><b>Pago con Criptomoneda</b></p>
            </Row>
            <Row style={{justifyContent:"center",paddingTop:"24px"}}>
            <p style={{textAlign:"center"}}>Total a pagar:<br/><b>${precioTotal}</b></p>
            </Row>
            <Row style={{justifyContent:"center",paddingTop:"24px"}}>
                <Col  style={{justifyContent:"center",paddingRight:"10px"}}>
                <p style={{textAlign:"center"}} >Seleccione Criptomoneda:</p>
                <ComboBox
        
                  options={dataCryptos}
                  placeholder="Seleccione"
                  optionsListMaxHeight={300}
                  style={{
                    width: "300px",
                    fontSize:"20px",
                  }}
                  renderOptions={(option) => (
                    <div className="comboBoxOption">{option}</div>
                  )}
                  onSelect={(option) => setSelectedCrypto(option)}
                  onChange={(event) => console.log(event.target.value)}
                  enableAutocomplete
                  selectedOptionColor='#68D391'
                />
                </Col>
          </Row>
          {selectedCrypto == "Bitcoin" ?
          <>
          <Row style={{justifyContent:"center",paddingTop:"24px"}}>
          <p style={{textAlign:"center"}}>Correo Electrónico:</p>
          </Row>
          <Row style={{justifyContent:"center",paddingTop:"0x"}}>
            <Input onChange={handleEmailField} value={emailField} placeholder="Inserte correo electrónico"  style={{ width: "300px", fontSize:"20px", backgroundColor:'#fff', borderColor:'#000', color:'#000',borderRadius:"5px" }} />
          </Row>
          <Row style={{justifyContent:'center', fontSize:16, paddingTop:'12px'}}>
              <Col style={{color:'#ff0000'}}>Importante! Nos comunicaremos con este correo una vez se confirme el pago.</Col>
          </Row>
          <Row style={{justifyContent:"center",paddingTop:"24px"}}>
          <p style={{textAlign:"center"}}>Precio actual de Bitcoin:<br/><b>${(parseInt(usdBTC*usdCLP)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b></p>
          </Row>
          <Row style={{justifyContent:"center",paddingTop:"24px"}}>
          <p style={{textAlign:"center"}}>Total a pagar en Bitcoin (Approx):<br/><b>{(((precioTotal/usdCLP)/usdBTC)).toFixed(10).toString()} BTC</b></p>
          </Row>
          <Row style={{justifyContent:"center",paddingTop:"24px"}}>
            <Button onClick={() => createInvoice(precioTotal)}>Pagar {selectedCrypto}</Button>
          </Row>
          
          </>
          :
          <></>
          }
          {selectedCrypto == "Litecoin" ?
          <>
          <Row style={{justifyContent:"center",paddingTop:"24px"}}>
          <p style={{textAlign:"center"}}>Correo Electrónico:</p>
          </Row>
          <Row style={{justifyContent:"center",paddingTop:"0x"}}>
            <Input onChange={handleEmailField} value={emailField} placeholder="Inserte correo electrónico"  style={{ width: "300px", fontSize:"20px", backgroundColor:'#fff', borderColor:'#000', color:'#000',borderRadius:"5px" }} />
          </Row>
          <Row style={{justifyContent:'center', fontSize:16, paddingTop:'12px'}}>
              <Col style={{color:'#ff0000'}}>Importante! Nos comunicaremos con este correo una vez se confirme el pago.</Col>
          </Row>
          <Row style={{justifyContent:"center",paddingTop:"24px"}}>
          <p style={{textAlign:"center"}}>Precio actual de Litecoin:<br/><b>${(parseInt(usdLTC*usdCLP)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b></p>
          </Row>
          <Row style={{justifyContent:"center",paddingTop:"24px"}}>
          <p style={{textAlign:"center"}}>Total a pagar en Litecoin (Approx):<br/><b>{(((precioTotal/usdCLP)/usdLTC)).toFixed(8).toString()} BTC</b></p>
          </Row>
          <Row style={{justifyContent:"center",paddingTop:"24px"}}>
            <Button onClick={() => createInvoice(precioTotal,emailField)}>Pagar {selectedCrypto}</Button>
          </Row>
          
          </>
          :
          <></>
          }
          </div>
        :
        <></> 
        }
        {/* Cuarto step */}
        {nPaso == 3 ?
          <div style={{padding:"20px",justifyContent:"center", backgroundColor:"#fff",border:"2px solid #0834fc",borderRadius:"45px",boxShadow:"5px 5px 15px 5px rgba(0,0,0,0.6)",marginLeft:"15%",marginRight:"15%"}}>
            <Row style={{justifyContent:"center"}}>
            <p style={{textAlign:"center"}}><b>Gracias por su orden!</b></p>
            </Row>
            <Row style={{justifyContent:"center", paddingTop:"36px"}}>
            <p style={{textAlign:"center"}}>Envíe los modelos que desea imprimir a:</p>
            </Row>
            <Row style={{justifyContent:"center", paddingTop:"0px"}}>
            <p style={{textAlign:"center"}}><b>[Correo Fablab]</b></p>
            </Row>
            <Row style={{justifyContent:"center", paddingTop:"36px"}}>
            <p style={{textAlign:"center"}}>¿Cerraste accidentalmente la ventana de pago?</p>
            </Row>
            <Row style={{justifyContent:"center", paddingTop:"12px"}}>
              <Button onClick={() => viewInvoice()}>Reabrir Pago</Button>
            </Row>
          </div>
        :
        <></> 
        }
        {(cantM > 1 )? 
        <div style={{padding:"20px",justifyContent:"center", backgroundColor:"#fff",border:"2px solid #0834fc",borderRadius:"45px",boxShadow:"5px 5px 15px 5px rgba(0,0,0,0.6)",margin:"5%",marginLeft:"15%",marginRight:"15%"}}>
          <Row style={{justifyContent:"center"}}>
          <p style={{textAlign:"center"}}><b>Resumen de su orden:</b></p>
          </Row>
          <Row style={{justifyContent:"center", padding: "20px"}}>
            
            <table>
              <thead>
                <th>Modelo</th>
                <th>Material</th>
                <th>Relleno</th>
                <th>Calidad</th>
                <th>Cantidad</th>
                <th>Precio</th>
              </thead>
              <tbody style ={{backgroundColor:"#fff"}}>
                {arrayModelosT.map(item => {
                  return(<tr>
                    <td>{item.modelo}</td>
                    <td>{item.material}</td>
                    <td>{item.relleno}</td>
                    <td>{item.calidad}</td>
                    <td>{item.cantidad}</td>
                    <td>$ {item.precio}</td>
                    <td style={{ border: "none"}}><button onClick={() => RemoveModelo(item.id)} className="bBorrar">Eliminar</button></td>
                  </tr>)
                })}
                
              </tbody>
            </table>
            <br/>
            
          </Row>
          <Row style={{justifyContent:"center"}}>
            <table>
              <thead>
                <th>Precio Total</th>
              </thead>
              <tbody>
                <tr>
                  <td>$ {precioTotal}</td>
                </tr>
              </tbody>
            </table>
          </Row>   
          {(arrayModelosT[0]!=null && nPaso === 0 && precioTotal >= 5000 ) ?
          <Row style={{justifyContent:"center", padding: "24px"}}>
            <Button onClick={() => cambiarPaso(1)}>Procesar pago</Button>
          </Row>
          :
          <Row style={{justifyContent:"center", padding: "24px"}}>
            <p2>para continuar con el pago es minimo tener un pedido de $ 5000</p2>
          </Row>
          }
      </div>
        :
        <></>
        }
        {nPaso > 0 && nPaso < 3?
        <Row style={{justifyContent:"center", padding: "24px"}}>
            <Button onClick={() => cambiarPaso(nPaso-1)}>Volver</Button>
        </Row>
        :
        <></>
        }
        {nPaso === 3 ?
        <Row style={{justifyContent:"center", padding: "24px"}}>
            <Button onClick={() => nuevaOrden()}>Nueva Orden</Button>
        </Row>
        :
        <></>
        }
        
        
      </FadeIn>
    </RightBlockContainer>
  );
};

export default RightBlock;

const StyleDragArea = styled.div`
  .center {
    display: center;
    justify-content: center;
    align-items: center;
  }
  .file-upload-content {
    display: none;
    text-align: center;
  }
  .file-upload-input {
    position: absolute;
    right: 0px;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }
  .mini-image-upload-wrap {
    position: relative;
    width: 100%;
    height: 100px;
    border: 4px solid regba(0,0,0,0.1);
    margin-right: 10px;
  }
  .image-upload-wrap {
    position: relative;
    width: 100px;
    height: 100px;
    border: 4px solid regba(0,0,0,0.1);
    margin-left: 120%;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  .image-upload-wrap:hover {
    background-color: transparent;
    border: 4px dashed #d0d7de;
  }
  .text-information {
    text-align: center;
  }
`;
