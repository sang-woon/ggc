/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Star, Award, ChevronDown, ThumbsUp } from 'lucide-react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Environment } from '@react-three/drei';
import * as THREE from 'three';

interface Person {
  id: number;
  name: string;
  role: string;
  dept: string;
  reason: string;
  image: string;
  votes: number;
}

// Updated Councilors Data
const councilors: Person[] = [
  {
    id: 1,
    name: "이제영 의원",
    role: "국민의힘",
    dept: "미래과학협력위원회",
    reason: "미래 과학 기술 분야의 혁신적인 정책 제안으로 의정 발전에 기여.",
    votes: 27,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 2,
    name: "임창휘 의원",
    role: "더불어민주당",
    dept: "도시환경위원회",
    reason: "지속 가능한 도시 환경 조성과 주민 삶의 질 개선에 앞장섬.",
    votes: 24,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 3,
    name: "윤성근 의원",
    role: "국민의힘",
    dept: "안전행정위원회",
    reason: "도민의 안전을 최우선으로 하는 현장 중심의 의정 활동 수행.",
    votes: 14,
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400"
  }
];

// Updated Officials Data (4 people)
const officials: Person[] = [
  {
    id: 1,
    name: "정두석 실장",
    role: "경제실장",
    dept: "경제실",
    reason: "탁월한 경제 정책 추진으로 지역 경제 활성화에 주도적 역할.",
    votes: 30,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 2,
    name: "허승범 실장",
    role: "기획조정실장",
    dept: "기획조정실",
    reason: "합리적인 기획과 유연한 소통으로 조직의 효율성을 극대화함.",
    votes: 21,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 3,
    name: "박래혁 국장",
    role: "문화체육관광국장",
    dept: "문화체육관광국",
    reason: "문화 예술의 가치를 높이고 도민의 문화 향유 기회를 확대.",
    votes: 21,
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400&h=400"
  },
  {
    id: 4,
    name: "배진기 과장",
    role: "일자리경제정책과장",
    dept: "일자리경제정책과",
    reason: "실질적인 일자리 창출 정책으로 민생 안정에 크게 기여함.",
    votes: 21,
    image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&q=80&w=400&h=400"
  }
];

const Card: React.FC<{ person: Person; delay: number }> = ({ person, delay }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.03, 
        y: -10,
        boxShadow: "0 25px 50px -12px rgba(212, 175, 55, 0.25)",
        transition: { duration: 0.3, delay: 0 }
      }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: delay }}
      className="glass-card rounded-xl overflow-hidden group hover:bg-white/10 transition-colors duration-300 flex flex-col h-full z-10 relative"
    >
      <div className="aspect-[4/5] overflow-hidden relative">
        <img 
          src={person.image} 
          alt={person.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
        
        {/* Vote Badge */}
        <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1.5 bg-gold-500/90 text-black text-xs font-bold px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg">
                <ThumbsUp size={12} fill="black" />
                <span>{person.votes}표</span>
            </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="inline-block px-2 py-0.5 rounded-full border border-gold-400/50 bg-gold-900/30 backdrop-blur-md text-gold-300 text-[10px] md:text-xs font-bold mb-2">
            {person.role}
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-1">{person.name}</h3>
          <p className="text-xs md:text-sm text-gray-300 font-medium">{person.dept}</p>
        </div>
      </div>
      
      <div className="p-6 flex-grow flex flex-col justify-center">
        <div className="flex items-start gap-3">
          <Star className="w-5 h-5 text-gold-400 flex-shrink-0 mt-0.5 fill-gold-400" />
          <p className="text-gray-300 text-sm leading-relaxed">
            "{person.reason}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const SectionTitle: React.FC<{ title: string; subtitle: string }> = ({ title, subtitle }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="text-center mb-16 relative z-10"
  >
    <div className="flex items-center justify-center gap-2 mb-3">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-400"></div>
        <span className="text-gold-400 uppercase tracking-widest text-xs font-bold">{subtitle}</span>
        <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-400"></div>
    </div>
    <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-4">
      {title}
    </h2>
    <div className="w-24 h-1 bg-gold-500 mx-auto rounded-full"></div>
  </motion.div>
);

// --- 3D Animation Components ---

function RisingParticles({ count = 80 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  
  // Initialize particles with random positions and speeds
  const particles = useMemo(() => {
    return new Array(count).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 25, // Spread wide on X
        (Math.random() - 0.5) * 20 - 5, // Y position
        (Math.random() - 0.5) * 10 - 2  // Z position (mostly behind)
      ],
      speed: 0.02 + Math.random() * 0.04, // Rising speed
      scale: 0.5 + Math.random() * 0.8, // Size variation
      phase: Math.random() * Math.PI * 2 // Oscillation phase
    }));
  }, [count]);

  useFrame((state) => {
    if (!mesh.current) return;
    
    particles.forEach((particle, i) => {
      // Move up
      particle.position[1] += particle.speed;
      
      // Gentle side-to-side sway
      const xSway = Math.sin(state.clock.elapsedTime * 0.5 + particle.phase) * 0.02;
      
      // Reset if moves above view
      if (particle.position[1] > 12) {
        particle.position[1] = -12;
        particle.position[0] = (Math.random() - 0.5) * 25;
      }

      dummy.position.set(
        particle.position[0] + xSway,
        particle.position[1],
        particle.position[2]
      );
      
      const s = particle.scale;
      dummy.scale.set(s, s, s);
      dummy.rotation.x = state.clock.elapsedTime * 0.2;
      dummy.rotation.y = state.clock.elapsedTime * 0.3;
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.08, 16, 16]} />
      {/* Bright Gold Material */}
      <meshStandardMaterial 
        color="#FFD700" 
        emissive="#FDB931"
        emissiveIntensity={2} 
        roughness={0.1}
        metalness={1}
        transparent
        opacity={0.8}
      />
    </instancedMesh>
  );
}

const AnimatedBackground = () => (
  <div className="fixed inset-0 z-0 bg-[#0a0a0a]">
    <Canvas camera={{ position: [0, 0, 8], fov: 45 }} gl={{ antialias: true }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
        <pointLight position={[-10, -5, 5]} intensity={0.5} color="#blue" />
        
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={0.5} />
        <RisingParticles />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  </div>
);

const App: React.FC = () => {
  const scrollToContent = () => {
    const el = document.getElementById('content-start');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-gold-500 selection:text-black relative">
      {/* 3D Background - Z-index 0 */}
      <AnimatedBackground />

      {/* Dark Overlay - Z-index 1 (Ensures text readability but lets lights shine through) */}
      <div className="fixed inset-0 bg-black/60 pointer-events-none z-[1]"></div>

      {/* Navigation - Z-index 50 */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-end items-center bg-gradient-to-b from-black/80 to-transparent">
        {/* Branding removed as requested */}
        <div className="text-xs text-gold-300 border border-gold-500/30 px-3 py-1 rounded-full bg-black/20 backdrop-blur-sm">
            2025 AWARDS
        </div>
      </nav>

      {/* Main Content - Z-index 10 (Relative) */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="h-screen flex flex-col justify-center items-center text-center px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-block mb-4 px-4 py-1.5 glass-card rounded-full border-gold-500/30">
                <span className="text-gold-200 text-sm font-medium tracking-wider">직원들이 직접 뽑은 우리들의 영웅</span>
            </div>
            {/* Updated Title with explicit spacing/breaking as requested */}
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-gradient-gold leading-tight drop-shadow-2xl">
              <span className="block mb-4">2025년 경기도청 도의회</span>
              존경 받는 간부공무원 및<br className="hidden md:block"/> 우수 도의원 선정 결과
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
              소통과 헌신으로 도민의 행복을 위해 앞장서는<br className="hidden md:block"/>
              자랑스러운 얼굴들을 소개합니다.
            </p>
          </motion.div>

          <motion.button 
            onClick={scrollToContent}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/50 hover:text-gold-400 transition-colors flex flex-col items-center gap-2 cursor-pointer"
          >
            <span className="text-xs tracking-[0.2em]">SCROLL</span>
            <ChevronDown className="animate-bounce" />
          </motion.button>
        </section>

        {/* Content Container */}
        <div id="content-start" className="bg-gradient-to-b from-transparent via-black/80 to-black pb-32">
            
            {/* Section 1: Officials (First) */}
            <section className="container mx-auto px-6 py-24">
                <SectionTitle title="BEST 간부 공무원" subtitle="Excellent Leadership" />
                
                {/* Updated grid to support 4 columns for officials on large screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {officials.map((person, index) => (
                        <Card key={person.id} person={person} delay={index * 0.2} />
                    ))}
                </div>
            </section>

            {/* Divider */}
            <div className="container mx-auto px-6">
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
            </div>

            {/* Section 2: Councilors (Second) */}
            <section className="container mx-auto px-6 py-24">
                <SectionTitle title="BEST 경기도의원" subtitle="Honorable Councilors" />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {councilors.map((person, index) => (
                        <Card key={person.id} person={person} delay={index * 0.2} />
                    ))}
                </div>
            </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-black text-gray-500 py-12 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-6 text-center">
            <div className="flex flex-col items-center gap-4 mb-8">
                 <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
                    <Award className="text-gold-500" />
                 </div>
                 {/* Updated Footer Text */}
                 <p className="text-xl font-serif text-gray-300">경기도청 3개 노조는 여러분의 열정을 응원합니다.</p>
            </div>
            <div className="text-xs tracking-wider">
                <p>&copy; 2025 GYEONGGI PROVINCIAL ASSEMBLY. ALL RIGHTS RESERVED.</p>
                <p className="mt-2 text-gray-600">본 페이지는 2025 우수 의정 대상 결과 발표를 위해 제작되었습니다.</p>
            </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
