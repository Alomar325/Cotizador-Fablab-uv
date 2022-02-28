import { Row, Col } from "antd";
import { useRanger } from "react-ranger";
import { useState } from "react";
import FadeIn from 'react-fade-in';
import ComboBox from 'react-responsive-combo-box';
import 'react-responsive-combo-box/dist/index.css';
import styled from "styled-components";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from './OrbitControls.js'
import { STLLoader } from './STLLoader'



 // npm i --save react-ranger, npm i --save three
import {
  RightBlockContainer,
  Content,
  //ContentWrapper,
  Cimg,
} from "./styles";
import { getMaxListeners } from "process";
/*

*/



 /* <ComboBox options={data}
  placeholder='Elige Impresora.' enableAutocomplete 
  style={{ width: '100px', margin: '30px' }}
  inputStyles={{ border: '1px solid #333' }}
  />*/

function RightBlock() {



  const [selectedOptionIm, setSelectedOptionIm] = useState("");
  const [material, setMaterial] = useState("");
  const [infill, setInfill] = useState("");
  const [Cal, setCal] = useState("");
  const [XL, setXL] = useState("");
  const [YL, setYL] = useState("");
  const [ZL, setZL] = useState("");
  const [tiempo, setTiempo] =useState("");
  const [volumen, setVolumne] = useState("");
  const [cant, setCantidad] = useState("");
  const [values, setValues] = useState([0]);

  const [ImageSelectedPrevious, setImageSelectedPrevious] = useState(null);

  
  const ModelViewer = ({model}) => {

    const mountRef = useRef(null);
  
    useEffect(() => {
      //Creacion de escena
      var scene = new THREE.Scene();
      //Creación de camara
      var camera = new THREE.PerspectiveCamera( 40, 1280 / 720, 0.1, 2000 );
      
  
      //Renderizador
      var renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setClearColor(0xffffff, 0);
      renderer.setSize(1280, 720 );
  
      //Montar a componente funcional React
      mountRef.current.appendChild( renderer.domElement );
      
  
      //Carga de modelo 3D
      var loader = new STLLoader();
      loader.load(model, function(geometry) {
        //Opciones de modelo 3D
        var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
          color: 0x51a2db,
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
        console.log("centro x: "+cent.x);
        console.log("centro y: "+cent.y);
        console.log("centro z: "+cent.z);
        //Determinación de medidas
        var YLength = bbox.max.y - bbox.min.y;
        var XLength = bbox.max.x - bbox.min.x;
        var ZLength = bbox.max.z - bbox.min.z;
        var AltaT = 29;
        var MediaT = 16;
        var BajaT = 12;
        setXL(XLength.toFixed(2));
        setYL(YLength.toFixed(2));
        setZL(ZLength.toFixed(2));
        camera.position.set(cent.x,cent.y,cent.z+ZLength*3);
        console.log("stl volume is " + getVolume(geometry));
        var volumenRestante = ((getVolume(geometry)/1000).toFixed(2)*infill)/100;
        if(Cal == "Alta"){
          setTiempo((volumenRestante*29).toFixed(0))
        }
        if(Cal == "Media"){
          setTiempo((volumenRestante*16).toFixed(0))
        }
        if(Cal == "Baja"){
          setTiempo((volumenRestante*12).toFixed(0))
        }
        setVolumne(volumenRestante);
        
        //Controles orbitales
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.target.set( cent.x, cent.y, cent.z );
        controls.update();
        controls.enablePan = false;
        controls.enableDamping = true;
  
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

  const dataIM = [
    'Impresora 1',
    'Impresora 2'
  ]


  const materiales = [
    'PLA'
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

    if(option == "PLA" || option == "ABS")
    {
      setMaterial(option);
    }
    else
    {
      setMaterial("");
    }
  }
 


  return (
    
    <RightBlockContainer id="intro" style={{paddingTop:"100px"}}>
      <FadeIn >
        <Row style={{justifyContent:"center"}} >
        <Col lg={11} md={11} sm={12} xs={24}>
            <Cimg src={"logo.png"} alt="logo.png" width="268px" height="168px" style={{}} />
          </Col>
          
          </Row>
          <h6 style={{color:"#000", textShadow:"2px 4px 8px rgba(0,0,0,0.5)",textAlign:"center"}}>Cotizador 3D Fablab UV</h6>
          {/*aqui empiesa el Drag and Drop */}
          <div >
            <StyleDragArea>
              <br />
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
                  <p>Seleccione su archivo</p>
                </div>
              </div>
              {ImageSelectedPrevious != null ? 
                  <div className="center">
                  <ModelViewer
                  model={ImageSelectedPrevious}
                  />
                
                </div>
                
              : <></>}
            </StyleDragArea>
          </div>
{/* y aqui termina el drag and drop */}
          

          <Row style={{justifyContent:"flex-start"}} >
          <Col lg={11} md={11} sm={11} xs={24} style={{justifyContent:"flex-start"}}>
              
              
              <Row style={{justifyContent:"flex-end"}}>
                <Col  style={{justifyContent:"flex-end",paddingRight:"10px"}}>
                <p style={{textAlign:"left"}} >Impresora:</p>
                <ComboBox
        
                  options={dataIM}
                  placeholder="Elige tu impresora"
                  optionsListMaxHeight={300}
                  style={{
                    width: "300px"
                  }}
                  renderOptions={(option) => (
                    <div className="comboBoxOption">{option}</div>
                  )}
                  onSelect={(option) => setSelectedOptionIm(option)}
                  onChange={(event) => console.log(event.target.value)}
                  enableAutocomplete
                  selectedOptionColor='#68D391'
                />
                  {selectedOptionIm}
                  <span>
                    {" "}
                    {/*Lo de  abajo son if  si requieren que muestre cosas dependiendo de la impresora solo se debe colocar en la parte de codigo a la izquierda de ":" el lado derecho es el lado falso*/}
                    {selectedOptionIm == "Impresora 1" ? <div>
                    <p style={{textAlign:"left"}} >Material:</p>
                    <ComboBox
                      options={materiales}
                      placeholder="Elige el material."
                      optionsListMaxHeight={300}
                      style={{
                        width: "300px"
                      }}
                      renderOptions={(option) => (
                        <div className="comboBoxOption">{option}</div>
                      )}
                      onSelect={(option) => handleSelect(option)}
                      onChange={(event) => console.log(event.target.value)}
                      enableAutocomplete
                      selectedOptionColor='#68D391'
                    />
                      {material}
                    </div>
                    
                    : <></>}

                    {selectedOptionIm == "Impresora 2" ? <div>opciones de {selectedOptionIm}
                    <ComboBox
          
                      options={materiales}
                      placeholder="Elige el material."
                      optionsListMaxHeight={300}
                      style={{
                        width: "300px"
                      }}
                      renderOptions={(option) => (
                        <div className="comboBoxOption">{option}</div>
                      )}
                      onSelect={(option) => handleSelect(option)}
                      onChange={(event) => console.log(event.target.value)}
                      enableAutocomplete
                      selectedOptionColor='#68D391'
                    />
                      {material}

                    </div>
                    
                    
                    : <></>}

                  </span>
                  <p style={{textAlign:"left"}} >Relleno:</p>
                  <ComboBox
        
                    options={relleno}
                    placeholder="Elige el relleno."
                    optionsListMaxHeight={300}
                    style={{
                      width: "300px"
                    }}
                    renderOptions={(option) => (
                      <div className="comboBoxOption">{option}</div>
                    )}
                    onSelect={(option) => setInfill(option)}
                    onChange={(event) => console.log(event.target.value)}
                    enableAutocomplete
                    selectedOptionColor='#68D391'
                  />  
                  {infill}
                  <p>Calidad:</p>
                  <ComboBox
        
                    options={calidad}
                    placeholder="Elige la calidad del modelo."
                    optionsListMaxHeight={300}
                    style={{
                      width: "300px"
                    }}
                    renderOptions={(option) => (
                      <div className="comboBoxOption">{option}</div>
                    )}
                    onSelect={(option) => setCal(option)}
                    onChange={(event) => console.log(event.target.value)}
                    enableAutocomplete
                    selectedOptionColor='#68D391'
                  />
                  {Cal}

                  <p>Cantidad:</p>
                  <ComboBox
        
                    options={cantidad}
                    placeholder="Elige cuantos modelos quiere imprimir."
                    optionsListMaxHeight={300}
                    style={{
                      width: "300px"
                    }}
                    renderOptions={(option) => (
                      <div className="comboBoxOption">{option}</div>
                    )}
                    onSelect={(option) => setCantidad(option)}
                    onChange={(event) => console.log(event.target.value)}
                    enableAutocomplete
                    selectedOptionColor='#68D391'
                  />
                  {cant}
                  <br />
                  <br />
                  <br />
                  <pre
                    style={{
                      display: "inline-block",
                      textAlign: "left"
                    }}
                  ></pre>
                </Col>

                
                
              </Row>
              
          </Col>
          <Col style={{justifyContent:"flex-end",paddingLeft:"10px"}}>
            <Col style={{justifyContent:"flex-end",paddingLeft:"10px"}}>
              <Col style={{justifyContent:"flex-end",paddingLeft:"10px"}}>
                {selectedOptionIm != "" && material != "" && infill != "" && cant != "" && Cal != "" ? 
                  <div>
{/*entremedio del texto se le pueden llamar las variables ej: "mi edad es {edad}" */}
                    <p>Dimensiones x: {XL} cm, y: {YL} cm, z: {ZL} cm</p>
                    <p>Tiempo de impresión de una piesa: {tiempo} minutos</p>
                    <p>Volumen del modelo: {volumen} cm<sup>3</sup></p>
                  </div>
                : 
                <><p>Le falta un campo por completar</p></>
                }
                
          {/*debo encontrar la forma de colocar un viewer de STL */}
             </Col>
            </Col>
          </Col>
        </Row>
        <Row style={{justifyContent:"center"}}>
          <button>cotizar</button>
        </Row>
        
      </FadeIn>
    </RightBlockContainer>
  );
};

export default RightBlock;

const StyleDragArea = styled.div`
  .center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .file-upload-content {
    display: none;
    text-align: center;
  }
  .file-upload-input {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    outline: none;
    opacity: 0;
    cursor: pointer;
  }
  .image-upload-wrap {
    position: relative;
    height: 100px;
    border: 4px solid #d0d7de;
    margin-left: 10px;
    margin-right: 10px;
  }
  .image-upload-wrap:hover {
    background-color: transparent;
    border: 4px dashed #d0d7de;
  }
  .text-information {
    margin-top: 30px;
    text-align: center;
  }
`;