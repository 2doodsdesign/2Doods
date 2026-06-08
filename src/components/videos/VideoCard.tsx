import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { VideoItem } from "../../data/videos";

interface VideoCardProps {
  video: VideoItem;
  onOpen: (video: VideoItem) => void;
}

export function VideoCard({ video, onOpen }: VideoCardProps) {
  return (
    <motion.article className={video.featured ? "video-card video-card--featured" : "video-card"} whileHover={{ y: -5 }}>
      <img src={video.thumbnail} alt="" loading="lazy" />
      <div>
        <span>{video.category}</span>
        <h3>{video.title}</h3>
        <p>{video.description}</p>
        <button type="button" onClick={() => onOpen(video)}>
          <Play size={17} />
          Assistir
        </button>
      </div>
      {video.duration ? <small>{video.duration}</small> : null}
    </motion.article>
  );
}
