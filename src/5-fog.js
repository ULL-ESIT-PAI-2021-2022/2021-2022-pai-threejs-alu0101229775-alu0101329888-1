/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Programación de Aplicaciones Interactivas
 *
 * @author Edwin Plasencia Hernández & Gerard Antony Caramazza Vilá
 * @since May 15 2022
 * @desc Fog creation in three.js
 */

import * as THREE from '../node_modules/three/build/three.module.js';
import {GUI} from 'https://threejs.org/examples/jsm/libs/lil-gui.module.min.js';

'use strict';

class FogGUIHelper {                                                                    // Not related to three.js, just part of the graphical interface
  constructor(fog, backgroundColor) {
    this.fog = fog;
    this.backgroundColor = backgroundColor;
  }
  get near() {
    return this.fog.near;
  }
  set near(v) {
    this.fog.near = v;
    this.fog.far = Math.max(this.fog.far, v);
  }
  get far() {
    return this.fog.far;
  }
  set far(v) {
    this.fog.far = v;
    this.fog.near = Math.min(this.fog.near, v);
  }
  get color() {
    return `#${this.fog.color.getHexString()}`;
  }
  set color(hexString) {
    this.fog.color.set(hexString);
    this.backgroundColor.set(hexString);
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
  const NEAR_FOG = 1;                                                           // And we are adding fog to it, it will start from 1 block from the camera
  const FAR_FOG = 10;                                                           // and will reach its end at 4 blocks away
  const COLOR_FOG = 'white';                                                    // it will also be a white fog, although we could make it any color we want
  SCENE.fog = new THREE.Fog(COLOR_FOG, NEAR_FOG, FAR_FOG);
  SCENE.background = new THREE.Color(COLOR_FOG);

  const gui = new GUI();                                                        // Don't pay attention to this part as it's just a graphical interface
  const fogGUIHelper = new FogGUIHelper(SCENE.fog, SCENE.background);           // to change the fog values, it's not related to three.js
  gui.add(fogGUIHelper, 'near', NEAR_FOG, FAR_FOG).listen();
  gui.add(fogGUIHelper, 'far', NEAR_FOG, FAR_FOG).listen();
  gui.addColor(fogGUIHelper, 'color');

  // Textures
  const LOADER = new THREE.TextureLoader();                                     // We initialize our texture loader
  const BRICKS = LOADER.load('./src/textures/bricks.jpg');                      // And save our textures in constants to be able to load them
  const TILES = LOADER.load('./src/textures/tiles.jpg');
  const WATER = LOADER.load('./src/textures/water.webp');
  const WOOD = LOADER.load('./src/textures/wood.jpg');
  // Sphere
  const SPHERE_BRICKS_GEOMETRY = new THREE.SphereGeometry(0.5);                 // Sphere with radius 0.5
  const SPHERE_BRICKS_MATERIAL = new THREE.MeshBasicMaterial({                  // Basic material for the sphere, we will give it one of the new loaded textures with map: <texture>
    color: 'white',
    map: BRICKS
  });
  const SPHERE_BRICKS = new THREE.Mesh(SPHERE_BRICKS_GEOMETRY, SPHERE_BRICKS_MATERIAL);
  SPHERE_BRICKS.position.set(0, 1, 0);
  SCENE.add(SPHERE_BRICKS);
  // Sphere
  const SPHERE_TILES_GEOMETRY = new THREE.SphereGeometry(0.5);                 // Sphere with radius 0.5
  const SPHERE_TILES_MATERIAL = new THREE.MeshBasicMaterial({                  // Basic material for the sphere, we will give it one of the new loaded textures with map: <texture>
    color: 'white',
    map: TILES
  });
  const SPHERE_TILES = new THREE.Mesh(SPHERE_TILES_GEOMETRY, SPHERE_TILES_MATERIAL);
  SPHERE_TILES.position.set(-1, 1, 1);
  SCENE.add(SPHERE_TILES);
  // Sphere
  const SPHERE_WOOD_GEOMETRY = new THREE.SphereGeometry(0.5);                 // Sphere with radius 0.5
  const SPHERE_WOOD_MATERIAL = new THREE.MeshBasicMaterial({                  // Basic material for the sphere, we will give it one of the new loaded textures with map: <texture>
    color: 'white',
    map: WOOD
  });
  const SPHERE_WOOD = new THREE.Mesh(SPHERE_WOOD_GEOMETRY, SPHERE_WOOD_MATERIAL);
  SPHERE_WOOD.position.set(1, 1, -1);
  SCENE.add(SPHERE_WOOD);
  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);                       // Now let's add a floor with dimensions 10x10
  const FLOOR_MATERIAL = new THREE.MeshBasicMaterial({                          // Basic material for the floor with a water texture
    color: 'white',
    map: WATER
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);                 // We create the actual mesh with its geometry and material
  FLOOR.rotation.x = Math.PI * -.5;                                             // we rotate it to make it horizontal
  SCENE.add(FLOOR);                                                             // and we add it to the scene   
  // Lights
  const COLOR = 'white';                                                        // PointLight
  const INTENSITY = 1.5;
  const LIGHT = new THREE.PointLight(COLOR, INTENSITY);
  LIGHT.position.set(5, 20, 5);
  SCENE.add(LIGHT);  
  // Render
  update();                                                                     // Now we call our loop function

  function update() {                                                           // The function will keep rendering the scene looking for possible changes
    RENDERER.render(SCENE, CAMERA);
    requestAnimationFrame(update);
  }
}

// Calls the main function
main();
