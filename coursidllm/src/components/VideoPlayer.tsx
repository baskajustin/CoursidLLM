"use client";

import { useRef, useState } from "react";

interface VideoPlayerProps {
  src: string;
  title?: string;
  onComplete?: () => void;
}

export default function VideoPlayer({ src, title, onComplete }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  function togglePlay() {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  function handleEnded() {
    setIsPlaying(false);
    onComplete?.();
  }

  return (
    <div className="relative aspect-video bg-black group">
      <video
        ref={videoRef}
        src={src}
        title={title}
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="w-full h-full"
        preload="metadata"
      />
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors"
          aria-label="Play video"
        >
          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
            <svg className="w-8 h-8 text-[#0056d2] ml-1" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7L8 5z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
