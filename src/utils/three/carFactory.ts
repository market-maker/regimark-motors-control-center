
import * as THREE from 'three';

export interface CarPosition {
  x: number;
  y: number;
  z: number;
}

/**
 * Creates a 3D car model using Three.js primitive shapes
 */
export function createCar(color: number, x: number, z: number, rotation: number): THREE.Group {
  const car = new THREE.Group();
  
  // Car body
  const bodyGeometry = new THREE.BoxGeometry(4, 1, 2);
  const bodyMaterial = new THREE.MeshPhongMaterial({ 
    color: color,
    specular: 0x111111, 
    shininess: 30 
  });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  car.add(body);
  
  // Car top
  const topGeometry = new THREE.BoxGeometry(2, 0.8, 1.8);
  const top = new THREE.Mesh(topGeometry, bodyMaterial);
  top.position.set(-0.5, 0.9, 0);
  car.add(top);
  
  // Wheels
  const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.4, 16);
  const wheelMaterial = new THREE.MeshPhongMaterial({ 
    color: 0x333333,
    specular: 0x222222,
    shininess: 30 
  });
  
  const wheelPositions = [
    { x: 1.3, y: -0.5, z: 1.1 },
    { x: 1.3, y: -0.5, z: -1.1 },
    { x: -1.3, y: -0.5, z: 1.1 },
    { x: -1.3, y: -0.5, z: -1.1 }
  ];
  
  wheelPositions.forEach(position => {
    const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel.position.set(position.x, position.y, position.z);
    wheel.rotation.set(Math.PI / 2, 0, Math.PI / 2);
    car.add(wheel);
  });
  
  // Lights
  const headlightGeometry = new THREE.SphereGeometry(0.2, 16, 16);
  const headlightMaterial = new THREE.MeshPhongMaterial({ 
    color: 0xffffcc,
    emissive: 0xffffcc,
    emissiveIntensity: 0.5
  });
  
  const headlightPositions = [
    { x: 2, y: 0.1, z: 0.7 },
    { x: 2, y: 0.1, z: -0.7 }
  ];
  
  headlightPositions.forEach(position => {
    const headlight = new THREE.Mesh(headlightGeometry, headlightMaterial);
    headlight.position.set(position.x, position.y, position.z);
    car.add(headlight);
  });
  
  // Position and rotate car
  car.position.set(x, 0, z);
  car.rotation.y = rotation;
  
  return car;
}

/**
 * Creates a collection of cars for the scene
 */
export function createCars(scene: THREE.Scene): THREE.Group {
  const group = new THREE.Group();
  scene.add(group);

  // Add multiple cars with different colors and positions
  group.add(createCar(0xff0000, 0, 0, 0)); // Red car in center
  group.add(createCar(0x0066ff, 8, 4, Math.PI / 4)); // Blue car
  group.add(createCar(0x00cc00, -7, -5, -Math.PI / 3)); // Green car
  group.add(createCar(0xffcc00, -5, 6, Math.PI / 2)); // Yellow car
  group.add(createCar(0xcc00cc, 6, -7, -Math.PI / 6)); // Purple car
  
  return group;
}
