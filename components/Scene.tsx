'use client';

import { Canvas } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';

function FormObject() {
  return (
    <group position={[0, 0, 0]}>
      <Float speed={2} rotationIntensity={1.5} floatIntensity={1.8}>
        <mesh rotation={[0.7, 0.6, 0.2]}>
          <icosahedronGeometry args={[1.3, 1]} />
          <meshStandardMaterial color="#d85c2d" metalness={0.8} roughness={0.22} emissive="#5a220d" emissiveIntensity={0.55} />
        </mesh>
      </Float>
      <Float speed={2.6} rotationIntensity={1.2} floatIntensity={1.2}>
        <mesh position={[-1.8, -0.5, -0.5]} rotation={[0.4, 0.3, 0.8]}>
          <torusKnotGeometry args={[0.7, 0.22, 140, 18]} />
          <meshStandardMaterial color="#f3efe8" metalness={0.6} roughness={0.3} />
        </mesh>
      </Float>
      <Float speed={2.4} rotationIntensity={1.4} floatIntensity={1.4}>
        <mesh position={[1.8, 0.8, -1]} rotation={[0.6, 0.4, 0.15]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color="#111111" metalness={0.6} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

export function HeroScene() {
  return (
    <div className="hero-scene">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 4, 4]} intensity={2.2} color="#f9f1e8" />
        <pointLight position={[-3, -2, 3]} intensity={1.8} color="#d85c2d" />
        <FormObject />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.8} />
      </Canvas>
    </div>
  );
}
