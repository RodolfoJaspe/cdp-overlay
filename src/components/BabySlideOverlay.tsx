import { useEffect, useRef, useState } from 'react'
import { useStore } from '../store/useStore'
import './BabySlideOverlay.css'

export default function BabySlideOverlay() {
  const { danceUntil, triggerDance } = useStore()
  const [duration, setDuration] = useState(0)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('test') === '1') {
      triggerDance(10000)
    }
  }, [triggerDance])

  useEffect(() => {
    console.log('🎯 danceUntil changed:', danceUntil, 'current time:', Date.now())
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    if (danceUntil <= Date.now()) {
      setDuration(0)
      return
    }

    const dur = danceUntil - Date.now()
    setDuration(dur)
    console.log('🚀 Starting dance, duration:', dur)
    timeoutRef.current = setTimeout(() => {
      console.log('⏹️ Dance ended')
      setDuration(0)
    }, dur)
  }, [danceUntil])

  const [headError, setHeadError] = useState(false)
  const [bubbleError, setBubbleError] = useState(false)

  const phase = danceUntil > Date.now() ? 'dancing' : 'idle'

  console.log('🎬 Render phase:', phase, 'danceUntil:', danceUntil, 'duration:', duration)

  return (
    <div className={`baby-slide-overlay phase-${phase}`}>
      <div className="baby-stage" key={danceUntil} style={{ animationDuration: `${duration}ms`, ['--duration' as string]: `${duration}ms` } as React.CSSProperties}>
        <div className="baby-dancer">
          <div className="message-bubble">
            {bubbleError ? (
              <div className="bubble-fallback" />
            ) : (
              <img
                src="/uelta.png"
                alt=""
                onError={() => setBubbleError(true)}
              />
            )}
          </div>
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
