
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

interface CarModelProps {
  theme: 'dark' | 'light';
}

const CarModel: React.FC<CarModelProps> = ({ theme }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const controls = useRef<OrbitControls | null>(null);
  const carGroup = useRef<THREE.Group | null>(null);
  const frameId = useRef<number | null>(null);
  const scene = useRef<THREE.Scene | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const currentScene = new THREE.Scene();
    scene.current = currentScene;
    currentScene.background = new THREE.Color(theme === 'dark' ? '#111827' : '#e5e7eb');

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(10, 5, 10);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting setup
    const ambientLight = new THREE.AmbientLight(theme === 'dark' ? 0x404040 : 0x606060, 1);
    currentScene.add(ambientLight);

    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight1.position.set(5, 10, 5);
    currentScene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight2.position.set(-5, 5, -5);
    currentScene.add(directionalLight2);

    // Create cars
    const group = new THREE.Group();
    carGroup.current = group;
    currentScene.add(group);

    // Simple car representations using primitive shapes
    function createCar(color: number, x: number, z: number, rotation: number) {
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

    // Add multiple cars
    group.add(createCar(0xff0000, 0, 0, 0)); // Red car in center
    group.add(createCar(0x0066ff, 8, 4, Math.PI / 4)); // Blue car
    group.add(createCar(0x00cc00, -7, -5, -Math.PI / 3)); // Green car
    group.add(createCar(0xffcc00, -5, 6, Math.PI / 2)); // Yellow car
    group.add(createCar(0xcc00cc, 6, -7, -Math.PI / 6)); // Purple car
    
    // Ground plane
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshPhongMaterial({ 
      color: theme === 'dark' ? 0x222222 : 0xaaaaaa,
      side: THREE.DoubleSide
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = Math.PI / 2;
    ground.position.y = -2;
    currentScene.add(ground);
    
    // Grid helper
    const gridHelper = new THREE.GridHelper(50, 50, theme === 'dark' ? 0x555555 : 0x888888, theme === 'dark' ? 0x333333 : 0xcccccc);
    gridHelper.position.y = -1.9;
    currentScene.add(gridHelper);

    // Controls
    const orbitControls = new OrbitControls(camera, renderer.domElement);
    controls.current = orbitControls;
    orbitControls.enableDamping = true;
    orbitControls.dampingFactor = 0.05;
    orbitControls.enableZoom = false;
    orbitControls.autoRotate = true;
    orbitControls.autoRotateSpeed = 0.5;

    // Animation loop
    const animate = () => {
      orbitControls.update();
      
      if (carGroup.current) {
        carGroup.current.rotation.y += 0.002;
      }
      
      renderer.render(currentScene, camera);
      frameId.current = requestAnimationFrame(animate);
    };
    
    animate();

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current) return;
      
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]);

  // Update the scene when theme changes
  useEffect(() => {
    if (scene.current) {
      scene.current.background = new THREE.Color(theme === 'dark' ? '#111827' : '#e5e7eb');
    }
  }, [theme]);

  return <div ref={mountRef} className="absolute inset-0 -z-10" />;
};

export default CarModel;
