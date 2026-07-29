import { useFrame } from '@react-three/fiber'
import { useStore } from '../store/useStore'
import Orb from './Orb'
import { useEffect } from 'react'

export default function OrbField() {
  const { orbs, addOrb } = useStore()

  useEffect(() => {
    const demoOrbs = [
      {
        id: 'demo-1',
        username: 'Viewer 1',
        position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 5 - 2.5] as [number, number, number],
        velocity: [Math.random() * 0.02 - 0.01, Math.random() * 0.02 - 0.01, 0] as [number, number, number],
        color: '#4a90e2',
        lastCommentTime: Date.now(),
        commentCount: 0,
        trail: []
      },
      {
        id: 'demo-2',
        username: 'Viewer 2',
        position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 5 - 2.5] as [number, number, number],
        velocity: [Math.random() * 0.02 - 0.01, Math.random() * 0.02 - 0.01, 0] as [number, number, number],
        color: '#e24a90',
        lastCommentTime: Date.now(),
        commentCount: 0,
        trail: []
      },
      {
        id: 'demo-3',
        username: 'Viewer 3',
        position: [Math.random() * 10 - 5, Math.random() * 10 - 5, Math.random() * 5 - 2.5] as [number, number, number],
        velocity: [Math.random() * 0.02 - 0.01, Math.random() * 0.02 - 0.01, 0] as [number, number, number],
        color: '#90e24a',
        lastCommentTime: Date.now(),
        commentCount: 0,
        trail: []
      }
    ]

    demoOrbs.forEach(orb => addOrb(orb))
  }, [addOrb])

  useFrame(() => {
    orbs.forEach((orb) => {
      const pos = orb.position
      const vel = orb.velocity
      const minSpeed = 0.008

      let vx = vel[0]
      let vy = vel[1]
      let vz = vel[2]

      const speed = Math.sqrt(vx * vx + vy * vy)
      if (speed < minSpeed) {
        const angle = Math.atan2(vy, vx)
        vx = Math.cos(angle) * minSpeed
        vy = Math.sin(angle) * minSpeed
      }

      const newX = pos[0] + vx
      const newY = pos[1] + vy
      const newZ = pos[2] + vz

      const bounds = 12
      if (Math.abs(newX) > bounds) vx *= -1
      if (Math.abs(newY) > bounds) vy *= -1

      useStore.getState().updateOrb(orb.id, {
        position: [newX, newY, newZ],
        velocity: [vx, vy, vz]
      })
    })
  })

  return (
    <>
      {Array.from(orbs.values()).map((orb) => (
        <Orb key={orb.id} orb={orb} />
      ))}
    </>
  )
}
