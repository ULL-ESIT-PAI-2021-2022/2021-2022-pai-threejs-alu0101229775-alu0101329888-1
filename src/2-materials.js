/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Edwin Plasencia Hernández & Gerard Antony Caramazza Vilá
 * @since May 15 2022
 * @desc Basic materials with three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js';
import {GUI} from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';


'use strict';

class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
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
  const FAR = 100;                                                              // Farthest point that will be rendered from the camera
  const CAMERA = new THREE.PerspectiveCamera(FOV, ASPECT_RATIO, NEAR, FAR);     // Basic perspective camera
  CAMERA.position.set(2, 3, 2);                                                 // We move to camera to x=2 y=2 z=2
  CAMERA.lookAt(0, 0, 0);                                                       // and point it to x=0 y=0 z=0
  // Scene
  const SCENE = new THREE.Scene();                                              // Basic scene
  SCENE.background = new THREE.Color('white');                                  // We are gonna make the background of the scene white
  // Sphere
  const SPHERE_GEOMETRY = new THREE.SphereGeometry(0.5);                        // Sphere with radius 0.5
  const SPHERE_MATERIAL = new THREE.MeshPhongMaterial({                         // Blue phong material for the sphere
    color: 'blue',                                                              // with sininess of 30
    shininess: 50
  });
  const SPHERE = new THREE.Mesh(SPHERE_GEOMETRY, SPHERE_MATERIAL);
  SPHERE.position.set(0, 1, 0);
  SCENE.add(SPHERE); 
  // Sphere
  const SPHERE_SHINY_GEOMETRY = new THREE.SphereGeometry(0.5);                  // Sphere with radius 0.5
  const SPHERE_SHINY_MATERIAL = new THREE.MeshPhongMaterial({                   // Blue phong material for the sphere
    color: 'blue',                                                              // with sininess of 30
    shininess: 100
  });
  const SPHERE_SHINY = new THREE.Mesh(SPHERE_SHINY_GEOMETRY, SPHERE_SHINY_MATERIAL);
  SPHERE_SHINY.position.set(1, 1, -1);
  SCENE.add(SPHERE_SHINY);  
  // Sphere
  const SPHERE_NOT_SHINY_GEOMETRY = new THREE.SphereGeometry(0.5);              // Sphere with radius 0.5
  const SPHERE_NOT_SHINY_MATERIAL = new THREE.MeshPhongMaterial({               // Blue phong material for the sphere
    color: 'blue',                                                              // with sininess of 0
    shininess: 0
  });
  const SPHERE_NOT_SHINY = new THREE.Mesh(SPHERE_NOT_SHINY_GEOMETRY, SPHERE_NOT_SHINY_MATERIAL);
  SPHERE_NOT_SHINY.position.set(-1, 1, 1);
  SCENE.add(SPHERE_NOT_SHINY);
  // Sphere
  const SPHERE_METALLIC_GEOMETRY = new THREE.SphereGeometry(0.5);              // Sphere with radius 0.5
  const SPHERE_METALLIC_MATERIAL = new THREE.MeshStandardMaterial({            // Green standard material for the sphere
    color: 'green',                                                            // with metalness of 0.7 and roughness of 0
    metalness: 1,
    roughness: 0
  });
  const SPHERE_METALLIC = new THREE.Mesh(SPHERE_METALLIC_GEOMETRY, SPHERE_METALLIC_MATERIAL);
  SPHERE_METALLIC.position.set(2, 1, 0);
  SCENE.add(SPHERE_METALLIC);
  // Sphere
  const SPHERE_ROUGH_GEOMETRY = new THREE.SphereGeometry(0.5);              // Sphere with radius 0.5
  const SPHERE_ROUGH_MATERIAL = new THREE.MeshStandardMaterial({            // Green standard material for the sphere
    color: 'green',                                                         // with metalness of 0 and roughness of 0.7
    metalness: 0,
    roughness: 1
  });
  const SPHERE_ROUGH = new THREE.Mesh(SPHERE_ROUGH_GEOMETRY, SPHERE_ROUGH_MATERIAL);
  SPHERE_ROUGH.position.set(-0, 1, 2);
  SCENE.add(SPHERE_ROUGH);
  // Sphere
  const SPHERE_MEDIUM_GEOMETRY = new THREE.SphereGeometry(0.5);              // Sphere with radius 0.5
  const SPHERE_MEDIUM_MATERIAL = new THREE.MeshStandardMaterial({            // Green standard material for the sphere
    color: 'green',                                                         // with metalness of 0.5 and roughness of 0.5
    metalness: 0.5,
    roughness: 0.5
  });
  const SPHERE_MEDIUM = new THREE.Mesh(SPHERE_MEDIUM_GEOMETRY, SPHERE_MEDIUM_MATERIAL);
  SPHERE_MEDIUM.position.set(1, 1, 1);
  SCENE.add(SPHERE_MEDIUM);
  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);                       // Now let's add a floor with dimensions 10x10
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({                          // Basic material for the floor with the color gray
    color: 'gray',
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);                 // We create the actual mesh with its geometry and material
  FLOOR.rotation.x = Math.PI * -0.5;                                            // we rotate it to make it horizontal
  SCENE.add(FLOOR);                                                             // and we add it to the scene   
  // Light
  const COLOR = 'white';                                                        // We need a basic light to be able to see the spheres
  const INTENSITY = 1.5;                                                        // So we're gonna make a white one with an intensity of 1 at x=5, y=20, z=5
  const LIGHT = new THREE.PointLight(COLOR, INTENSITY);
  LIGHT.position.set(5, 20, 5);
  SCENE.add(LIGHT);  


  const helper = new THREE.PointLightHelper(LIGHT);
  SCENE.add(helper);
  function updateLight() {                                                      // Graphical interface to let us move the light source, not related to three.js
    helper.update();
  }
  function makeXYZGUI(gui, vector3, name, onChangeFn) {
    const folder = gui.addFolder(name);
    folder.add(vector3, 'x', -10, 10).onChange(onChangeFn);
    folder.add(vector3, 'y', 0, 10).onChange(onChangeFn);
    folder.add(vector3, 'z', -10, 10).onChange(onChangeFn);
    folder.open();
  }
  const gui = new GUI();
  makeXYZGUI(gui, LIGHT.position, 'position', updateLight);


  // Render
  update();                                                                     // Now we call our loop function

  function update() {                                                           // The function will keep rendering the scene looking for possible changes
    RENDERER.render(SCENE, CAMERA);
    requestAnimationFrame(update);
  }
}

// Calls the main function
main();