import { useStore } from '../store/useStore'

interface ProcessedComment {
  userId: string
  username: string
  text: string
  timestamp: number
}

const EMOJI_REACTIONS = ['🔥', '😂', '💬', '👏', '❤️', '💯', '🎯', '⚡']

function generateOrbColor(username: string): string {
  const colors = [
    '#4a90e2', '#e24a90', '#90e24a', '#e2904a', 
    '#4ae290', '#904ae2', '#e2e24a', '#4a4ae2',
    '#e24a4a', '#2ae290', '#e2904a', '#4ae2e2'
  ]
  
  let hash = 0
  for (let i = 0; i < username.length; i++) {
    hash = username.charCodeAt(i) + ((hash << 5) - hash)
  }
  
  return colors[Math.abs(hash) % colors.length]
}

function calculateVelocityFromComment(text: string): [number, number, number] {
  const baseSpeed = 0.02
  const length = text.length
  
  const speedMultiplier = Math.min(1 + length / 100, 2)
  
  const hasEmoji = EMOJI_REACTIONS.some(emoji => text.includes(emoji))
  const emojiBoost = hasEmoji ? 1.5 : 1
  
  const direction = Math.random() * Math.PI * 2
  const speed = baseSpeed * speedMultiplier * emojiBoost
  
  return [
    Math.cos(direction) * speed,
    Math.sin(direction) * speed,
    (Math.random() - 0.5) * 0.01
  ]
}

function getRandomPosition(): [number, number, number] {
  const radius = 8
  const angle = Math.random() * Math.PI * 2
  
  return [
    Math.cos(angle) * radius,
    Math.sin(angle) * radius,
    (Math.random() - 0.5) * 3
  ]
}

export function processNewComment(comment: ProcessedComment) {
  const store = useStore.getState()
  const existingOrb = store.orbs.get(comment.userId)
  
  if (existingOrb) {
    console.log(`🔄 Updating existing orb for: ${comment.username}`)
    const newVelocity = calculateVelocityFromComment(comment.text)
    const currentVel = existingOrb.velocity
    
    const blendedVelocity: [number, number, number] = [
      (currentVel[0] + newVelocity[0]) / 2,
      (currentVel[1] + newVelocity[1]) / 2,
      (currentVel[2] + newVelocity[2]) / 2
    ]
    
    store.updateOrb(comment.userId, {
      velocity: blendedVelocity,
      lastCommentTime: comment.timestamp,
      commentCount: existingOrb.commentCount + 1
    })
    console.log(`✅ Orb updated. Total comments: ${existingOrb.commentCount + 1}`)
  } else {
    console.log(`🆕 Creating NEW orb for: ${comment.username}`)
    const newOrb = {
      id: comment.userId,
      username: comment.username,
      position: getRandomPosition(),
      velocity: calculateVelocityFromComment(comment.text),
      color: generateOrbColor(comment.username),
      lastCommentTime: comment.timestamp,
      commentCount: 1,
      trail: []
    }
    
    store.addOrb(newOrb)
    console.log(`✅ New orb created! Total orbs: ${store.orbs.size + 1}`)
  }

  if (comment.text.toLowerCase().includes(store.danceTriggerWord.toLowerCase())) {
    store.triggerDance(4000)
  }
}

export function updateOrbActivityDecay() {
  const store = useStore.getState()
  const now = Date.now()
  const decayThreshold = 30000
  
  store.orbs.forEach((orb) => {
    const timeSinceComment = now - orb.lastCommentTime
    
    if (timeSinceComment > decayThreshold) {
      const decayFactor = Math.max(0.5, 1 - (timeSinceComment - decayThreshold) / 60000)
      
      store.updateOrb(orb.id, {
        velocity: [
          orb.velocity[0] * decayFactor,
          orb.velocity[1] * decayFactor,
          orb.velocity[2] * decayFactor
        ]
      })
    }
  })
}

export function hasEmoji(text: string): boolean {
  return EMOJI_REACTIONS.some(emoji => text.includes(emoji))
}
