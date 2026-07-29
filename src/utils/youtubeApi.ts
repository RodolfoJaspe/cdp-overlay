import axios from 'axios'

const YOUTUBE_API_BASE = 'https://www.googleapis.com/youtube/v3'

export interface YouTubeChatMessage {
  id: string
  authorName: string
  text: string
  publishedAt: string
}

export async function fetchLiveChatId(videoId: string, apiKey: string): Promise<string | null> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/videos`, {
      params: {
        part: 'liveStreamingDetails',
        id: videoId,
        key: apiKey,
      },
    })

    const items = response.data.items
    if (items && items.length > 0) {
      return items[0].liveStreamingDetails?.activeLiveChatId || null
    }
    return null
  } catch (error) {
    console.error('Error fetching live chat ID:', error)
    return null
  }
}

let nextPageToken: string | undefined = undefined

export async function fetchLiveChatMessages(
  liveChatId: string,
  apiKey: string
): Promise<YouTubeChatMessage[]> {
  try {
    const response = await axios.get(`${YOUTUBE_API_BASE}/liveChat/messages`, {
      params: {
        liveChatId,
        part: 'snippet,authorDetails',
        key: apiKey,
        pageToken: nextPageToken,
      },
    })

    nextPageToken = response.data.nextPageToken

    const messages = response.data.items.map((item: any) => ({
      id: item.id,
      authorName: item.authorDetails.displayName,
      text: item.snippet.displayMessage,
      publishedAt: item.snippet.publishedAt,
    }))

    return messages
  } catch (error) {
    console.error('Error fetching chat messages:', error)
    return []
  }
}
