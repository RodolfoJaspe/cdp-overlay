# 🎙️ Live Podcast Orb World

An interactive live podcast experience where viewers become floating orbs controlled by their YouTube comments.

## 🌟 Concept

Instead of just watching a podcast, viewers **exist inside it** as glowing orbs. Each YouTube comment moves and influences their orb, creating a living visualization of audience participation.

### Core Features

- **Passive Presence**: Join and just exist—no skills required
- **Comment-Driven Movement**: Your YouTube comments control your orb
- **Live Visualization**: See the podcast audience as a breathing constellation
- **Zero Friction**: Web-based, no downloads, just click and join

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- YouTube Data API v3 key (optional for live chat)

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Configuration

To enable live YouTube chat integration:

1. Get a YouTube Data API v3 key from [Google Cloud Console](https://console.cloud.google.com/)
2. Update the store in `src/store/useStore.ts` with your API key
3. Set your live video ID

## 🎮 How It Works

1. **Join**: Navigate to the URL during a live podcast
2. **Exist**: You become an orb, drifting peacefully
3. **Interact**: Comment on YouTube—your orb reacts
4. **Watch**: The podcast plays center stage, surrounded by the community

## 🧩 Tech Stack

- **React 18** - UI framework
- **React Three Fiber** - 3D rendering
- **Three.js** - WebGL engine
- **Zustand** - State management
- **YouTube Data API v3** - Live chat integration
- **Vite** - Build tool & dev server

## 📂 Project Structure

```
src/
├── components/
│   ├── Scene.tsx           # 3D world setup
│   ├── OrbField.tsx        # Orb management & physics
│   ├── Orb.tsx             # Individual orb rendering
│   ├── YouTubePlayer.tsx   # Embedded podcast player
│   └── ChatPanel.tsx       # Live chat display
├── store/
│   └── useStore.ts         # Global state management
├── utils/
│   └── youtubeApi.ts       # YouTube API integration
├── App.tsx                 # Main app layout
└── main.tsx                # Entry point
```

## 🎨 Customization

### Change Orb Behavior

Edit `src/components/OrbField.tsx` to modify physics and movement patterns.

### Adjust Visual Style

Update colors, lighting, and effects in `src/components/Scene.tsx`.

### Configure Video

Change the default video ID in `src/store/useStore.ts`:

```typescript
liveVideoId: 'YOUR_VIDEO_ID_HERE'
```

## 🔮 Future Enhancements

- **Comment-to-Movement Mapping**: NLP to interpret comment sentiment
- **Power-ups**: Special effects from emoji reactions
- **Leaderboards**: Most active participants
- **Host Dashboard**: Real-time audience insights
- **Spatial Audio**: Position-based podcast audio

## 📝 Notes

- YouTube live chat has ~5-15s latency
- API polling is optimized to respect rate limits
- Demo orbs appear if no live chat is connected

## 🤝 Contributing

This is a personal project built with AI assistance. Feel free to fork and experiment!

## 📄 License

MIT - Build whatever you want with this

---

Built for dads, husbands, and anyone who wants to **exist** instead of just watch 🌌
# cdp-overlay
# cdp-overlay
