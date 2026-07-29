import { useRef, useState, useMemo, useEffect } from 'react'
import { Mesh, Group, Color } from 'three'
import { useFrame } from '@react-three/fiber'
import { Trail, Sphere, Text } from '@react-three/drei'
import type { Orb as OrbType } from '../store/useStore'

interface OrbProps {
  orb: OrbType
}

export default function Orb({ orb }: OrbProps) {
  const groupRef = useRef<Group>(null)
  const innerRef = useRef<Mesh>(null)
  const rimRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const burstRef = useRef<Mesh>(null)
  const burstProgress = useRef(1)

  useEffect(() => {
    burstProgress.current = 0
  }, [orb.lastCommentTime])

  const activityLevel = useMemo(() => {
    const timeSinceComment = Date.now() - orb.lastCommentTime
    if (timeSinceComment < 10000) {
      return Math.max(1, Math.min(2, orb.commentCount / 3))
    }
    return 0.7
  }, [orb.lastCommentTime, orb.commentCount])

  const baseSize = 0.3 * activityLevel
  const trailLength = Math.max(6, Math.min(15, 6 + orb.commentCount * 2))
  const orbColor = useMemo(() => new Color(orb.color), [orb.color])

  useFrame(({ clock, delta }) => {
    const t = clock.getElapsedTime()
    const idOffset = orb.id.length * 0.3

    if (burstProgress.current < 1) {
      burstProgress.current += delta * 3
      if (burstProgress.current > 1) burstProgress.current = 1
      if (burstRef.current) {
        const p = burstProgress.current
        burstRef.current.visible = true
        burstRef.current.scale.setScalar(1 + p * 4)
        const material = burstRef.current.material as any
        material.opacity = (1 - p) * 0.4
      }
    } else if (burstRef.current) {
      burstRef.current.visible = false
    }

    if (groupRef.current) {
      const pulse = Math.sin(t * 2 + idOffset) * 0.08 + 0.92
      groupRef.current.scale.setScalar(pulse * (hovered ? 1.25 : 1))
    }

    if (innerRef.current) {
      innerRef.current.rotation.y = t * 0.4 + idOffset
      innerRef.current.rotation.z = t * 0.2 + idOffset
    }

    if (rimRef.current) {
      rimRef.current.rotation.x = t * -0.3
      rimRef.current.rotation.y = t * 0.5
    }
  })

  const emissiveIntensity = hovered ? 1.2 : 0.6 + activityLevel * 0.3

  return (
    <group position={orb.position}>
      <Trail
        width={2.5 * activityLevel}
        length={trailLength}
        color={orb.color}
        attenuation={(t) => t * t * t}
      >
        <group ref={groupRef}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
        >
          {/* Outer glass shell */}
          <Sphere args={[baseSize, 64, 64]}>
            <meshPhysicalMaterial
              color={orbColor}
              emissive={orbColor}
              emissiveIntensity={0.1}
              transparent
              opacity={0.15}
              roughness={0}
              metalness={0}
              transmission={0.9}
              thickness={0.5}
              ior={1.8}
              depthWrite={false}
            />
          </Sphere>

          {/* Mid glow layer */}
          <Sphere args={[baseSize * 0.82, 32, 32]}>
            <meshStandardMaterial
              color={orbColor}
              emissive={orbColor}
              emissiveIntensity={emissiveIntensity * 0.5}
              transparent
              opacity={0.3}
              roughness={0.2}
              depthWrite={false}
            />
          </Sphere>

          {/* Inner rotating plasma core */}
          <Sphere ref={innerRef} args={[baseSize * 0.55, 32, 32]}>
            <meshStandardMaterial
              color={orbColor}
              emissive={orbColor}
              emissiveIntensity={emissiveIntensity}
              transparent
              opacity={0.9}
              roughness={0.6}
              wireframe={activityLevel > 1.2}
            />
          </Sphere>

          {/* Outer rim backside glow */}
          <Sphere ref={rimRef} args={[baseSize * 1.1, 32, 32]}>
            <meshBasicMaterial
              color={orbColor}
              transparent
              opacity={0.06 + activityLevel * 0.03}
              side={1}
              depthWrite={false}
            />
          </Sphere>
        </group>
      </Trail>

      {/* Comment shockwave */}
      <Sphere ref={burstRef} args={[baseSize, 32, 32]} visible={false}>
        <meshBasicMaterial
          color={orbColor}
          transparent
          opacity={0}
          side={1}
          depthWrite={false}
        />
      </Sphere>

      {hovered && (
        <>
          <Text
            position={[0, baseSize + 0.6, 0]}
            fontSize={0.25}
            color="white"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000"
          >
            {orb.username}
          </Text>

          {orb.commentCount > 0 && (
            <Text
              position={[0, baseSize + 0.35, 0]}
              fontSize={0.15}
              color="#4a90e2"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.01}
              outlineColor="#000"
            >
              💬 {orb.commentCount}
            </Text>
          )}
        </>
      )}
    </group>
  )
}
