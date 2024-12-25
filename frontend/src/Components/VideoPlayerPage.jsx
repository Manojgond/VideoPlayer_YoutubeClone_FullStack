import React, { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import profilePic from "../assets/profilePic.jpg"
import CommentSection from './CommentSection';
import PlaynextVideos from './PlaynextVideos';
import { useParams } from 'react-router-dom'

function VideoPlayerPage() {
    const { videoId } = useParams()
    const [video, setVideo] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)
    const [isSubscribed, setisSubscribed] = useState(false)

    useEffect(() => {
        const getVideo = async () => {
            try {
                const url = `http://localhost:8000/api/v1/videos/${videoId}`

                const response = await fetch(url, {
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
                setVideo(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }

            try {
                const url = `http://localhost:8000/api/v1/likes/video/isliked/${videoId}`

                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch likedStatus');
                }

                const jsonResponse = await response.json();

                setIsLiked(jsonResponse?.data)
            } catch (error) {
                setError(err.message);
            }

            try {
                const url = `http://localhost:8000/api/v1/likes/video/likescount/${videoId}`

                const response = await fetch(url, {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch likes');
                }

                const jsonResponse = await response.json();

                setLikes(jsonResponse?.data)
            } catch (error) {
                setError(err.message);
            }
        };

        // Call the getVideos function
        getVideo();
    }, [])

    const videoUrl = video?.data?.videoFile

    function formatLikes(likesCount) {
        if ((likesCount / 1000000000) > 1) {
            return `${Math.floor((likesCount / 1000000000) * 10) / 10}B`;
        } else if ((likesCount / 1000000) > 1) {
            return `${Math.floor((likesCount / 1000000) * 10) / 10}M`;
        } else if ((likesCount / 1000) > 1) {
            return `${Math.floor((likesCount / 1000) * 10) / 10}K`;
        } else return likesCount
    }

    async function handleSubscribe() {
        const userId = video?.data?.owner;
        const url = `http://localhost:8000/api/v1/subscriptions/c/${userId}`
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        });

        setisSubscribed(!isSubscribed)
    }

    async function handleLike() {
        const url = `http://localhost:8000/api/v1/likes/toggle/v/${videoId}`
        const response = await fetch(url, {
            method: 'POST',
            credentials: 'include',
        });

        setIsLiked(!isLiked)

        if(isLiked){
            setLikes(likes-1)
        } else setLikes(likes+1)
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className='w-full h-[2000px] px-20 grid grid-cols-[2fr_1fr] gap-5'>
            <div className='h-full'>
                {/* Video player */}
                <div className='h-[75vh] py-4'>
                    {videoUrl ? (
                        <VideoPlayer videoUrl={videoUrl} />
                    ) : (
                        <div>Video not available</div>
                    )}
                </div>
                {/* Channel details */}
                <div>
                    <p className='text-xl font-bold'>{video?.data.title}</p>
                    <div className='w-full flex h-12 justify-between mt-5'>
                        {/* Channel name and subs button */}
                        <div className='h-full flex gap-5 items-center'>
                            <button className='h-full w-full'>
                                <div className='flex h-full items-center gap-2'>
                                    <div className='h-full w-12 rounded-full overflow-hidden'>
                                        <img src={profilePic} alt="Profile Pic" className='object-cover' />
                                    </div>
                                    <div className='text-left'>
                                        <p>{video?.data.owner.fullName}</p>
                                        <p className='text-xs text-gray-400'>1.01M Subscribers</p>
                                    </div>
                                </div>
                            </button>

                            <div>
                                <button
                                    onClick={handleSubscribe}
                                    className={`p-2 rounded-full px-5 ${isSubscribed ? "text-white bg-[#212121]" : "bg-white text-black"}`}>
                                    <p>{isSubscribed ? "Subsribed" : "Subscribe"}</p>
                                </button>
                            </div>
                        </div>
                        {/* Like and dislike buttons */}
                        <div className='h-full flex items-center pr-5'>
                            <button
                                onClick={handleLike}
                                className='flex items-center gap-2 py-2 px-8 rounded-full bg-[#212121]'>
                                {isLiked ? (
                                    <ThumbUpIcon />
                                ) : (
                                    <ThumbUpOutlinedIcon />
                                )}
                                <p className='text-xl'>{formatLikes(likes)}</p>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Description */}
                <div className='w-full bg-[#212121] my-5 rounded-lg p-4'>
                    <div className='flex gap-5'>
                        <p>12,35,545 views</p>
                        <p>Nov 6, 2024</p>
                    </div>
                    <p className='my-5'>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum illo eius maiores animi quam consequatur, facere eveniet non sunt voluptatibus?
                    </p>
                </div>
                {/* Comment section */}
                <div className='w-full'>
                    <CommentSection
                        videoId={videoId}
                    />
                </div>
            </div>
            <div>
                <PlaynextVideos />
            </div>
        </div>
    )
}

export default VideoPlayerPage