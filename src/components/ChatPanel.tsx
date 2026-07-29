import { useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { fetchLiveChatMessages } from '../utils/youtubeApi'
import { processNewComment, updateOrbActivityDecay } from '../services/chatProcessor'
import './ChatPanel.css'

export default function ChatPanel() {
  const { chatMessages, addChatMessage, liveChatId, youtubeApiKey } = useStore()
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  useEffect(() => {
    if (!liveChatId || !youtubeApiKey) return

    const pollChat = async () => {
      try {
        const messages = await fetchLiveChatMessages(liveChatId, youtubeApiKey)
        console.log(`📩 Fetched ${messages.length} new messages`)
        
        messages.forEach((msg) => {
          const timestamp = Date.now()
          console.log(`💬 ${msg.authorName}: "${msg.text}"`)
          
          addChatMessage({
            id: msg.id,
            username: msg.authorName,
            text: msg.text,
            timestamp
          })
          
          processNewComment({
            userId: msg.authorName,
            username: msg.authorName,
            text: msg.text,
            timestamp
          })
        })
      } catch (error) {
        console.error('❌ Error fetching chat:', error)
      }
    }

    pollChat()
    const pollInterval = setInterval(pollChat, 5000)
    const decayInterval = setInterval(updateOrbActivityDecay, 2000)
    
    return () => {
      clearInterval(pollInterval)
      clearInterval(decayInterval)
    }
  }, [liveChatId, youtubeApiKey])

  const orbCount = useStore((state) => state.orbs.size)
  
  return (
    <div className="chat-panel">
      <div className="chat-header">
        <div>
          <h3>💬 Live Chat</h3>
          <small style={{ opacity: 0.6, fontSize: '0.8rem' }}>🌟 {orbCount} orbs active</small>
        </div>
        <span className="chat-count">{chatMessages.length} messages</span>
      </div>
      
      <div className="chat-messages">
        {chatMessages.length === 0 ? (
          <div className="chat-empty">
            <p>Waiting for messages...</p>
            <p className="chat-hint">Configure YouTube API in the settings to see live chat</p>
          </div>
        ) : (
          chatMessages.map((msg) => (
            <div key={msg.id} className="chat-message">
              <span className="chat-username">{msg.username}:</span>
              <span className="chat-text">{msg.text}</span>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>
    </div>
  )
}
