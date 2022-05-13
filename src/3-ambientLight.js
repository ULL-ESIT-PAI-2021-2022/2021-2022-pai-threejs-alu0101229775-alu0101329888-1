import * as THREE from '../node_modules/three/build/three.module.js'

'use strict';

function main() {
  let CANVAS = document.getElementById('canvasBase'); // Canvas
  const RENDERER = new THREE.WebGLRenderer({          // Renderer
    canvas: CANVAS,
    alpha: true                                       // The canvas will accept transparency
  });
  // Camera
  const FOV = 90;                                                               // Camera's field of view
  const ASPECT_RATIO = (CANVAS.width / CANVAS.height);
  const NEAR = 0.1;                                                             // Nearest point that will be rendered from the camera
  const FAR = 100;                                                              // Farthest point that will be rendered from the camera
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);     // Basic perspective camera
  CAMERA.position.set(2, 3, 2);                                                 // We move to camera to x=2 y=2 z=2
  CAMERA.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0
  // Scene
  const SCENE = new THREE.Scene();                                              // Basic scene
  SCENE.background = new THREE.Color('white');                                  // We are gonna make the background of the scene white
  // Sphere
  const SPHERE_MEDIUM_GEOMETRY = new THREE.SphereGeometry(0.5);                 // Sphere with radius 0.5
  const SPHERE_MEDIUM_MATERIAL = new THREE.MeshStandardMaterial({               // Green standard material for the sphere
    color: 'green',                                                             // with metalness of 0.5 and roughness of 0.5
    metalness: 0.5,
    roughness: 0.5
  });
  const SPHERE_MEDIUM = new THREE.Mesh(SPHERE_MEDIUM_GEOMETRY, SPHERE_MEDIUM_MATERIAL);
  SPHERE_MEDIUM.position.set(0, 1, 0);
  SCENE.add(SPHERE_MEDIUM);
  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);                       // Now let's add a floor with dimensions 10x10
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({                          // Basic material for the floor with the color gray
    color: 'gray',
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);                 // We create the actual mesh with its geometry and material
  FLOOR.rotation.x = Math.PI * -.5;                                             // we rotate it to make it horizontal
  SCENE.add(FLOOR);                                                             // and we add it to the scene   
  // Lights
  const COLOR = 'white';                                                        // AmbientLight
  const INTENSITY = 1.5;
  const LIGHT = new THREE.AmbientLight(COLOR, INTENSITY);
  SCENE.add(LIGHT);  
  // Render
  update();                                                                     // Now we call our loop function

  function update() {                                                           // The function will keep rendering the scene looking for possible changes
    RENDERER.render(SCENE, CAMERA);
    requestAnimationFrame(update);
  }
}

// Calls the main function when the window is done loading.
window.onload = main;