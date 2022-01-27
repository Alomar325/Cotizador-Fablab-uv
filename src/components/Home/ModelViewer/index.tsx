import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from './OrbitControls.js'
import { STLLoader } from './STLLoader'
//import Stats from 'three/examples/jsm/libs/stats.module'


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
    // Iluminacion
    var lightz = new THREE.DirectionalLight(0xffffff);
    lightz.position.set(0,0,10);
    scene.add(lightz);

    var lightz2 = new THREE.DirectionalLight(0xffffff);
    lightz2.position.set(0,0,-10);
    scene.add(lightz2);

    var lighty = new THREE.DirectionalLight(0xffffff);
    lighty.position.set(0,-10,0);
    scene.add(lighty);

    
    
    //Controles orbitales
    const controls = new OrbitControls( camera, renderer.domElement );
    controls.target.set( 0, 0.5, 0 );
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;
    

    //Carga de modelo 3D
    var loader = new STLLoader();
    loader.load(model, function(geometry) {
      //Opciones de modelo 3D
      var mesh = new THREE.Mesh(geometry, new THREE.MeshPhongMaterial({
        color: 0x51a2db,
        //wireframe: true
      }));
      camera.position.set(0,0,10);
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      mesh.position.set( 0, 0, 0 );
      mesh.scale.set(0.05, 0.05, 0.05);
      scene.add(mesh);
      //Caja de bordes (para obtener medidas)
      var bbox = new THREE.Box3();
      bbox.setFromObject( mesh );
      
      
      //Determinación de medidas
      var YLength = bbox.max.y - bbox.min.y;
      var XLength = bbox.max.x - bbox.min.x;
      var ZLength = bbox.max.z - bbox.min.z;
      console.log('Diametro X '+(XLength))
      console.log('Diametro Y '+(YLength))
      console.log('Diametro Z '+(ZLength))
      console.log("stl volume is " + getVolume(geometry));
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

export default ModelViewer;