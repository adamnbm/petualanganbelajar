import React, { useState } from "react";
import { Maximize2, X, Video } from "lucide-react";
import { TUTORIAL_VIDEOS, getYouTubeEmbedUrl } from "../data/tutorialVideos";

export default function VideoTutorialSection() {
  const [activeModalVideo, setActiveModalVideo] = useState(null);

  return (
    <section className="tutorial-videos-section" id="section-tutorial-videos">
      {/* Header Ringkas */}
      <div className="tutorial-section-header-compact">
        <h2 className="tutorial-section-title">
          🎬 Video Tutorial Penggunaan Web
        </h2>
      </div>

      {/* 2 Kolom Video */}
      <div className="tutorial-videos-grid">
        {TUTORIAL_VIDEOS.map((video, index) => {
          const embedUrl = getYouTubeEmbedUrl(video.youtubeUrl);

          return (
            <div
              key={video.id || index}
              className="tutorial-video-card"
              id={`tutorial-card-${index + 1}`}
            >
              {/* Header Kartu: Judul Singkat & Tombol Perbesar */}
              <div className="video-card-topbar">
                <h3 className="video-card-title-compact">{video.title}</h3>
                <button
                  type="button"
                  className="btn-expand-video"
                  onClick={() => setActiveModalVideo(video)}
                  title="Perbesar Layar"
                  id={`btn-expand-video-${index + 1}`}
                >
                  <Maximize2 size={14} />
                  <span>Perbesar</span>
                </button>
              </div>

              {/* Player YouTube 16:9 */}
              <div className="video-player-container">
                {embedUrl ? (
                  <iframe
                    className="video-iframe-player"
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="video-placeholder-box">
                    <Video size={36} />
                    <p>Link video belum diatur di <code>src/data/tutorialVideos.js</code></p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Popup Perbesar Layar */}
      {activeModalVideo && (
        <div
          className="video-cinema-modal-backdrop"
          onClick={() => setActiveModalVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="video-cinema-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cinema-modal-header">
              <h3 className="cinema-modal-title">{activeModalVideo.title}</h3>
              <button
                type="button"
                className="btn-cinema-close"
                onClick={() => setActiveModalVideo(null)}
                title="Tutup"
                id="btn-close-cinema-video"
              >
                <X size={20} />
              </button>
            </div>

            <div className="cinema-modal-video-wrapper">
              <iframe
                className="cinema-iframe-player"
                src={getYouTubeEmbedUrl(activeModalVideo.youtubeUrl)}
                title={activeModalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
