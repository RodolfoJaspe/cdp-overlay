import './YouTubePlayer.css'

interface YouTubePlayerProps {
  videoId: string
}

export default function YouTubePlayer({ videoId }: YouTubePlayerProps) {
  return (
    <div className="youtube-player-container">
      <div className="youtube-embed-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1&iv_load_policy=3&showinfo=0`}
          title="Live Podcast"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      
      <div className="player-controls">
        <button
          className="open-youtube-btn"
          onClick={() => window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank')}
        >
          💬 Comment on YouTube
        </button>
      </div>
    </div>
  )
}
