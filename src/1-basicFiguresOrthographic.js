/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Edwin Plasencia Hernández & Gerard Antony Caramazza Vilá
 * @since May 15 2022
 * @desc Basic figures and orthographic camera with three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js';
import {GUI} from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';

'use strict';

class MinMaxGUIHelper {                                                             // This is also needed to create the graphical interface,
  constructor(obj, minProp, maxProp, minDif) {                                      // again, doesn't have anything to do with three.js so don't worry
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
  const NEAR = 0.1;                                                             // Nearest point that will be rendered from the camera
  const FAR = 100;                                                              // Farthest point that will be rendered from the camera
  const CAMERA = new THREE.OrthographicCamera(-1, 1, 1, -1, NEAR, FAR);         // Basic orthographic camera
  CAMERA.position.set(5, 5, 5);                                                 // We move to camera to x=2 y=2 z=2
  CAMERA.zoom = 0.2;
  CAMERA.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0

  function updateCamera() {                                                     // This entire section let's us create a simple gui to modify the values of
    CAMERA.updateProjectionMatrix();                                            // the camera's fov, near and far properties, don't focus on it too much
  }     

  const gui = new GUI();
  gui.add(CAMERA, 'zoom', 0.01, 1, 0.01).onChange(updateCamera);
  const minMaxGUIHelper = new MinMaxGUIHelper(CAMERA, 'near', 'far', 0.1);
  gui.add(minMaxGUIHelper, 'min', 0.1, 50, 0.1).name('near').onChange(updateCamera);;
  gui.add(minMaxGUIHelper, 'max', 0.1, 50, 0.1).name('far').onChange(updateCamera);;

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

// Calls the main function
main();