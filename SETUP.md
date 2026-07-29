# 🚀 Setup Guide: Connect Your Live Podcast

## Step 1: Get YouTube Data API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable **YouTube Data API v3**
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy your API key

## Step 2: Configure Your App

Open `src/store/useStore.ts` and update these values:

```typescript
// Around line 38-39
liveVideoId: 'YOUR_LIVE_VIDEO_ID',  // e.g., 'dQw4w9WgXcQ'
youtubeApiKey: 'YOUR_API_KEY_HERE',
```

### How to Get Your Live Video ID

When your podcast is live, the URL looks like:
```
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

The video ID is: `dQw4w9WgXcQ`

## Step 3: Test the Integration

1. Start a YouTube Live stream
2. Update the `liveVideoId` in the store
3. Add your API key
4. Refresh the app
5. Comments from YouTube will now:
   - Appear in the chat panel
   - Drive orb movement
   - Create visual effects

## How Comment Control Works

Each YouTube comment from a viewer will:

### Movement
- **First comment** → Viewer's orb appears
- **More comments** → Orb speeds up and changes direction
- **Emoji reactions** → Visual bursts (🔥💬😂)

### Visual Feedback
- Active commenters = brighter, faster orbs
- Passive viewers = calm, drifting orbs
- Hover over any orb → see username

## Going Live: Sharing with Your Audience

During your podcast, tell listeners:

> "Join the live orb world at [YOUR_URL] - you'll become a floating orb. 
> Every comment you leave on YouTube moves your orb. Just exist with us."

## Optional: Customize the Experience

### Change Orb Colors
Edit `src/components/OrbField.tsx` (lines 11-35) to customize demo orb colors.

### Adjust Physics
Edit `src/components/OrbField.tsx` (lines 48-64) to change movement speed/boundaries.

### Modify Video Size
Edit `src/components/YouTubePlayer.css` (line 8) - currently set to 60% width.

## Troubleshooting

### Chat not loading?
- Verify API key is correct
- Check quota limits (10,000 units/day free tier)
- Ensure video is actually live

### Orbs not responding to comments?
- Check browser console for errors
- Verify `liveChatId` is being fetched
- Comments have ~5-15s YouTube delay (normal)

### Performance issues with many viewers?
- Currently optimized for ~100 concurrent orbs
- For 1000+, you'll need aggregation logic

## Security Note

**Don't commit your API key to public repos!**

Use environment variables in production:
```bash
VITE_YOUTUBE_API_KEY=your_key_here
```

Then access via: `import.meta.env.VITE_YOUTUBE_API_KEY`

---

**Ready to launch?** Just go live on YouTube and share your URL 🎙️✨
