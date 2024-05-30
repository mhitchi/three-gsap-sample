import { TetrahedronGeometry } from 'three';
import './style.css'
import * as THREE from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

//first arg is degrees visible out of 360
//second arg is aspect ratio
//last arg is for view frustrum to control which items are visible - i think it's in a range
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);
camera.position.setX(-3);

//first arg is vectors to define
const geometry = new THREE.TorusGeometry( 10, 3, 6, 100);
const material = new THREE.MeshStandardMaterial( { color: 0xed4e0d });
const torus = new THREE.Mesh( geometry, material );

scene.add(torus);

const pointLight = new THREE.PointLight( 0xffffff, 12.0, 100, 1 );
pointLight.position.set( 0,0,0 );

const ambientLight = new THREE.AmbientLight( 0xffffff );

scene.add( pointLight, ambientLight );

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200,5);
scene.add(lightHelper, gridHelper);

//lets us move around
const controls = new OrbitControls( camera, renderer.domElement)

//make a bunch of stars
function addStar() {
  const geometry = new THREE.SphereGeometry( 0.25, 24, 24 );
  const material = new THREE.MeshStandardMaterial( { color: 0xffffff });
  const star = new THREE.Mesh( geometry, material );

  //get random positioning for 100 stars
  const [x,y,z ] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ));

  star.position.set( x,y,z );
  scene.add(star)
}

Array(200).fill().forEach(addStar);

scene.fog = new THREE.FogExp2( 0x00a9b2, 0.009 );
scene.background = new THREE.Color( 0x142b5c )


//move camera
function moveCamera() {
  //first figure out where they are scrolled to
  //returns dimentions of viewport and how far we are from top
  const topPosition = document.body.getBoundingClientRect().top;

  torus.rotation.x += 0.03;
  torus.rotation.y += 0.02;
  torus.rotation.z += 0.03;

  camera.position.x = topPosition * -0.1;
  camera.position.y = topPosition * -0.0001;
  camera.position.z = topPosition * -0.0002;

}

document.body.onscroll = moveCamera;


//recursive function (like a game loop) to create infinite loop to call render method automatically
function animate() {
  //tells browser want to animate something
  requestAnimationFrame( animate );

  //spin it
  // torus.rotation.x += 0.005;
  // torus.rotation.y += 0.0025;
  // torus.rotation.z += 0.005;

  //mouse interaction changes reflected in ui
  controls.update(); 

  //whenever browser repaints screen, calls render method
  renderer.render( scene, camera );
}

animate();