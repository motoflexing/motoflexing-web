import { useFrame, useThree, Canvas } from "@react-three/fiber";
import {
  Html,
  OrbitControls,
  PerspectiveCamera,
  useGLTF,
  useTexture,
  PerformanceMonitor,
  Shape,
} from "@react-three/drei";
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
  DepthOfField,
} from "@react-three/postprocessing";
import { Suspense, useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Radio, Sparkles, X, Menu } from "lucide-react";

// ============================================
// TYPES & CONSTANTS
// ============================================

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/moto.flexing/",
  youtube: "https://www.youtube.com/@moto.flexing",
  linkedin: "https://www.linkedin.com/in/ankit2003dubey/",
  github: "https://github.com/motoflexing",
};

const socialLinks = [
  { icon: "instagram", label: "Instagram", href: SOCIAL_LINKS.instagram },
  { icon: "youtube", label: "YouTube", href: SOCIAL_LINKS.youtube },
  { icon: "linkedin", label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { icon: "github", label: "GitHub", href: SOCIAL_LINKS.github },
];

const heroTags = ["AI Automations", "SaaS", "Systems"];

// ============================================
// ICON COMPONENTS
// ============================================

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22 12s0-3.4-.44-5.02a3.02 3.02 0 0 0-2.13-2.13C17.8 4.4 12 4.4 12 4.4s-5.8 0-7.43.45a3.02 3.02 0 0 0 2.13 2.13C6.2 19.6 12 19.6 12 19.6s5.8 0 7.43-.45a3.02 3.02 0 0 0 2.13-2.13C22 15.4 22 12 22 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m10 15 5-3-5-3v6Z" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 9h3v10H5V9Zm1.5-4A1.8 1.8 0 1 1 6.5 8 1.8 1.8 0 0 1 6.5 5Z" fill="currentColor" />
      <path d="M11 9h3v1.45A3.5 3.5 0 0 1 17 8.8c2.5 0 4 1.68 4 4.72V19h-3v-5.1c0-1.55-.56-2.36-1.8-2.36-1.34 0-2.2.95-2.2 2.36V19h-3V9Z" fill="currentColor" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.62c-2.66.58-3.22-1.13-3.22-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.6.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.46 2.25 1.04 2.8.8.09-.62.34-1.04.61-1.28-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.9.98-2.56-.1-.24-.43-1.22.09-2.52 0 0 .81-.26 2.62.98A9.02 9.02 0 0 1 12 6.2c.81 0 1.62.11 2.38.32 1.81-1.24 2.62-.98 2.62-.98.52 1.3.19 2.28.09 2.52.61.66.98 1.52.98 2.56 0 3.67-2.24 4.48-4.37 4.72.35.3.66.88.66 1.78v2.64c0 .26.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function getSocialIcon(name: string) {
  switch (name) {
    case "instagram": return InstagramIcon;
    case "youtube": return YouTubeIcon;
    case "linkedin": return LinkedInIcon;
    case "github": return GitHubIcon;
    default: return InstagramIcon;
  }
}

// ============================================
// 3D SCENE COMPONENTS
// ============================================

// Wet Asphalt Ground with Reflections
function WetAsphaltGround() {
  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color: 0x0a0a0b,
      metalness: 0.15,
      roughness: 0.7,
      clearcoat: 1.0,
      clearcoatRoughness: 0.15,
      reflectivity: 1.0,
      envMapIntensity: 2.5,
    });
    return mat;
  }, []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[100, 100, 100, 100]} />
      <meshPhysicalMaterial
        attach="material"
        color="#0a0a0b"
        metalness={0.1}
        roughness={0.65}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
        reflectivity={1.0}
        envMapIntensity={2.5}
        ior={1.5}
        transmission={0.0}
        thickness={0.0}
      />
    </mesh>
  );
}

// Tachometer Needle - uses THREE.Shape for the needle shape
function TachometerNeedle({ rpm, maxRpm = 16000 }: { rpm: number; maxRpm?: number }) {
  const needleRef = useRef<THREE.Group>(null);
  const geometryRef = useRef<THREE.BufferGeometry | null>(null);

  useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(-2, -0.5);
    shape.lineTo(0, -80);
    shape.lineTo(2, -0.5);
    geometryRef.current = new THREE.ShapeGeometry(shape);
  }, []);

  useFrame(() => {
    if (needleRef.current) {
      // RPM gauge goes from -120° (0 RPM) to +120° (max RPM)
      // Redline starts at ~12000 RPM
      const normalizedRpm = Math.min(rpm / maxRpm, 1.2);
      const angle = THREE.MathUtils.lerp(-Math.PI * 0.66, Math.PI * 0.66, normalizedRpm);
      needleRef.current.rotation.z = angle;
    }
  });

  return (
    <group ref={needleRef} rotation={[-Math.PI * 0.66, 0, 0]}>
      {geometryRef.current && (
        <mesh geometry={geometryRef.current}>
          <meshBasicMaterial color="#ff111f" transparent opacity={0.95} side={2} />
        </mesh>
      )}
      <mesh position={[0, -2, 0.1]}>
        <circleGeometry args={[4, 16]} />
        <meshBasicMaterial color="#ff111f" transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

// Tachometer Face
function TachometerFace({ rpm, maxRpm = 16000 }: { rpm: number; maxRpm?: number }) {
  const redlineStart = 11000;

  return (
    <group>
      {/* Background face */}
      <mesh>
        <circleGeometry args={[100, 64]} />
        <meshBasicMaterial color="#050506" side={2} />
      </mesh>

      {/* Outer ring */}
      <mesh>
        <ringGeometry args={[92, 100, 64]} />
        <meshBasicMaterial color="#1a1a1c" side={2} />
      </mesh>

      {/* Tick marks */}
      <group>
        {Array.from({ length: 81 }, (_, i) => {
          const value = (i / 80) * maxRpm;
          const isMajor = i % 10 === 0;
          const isRedline = value >= redlineStart;
          const angle = THREE.MathUtils.lerp(-Math.PI * 0.66, Math.PI * 0.66, i / 80);
          const innerRadius = isMajor ? 72 : 82;
          const outerRadius = 90;

          return (
            <mesh
              key={i}
              rotation={[0, 0, angle]}
              position={[0, innerRadius, 0.1]}
            >
              <planeGeometry args={[isMajor ? 3 : 1.5, outerRadius - innerRadius]} />
              <meshBasicMaterial
                color={isRedline ? "#ff111f" : isMajor ? "#e7e4df" : "#736d6b"}
                transparent
                opacity={isMajor ? 1 : 0.6}
                side={2}
              />
            </mesh>
          );
        })}

        {/* Numbers */}
        {Array.from({ length: 9 }, (_, i) => {
          const value = (i / 8) * maxRpm;
          const isRedline = value >= redlineStart;
          const angle = THREE.MathUtils.lerp(-Math.PI * 0.66, Math.PI * 0.66, i / 8);
          const radius = 60;

          return (
            <Html
              key={i}
              transform
              position={[Math.sin(angle) * radius, Math.cos(angle) * -radius, 0.5]}
              rotation={[0, 0, -angle]}
            >
              <span
                style={{
                  color: isRedline ? "#ff111f" : "#e7e4df",
                  fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
                  fontSize: "14px",
                  fontWeight: 900,
                  textShadow: "0 0 8px rgba(255,17,31,0.5)",
                  pointerEvents: "none",
                }}
              >
                {Math.round(value / 1000)}
              </span>
            </Html>
          );
        })}

        {/* RPM Label */}
        <Html
          transform
          position={[0, -35, 0.5]}
          rotation={[0, 0, 0]}
        >
          <span style={{ color: "#b8b0ad", fontFamily: "var(--mono)", fontSize: "11px", fontWeight: 800, letterSpacing: "0.2em", textTransform: "uppercase" }}>
            RPM × 1000
          </span>
        </Html>

        {/* Redline indicator */}
        <Html
          transform
          position={[0, 55, 0.5]}
          rotation={[0, 0, 0]}
        >
          <span style={{ color: "#ff111f", fontFamily: "var(--mono)", fontSize: "10px", fontWeight: 900, letterSpacing: "0.15em" }}>
            REDLINE
          </span>
        </Html>
      </group>

      {/* Center hub */}
      <mesh position={[0, 0, 1]}>
        <circleGeometry args={[12, 32]} />
        <meshPhysicalMaterial
          color="#0a0a0b"
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

// Digital Speedometer
function DigitalSpeedometer({ speed }: { speed: number }) {
  return (
    <Html transform position={[0, -50, 2]} rotation={[-0.15, 0, 0]}>
      <div
        style={{
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
          fontSize: "48px",
          fontWeight: 900,
          color: "#ff111f",
          textShadow: "0 0 20px rgba(255,17,31,0.6), 0 0 40px rgba(255,17,31,0.3)",
          letterSpacing: "0.05em",
          textAlign: "center",
        }}
      >
        {speed.toString().padStart(3, "0")}
      </div>
    </Html>
  );
}

// Gear Indicator
function GearIndicator({ gear }: { gear: number }) {
  return (
    <Html transform position={[0, -70, 2]} rotation={[-0.15, 0, 0]}>
      <div
        style={{
          fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
          fontSize: "28px",
          fontWeight: 900,
          color: "#e7e4df",
          textShadow: "0 0 15px rgba(255,255,255,0.2)",
          letterSpacing: "0.1em",
        }}
      >
        {gear === 0 ? "N" : gear}
      </div>
    </Html>
  );
}

// Motorcycle Dashboard
function MotorcycleDashboard() {
  const [rpm, setRpm] = useState(1000);
  const [speed, setSpeed] = useState(0);
  const [gear, setGear] = useState(1);
  const [targetRpm, setTargetRpm] = useState(1000);

  // Animation loop for RPM
  useFrame((state, delta) => {
    // Smooth RPM animation
    const diff = targetRpm - rpm;
    setRpm((prev) => prev + diff * Math.min(delta * 3, 1));

    // Speed based on RPM and gear
    const gearRatios = [0, 3.2, 2.1, 1.5, 1.1, 0.9, 0.75];
    const calculatedSpeed = Math.round((rpm / gearRatios[gear]) * 0.06);
    setSpeed(calculatedSpeed);

    // Randomly shift target RPM for realistic behavior
    if (Math.random() < 0.002) {
      const newTarget = Math.random() < 0.3
        ? 800 + Math.random() * 3000 // Idle/cruise
        : 8000 + Math.random() * 6000; // High rev
      setTargetRpm(newTarget);
    }

    // Auto shift logic
    if (rpm > 12000 && gear < 6) {
      setGear((g) => g + 1);
    } else if (rpm < 3000 && gear > 1) {
      setGear((g) => g - 1);
    }
  });

  return (
    <group position={[0, 1.2, -1.5]} scale={0.025}>
      <TachometerFace rpm={rpm} maxRpm={16000} />
      <TachometerNeedle rpm={rpm} maxRpm={16000} />
      <DigitalSpeedometer speed={speed} />
      <GearIndicator gear={gear} />
    </group>
  );
}

// Motorcycle Model (simplified)
function MotorcycleModel() {
  return (
    <group position={[0, 0.3, 0]}>
      {/* Main frame */}
      <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.3, 0.5, 1.2]} />
        <meshPhysicalMaterial
          color="#0d0d0e"
          metalness={0.7}
          roughness={0.3}
          clearcoat={0.5}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Fuel tank */}
      <mesh position={[0, 0.75, -0.2]} castShadow receiveShadow>
        <sphereGeometry args={[0.25, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshPhysicalMaterial
          color="#1a0a0a"
          metalness={0.6}
          roughness={0.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>

      {/* Seat */}
      <mesh position={[0, 0.55, 0.4]} castShadow receiveShadow>
        <boxGeometry args={[0.18, 0.08, 0.4]} />
        <meshPhysicalMaterial color="#111114" roughness={0.9} />
      </mesh>

      {/* Front fork */}
      <group position={[-0.05, 0.3, -0.8]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
          <meshPhysicalMaterial color="#2a2a2c" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Front wheel */}
        <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <cylinderGeometry args={[0.3, 0.3, 0.12, 16]} />
          <meshPhysicalMaterial color="#0a0a0b" metalness={0.5} roughness={0.6} />
        </mesh>
        <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
          <torusGeometry args={[0.3, 0.04, 8, 16]} />
          <meshPhysicalMaterial color="#1a1a1c" metalness={0.3} roughness={0.7} />
        </mesh>
      </group>

      {/* Rear wheel */}
      <mesh position={[0, -0.3, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.32, 0.15, 16]} />
        <meshPhysicalMaterial color="#0a0a0b" metalness={0.5} roughness={0.6} />
      </mesh>
      <mesh position={[0, -0.3, 0.7]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <torusGeometry args={[0.32, 0.045, 8, 16]} />
        <meshPhysicalMaterial color="#1a1a1c" metalness={0.3} roughness={0.7} />
      </mesh>

      {/* Exhaust */}
      <mesh position={[0.15, 0.2, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshPhysicalMaterial color="#1a1a1c" metalness={0.9} roughness={0.15} />
      </mesh>
      <mesh position={[-0.15, 0.2, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.05, 0.05, 0.4, 8]} />
        <meshPhysicalMaterial color="#1a1a1c" metalness={0.9} roughness={0.15} />
      </mesh>

      {/* Handlebars */}
      <mesh position={[0, 0.7, -0.6]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
        <cylinderGeometry args={[0.025, 0.025, 0.5, 8]} />
        <meshPhysicalMaterial color="#1a1a1c" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Dashboard mount */}
      <mesh position={[0, 0.85, -0.55]} castShadow receiveShadow>
        <boxGeometry args={[0.25, 0.12, 0.15]} />
        <meshPhysicalMaterial color="#080809" metalness={0.5} roughness={0.5} />
      </mesh>
    </group>
  );
}

// Ambient Particles (dust/moisture)
function AmbientParticles() {
  const positions = useMemo(() => {
    const arr = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = Math.random() * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, []);

  const speeds = useMemo(() => {
    const arr = new Float32Array(500);
    for (let i = 0; i < 500; i++) {
      arr[i] = 0.1 + Math.random() * 0.5;
    }
    return arr;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      const positions = ref.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < 500; i++) {
        positions[i * 3 + 1] -= speeds[i] * delta * 2;
        if (positions[i * 3 + 1] < -1) {
          positions[i * 3 + 1] = 10 + Math.random() * 5;
          positions[i * 3] = (Math.random() - 0.5) * 40;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
        }
      }
      ref.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color="#ff111f"
        size={0.05}
        transparent
        opacity={0.3}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Scene Environment
function SceneEnvironment() {
  return (
    <>
      <WetAsphaltGround />

      {/* Distant city lights / atmosphere */}
      <group position={[0, 5, -20]}>
        {Array.from({ length: 20 }, (_, i) => (
          <mesh key={i} position={[(Math.random() - 0.5) * 60, Math.random() * 10, (Math.random() - 0.5) * 30]}>
            <sphereGeometry args={[0.5, 8, 8]} />
            <meshBasicMaterial
              color={Math.random() > 0.5 ? "#ff111f" : "#ff6b6b"}
              transparent
              opacity={0.15 + Math.random() * 0.1}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>

      <AmbientParticles />

      {/* Lighting */}
      <ambientLight color="#ffffff" intensity={0.3} />
      <directionalLight
        position={[10, 20, 10]}
        color="#ffffff"
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
        shadow-bias={-0.001}
      />
      <directionalLight
        position={[-10, 15, -10]}
        color="#ff111f"
        intensity={0.5}
      />
      <hemisphereLight color="#1a0a0a" groundColor="#050506" intensity={1} />

      {/* Spotlights for dramatic effect */}
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.5}
        decay={1.5}
        distance={30}
        color="#ff111f"
        intensity={500}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      <spotLight
        position={[5, 6, -5]}
        angle={0.3}
        penumbra={0.6}
        decay={2}
        distance={25}
        color="#ff3333"
        intensity={300}
      />
    </>
  );
}

// Full 3D Scene
function Scene() {
  return (
    <>
      <SceneEnvironment />
      <MotorcycleModel />
      <MotorcycleDashboard />
    </>
  );
}

// Camera Controls
function CameraControls() {
  const { camera } = useThree();
  const [phi, setPhi] = useState(Math.PI / 2.5);
  const [theta, setTheta] = useState(0);
  const [radius, setRadius] = useState(6);

  useFrame((_, delta) => {
    // Subtle camera drift
    const time = performance.now() * 0.0003;
    setTheta((prev) => prev + delta * 0.05);
    setPhi((prev) => prev + Math.sin(time) * delta * 0.1);
    setRadius((prev) => prev + Math.sin(time * 0.7) * delta * 0.2);
  });

  useFrame(() => {
    camera.position.set(
      Math.sin(theta) * Math.sin(phi) * radius,
      Math.cos(phi) * radius + 1,
      Math.cos(theta) * Math.sin(phi) * radius
    );
    camera.lookAt(0, 0.5, 0);
  });

  return null;
}

// Post Processing Effects
function PostProcessing() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.7}
        luminanceSmoothing={0.025}
        height={0.6}
        mipmapBlur={true}
      />
      <ChromaticAberration offset={[0.0015, 0.0015]} />
      <Noise opacity={0.015} />
      <Vignette eskil={false} offset={0.3} darkness={0.6} />
      {/* DepthOfField commented out to prevent WebGL render crash */}
      {/* <DepthOfField
        focusDistance={5}
        focalLength={0.05}
        bokehScale={2}
        height={0.5}
      /> */}
    </EffectComposer>
  );
}

// ============================================
// HERO 3D COMPONENT
// ============================================

export function Hero3D() {
  return (
    <section className="hero-3d" id="top">
      {/* Social Rail */}
      <aside className="social-rail" aria-label="Social links">
        {socialLinks.map((item, index) => {
          const Icon = getSocialIcon(item.icon);
          return (
            <div className="social-rail-item" key={item.label}>
              <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
                <Icon size={18} />
              </a>
              {index < socialLinks.length - 1 ? <span className="rail-divider" aria-hidden="true" /> : null}
            </div>
          );
        })}
      </aside>

      {/* 3D Canvas */}
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 2, 6], fov: 45 }}
          gl={{ preserveDrawingBuffer: true, alpha: true, antialias: true }}
          shadows
          style={{ width: "100%", height: "100%", touchAction: "none" }}
        >
          <Suspense fallback={<CanvasFallback />}>
            <Scene />
            <CameraControls />
            <PostProcessing />
          </Suspense>
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minZoom={0.8}
            maxZoom={2}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
            autoRotate={false}
            enableDamping={true}
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* Hero Copy Overlay */}
      <div className="hero-overlay">
        <div className="container hero-inner">
          <motion.div
            className="hero-copy"
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="kicker">Founder brand / Product builder</p>
            <h1>
              <span>MOTO</span>
              <strong>FLEXING</strong>
            </h1>
            <p className="hero-subtitle">Products, software, and focused execution.</p>
            <div className="tag-row">
              {heroTags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="hero-actions">
              <a className="primary-cta" href="#ecosystem">
                Explore Work <ArrowRight size={18} />
              </a>
            </div>
            <div className="mobile-socials" aria-label="Social links">
              {socialLinks.map((item) => {
                const Icon = getSocialIcon(item.icon);
                return (
                  <a href={item.href} key={item.label} target="_blank" rel="noreferrer" aria-label={item.label}>
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="scroll-cue">Scroll</div>
    </section>
  );
}

function CanvasFallback() {
  return (
    <div className="canvas-fallback">
      <div className="fallback-content">
        <span className="kicker">Founder brand / Product builder</span>
        <h1>
          <span>MOTO</span>
          <strong>FLEXING</strong>
        </h1>
        <p className="hero-subtitle">Products, software, and focused execution.</p>
      </div>
    </div>
  );
}

// ============================================
// ECOSYSTEM CARDS WITH 3D AESTHETIC
// ============================================

interface EcosystemItem {
  category: string;
  title: string;
  text: string;
  status: string;
  href?: string;
}

interface EcosystemCardProps {
  item: EcosystemItem;
  index: number;
}

function EcosystemCard3D({ item, index }: EcosystemCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="ecosystem-card-frame"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: index * 0.04 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
    >
      {item.href ? (
        <a
          className="ecosystem-card ecosystem-card-link"
          href={item.href}
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="ecosystem-card-inner">
            <small>{item.category}</small>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <b>{item.status}</b>
          </div>
        </a>
      ) : (
        <article className="ecosystem-card ecosystem-card-disabled">
          <div className="ecosystem-card-inner">
            <small>{item.category}</small>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
            <b>{item.status}</b>
          </div>
        </article>
      )}
    </motion.div>
  );
}

const ecosystem = [
  {
    category: "SaaS",
    title: "OfficeOS",
    text: "Internal operations and employee management software.",
    status: "Live",
    href: "https://officeos.motoflexing.com",
  },
  {
    category: "AI Automation",
    title: "OMAI",
    text: "AI workflows, automations, and productivity systems.",
    status: "Live",
    href: "https://omai.motoflexing.com",
  },
  {
    category: "Website",
    title: "Gym",
    text: "Premium gym and fitness website experience.",
    status: "Live",
    href: "https://gym.motoflexing.com",
  },
  {
    category: "Platform",
    title: "Games",
    text: "Gaming platform and future browser-based experiences.",
    status: "Coming Soon",
  },
];

export function EcosystemChapter3D() {
  return (
    <section className="chapter ecosystem-chapter" id="ecosystem">
      <div className="container">
        <motion.div
          className="chapter-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.55 }}
        >
          <p>Live Products</p>
          <h2>Built. Shipped. Online.</h2>
          <span>Products and platforms currently being built under MotoFlexing.</span>
        </motion.div>
        <div className="ecosystem-grid">
          {ecosystem.map((item, index) => (
            <EcosystemCard3D key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}