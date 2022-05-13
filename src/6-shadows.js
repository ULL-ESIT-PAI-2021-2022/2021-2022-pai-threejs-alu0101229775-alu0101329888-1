import * as THREE from '../node_modules/three/build/three.module.js'

'use strict';

function main() {
  let CANVAS = document.getElementById('canvasBase'); // Canvas
  const RENDERER = new THREE.WebGLRenderer({          // Renderer
    canvas: CANVAS,
    alpha: true                                       // The canvas will accept transparency
  });
  RENDERER.shadowMap.enabled = true;                  // IMPORTANT: To render shadows, our renderer needs to be told so
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
  // Textures
  const LOADER = new THREE.TextureLoader();                                     // We initialize our texture loader
  const BRICKS = LOADER.load('./src/textures/bricks.jpg');                      // And save our textures in constants to be able to load them
  const TILES = LOADER.load('./src/textures/tiles.jpg');
  const WATER = LOADER.load('./src/textures/water.webp');
  const WOOD = LOADER.load('./src/textures/wood.jpg');
  // Sphere
  const SPHERE_BRICKS_GEOMETRY = new THREE.SphereGeometry(0.5);                 // Sphere with radius 0.5
  const SPHERE_BRICKS_MATERIAL = new THREE.MeshPhongMaterial({                  // Basic material for the sphere, we will give it one of the new loaded textures with map: <texture>
    color: 'white',
    map: BRICKS
  });
  const SPHERE_BRICKS = new THREE.Mesh(SPHERE_BRICKS_GEOMETRY, SPHERE_BRICKS_MATERIAL);
  SPHERE_BRICKS.position.set(0, 1, 0);
  SPHERE_BRICKS.receiveShadow = true;                                           // We want our sphere to cast and be able to be casted shadows from the surroundings
  SPHERE_BRICKS.castShadow = true;
  SCENE.add(SPHERE_BRICKS);
  // Sphere
  const SPHERE_TILES_GEOMETRY = new THREE.SphereGeometry(0.5);                  // Sphere with radius 0.5
  const SPHERE_TILES_MATERIAL = new THREE.MeshPhongMaterial({                   // Basic material for the sphere, we will give it one of the new loaded textures with map: <texture>
    color: 'white',
    map: TILES
  });
  const SPHERE_TILES = new THREE.Mesh(SPHERE_TILES_GEOMETRY, SPHERE_TILES_MATERIAL);
  SPHERE_TILES.position.set(0, 1, 2);
  SPHERE_TILES.receiveShadow = true;                                           // We want our sphere to cast and be able to be casted shadows from the surroundings
  SPHERE_TILES.castShadow = true;
  SCENE.add(SPHERE_TILES);
  // Sphere
  const SPHERE_WOOD_GEOMETRY = new THREE.SphereGeometry(0.5);                 // Sphere with radius 0.5
  const SPHERE_WOOD_MATERIAL = new THREE.MeshPhongMaterial({                  // Basic material for the sphere, we will give it one of the new loaded textures with map: <texture>
    color: 'white',
    map: WOOD
  });
  const SPHERE_WOOD = new THREE.Mesh(SPHERE_WOOD_GEOMETRY, SPHERE_WOOD_MATERIAL);
  SPHERE_WOOD.position.set(2, 0.5, -2);
  SPHERE_WOOD.receiveShadow = true;                                           // We want our sphere to cast and be able to be casted shadows from the surroundings
  SPHERE_WOOD.castShadow = true;
  SCENE.add(SPHERE_WOOD);
  // Floor
  const FLOOR_GEOMETRY = new THREE.PlaneGeometry(10, 10);                       // Now let's add a floor with dimensions 10x10
  const FLOOR_MATERIAL = new THREE.MeshPhongMaterial({                          // Basic material for the floor with a water texture
    color: 'white',
    map: WATER
  });
  const FLOOR = new THREE.Mesh(FLOOR_GEOMETRY, FLOOR_MATERIAL);                 // We create the actual mesh with its geometry and material
  FLOOR.rotation.x = Math.PI * -.5;                                             // we rotate it to make it horizontal
  FLOOR.receiveShadow = true;                                                   // we make it so that shadows can be cast in it
  SCENE.add(FLOOR);                                                             // and we add it to the scene   
  // Lights
  const COLOR = 'white';                                                        // PointLight
  const INTENSITY = 1.5;
  const LIGHT = new THREE.PointLight(COLOR, INTENSITY);
  LIGHT.position.set(5, 6, 0);
  LIGHT.castShadow = true;                                                      // Our light will be able to cast shadows with this
  LIGHT.shadow.mapSize.width = 1024;                                            // This will make the shadow map's texture bigger so that we can get
  LIGHT.shadow.mapSize.height = 1024;                                           // careful, as the bigger it is the longer it will take to compute
  SCENE.add(LIGHT);  
  // Render
  let time = 1;
  update(time);                                                                 // Now we call our loop function

  function update(time) {                                                           // The function will keep rendering the scene looking for possible changes
    animate(time);
    RENDERER.render(SCENE, CAMERA);
    requestAnimationFrame(update);
  }
  function animate(time) {                                                          // This function will let us do a little aniamtion with the spheres to appreciate the shadows
    time *= 0.001;
    SPHERE_BRICKS.rotation.x = time * 0.5;                                          // This rotates the spheres at different speeds
    SPHERE_BRICKS.rotation.y = time * 0.5;
    SPHERE_WOOD.rotation.x = time * 2;
    SPHERE_WOOD.rotation.y = time * 2;
    SPHERE_TILES.rotation.x = time;
    SPHERE_TILES.rotation.y = time;
    SPHERE_BRICKS.position.y = 2 + THREE.MathUtils.lerp(-2, 0.2, Math.abs(Math.sin(time * 3)));     // This makes them bounce in a realistic way
    SPHERE_WOOD.position.y = 2 + THREE.MathUtils.lerp(-2, 0.7, Math.abs(Math.sin(time * 2.7)));
    SPHERE_TILES.position.y = 2 + THREE.MathUtils.lerp(-2, 1, Math.abs(Math.sin(time * 2.1)));
  }
}

// Calls the main function when the window is done loading.
window.onload = main;