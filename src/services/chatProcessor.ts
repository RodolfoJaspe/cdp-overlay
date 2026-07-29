import { useStore } from '../store/useStore'

interface ProcessedComment {
  userId: string
  username: string
  text: string
  timestamp: number
}

export function processNewComment(comment: ProcessedComment) {
  const store = useStore.getState()

  if (comment.text && comment.text.toLowerCase().includes(store.danceTriggerWord.toLowerCase())) {
    console.log('🎵 Trigger word detected, triggering dance')
    store.triggerDance(4000)
  }
}
