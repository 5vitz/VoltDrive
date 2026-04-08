import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows, Float } from '@react-three/drei';
import { Suspense } from 'react';

// A robust procedural shape that requires ZERO external assets
function ProceduralCar() {
  return (
    <group>
      {/* Main Body */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[3.5, 0.8, 1.8]} />
        <meshStandardMaterial color="#1e40af" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Cabin */}
      <mesh position={[-0.4, 1.1, 0]} castShadow>
        <boxGeometry args={[1.8, 0.6, 1.5]} />
        <meshStandardMaterial color="#60a5fa" metalness={0.9} roughness={0.1} transparent opacity={0.7} />
      </mesh>
      {/* Wheels */}
      {[[-1.1, 0.2, 0.9], [1.1, 0.2, 0.9], [-1.1, 0.2, -0.9], [1.1, 0.2, -0.9]].map((pos, i) => (
        <mesh key={i} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.3, 32]} />
          <meshStandardMaterial color="#111111" />
        </mesh>
      ))}
      {/* Headlights */}
      <mesh position={[1.75, 0.6, 0.6]}>
        <boxGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
      <mesh position={[1.75, 0.6, -0.6]}>
        <boxGeometry args={[0.1, 0.2, 0.4]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} />
      </mesh>
    </group>
  );
}

export default function Car3DView() {
  return (
    <div className="w-full h-full bg-[#050505] rounded-3xl relative overflow-hidden border border-white/5 flex items-center justify-center">
      <Suspense fallback={
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
          <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-widest">Iniciando WebGL...</p>
        </div>
      }>
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          camera={{ position: [6, 4, 6], fov: 35 }}
          style={{ background: '#050505' }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1.5} castShadow />
          <pointLight position={[-10, 5, -10]} intensity={0.5} color="#3b82f6" />
          <spotLight position={[0, 10, 0]} intensity={0.8} />
          
          <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.2}>
            <ProceduralCar />
          </Float>

          <OrbitControls 
            enablePan={false} 
            minPolarAngle={Math.PI / 4} 
            maxPolarAngle={Math.PI / 1.8} 
            autoRotate
            autoRotateSpeed={0.8}
            makeDefault 
          />
          
          <ContactShadows 
            position={[0, 0, 0]} 
            opacity={0.6} 
            scale={15} 
            blur={2.5} 
            far={4} 
            color="#000000"
          />
        </Canvas>
      </Suspense>

      {/* Technical UI Overlay */}
      <div className="absolute top-6 left-6 pointer-events-none space-y-2">
        <div className="bg-blue-600/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-blue-500/20">
          <p className="text-[9px] text-blue-400 uppercase tracking-widest font-bold flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
            Showroom Digital Ativo
          </p>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 text-right pointer-events-none">
        <p className="text-zinc-500 text-[9px] uppercase tracking-widest leading-relaxed">
          Protótipo de Engenharia<br />
          <span className="text-blue-500/50">Aguardando Ativos BYD</span>
        </p>
      </div>

      {/* Interaction Guide */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-none">
        <p className="text-[8px] text-zinc-700 uppercase tracking-[0.3em] font-bold">
          Interação 3D Habilitada
        </p>
      </div>
    </div>
  );
}
