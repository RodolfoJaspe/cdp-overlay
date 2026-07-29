import { useState } from 'react'
import { useStore } from '../store/useStore'
import './ConfigPanel.css'

export default function ConfigPanel() {
  const { liveVideoId, youtubeApiKey, danceTriggerWord, setLiveVideoId, setYoutubeApiKey, setDanceTriggerWord } = useStore()
  const [isOpen, setIsOpen] = useState(false)
  const searchParams = new URLSearchParams(window.location.search)
  const forceSettings = searchParams.get('settings') === '1'
  const configured = Boolean(localStorage.getItem('liveVideoId')) && Boolean(localStorage.getItem('youtubeApiKey'))
  const [tempVideoId, setTempVideoId] = useState(liveVideoId)
  const [tempApiKey, setTempApiKey] = useState(youtubeApiKey)
  const [tempTriggerWord, setTempTriggerWord] = useState(danceTriggerWord)

  const handleSave = () => {
    setLiveVideoId(tempVideoId)
    setYoutubeApiKey(tempApiKey)
    setDanceTriggerWord(tempTriggerWord)
    setIsOpen(false)
    window.location.reload()
  }

  if (!isOpen) {
    if (!forceSettings && configured) return null
    return (
      <button className="config-toggle" onClick={() => setIsOpen(true)}>
        ⚙️ Settings
      </button>
    )
  }

  return (
    <div className="config-panel">
      <div className="config-header">
        <h3>⚙️ Configuration</h3>
        <button className="config-close" onClick={() => setIsOpen(false)}>✕</button>
      </div>

      <div className="config-content">
        <div className="config-field">
          <label>YouTube Video ID</label>
          <input
            type="text"
            value={tempVideoId}
            onChange={(e) => setTempVideoId(e.target.value)}
            placeholder="dQw4w9WgXcQ"
          />
          <small>From your live stream URL: youtube.com/watch?v=<strong>VIDEO_ID</strong></small>
        </div>

        <div className="config-field">
          <label>Dance Trigger Word</label>
          <input
            type="text"
            value={tempTriggerWord}
            onChange={(e) => setTempTriggerWord(e.target.value)}
            placeholder="dance"
          />
          <small>Type this word in chat to make the dancer appear</small>
        </div>

        <div className="config-field">
          <label>YouTube API Key</label>
          <input
            type="password"
            value={tempApiKey}
            onChange={(e) => setTempApiKey(e.target.value)}
            placeholder="Enter your API key"
          />
          <small>Get it from <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer">Google Cloud Console</a></small>
        </div>

        <div className="config-actions">
          <button className="btn-primary" onClick={handleSave}>
            Save & Reload
          </button>
          <button className="btn-secondary" onClick={() => setIsOpen(false)}>
            Cancel
          </button>
        </div>

        <div className="config-hint">
          <p>💡 <strong>Tip:</strong> Check SETUP.md for detailed instructions</p>
        </div>
      </div>
    </div>
  )
}
