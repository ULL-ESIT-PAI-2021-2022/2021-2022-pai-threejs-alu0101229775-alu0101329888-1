/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Edwin Plasencia Hernández & Gerard Antony Caramazza Vilá
 * @since May 15 2022
 * @desc Basic figures and perspective camera with three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js';
import {GUI} from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';

'use strict';

class MinMaxGUIHelper {                                               // This is a function that let's us modify the camera's properties such as far, near and
  constructor(obj, minProp, maxProp, minDif) {                        // fov, but it doesn't have much to do with three.js so don't focus too much on it
    this.obj = obj;
    this.minProp = minProp;
    this.maxProp = maxProp;
    this.minDif = minDif;
  }
  get min() {
    return this.obj[this.minProp];
  }
  set min(v) {
    this.obj[this.minProp] = v;
    this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
  }
  get max() {
    return this.obj[this.maxProp];
  }
  set max(v) {
    this.obj[this.maxProp] = v;
    this.min = this.min;
  }
}

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
  const FAR = 15;                                                              // Farthest point that will be rendered from the camera
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);     // Basic perspective camera
  CAMERA.position.set(2, 2, 2);                                                 // We move to camera to x=2 y=2 z=2
  CAMERA.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0
  // Scene
  const SCENE = new THREE.Scene();                                              //Basic scene
  // Cube
  const CUBE_GEOMETRY = new THREE.BoxGeometry(1, 1, 1);                         // Geometry of a cube with dimensions 1x1x1
  const CUBE_MATERIAL = new THREE.MeshBasicMaterial({                           // Basic material for the cube with the color green
    color: 'purple',
  });
  const CUBE = new THREE.Mesh(CUBE_GEOMETRY, CUBE_MATERIAL);                    // We create the actual mesh with its geometry and material,
  CUBE.position.set(-1, 1, 2);                                                  // we move the cube
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
  FLOOR.position.set(0, -3, 0);
  SCENE.add(FLOOR);                                                             // and we add it to the scene   
  // Coordinate axis
  const X_AXIS_GEOMETRY = new THREE.PlaneGeometry(0.05, 10);                    // These are just long and thin planes rotated on the x, y and z axes
  const X_AXIS_MATERIAL = new THREE.MeshBasicMaterial({                         // with different colors, they represent the actual coordinate axes
    color: 'red',                                                               // converging at 0, 0, 0.
  });
  const X_AXIS = new THREE.Mesh(X_AXIS_GEOMETRY, X_AXIS_MATERIAL);
  X_AXIS.rotation.z = Math.PI * -.5; 
  SCENE.add(X_AXIS);
  const Y_AXIS_GEOMETRY = new THREE.PlaneGeometry(0.05, 10);
  const Y_AXIS_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'blue',
  });
  const Y_AXIS = new THREE.Mesh(Y_AXIS_GEOMETRY, Y_AXIS_MATERIAL);
  SCENE.add(Y_AXIS);
  const Z_AXIS_GEOMETRY = new THREE.PlaneGeometry(0.05, 10);
  const Z_AXIS_MATERIAL = new THREE.MeshBasicMaterial({
    color: 'green',
  });
  const Z_AXIS = new THREE.Mesh(Y_AXIS_GEOMETRY, Z_AXIS_MATERIAL);
  Z_AXIS.rotation.x = Math.PI * -.5; 
  SCENE.add(Z_AXIS);

  function updateCamera() {                                                     // This entire section let's us create a simple graphical interface to modify the values of
    CAMERA.updateProjectionMatrix();                                            // the camera's fov, near and far properties, don't focus on it too much
  }                                                                             // as it's not really the point and doesn't have anything to do with Three.js
   
  const gui = new GUI();
  gui.add(CAMERA, 'fov', 1, 180).onChange(updateCamera);
  const minMaxGUIHelper = new MinMaxGUIHelper(CAMERA, 'near', 'far', 0.1);
  gui.add(minMaxGUIHelper, 'min', 0.1, 15, 0.1).name('near').onChange(updateCamera);
  gui.add(minMaxGUIHelper, 'max', 0.1, 15, 0.1).name('far').onChange(updateCamera);


  // Render
  update();                                                                     // Now we call our loop function

  function update() {                                                           // The function will keep rendering the scene looking for possible changes
    RENDERER.render(SCENE, CAMERA);
    requestAnimationFrame(update);
  }
}

// Calls the main function
main();