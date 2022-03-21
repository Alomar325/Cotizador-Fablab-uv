import { Row, Col } from "antd";
import { useRanger } from "react-ranger";
import { useState } from "react";
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

/*

*/



 /* <ComboBox options={data}
  placeholder='Elige Impresora.' enableAutocomplete 
  style={{ width: '100px', margin: '30px' }}
  inputStyles={{ border: '1px solid #333' }}
  />*/

function RightBlock() {


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

  //los arreglos de los datos de cada modelo
  const [arrayModelos, setArrayModelos] = useState([]);
  const [arrayMateriales, setArrayMateriales] = useState([]);
  const [arrayRellenos, setArrayRellenos] = useState([]);
  const [arrayCalidades, setArrayCalidades] = useState([]);
  const [arrayCantidades, setArrayCantidades] = useState([]);

  const [arrayModelosT, setArrayModelosT] = useState([]);

  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);

  
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
        var volumenRestante = (((getVolume(geometry)/1000)*infill)/100).toFixed(2);
        setVolumenR(volumenRestante);
        var hora = 0;
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
        setPrecio(Math.round((((1.27*volumenRestante).toFixed(2)*20000)/1000)+((hora+(minutos/60))*1000)));
        
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


  const materiales = [
    'PLA',
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
  
  const cantidad = [
    '1', 
    '2', 
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10'  
  ]
  
  function handleSelect(option){ 

    setMaterial(option);

  }
  const setModelo = () => {
    setArrayModelos(arrayModelos.concat(ImageSelectedPrevious));
    setArrayMateriales(arrayMateriales.concat(material));
    setArrayRellenos(arrayRellenos.concat(infill));
    setArrayCalidades(arrayCalidades.concat(Cal));
    setArrayCantidades(arrayCantidades.concat(cant));

    setCantidadM(cantM + 1);
    setCantidadArrayM(cantArrayM.concat(cantM));

    const modeloTotal = {
      numero: cantM,
      archivo: ImageSelectedPrevious,
      material: material,
      relleno: infill,
      calidad: Cal,
      cantidad: cant,
    };
    setArrayModelosT(arrayModelosT.concat(modeloTotal));
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
              {ImageSelectedPrevious != null ? 
              <Row>
              <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px", paddingLeft:"10px"}}>
                <img src={"./img/icons/boton1_ON.png"} alt="boton1_ON.png" width= "50px" height= "50px"/>
              </Col>
              <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px"}}>
                <img src={"./img/icons/boton2_OFF.png"} alt="boton2_ON.png" width= "50px" height= "50px"/>
              </Col>
              <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px"}}>
                <img src={"./img/icons/boton3_OFF.png"} alt="boton3_ON.png" width= "50px" height= "50px"/>
              </Col>
              <Col style={{justifyContent: "center", paddingRight: "40px", paddingTop: "30px"}}>
                <img src={"./img/icons/boton4_OFF.png"} alt="boton4_ON.png" width= "50px" height= "50px"/>
              </Col>
              </Row>
              :
              <></>
              }
            </Row>
      {ImageSelectedPrevious == null ? 
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
              <Col  style={{paddingLeft:"30px", textShadow:"2px 2px 2px rgba(150, 150, 150, 0.6)"}}>                          <p style={{textAlign:"left"}} >Material:</p>
                          <ComboBox
                            options={materiales}
                            placeholder="Elige el material."
                            optionsListMaxHeight={300}
                            style={{
                              width: "160px"
                            }}
                            renderOptions={(option) => (
                              <div className="comboBoxOption">{option}</div>
                            )}
                            onSelect={(option) => handleSelect(option)}
                            onChange={(event) => console.log(event.target.value)}
                            enableAutocomplete
                            selectedOptionColor='#9900FF'
                          />
                        <p style={{textAlign:"left"}} >Relleno:</p>
                        <ComboBox
              
                          options={relleno}
                          placeholder="Elige el relleno."
                          optionsListMaxHeight={300}
                          style={{
                            width: "160px"
                          }}
                          renderOptions={(option) => (
                            <div className="comboBoxOption">{option}%</div>
                          )}
                          onSelect={(option) => setInfill(option)}
                          onChange={(event) =>console.log(event.target.value)}
                          enableAutocomplete
                          selectedOptionColor='#9900FF'
                        />
                        <p2 style={{width:"200px"}}>Se recomienda un relleno de 30%</p2>

                        <p>Calidad:</p>
                        <ComboBox
              
                          options={calidad}
                          placeholder="Elige la calidad."
                          optionsListMaxHeight={300}
                          style={{
                            width: "160px"
                          }}
                          renderOptions={(option) => (
                            <div className="comboBoxOption">{option}</div>
                          )}
                          onSelect={(option) => setCal(option)}
                          onChange={(event) => console.log(event.target.value)}
                          enableAutocomplete
                          selectedOptionColor='#9900FF'
                        />


                        <p>Cantidad:</p>
                        <input 
                          style={{
                            width: "100px",
                            height: "38px",
                            background: "rgba(0,0,0,0)",
                            border: "1px solid #adabaa"
                          }}
                          type="number" 
                          min="1"
                          value={cant}
                          onChange={(e) => setCantidad(e.target.value)}
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
                              <div style={{textShadow:"2px 2px 2px rgba(150, 150, 150, 0.6)"}}>
                              <Row style={{justifyContent:"center",padding:"20px", backgroundColor:"rgba(255,255,255,1)", borderRadius:"20px", border:"2px solid #0033FF"}}>
                              <div>
                              <b><p>Resumen de su elección</p></b>
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
                                <p>$ {precio*cant}</p>
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
                                <Row>
                                  <Col>
                                    <button>Continuar a pago</button>
                                  </Col>
                                  <Col>
                                    <button onClick={setModelo}>Agregar otro modelo 3D</button>
                                  </Col>
                                </Row>
                               
                              </div>
                              </Row>
                              </div>
                          :
                          <Row style={{justifyContent:"center",padding:"20px", backgroundColor:"rgba(255,255,255,1)", borderRadius:"30px", border:"2px solid #0033FF"}}>
                          <div style={{textShadow:"2px 2px 2px rgba(150, 150, 150, 0.6)"}}> 
                          <p>Le falta un campo por completar</p>
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
        }
        {cantM > 1 ? 
        <Row style={{overflow: "auto", padding: "20px"}}>
          <table>
            <thead>
              <th>Modelo</th>
              <th>Material</th>
              <th>Relleno</th>
              <th>Calidad</th>
              <th>Cantidad</th>
            </thead>
            <tbody>
              {arrayModelosT.map(item => {
                return(<tr>
                  <td>{item.numero}°</td>
                  <td>{item.material}</td>
                  <td>{item.relleno}</td>
                  <td>{item.calidad}</td>
                  <td>{item.cantidad}</td>
                </tr>)
              })}
            </tbody>
          </table>
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
