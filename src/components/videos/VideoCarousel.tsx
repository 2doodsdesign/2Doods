import type { VideoItem } from "../../data/videos";
import { VideoCard } from "./VideoCard";

interface VideoCarouselProps {
  videos: VideoItem[];
  onOpen: (video: VideoItem) => void;
}

export function VideoCarousel({ videos, onOpen }: VideoCarouselProps) {
  return (
    <div className="video-carousel" aria-label="Vitrine de vídeos">
      <div className="video-carousel__track">
        {[...videos, ...videos].map((video, index) => (
          <VideoCard key={`${video.id}-${index}`} video={video} onOpen={onOpen} />
        ))}
      </div>
    </div>
  );
}
