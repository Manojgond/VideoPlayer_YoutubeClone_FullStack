import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import VideosHome from "./VideosHome";
import VideoCardHome from './VideoCardHome'
import { useNavigate } from 'react-router-dom'

function LikedVideosPage() {
    const isOpen = useSelector((state) => state.menuhide.isMenuOpen)
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    useEffect(() => {
        const getVideos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/likes/videos', {
                    method: 'GET',
                    credentials: 'include',
                });

                // Check if the response is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }

                // Parse the response data
                const data = await response.json();

                // Update the state with the fetched videos
                setVideos(data?.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        // Call the getVideos function
        getVideos();
    }, [])

    function formatDurationToHMS(duration) {
        const hours = Math.floor(duration / 3600); // 1 hour = 3600 seconds
        const minutes = Math.floor((duration % 3600) / 60); // 1 minute = 60 seconds
        const seconds = Math.round(duration % 60); // Remaining seconds

        // Ensure that minutes and seconds are always two digits
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

        // If there are no hours, just return the minutes:seconds format
        if (hours > 0) {
            return `${hours}:${formattedMinutes}:${formattedSeconds}`;
        } else {
            return `${formattedMinutes}:${formattedSeconds}`;
        }
    }



    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (

        <div className="p-2">
            {videos.length === 0 ? (
                <p>No videos available</p> // Show a message if there are no videos
            ) : (
                <ul className="grid grid-cols-4 gap-4">
                    {videos.map((video, index) => {
                        if (video?.videos) {
                            return (
                                <li key={index}>
                                    <button
                                        onClick={() => {
                                            navigate(`/VideoPlayer/${video.videos._id}`)
                                        }}>
                                        <VideoCardHome
                                            thumbnail={video?.videos.thumbnail}
                                            duration={formatDurationToHMS(video?.videos.duration)}
                                            profilePic={video?.videos.owner.avatar}
                                            title={video?.videos.title}
                                            channelName={video?.videos.owner.username}
                                            views={video?.videos.views}
                                        />
                                    </button>
                                </li>
                            )
                        }
                    })}
                </ul>
            )}
        </div>
    )
}

export default LikedVideosPage