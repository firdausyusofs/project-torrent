import React, { useRef, useState, useEffect } from "react";
import videojs from "video.js";

const usePlayer = ({ src, controls, autoplay }) => {
  const options = {
    fill: true,
    fluid: true,
    // preload: true,
    html5: {
      hls: {
        enableLowInitialPlaylist: true,
        smoothQualityChange: true,
        overrideNative: true,
      },
    },
  };

  const videoRef = useRef(null);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const vjsPlayer = videojs(videoRef.current, {
        ...options,
        controls,
        autoplay,
        sources: [src]
    });
    setPlayer(vjsPlayer);

    return () => {
      if (player !== null) {
        player.dispose();
      }
    };
  }, []);

  useEffect(() => {
    if (player !== null) {
      player.src({ src });
    }
  }, [src]);

  return videoRef;
};

const VideoPlayer = ({src, controls, autoplay}) => {
    const playerRef = usePlayer({src, controls, autoplay})

    return (
        <div data-vjs-player>
            <video ref={playerRef} className="video-js">
                <source src={src} type="video/mp4"></source>
            </video>
        </div>
    )
}

export default VideoPlayer;
