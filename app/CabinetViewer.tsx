'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Suspense } from 'react';

function ExampleCabinetSet() {
  return (
    <group position={[0, -0.5, 0]}>
      {/* Base Cabinets (Dark Wood) */}
      <mesh position={[-1.5, 0, 0]}>
        <boxGeometry args={[1.8, 0.9, 0.6]} />
        <meshStandardMaterial color="#5c3a21" roughness={0.3} />
      </mesh>
      
      {/* Wall Cabinets (White) */}
      <mesh position={[-1.5, 1.6, 0]}>
        <boxGeometry args={[1.8, 0.7, 0.4]} />
        <meshStandardMaterial color="#f5f5f5" roughness={0.2} />
      </mesh>
      
      {/* Island (Gold Accent) */}
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[2, 0.9, 1.2]} />
        <meshStandardMaterial color="#d4af37" metalness={0.7} roughness={0.4} />
      </mesh>
      
      {/* Drawer Handles */}
      <mesh position={[-1.5, 0.45, 0.31]} rotation={[0, Math.PI/2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
        <meshStandardMaterial color="#c0c0c0" metalness={1} roughness={0.1} />
      </mesh>
    </group>
  );
}

export default function CabinetViewer() {
  return (
    <Canvas shadows camera={{ position: [5, 2, 5], fov: 35 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <spotLight 
          position={[10, 10, 10]} 
          angle={0.15} 
          penumbra={1} 
          intensity={2} 
          castShadow
        />
        <ExampleCabinetSet />
        <OrbitControls 
          enableZoom={true}
          minPolarAngle={Math.PI/6} 
          maxPolarAngle={Math.PI/2.5}
        />
        <Environment preset="apartment" />
        <gridHelper args={[10, 10]} position={[0, -0.5, 0]} />
      </Suspense>
    </Canvas>
  );
}