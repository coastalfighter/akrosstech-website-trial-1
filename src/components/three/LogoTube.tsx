"use client";

import { useMemo } from "react";
import * as THREE from "three";
import {
  LOGO_BAR,
  LOGO_CENTER,
  LOGO_STROKE_WIDTH,
  LOGO_WAVE,
  sampleSegments,
  type LogoSegment,
} from "@/lib/logo-geometry";

/** Source pixels per world unit — the mark is ~4.2 units wide. */
const PX_PER_UNIT = 290;

function curveFrom(segments: LogoSegment[], depth: number): THREE.CatmullRomCurve3 {
  const points = sampleSegments(segments, 10);
  const vectors = points.map(([x, y], i) => {
    const t = i / (points.length - 1);
    // Gentle z-wave gives the flat mark real depth as it rotates.
    const z = Math.sin(t * Math.PI * 2) * depth;
    return new THREE.Vector3(
      (x - LOGO_CENTER[0]) / PX_PER_UNIT,
      -(y - LOGO_CENTER[1]) / PX_PER_UNIT,
      z,
    );
  });
  return new THREE.CatmullRomCurve3(vectors, false, "centripetal", 0.5);
}

/** The Akrostech wave monogram extruded as a glossy 3D tube. */
export function LogoTube({ radialSegments = 32 }: { radialSegments?: number }) {
  const { wave, bar } = useMemo(() => {
    const radius = LOGO_STROKE_WIDTH / 2 / PX_PER_UNIT;
    const waveGeometry = new THREE.TubeGeometry(
      curveFrom(LOGO_WAVE, 0.14),
      640,
      radius,
      radialSegments,
      false,
    );
    const barGeometry = new THREE.TubeGeometry(
      curveFrom(LOGO_BAR, 0.05),
      64,
      radius,
      radialSegments,
      false,
    );
    return { wave: waveGeometry, bar: barGeometry };
  }, [radialSegments]);

  // Rounded caps: spheres at each tube end, matching the SVG's round linecaps.
  const caps = useMemo(() => {
    const ends: THREE.Vector3[] = [];
    for (const geometry of [wave, bar]) {
      const path = geometry.parameters.path;
      ends.push(path.getPoint(0), path.getPoint(1));
    }
    return ends;
  }, [wave, bar]);

  const radius = LOGO_STROKE_WIDTH / 2 / PX_PER_UNIT;

  return (
    <group>
      <mesh geometry={wave} castShadow>
        <LogoMaterial />
      </mesh>
      <mesh geometry={bar} castShadow>
        <LogoMaterial />
      </mesh>
      {caps.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[radius, radialSegments, radialSegments / 2]} />
          <LogoMaterial />
        </mesh>
      ))}
    </group>
  );
}

function LogoMaterial() {
  return (
    <meshPhysicalMaterial
      color="#bff747"
      emissive="#3f5a0c"
      emissiveIntensity={0.35}
      roughness={0.18}
      metalness={0.2}
      clearcoat={1}
      clearcoatRoughness={0.08}
      envMapIntensity={1.2}
    />
  );
}
