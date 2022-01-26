import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from './OrbitControls.js'
import { STLLoader } from './STLLoader'
//import Stats from 'three/examples/jsm/libs/stats.module'


const ModelViewer = ({model}) => {

  const mountRef = useRef(null);

  useEffect(() => {
    /*
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();

    renderer.setSize( 1024, 576 );
    mountRef.current.appendChild( renderer.domElement );

    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    var cube = new THREE.Mesh( geometry, material );

    scene.add( cube );
    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame( animate );
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render( scene, camera );
    }

    let onWindowResize = function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize( window.innerWidth, window.innerHeight );
    }

    window.addEventListener("resize", onWindowResize, false);

    animate();
    
    return () => mountRef.current.removeChild( renderer.domElement);
    */
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.01, 1000);
    camera.position.setScalar(20);
    var renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x00000000);
    renderer.setSize(1024, 576 );
    mountRef.current.appendChild( renderer.domElement );
    
    var controls = new OrbitControls(camera, renderer.domElement);
    
    var loader = new STLLoader();
    loader.load(model, function(geometry) {
    
      var mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
      }));
      mesh.rotation.set(-Math.PI / 2, 0, 0);
      mesh.scale.setScalar(100);
      scene.add(mesh);
    
      console.log("stl volume is " + getVolume(geometry));
    });
    
    // check with known volume:
    var hollowCylinderGeom = new THREE.LatheBufferGeometry([
      new THREE.Vector2(1, 0),
      new THREE.Vector2(2, 0),
      new THREE.Vector2(2, 2),
      new THREE.Vector2(1, 2),
      new THREE.Vector2(1, 0)
    ], 90).toNonIndexed();
    console.log("pre-computed volume of a hollow cylinder (PI * (R^2 - r^2) * h): " + Math.PI * (Math.pow(2, 2) - Math.pow(1, 2)) * 2);
    console.log("computed volume of a hollow cylinder: " + getVolume(hollowCylinderGeom));
    
    
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
    
    renderer.setAnimationLoop(() => {
      renderer.render(scene, camera);
    });
    return () => mountRef.current.removeChild( renderer.domElement);
  }, []);

  return (
    <div ref={mountRef}>

    </div>
  );
}

export default ModelViewer;