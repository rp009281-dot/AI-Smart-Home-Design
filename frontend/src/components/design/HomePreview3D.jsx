import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Sun, Moon, Eye, RotateCw, RefreshCw, Layers } from 'lucide-react';

export default function HomePreview3D({ designMeta, tier = 'balanced' }) {
  const mountRef = useRef(null);
  const [isNight, setIsNight] = useState(false);
  const [showRoof, setShowRoof] = useState(true);
  const [autoRotate, setAutoRotate] = useState(true);

  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const houseGroupRef = useRef(null);
  const roofMeshRef = useRef(null);
  const sunLightRef = useRef(null);
  const ambientLightRef = useRef(null);
  const interiorLightsRef = useRef([]);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(isNight ? 0x090D16 : 0xE2E8F0);
    sceneRef.current = scene;

    // Camera
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight || 440;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(30, 24, 30);
    camera.lookAt(0, 4, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.innerHTML = '';
    currentMount.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(isNight ? 0x1E293B : 0xFFFFFF, isNight ? 0.4 : 0.85);
    scene.add(ambientLight);
    ambientLightRef.current = ambientLight;

    const dirLight = new THREE.DirectionalLight(isNight ? 0x93C5FD : 0xFFFBEB, isNight ? 0.6 : 1.2);
    dirLight.position.set(25, 40, 20);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    scene.add(dirLight);
    sunLightRef.current = dirLight;

    // House Group
    const houseGroup = new THREE.Group();
    houseGroupRef.current = houseGroup;
    scene.add(houseGroup);

    // Ground Plot Base
    const groundGeo = new THREE.BoxGeometry(28, 0.6, 24);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x86EFAC, // Lawn green
      roughness: 0.8
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.position.y = -0.3;
    groundMesh.receiveShadow = true;
    houseGroup.add(groundMesh);

    // Driveway / Parking Pad
    const driveGeo = new THREE.BoxGeometry(8, 0.65, 12);
    const driveMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, roughness: 0.7 });
    const driveMesh = new THREE.Mesh(driveGeo, driveMat);
    driveMesh.position.set(-8, -0.27, 5);
    driveMesh.receiveShadow = true;
    houseGroup.add(driveMesh);

    // Main House Building Body (Ground Floor)
    const wallColor = tier === 'premium' ? 0xF8FAFC : 0xFFFFFF;
    const bodyGeo = new THREE.BoxGeometry(16, 6, 14);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: wallColor,
      roughness: 0.5
    });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    bodyMesh.position.set(2, 3, 0);
    bodyMesh.castShadow = true;
    bodyMesh.receiveShadow = true;
    houseGroup.add(bodyMesh);

    // Accent wood / stone panel facade
    const accentGeo = new THREE.BoxGeometry(6, 6.2, 0.4);
    const accentMat = new THREE.MeshStandardMaterial({
      color: tier === 'premium' ? 0x78350F : 0x1E3A8A, // Teakwood / deep brand navy
      roughness: 0.4
    });
    const accentMesh = new THREE.Mesh(accentGeo, accentMat);
    accentMesh.position.set(-2, 3.1, 7.1);
    houseGroup.add(accentMesh);

    // Large Glass Windows
    const windowGeo = new THREE.BoxGeometry(4, 3, 0.3);
    const windowMat = new THREE.MeshPhysicalMaterial({
      color: 0x38BDF8,
      transmission: 0.8,
      opacity: 0.9,
      transparent: true,
      roughness: 0.1,
      metalness: 0.1
    });
    const frontWindow = new THREE.Mesh(windowGeo, windowMat);
    frontWindow.position.set(5, 3.5, 7.1);
    houseGroup.add(frontWindow);

    // Entrance Door
    const doorGeo = new THREE.BoxGeometry(2, 4.2, 0.4);
    const doorMat = new THREE.MeshStandardMaterial({ color: 0x451A03, roughness: 0.6 });
    const doorMesh = new THREE.Mesh(doorGeo, doorMat);
    doorMesh.position.set(-1.5, 2.1, 7.1);
    houseGroup.add(doorMesh);

    // Interior Warm Lights (glow through windows at night)
    const pointLight = new THREE.PointLight(0xFBBF24, isNight ? 2.5 : 0.2, 18);
    pointLight.position.set(2, 3, 2);
    houseGroup.add(pointLight);
    interiorLightsRef.current = [pointLight];

    // Second Floor / Terrace Balcony
    const secondFloorGeo = new THREE.BoxGeometry(12, 5, 12);
    const secondFloorMat = new THREE.MeshStandardMaterial({
      color: wallColor,
      roughness: 0.5
    });
    const secondFloorMesh = new THREE.Mesh(secondFloorGeo, secondFloorMat);
    secondFloorMesh.position.set(1, 8.5, -0.5);
    secondFloorMesh.castShadow = true;
    secondFloorMesh.receiveShadow = true;
    houseGroup.add(secondFloorMesh);

    // Upper Floor Balcony Glass Railing
    const balconyGlassGeo = new THREE.BoxGeometry(12.2, 1.2, 0.2);
    const balconyGlassMesh = new THREE.Mesh(balconyGlassGeo, windowMat);
    balconyGlassMesh.position.set(1, 6.6, 5.6);
    houseGroup.add(balconyGlassMesh);

    // Roof Mesh with Solar Panels
    const roofGroup = new THREE.Group();
    roofGroup.position.set(1, 11.2, -0.5);

    const slabGeo = new THREE.BoxGeometry(13.5, 0.6, 13.5);
    const slabMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    const slabMesh = new THREE.Mesh(slabGeo, slabMat);
    roofGroup.add(slabMesh);

    // Solar PV Panels on roof
    for (let r = -1; r <= 1; r++) {
      for (let c = -1; c <= 1; c++) {
        const solarGeo = new THREE.BoxGeometry(2.6, 0.15, 2.2);
        const solarMat = new THREE.MeshStandardMaterial({
          color: 0x1E293B,
          metalness: 0.8,
          roughness: 0.2
        });
        const solarMesh = new THREE.Mesh(solarGeo, solarMat);
        solarMesh.position.set(r * 3.2, 0.4, c * 2.8);
        solarMesh.rotation.x = -0.15; // angled toward sun
        roofGroup.add(solarMesh);
      }
    }

    roofMeshRef.current = roofGroup;
    houseGroup.add(roofGroup);

    // Orbit Drag Interaction
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;

    const onMouseDown = (e) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      houseGroup.rotation.y += deltaX * 0.01;
      camera.position.y = Math.max(8, Math.min(45, camera.position.y - deltaY * 0.1));
      camera.lookAt(0, 4, 0);
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const onWheel = (e) => {
      e.preventDefault();
      const zoomDelta = e.deltaY * 0.03;
      const newDistance = camera.position.length() + zoomDelta;
      if (newDistance > 20 && newDistance < 70) {
        camera.position.multiplyScalar(newDistance / camera.position.length());
      }
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    // Animation Loop
    let reqId;
    const animate = () => {
      reqId = requestAnimationFrame(animate);
      if (autoRotate && !isDragging) {
        houseGroup.rotation.y += 0.004;
      }
      renderer.render(scene, camera);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 440;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(reqId);
      dom.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      dom.removeEventListener('wheel', onWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      currentMount.innerHTML = '';
    };
  }, [tier]);

  // Handle Day/Night Toggle
  useEffect(() => {
    if (!sceneRef.current) return;
    sceneRef.current.background = new THREE.Color(isNight ? 0x090D16 : 0xE2E8F0);
    if (ambientLightRef.current) {
      ambientLightRef.current.color = new THREE.Color(isNight ? 0x1E293B : 0xFFFFFF);
      ambientLightRef.current.intensity = isNight ? 0.35 : 0.85;
    }
    if (sunLightRef.current) {
      sunLightRef.current.color = new THREE.Color(isNight ? 0x93C5FD : 0xFFFBEB);
      sunLightRef.current.intensity = isNight ? 0.4 : 1.2;
    }
    interiorLightsRef.current.forEach(light => {
      light.intensity = isNight ? 2.8 : 0.2;
    });
  }, [isNight]);

  // Handle Roof Visibility Toggle
  useEffect(() => {
    if (roofMeshRef.current) {
      roofMeshRef.current.visible = showRoof;
    }
  }, [showRoof]);

  const resetCamera = () => {
    if (houseGroupRef.current) {
      houseGroupRef.current.rotation.y = 0;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden">
      {/* 3D Top Header Toolbar */}
      <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h4 className="text-sm font-semibold text-slate-800 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Real-Time 3D Isometric Home Visualizer
          </h4>
          <p className="text-xs text-slate-500">
            Drag to rotate orbit • Scroll to zoom • Interactive lighting & roof controls
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Day / Night Toggle */}
          <button
            onClick={() => setIsNight(!isNight)}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 transition ${
              isNight
                ? 'bg-indigo-900 text-indigo-100 hover:bg-indigo-800'
                : 'bg-amber-100 text-amber-900 hover:bg-amber-200'
            }`}
          >
            {isNight ? <Moon className="w-3.5 h-3.5 text-indigo-300" /> : <Sun className="w-3.5 h-3.5 text-amber-600" />}
            {isNight ? 'Night View' : 'Daylight'}
          </button>

          {/* Roof Toggle */}
          <button
            onClick={() => setShowRoof(!showRoof)}
            className={`px-3 py-1.5 text-xs font-medium rounded-xl flex items-center gap-1.5 border transition ${
              showRoof
                ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-50'
                : 'bg-brand-50 border-brand-300 text-brand-700 font-semibold'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            {showRoof ? 'Roof On' : 'Roof Off (See Inside)'}
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            className={`p-1.5 rounded-xl border transition ${
              autoRotate ? 'bg-brand-100 border-brand-300 text-brand-700' : 'bg-white border-slate-200 text-slate-600'
            }`}
            title="Toggle Auto-Rotation"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          {/* Reset View */}
          <button
            onClick={resetCamera}
            className="p-1.5 bg-white border border-slate-200 hover:bg-slate-100 text-slate-600 rounded-xl transition"
            title="Reset Angle"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* WebGL Canvas Container */}
      <div className="relative w-full h-[450px] bg-slate-100 cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* Feature Badges Overlay */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 pointer-events-none">
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm border border-slate-200">
            ☀️ Rooftop Solar Array
          </span>
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm border border-slate-200">
            🍃 Natural Cross-Ventilation Slabs
          </span>
          <span className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-slate-700 shadow-sm border border-slate-200">
            🚗 Covered Driveway Porch
          </span>
        </div>
      </div>
    </div>
  );
}
