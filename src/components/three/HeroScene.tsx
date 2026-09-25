"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { LogoTube } from "./LogoTube";

interface PointerRef {
  x: number;
  y: number;
}

/** Deterministic pseudo-random generator (Park–Miller) so every render is identical. */
function createRandom(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

/** Points distributed in a spherical shell, tinted white / lime / teal. */
function buildParticleGeometry(count: number): THREE.BufferGeometry {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const lime = new THREE.Color("#bff747");
  const teal = new THREE.Color("#3de0c5");
  const white = new THREE.Color("#f5f5f4");
  const rand = createRandom(1337);
  for (let i = 0; i < count; i++) {
    const r = 3.2 + rand() * 4.5;
    const theta = rand() * Math.PI * 2;
    const phi = Math.acos(2 * rand() - 1);
    positions.set(
      [
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta) * 0.6,
        r * Math.cos(phi) - 2,
      ],
      i * 3,
    );
    const pick = rand();
    const c = pick < 0.55 ? white : pick < 0.85 ? lime : teal;
    colors.set([c.r, c.g, c.b], i * 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  return geometry;
}

/** Soft particle cloud in a spherical shell, slowly orbiting. */
function ParticleField({ count = 1400 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const geometry = useMemo(() => buildParticleGeometry(count), [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.03;
    ref.current.rotation.x += delta * 0.008;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        size={0.028}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.85}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Wireframe geometric accents floating around the logo. */
function FloatingShapes() {
  const shapes = useMemo(
    () => [
      { geo: <icosahedronGeometry args={[0.38, 0]} />, pos: [-3.1, 1.5, -1] as const, speed: 1.4 },
      {
        geo: <torusGeometry args={[0.3, 0.1, 16, 48]} />,
        pos: [3.2, -1.4, -0.5] as const,
        speed: 1.1,
      },
      { geo: <octahedronGeometry args={[0.3, 0]} />, pos: [2.7, 1.9, -1.5] as const, speed: 1.7 },
      {
        geo: <boxGeometry args={[0.36, 0.36, 0.36]} />,
        pos: [-2.6, -1.8, -0.8] as const,
        speed: 1.2,
      },
    ],
    [],
  );
  return (
    <>
      {shapes.map((s, i) => (
        <Float key={i} speed={s.speed} rotationIntensity={1.6} floatIntensity={1.2}>
          <mesh position={[...s.pos]}>
            {s.geo}
            <meshStandardMaterial
              color={i % 2 ? "#3de0c5" : "#bff747"}
              wireframe
              transparent
              opacity={0.55}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

/** Large, faint wireframe sphere adding depth behind the logo. */
function Orbit() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y -= delta * 0.05;
  });
  return (
    <mesh ref={ref} position={[0, 0, -3]}>
      <icosahedronGeometry args={[3.6, 2]} />
      <meshBasicMaterial color="#bff747" wireframe transparent opacity={0.05} />
    </mesh>
  );
}

/** Main rig: follows the pointer and responds to page scroll. */
function Rig({
  pointer,
  children,
}: {
  pointer: React.RefObject<PointerRef>;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const p = pointer.current ?? { x: 0, y: 0 };
    const scroll = Math.min(1.5, window.scrollY / window.innerHeight);
    const t = state.clock.elapsedTime;

    const targetRotY = p.x * 0.45 + scroll * 1.6 + Math.sin(t * 0.3) * 0.12;
    const targetRotX = -p.y * 0.3 + scroll * 0.35;
    g.rotation.y = THREE.MathUtils.damp(g.rotation.y, targetRotY, 3, delta);
    g.rotation.x = THREE.MathUtils.damp(g.rotation.x, targetRotX, 3, delta);
    g.position.y = THREE.MathUtils.damp(g.position.y, scroll * 1.4, 4, delta);
    const s = 1 - scroll * 0.25;
    g.scale.setScalar(THREE.MathUtils.damp(g.scale.x, s, 4, delta));
  });

  return <group ref={group}>{children}</group>;
}

/** Full hero WebGL scene. Rendering pauses whenever the hero is off-screen. */
export default function HeroScene({ lowPower = false }: { lowPower?: boolean }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerRef>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    const el = containerRef.current;
    const observer = el
      ? new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
          rootMargin: "100px",
        })
      : null;
    if (el && observer) observer.observe(el);
    return () => {
      window.removeEventListener("pointermove", onMove);
      observer?.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <Canvas
        frameloop={visible ? "always" : "never"}
        dpr={lowPower ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [0, 0, 9.4], fov: 35 }}
        gl={{ antialias: !lowPower, alpha: true, powerPreference: "high-performance" }}
        aria-hidden="true"
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 5, 6]} intensity={1.4} />
        <pointLight position={[-4, -2, 3]} intensity={18} color="#3de0c5" />
        <pointLight position={[3, 3, 2]} intensity={12} color="#bff747" />

        <Rig pointer={pointer}>
          <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.6}>
            <group position={[0.15, 0, 0]}>
              <LogoTube radialSegments={lowPower ? 16 : 32} />
            </group>
          </Float>
          {!lowPower && <FloatingShapes />}
          <Orbit />
        </Rig>
        <ParticleField count={lowPower ? 600 : 1400} />

        {/* Local, network-free environment for glossy reflections. Rendered once. */}
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.2} position={[0, 4, -6]} scale={[10, 2, 1]} />
          <Lightformer
            intensity={1.4}
            color="#bff747"
            position={[-6, 0, -2]}
            rotation-y={Math.PI / 2}
            scale={[8, 3, 1]}
          />
          <Lightformer
            intensity={1.2}
            color="#3de0c5"
            position={[6, -1, 0]}
            rotation-y={-Math.PI / 2}
            scale={[8, 3, 1]}
          />
          <Lightformer form="ring" intensity={2} position={[0, 0, 6]} scale={3} />
        </Environment>
      </Canvas>
    </div>
  );
}
