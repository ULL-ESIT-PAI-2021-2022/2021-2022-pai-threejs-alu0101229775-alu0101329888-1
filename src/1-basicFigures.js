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
  CAMERA.position.set(2, 2, 2);                                                 // We move to camera to x=2 y=2 z=2
  CAMERA.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0
  // Scene
  const SCENE = new THREE.Scene();                                              //Basic scene
  // Cube
  const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);                         // Geometry of a cube with dimensions 1x1x1
  const CUBE_MATERIAL = new THREE.MeshBasicMaterial({                           // Basic material for the cube with the color green
    color: 'green',
  });
  const CUBE = new THREE.Mesh(CUBE_GEOMETRY, CUBE_MATERIAL);                    // We create the actual mesh with its geometry and material,
  CUBE.position.set(-1, 1, 1);                                                  // we move the cube
  SCENE.add(CUBE);                                                              // and we add it to the scene 
  // Sphere
  const SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);                        // Now we create a sphere geometry with radius 0.5
  const SPHERE_MATERIAL = new THREE.MeshBasicMaterial({                         // Basic material for the sphere with the color blue
    color: 'blue',
    transparent: true,                                                          // also transparent with an opacity of 70%
    opacity: 0.7
  });
  const SPHERE = new THREE.Mesh(SPHERE_GEOMETRY, SPHERE_MATERIAL);              // We create the actual mesh with its geometry and material
  SPHERE.position.set(1, 1, -1);                                                // we move the sphere
  SCENE.add(SPHERE);                                                            // and we add it to the scene   
  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);                       // Now let's add a floor with dimensions 10x10
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({                          // Basic material for the floor with the color gray
    color: 'gray',
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);                 // We create the actual mesh with its geometry and material
  FLOOR.rotation.x = Math.PI * -.5;                                             // we rotate it to make it horizontal
  SCENE.add(FLOOR);                                                             // and we add it to the scene   
  // Render
  update();                                                                     // Now we call our loop function

  function update() {                                                           // The function will keep rendering the scene looking for possible changes
    RENDERER.render(SCENE, CAMERA);
    requestAnimationFrame(update);
  }
}

// Calls the main function when the window is done loading.
window.onload = main;