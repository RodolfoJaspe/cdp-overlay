# 🎮 Usage Guide: Running Your Live Podcast Orb World

## Quick Start (3 steps)

### 1. Start Development Server

```bash
cd /path/to/SistemaPapis
npm run dev
```

Server starts at: **http://localhost:3000**

### 2. Configure Your Live Stream

Click **⚙️ Settings** in the top-right corner and enter:

- **YouTube Video ID**: Your live stream ID
- **YouTube API Key**: From Google Cloud Console

Or manually edit `src/store/useStore.ts`:

```typescript
liveVideoId: 'YOUR_LIVE_VIDEO_ID',
youtubeApiKey: 'YOUR_API_KEY',
```

### 3. Share the URL

During your podcast, tell viewers:

> "Join us live at [YOUR_URL] - you'll become a glowing orb in our world. 
> Every YouTube comment you leave moves your orb. Just exist with us."

---

## How It Works

### For Viewers

1. **Join** → Navigate to your URL
2. **Watch** → Podcast plays center screen
3. **Comment** → Leave comments on YouTube
4. **Exist** → Your orb appears and drifts based on your activity

### Orb Behavior

| Action | Effect |
|--------|--------|
| First comment | Your orb spawns with unique color |
| More comments | Orb speeds up, grows larger |
| Emojis (🔥😂💬) | Extra speed boost + visual flair |
| Inactivity | Orb slows down and shrinks |
| Hover over orb | See username + comment count |

### Visual Indicators

- **Size** → Activity level (bigger = more comments)
- **Trail length** → Comment frequency
- **Brightness** → Recent activity
- **Color** → Unique per user (hash of username)

---

## Live Demo Features

### Current Implementation

✅ **Passive presence** - Works without any input  
✅ **Comment-driven movement** - Each comment affects orb  
✅ **Activity decay** - Inactive users slow down naturally  
✅ **Real-time sync** - 5-second polling (YouTube's limit)  
✅ **Hover tooltips** - See who's who  
✅ **Auto-scaling** - More comments = bigger orb  

### Visual Polish

- Glowing trails that fade elegantly
- Pulsing animation tied to activity
- Starfield background for depth
- Smooth camera subtle rotation
- Activity-based emissive glow

---

## Customization

### Change Orb Colors

Edit `src/services/chatProcessor.ts` line 13:

```typescript
const colors = [
  '#4a90e2', '#e24a90', '#90e24a', // Add your colors
]
```

### Adjust Movement Speed

Edit `src/services/chatProcessor.ts` line 25:

```typescript
const baseSpeed = 0.02  // Lower = slower, higher = faster
```

### Modify Video Position/Size

Edit `src/components/YouTubePlayer.css` line 8:

```css
width: 60%;  /* Change this percentage */
```

### Change Background

Edit `src/components/Scene.tsx` line 18:

```typescript
<color attach="background" args={['#0a0a0f']} />  // Your hex color
```

---

## Performance Optimization

### Current Limits

- **Tested up to**: ~100 concurrent orbs
- **Optimal**: 20-50 active commenters
- **Maximum recommended**: 200 orbs

### If You Get 1000+ Viewers

You'll need to implement aggregation:

1. Only show top N most active users as full orbs
2. Show others as simplified particles
3. Cluster inactive viewers into groups

See `src/services/chatProcessor.ts` for aggregation logic scaffold.

---

## Troubleshooting

### Orbs not appearing from comments?

**Check:**
- Console for errors (F12)
- API key is valid
- Video is actually live
- Live chat is enabled on YouTube
- You're not hitting API quota (10k/day free tier)

### Chat delay?

**Normal** - YouTube live chat has 5-15 second latency. This is expected.

### Video not loading?

**Verify:**
- Video ID is correct
- Video is public or unlisted
- Embed is allowed (some videos disable embedding)

### Performance issues?

**Try:**
- Reduce number of stars in `Scene.tsx` (line 24)
- Lower orb detail in `Orb.tsx` args (line 45)
- Increase polling interval in `ChatPanel.tsx` (line 45)

---

## Production Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist/` folder.

### Deploy Options

**Static Hosting (Easiest):**
- Netlify
- Vercel
- GitHub Pages
- AWS S3 + CloudFront

**Upload `dist/` folder** and you're live.

### Environment Variables (Recommended)

Don't hardcode API keys! Use:

```bash
# .env.local
VITE_YOUTUBE_API_KEY=your_key_here
```

Then in code:
```typescript
youtubeApiKey: import.meta.env.VITE_YOUTUBE_API_KEY || ''
```

---

## Advanced: Extending the System

### Add Audio Reactivity

Make orbs pulse to podcast audio:

```typescript
// In Scene.tsx
const audioContext = new AudioContext()
const analyser = audioContext.createAnalyser()
// Pass frequency data to orbs
```

### Add Leaderboards

Track most active commenters:

```typescript
// In store
topCommenters: Array<{username: string, count: number}>
```

### Add Host Dashboard

Show real-time stats:
- Total viewers
- Comments per minute
- Top reactions
- Engagement graph

---

## API Quota Management

YouTube Data API free tier: **10,000 units/day**

### Your Usage

- `liveChatMessages.list`: 5 units per call
- Polling every 5 seconds = 720 calls/hour
- **Cost**: 3,600 units/hour

**Max podcast length on free tier**: ~2.7 hours/day

### Solutions

1. **Increase polling interval** to 10s (halves usage)
2. **Request quota increase** from Google (usually approved)
3. **Use OAuth** for higher limits
4. **Cache aggressively** to reduce calls

---

## Tips for Best Experience

### Before Going Live

1. Test with a private stream first
2. Have a friend comment to verify orbs spawn
3. Share URL in podcast description
4. Pin a comment with the link

### During the Podcast

1. Call out new orbs appearing: "Welcome, @username!"
2. Acknowledge top commenters
3. React to orb movements on screen
4. Encourage emoji use for visual effects

### Audience Engagement Ideas

- "Let's see how big we can make your orb"
- "Most active commenter gets a shoutout"
- "Flood chat with 🔥 to make the world glow"
- "Watch the orbs dance during our discussion"

---

**You're ready to launch your live podcast universe** 🌌🎙️

For technical questions, check `README.md` and `SETUP.md`
