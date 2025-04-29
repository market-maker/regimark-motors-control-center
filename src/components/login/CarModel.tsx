
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createCars } from '@/utils/three/carFactory';
import { setupGround, setupLights, setupCameraAndControls } from '@/utils/three/sceneSetup';

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

    // Add scene elements using our utility functions
    setupLights(currentScene, theme);
    setupGround(currentScene, theme);
    
    // Create cars and store the group reference
    const group = createCars(currentScene);
    carGroup.current = group;

    // Setup controls
    const orbitControls = setupCameraAndControls(camera, renderer);
    controls.current = orbitControls;

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
