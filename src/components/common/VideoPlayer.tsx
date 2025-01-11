import { useRef, useEffect, useState } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface VideoPlayerProps {
    videoUrl: string; // URL of the .m3u8 video
    onReady?: (player: any) => void; // Callback when the player is ready
}

export const VideoPlayer = ({ videoUrl, onReady }: VideoPlayerProps) => {
    const videoRef = useRef<HTMLDivElement | null>(null);
    const playerRef = useRef<any | null>(null);
    const [isVideoInView, setIsVideoInView] = useState<boolean>(false);

    useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");
            videoElement.classList.add('vjs-big-play-centered', 'h-full');
            videoRef.current?.appendChild(videoElement);

            const player = (playerRef.current = videojs(videoElement, {
                controls: true,
                autoplay: false,
                preload: 'auto',
                fluid: true, // Ensures responsive sizing
                sources: [{ src: videoUrl, type: 'application/x-mpegURL' }], // Native HLS support
            }, () => {
                videojs.log('Player is ready');
                onReady?.(player);
            }));

            // Listen for video end event
        } else {
            const player = playerRef.current;
            player.src({ src: videoUrl, type: 'application/x-mpegURL' });
        }
    }, [videoUrl]);

    // Observe whether the video is in the viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVideoInView(entry.isIntersecting);
            },
            { root: null, rootMargin: '0px', threshold: 0.5 }
        );

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            observer.disconnect();
        };
    }, []);

    // Pause video when it is not in view
    useEffect(() => {
        if (playerRef.current && !isVideoInView) {
            playerRef.current.pause();
        }
    }, [isVideoInView]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (playerRef.current && !playerRef.current.isDisposed()) {
                playerRef.current.dispose();
                playerRef.current = null;
            }
        };
    }, []);

 

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
};

export default VideoPlayer;
