import { create } from 'zustand'

export interface Orb {
  id: string
  username: string
  position: [number, number, number]
  velocity: [number, number, number]
  color: string
  lastCommentTime: number
  commentCount: number
  trail: [number, number, number][]
}

export interface ChatMessage {
  id: string
  username: string
  text: string
  timestamp: number
}

interface StoreState {
  orbs: Map<string, Orb>
  chatMessages: ChatMessage[]
  liveVideoId: string
  liveChatId: string | null
  youtubeApiKey: string
  danceUntil: number
  danceTriggerWord: string

  addOrb: (orb: Orb) => void
  updateOrb: (id: string, updates: Partial<Orb>) => void
  removeOrb: (id: string) => void
  addChatMessage: (message: ChatMessage) => void
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
  orbs: new Map(),
  chatMessages: [],
  liveVideoId: storedVideoId || 'fKi16yY2kkw',
  liveChatId: null,
  youtubeApiKey: storedApiKey || 'AIzaSyA0eXcVPVFDfEGYZSN-kNRmAtq0O_epYZU',
  danceUntil: 0,
  danceTriggerWord: storedTriggerWord || 'dance',

  addOrb: (orb) =>
    set((state) => {
      const newOrbs = new Map(state.orbs)
      newOrbs.set(orb.id, orb)
      return { orbs: newOrbs }
    }),

  updateOrb: (id, updates) =>
    set((state) => {
      const newOrbs = new Map(state.orbs)
      const existing = newOrbs.get(id)
      if (existing) {
        newOrbs.set(id, { ...existing, ...updates })
      }
      return { orbs: newOrbs }
    }),

  removeOrb: (id) =>
    set((state) => {
      const newOrbs = new Map(state.orbs)
      newOrbs.delete(id)
      return { orbs: newOrbs }
    }),

  addChatMessage: (message) =>
    set((state) => ({
      chatMessages: [...state.chatMessages.slice(-50), message],
    })),

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
