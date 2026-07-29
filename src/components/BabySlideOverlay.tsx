import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import './BabySlideOverlay.css'

export default function BabySlideOverlay() {
  const { danceUntil, triggerDance } = useStore()
  const [phase, setPhase] = useState<'idle' | 'dancing'>('idle')
  const [duration, setDuration] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('test') === '1') {
      triggerDance(10000)
    }
  }, [triggerDance])

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (danceUntil <= Date.now()) {
      setPhase('idle')
      setDuration(0)
      return
    }

    const dur = danceUntil - Date.now()
    setDuration(dur)
    setPhase('dancing')
    timeoutRef.current = setTimeout(() => {
      setPhase('idle')
      setDuration(0)
    }, dur)
  }, [danceUntil])

  const [headError, setHeadError] = useState(false)

  return (
    <div className={`baby-slide-overlay phase-${phase}`}>
      <div className="baby-stage" style={{ animationDuration: `${duration}ms`, ['--duration' as string]: `${duration}ms` } as React.CSSProperties}>
        <div className="baby-dancer">
          <div className="head">
            {headError ? (
              <div className="head-fallback" />
            ) : (
              <img
                src="/dancer-head.png"
                alt=""
                onError={() => setHeadError(true)}
              />
            )}
          </div>
          <img className="body-img" src="/baby-car.png" alt="" style={{ animationDuration: `${duration}ms` }} />
        </div>
      </div>
    </div>
  )
}
