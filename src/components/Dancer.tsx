import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useStore } from '../store/useStore'
import { Group, Sprite, Texture, TextureLoader, CanvasTexture } from 'three'

function createFallbackHeadTexture() {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')!
  ctx.fillStyle = '#ffd166'
  ctx.beginPath()
  ctx.arc(64, 64, 64, 0, Math.PI * 2)
  ctx.fill()
  return new CanvasTexture(canvas)
}

export default function Dancer() {
  const groupRef = useRef<Group>(null)
  const torsoRef = useRef<Group>(null)
  const leftArmRef = useRef<Group>(null)
  const rightArmRef = useRef<Group>(null)
  const leftLegRef = useRef<Group>(null)
  const rightLegRef = useRef<Group>(null)
  const headRef = useRef<Sprite>(null)
  const [headTexture, setHeadTexture] = useState<Texture>(() => createFallbackHeadTexture())
  const headHeight = 1.5

  useEffect(() => {
    const loader = new TextureLoader()
    loader.load(
      '/dancer-head.png',
      (texture) => setHeadTexture(texture),
      undefined,
      () => { /* keep fallback on error */ }
    )
  }, [])
  const headAspect = headTexture.image ? headTexture.image.width / headTexture.image.height : 1
  const headY = 1.3 + headHeight / 2 - 0.2
  const { viewport } = useThree()
  const dancerLocalHeight = headY + headHeight / 2 + 1.0
  const bounce = 0.1
  const scale = viewport.height / (dancerLocalHeight + 2 * bounce)
  const baseY = -viewport.height / 2 + scale * (1 + bounce)

  useFrame(({ clock }) => {
    const { danceUntil } = useStore.getState()
    const isDancing = danceUntil > 0 && Date.now() < danceUntil
    const t = clock.getElapsedTime()
    const group = groupRef.current
    if (!group) return

    const frameScale = viewport.height / (dancerLocalHeight + 2 * bounce)
    const frameBaseY = -viewport.height / 2 + frameScale * (1 + bounce)

    group.visible = isDancing
    group.scale.setScalar(frameScale)

    if (isDancing) {
      const beat = t * 10
      group.position.y = frameBaseY + Math.sin(beat * 2) * bounce * frameScale
      group.rotation.y = Math.sin(beat) * 0.3

      if (torsoRef.current) torsoRef.current.rotation.z = Math.sin(beat) * 0.15
      if (leftArmRef.current) leftArmRef.current.rotation.z = Math.sin(beat) * 0.9 + 0.6
      if (rightArmRef.current) rightArmRef.current.rotation.z = -Math.sin(beat) * 0.9 - 0.6
      if (leftLegRef.current) leftLegRef.current.rotation.x = Math.sin(beat) * 0.6
      if (rightLegRef.current) rightLegRef.current.rotation.x = -Math.sin(beat) * 0.6
    } else {
      group.position.y = frameBaseY
      group.rotation.y = 0
      if (torsoRef.current) torsoRef.current.rotation.z = 0
      if (leftArmRef.current) leftArmRef.current.rotation.z = 0
      if (rightArmRef.current) rightArmRef.current.rotation.z = 0
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0
    }
  })

  return (
    <group ref={groupRef} position={[0, baseY, 0]} scale={[scale, scale, scale]}>
      {/* Head */}
      <sprite ref={headRef} position={[0, headY, 0.4]} scale={[headHeight * headAspect, headHeight, 1]}>
        <spriteMaterial attach="material" map={headTexture} transparent alphaTest={0.01} depthWrite={false} />
      </sprite>

      {/* Torso */}
      <group ref={torsoRef} position={[0, 0.85, 0]}>
        <mesh>
          <cylinderGeometry args={[0.25, 0.3, 0.9, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Left arm */}
        <group ref={leftArmRef} position={[-0.35, 0.35, 0.25]}>
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>

        {/* Right arm */}
        <group ref={rightArmRef} position={[0.35, 0.35, 0.25]}>
          <mesh position={[0, -0.35, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.8, 16]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>
      </group>

      {/* Left leg */}
      <group ref={leftLegRef} position={[-0.2, 0, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.0, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>

      {/* Right leg */}
      <group ref={rightLegRef} position={[0.2, 0, 0]}>
        <mesh position={[0, -0.5, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 1.0, 16]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
      </group>
    </group>
  )
}
