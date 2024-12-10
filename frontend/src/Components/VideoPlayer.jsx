import { useEffect, useRef } from 'react';

function VideoPlayer({ videoUrl }) {
    const cloudinaryRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        if (cloudinaryRef.current) return;

        cloudinaryRef.current = window.cloudinary;

        cloudinaryRef.current.videoPlayer(videoRef.current, {
            cloud_name: 'ddamqwa7y',
            public_id: videoUrl
        })

        if (videoRef.current) {
            videoRef.current.play().catch(error => {
                console.error('Error playing the video:', error);
            });
        }

    }, [videoUrl]);

    return (
        <video
            ref={videoRef}
            data-cld-public-id={videoUrl}
            controls
            className='w-full h-full rounded-2xl overflow-hidden'
        />
    );
}

export default VideoPlayer