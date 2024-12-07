import React, { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import profilePic from "../assets/profilePic.jpg"
import CommentSection from './CommentSection';
import PlaynextVideos from './PlaynextVideos';
import { useParams } from 'react-router-dom'

function VideoPlayerPage() {

    const { videoId } = useParams()
    const [video, setVideo] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
        };

        // Call the getVideos function
        getVideo();
    }, [])

    const videoUrl = video?.data?.videoFile

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
                    <p className='text-xl font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos molestias eum esse obcaecati dolor voluptas nihil animi ea! Nostrum earum ea ad obcaecati perspiciatis eveniet?</p>
                    <div className='w-full flex h-12 justify-between mt-5'>
                        {/* Channel name and subs button */}
                        <div className='h-full flex gap-5 items-center'>
                            <button className='h-full w-full'>
                                <div className='flex h-full items-center gap-2'>
                                    <div className='h-full w-12 rounded-full overflow-hidden'>
                                        <img src={profilePic} alt="Profile Pic" className='object-cover' />
                                    </div>
                                    <div>
                                        <p>Manoj Gaming</p>
                                        <p className='text-xs text-gray-400'>1.01M Subscribers</p>
                                    </div>
                                </div>
                            </button>

                            <div>
                                <button className='bg-white text-black p-2 rounded-full px-5'>
                                    <p>SUBSCRIBE</p>
                                </button>
                            </div>
                        </div>
                        {/* Like and dislike buttons */}
                        <div className='h-full flex items-center pr-5'>
                            <button className='flex items-center gap-2 py-2 px-8 rounded-full bg-[#212121]'>
                                <ThumbUpOutlinedIcon />
                                <p className='text-xl'>214K</p>
                            </button>
                        </div>
                    </div>
                </div>
                {/* Comment section */}
                <div className='w-full'>
                    <CommentSection />
                </div>
            </div>
            <div>
                <PlaynextVideos />
            </div>
        </div>
    )
}

export default VideoPlayerPage