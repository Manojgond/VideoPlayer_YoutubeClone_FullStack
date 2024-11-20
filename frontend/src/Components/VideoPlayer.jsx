import { useEffect, useRef } from 'react';

function VideoPlayer() {
    const cloudinaryRef = useRef();
    const videoRef = useRef();

    useEffect(() => {
        if (cloudinaryRef.current) return;

        cloudinaryRef.current = window.cloudinary;
        cloudinaryRef.current.videoPlayer(videoRef.current, {
            cloud_name: 'ddamqwa7y'
        })
    }, []);

    return (
        <video
            ref={videoRef}
            data-cld-public-id="samples/sea-turtle"
            controls
            className='w-full h-full rounded-2xl overflow-hidden'
        />
    );
}

export default VideoPlayer