
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

/**
 * Sets up the ground plane and grid for the car scene
 */
export function setupGround(scene: THREE.Scene, theme: 'dark' | 'light'): void {
  // Ground plane
  const groundGeometry = new THREE.PlaneGeometry(50, 50);
  const groundMaterial = new THREE.MeshPhongMaterial({ 
    color: theme === 'dark' ? 0x222222 : 0xaaaaaa,
    side: THREE.DoubleSide
  });
  
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = Math.PI / 2;
  ground.position.y = -2;
  scene.add(ground);
  
  // Grid helper
  const gridHelper = new THREE.GridHelper(
    50, 
    50, 
    theme === 'dark' ? 0x555555 : 0x888888, 
    theme === 'dark' ? 0x333333 : 0xcccccc
  );
  gridHelper.position.y = -1.9;
  scene.add(gridHelper);
}

/**
 * Sets up the lighting for the scene based on the current theme
 */
export function setupLights(scene: THREE.Scene, theme: 'dark' | 'light'): void {
  // Ambient light
  const ambientLight = new THREE.AmbientLight(
    theme === 'dark' ? 0x404040 : 0x606060, 
    1
  );
  scene.add(ambientLight);

  // Directional lights
  const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight1.position.set(5, 10, 5);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight2.position.set(-5, 5, -5);
  scene.add(directionalLight2);
}

/**
 * Sets up camera and orbit controls
 */
export function setupCameraAndControls(
  camera: THREE.PerspectiveCamera, 
  renderer: THREE.WebGLRenderer
): OrbitControls {
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.5;
  
  return controls;
}
