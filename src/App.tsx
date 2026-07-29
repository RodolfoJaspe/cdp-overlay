import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './components/Scene'
import ConfigPanel from './components/ConfigPanel'
import { useYouTubeLiveChat } from './hooks/useYouTubeLiveChat'
import './App.css'

function App() {
  useYouTubeLiveChat()
  const searchParams = new URLSearchParams(window.location.search)
  const obsMode = searchParams.get('obs') === '1'

  return (
    <div className="app-container">
      <div className="canvas-container">
        <Canvas
          camera={{ position: [0, 0, 15], fov: 50 }}
          gl={{ alpha: true, antialias: true }}
        >
          <Suspense fallback={null}>
            <Scene />
          </Suspense>
        </Canvas>
      </div>

      {!obsMode && <ConfigPanel />}
    </div>
  )
}

export default App
