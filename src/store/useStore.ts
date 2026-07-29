import { create } from 'zustand'

interface StoreState {
  liveVideoId: string
  liveChatId: string | null
  youtubeApiKey: string
  danceUntil: number
  danceTriggerWord: string

  setLiveChatId: (id: string) => void
  setYoutubeApiKey: (key: string) => void
  setLiveVideoId: (id: string) => void
  setDanceTriggerWord: (word: string) => void
  triggerDance: (duration?: number) => void
}

const storedVideoId = localStorage.getItem('liveVideoId')
const storedApiKey = localStorage.getItem('youtubeApiKey')
const storedTriggerWord = localStorage.getItem('danceTriggerWord')

export const useStore = create<StoreState>((set) => ({
  liveVideoId: storedVideoId || 'fKi16yY2kkw',
  liveChatId: null,
  youtubeApiKey: storedApiKey || 'AIzaSyA0eXcVPVFDfEGYZSN-kNRmAtq0O_epYZU',
  danceUntil: 0,
  danceTriggerWord: storedTriggerWord || 'dance',

  setLiveChatId: (id) => set({ liveChatId: id }),

  setYoutubeApiKey: (key) => {
    localStorage.setItem('youtubeApiKey', key)
    set({ youtubeApiKey: key })
  },

  setLiveVideoId: (id) => {
    localStorage.setItem('liveVideoId', id)
    set({ liveVideoId: id })
  },

  setDanceTriggerWord: (word) => {
    localStorage.setItem('danceTriggerWord', word)
    set({ danceTriggerWord: word })
  },

  triggerDance: (duration = 3000) => set({ danceUntil: Date.now() + duration }),
}))
