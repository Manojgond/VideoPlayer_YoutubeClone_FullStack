import React, { useState, useEffect } from 'react'
import VideoCardLessDetails from './VideoCardLessDetails'
import { useNavigate } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Modal } from './index';

function YourVideosPage({ currentVideo }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('')
    const [editDesc, setEditDesc] = useState('')
    const [editThumbnail, setEditThumbnail] = useState(null)
    const [editVideoId, setEditVideoId] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const getVideos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/videos/user/videos', {
                    method: 'GET',
                    credentials: 'include',
                });

                // Check if the response is OK (status code 200-299)
                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }

                // Parse the response data
                const data = await response.json();

                setVideos(data?.data?.videos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getVideos();
    }, [])

    function formatDurationToHMS(duration) {
        const hours = Math.floor(duration / 3600);
        const minutes = Math.floor((duration % 3600) / 60);
        const seconds = Math.round(duration % 60);

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

    const handleThumbnailChange = (e) => {
        setEditThumbnail(e.target.files[0])
    }

    const editSubmitHandler = async (e) => {
        e.preventDefault();

        const url = `http://localhost:8000/api/v1/videos/${editVideoId}`

        const formData = new FormData();
        formData.append("title", editTitle)
        formData.append("description", editDesc)
        if (editThumbnail) formData.append("thumbnail", editThumbnail);

        const response = await fetch(url, {
            method: 'PATCH',
            credentials: 'include',
            body: formData
        })

        if (response.status == 200) {
            setIsModalOpen(false)
        }

    }

    const handlePublishToggle = async (videoId) => {
        const response = await fetch(`http://localhost:8000/api/v1/videos/toggle/publish/${videoId}`, {
            method: 'PATCH',
            credentials: 'include'
        })

        if(response.status == 200){
            console.log('Video publish toggel done successfully')
        }
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="w-full h-full pl-16">
            <p className='text-4xl font-bold pb-8'>Watch history</p>
            <div className='w-1/2 flex justify-end gap-1'>
                <p className='p-2 text-xl font-bold'>Edit</p>
                <p className='p-2 text-xl font-bold'>Delete</p>
                <p className='p-2 text-xl font-bold'>Publish</p>
            </div>
            <div className='w-1/2 grid gap-3'>
                {videos.length === 0 ? (
                    <p>No videos available</p> // Show a message if there are no videos
                ) : (
                    <ul>
                        {videos.map((video, index) => {
                            if (video._id === currentVideo) return null;
                            return (
                                <li key={index}
                                    className='py-2 mt-2 flex justify-center'
                                >
                                    <button
                                        onClick={() => {
                                            navigate(`/VideoPlayer/${video._id}`)
                                        }}
                                        className='w-full h-full'>
                                        <VideoCardLessDetails
                                            thumbnail={video.thumbnail}
                                            duration={formatDurationToHMS(video.duration)}
                                            title={video.title}
                                            channelName={video.owner.username}
                                            views={video.views}
                                        />
                                    </button>
                                    <button
                                        className='p-4 rounded-lg hover:bg-[#212121]'
                                        onClick={() => {
                                            setIsModalOpen(true)
                                            setEditTitle(video.title)
                                            setEditDesc(video.description)
                                            setEditVideoId(video._id)
                                        }}
                                    >
                                        <EditOutlinedIcon fontSize="large" />
                                    </button>
                                    <button className='p-4 rounded-lg hover:bg-[#212121]'>
                                        <DeleteOutlineOutlinedIcon fontSize="large" />
                                    </button>
                                    <div className='flex items-center p-4 rounded-lg hover:bg-[#212121]'>
                                        <button
                                            onClick={() => handlePublishToggle(video._id)}
                                            className={`relative w-14 h-8 flex items-center bg-white rounded-full p-1 transition-colors duration-300 ${video.isPublished ? "bg-white" : "bg-white"}`}
                                        >
                                            <span
                                                className={`w-6 h-6 bg-black dark:bg-black rounded-full shadow-md transform transition-transform duration-300 ${video.isPublished ? "translate-x-6" : "translate-x-0"}`}
                                            ></span>
                                        </button>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                )}
            </div>
            <div>
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    children={
                        <div className='bg-[#282828] w-1/2 h-3/4 rounded-lg border-white border-2 p-5 flex flex-col'>
                            <h2 className='text-2xl'>EDIT YOUR VIDEO DETAILS</h2>
                            <form
                                onSubmit={editSubmitHandler}
                                className='flex flex-col text-xl'
                            >
                                <label htmlFor="title" className='py-3'>Title:</label>
                                <input
                                    type="text"
                                    id='title'
                                    value={editTitle}
                                    onChange={(e) => setEditTitle(e.target.value)}
                                    className='outline-none text-black p-3'
                                />
                                <label htmlFor="description" className='py-3'>Description:</label>
                                <input
                                    type="text"
                                    id='description'
                                    value={editDesc}
                                    onChange={(e) => setEditDesc(e.target.value)}
                                    className='outline-none text-black p-3'
                                />
                                <label htmlFor="thumbnail" className='py-3'>Thumbnail:</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                />
                                <button type="submit" className='bg-white text-black p-3 my-3'>Update</button>
                            </form>
                        </div>
                    } />
            </div>
        </div>
    )
}

export default YourVideosPage