import { useEffect } from 'react'
import { useStore } from '../store/useStore'
import { fetchLiveChatId, fetchLiveChatMessages } from '../utils/youtubeApi'
import { processNewComment } from '../services/chatProcessor'

export function useYouTubeLiveChat() {
  const { liveVideoId, youtubeApiKey, liveChatId, setLiveChatId } = useStore()

  useEffect(() => {
    if (!liveVideoId || !youtubeApiKey || liveChatId) return

    const fetchChatId = async () => {
      try {
        console.log('Fetching live chat ID for video:', liveVideoId)
        const chatId = await fetchLiveChatId(liveVideoId, youtubeApiKey)
        
        if (chatId) {
          console.log('Live chat ID found:', chatId)
          setLiveChatId(chatId)
        } else {
          console.warn('No live chat found. Video may not be live or live chat may be disabled.')
        }
      } catch (error) {
        console.error('Error fetching live chat ID:', error)
      }
    }

    fetchChatId()
    const interval = setInterval(fetchChatId, 60000)

    return () => clearInterval(interval)
  }, [liveVideoId, youtubeApiKey, liveChatId, setLiveChatId])

  useEffect(() => {
    if (!liveChatId || !youtubeApiKey) return

    const pollChat = async () => {
      try {
        const messages = await fetchLiveChatMessages(liveChatId, youtubeApiKey)
        console.log(`📩 Fetched ${messages.length} new messages`)

        messages.forEach((msg) => {
          processNewComment({
            userId: msg.authorName,
            username: msg.authorName,
            text: msg.text,
            timestamp: Date.now()
          })
        })
      } catch (error) {
        console.error('❌ Error fetching chat:', error)
      }
    }

    pollChat()
    const pollInterval = setInterval(pollChat, 5000)

    return () => clearInterval(pollInterval)
  }, [liveChatId, youtubeApiKey])

  return { liveChatId }
}
