import BabySlideOverlay from './components/BabySlideOverlay'
import ConfigPanel from './components/ConfigPanel'
import { useYouTubeLiveChat } from './hooks/useYouTubeLiveChat'
import './App.css'

function App() {
  useYouTubeLiveChat()
  const searchParams = new URLSearchParams(window.location.search)
  const obsMode = searchParams.get('obs') === '1'

  return (
    <div className="app-container">
      <BabySlideOverlay />

      {!obsMode && <ConfigPanel />}
    </div>
  )
}

export default App
