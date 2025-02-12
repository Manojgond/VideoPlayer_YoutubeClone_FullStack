import React, { useState, useEffect } from 'react'
import VideoCardLessDetails from './VideoCardLessDetails'
import { useNavigate } from 'react-router-dom'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import SlideshowOutlinedIcon from '@mui/icons-material/SlideshowOutlined';
import { Modal } from './index';

function YourVideosPage({ currentVideo }) {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDelConfModalOpen, setIsDelConfModalOpen] = useState(false);
    const [editTitle, setEditTitle] = useState('')
    const [editDesc, setEditDesc] = useState('')
    const [editThumbnail, setEditThumbnail] = useState(null)
    const [editVideoId, setEditVideoId] = useState('')
    const [videoIdToDelete, setVideoIdToDelete] = useState('')
    const [dataFetchToggle, setDataFetchToggle] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const getVideos = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/videos/user/videos', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch videos');
                }

                const data = await response.json();

                setVideos(data?.data?.videos);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getVideos();
    }, [dataFetchToggle])

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
            setIsEditModalOpen(false)
            setDataFetchToggle(!dataFetchToggle)
        }

    }

    const handlePublishToggle = async (videoId) => {
        const response = await fetch(`http://localhost:8000/api/v1/videos/toggle/publish/${videoId}`, {
            method: 'PATCH',
            credentials: 'include'
        })

        if (response.status == 200) {
            setDataFetchToggle(!dataFetchToggle)
        }
    }

    const handleVideoDelete = async () => {
        const response = await fetch(`http://localhost:8000/api/v1/videos/${videoIdToDelete}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        if (response.status == 200) {
            setDataFetchToggle(!dataFetchToggle)
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
            <div className='flex justify-end pr-5'>
                <button 
                className='flex gap-2 border-2 px-4 py-2 rounded-full'
                onClick={()=> navigate('/publish')}
                >
                    <SlideshowOutlinedIcon />
                    <h1>Upload</h1>
                </button>
            </div>
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
                                            setIsEditModalOpen(true)
                                            setEditTitle(video.title)
                                            setEditDesc(video.description)
                                            setEditVideoId(video._id)
                                        }}
                                    >
                                        <EditOutlinedIcon fontSize="large" />
                                    </button>
                                    <button
                                        className='p-4 rounded-lg hover:bg-[#212121]'
                                        onClick={() => {
                                            setIsDelConfModalOpen(true)
                                            setVideoIdToDelete(video._id)
                                        }}
                                    >
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
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
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
            <div>
                <Modal
                    isOpen={isDelConfModalOpen}
                    onClose={() => setIsDelConfModalOpen(false)}
                    children={
                        <div className='bg-[#282828] rounded-lg border-white border-2 p-6 flex flex-col items-center'>
                            <h3 className='text-xl'>Are you sure you want to delete this video permanently ?</h3>
                            <div className='flex gap-10 pt-5'>
                                <button onClick={handleVideoDelete} className='px-6 p-1 rounded-md bg-slate-500'>Yes</button>
                                <button onClick={() => setIsDelConfModalOpen(false)} className='px-6 p-1 rounded-md bg-slate-500'>No</button>
                            </div>
                        </div>
                    } />
            </div>
        </div>
    )
}

export default YourVideosPage