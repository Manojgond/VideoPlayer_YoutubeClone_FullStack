import React, { useState } from 'react';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';

function PublishVideo() {
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    // Handle video file selection
    const handleVideoChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    // Handle thumbnail file selection
    const handleThumbnailChange = (e) => {
        setThumbnail(e.target.files[0]);
    };

    // Handle title input change
    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false)
        setVideoFile(e.dataTransfer.files[0])
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        setError(null);

        if (!videoFile) {
            setError("Please select a video file before uploading.")
            setIsUploading(false)
        }

        // Create FormData to send the files and text
        const formData = new FormData();
        formData.append('videoFile', videoFile);
        formData.append('title', title);
        formData.append('description', description);
        if (thumbnail) formData.append('thumbnail', thumbnail); // append thumbnail file if selected

        try {
            const response = await fetch('http://localhost:8000/api/v1/videos/', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Failed to upload video');
            }

            const data = await response.json();
            console.log('Video uploaded successfully:', data);
            setIsUploading(false);
        } catch (err) {
            console.error('Error uploading video:', err);
            setError('Failed to upload video. Please try again.');
            setIsUploading(false);
        }
    };

    return (
        <div className='flex flex-col items-center pb-5'>
            <h1 className='text-3xl p-3'>Upload Video</h1>
            <form onSubmit={handleSubmit} className='w-full flex flex-col items-center'>
                <div
                    onDragOver={(e) => {
                        e.preventDefault();
                        setIsDragging(true)
                    }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={handleDrop}
                    className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-5 p-4 w-1/2 min-h-60 ${isDragging ? "border-blue-600 bg-blue-400 bg-opacity-30" : "border-blue-400"}`}
                >
                    <VideoLibraryIcon />
                    <h2>Browse or Drag and Drop video file</h2>
                    <label className='bg-blue-500 rounded-lg px-5 py-2 cursor-pointer'>
                        Browse file
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            className='hidden'
                        />
                    </label>
                </div>
                <div className='grid grid-cols-2 p-4 w-3/4'>
                    <div className='flex flex-col p-2'>
                        <label className='text-xl'>Title :</label>
                        <textarea
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            placeholder="Enter video title"
                            required
                            className='text-black p-2'
                            maxLength={100}
                        />
                        <p className='text-right text-xs text-orange-400'>100 Characters allowed ! </p>
                    </div>
                    <div className='flex flex-col p-2'>
                        <label className='text-xl'>Description :</label>
                        <textarea
                            type="text"
                            value={description}
                            onChange={handleDescriptionChange}
                            placeholder="Enter video Description"
                            required
                            className='text-black p-2'
                            maxLength={1500}
                        />
                        <p className='text-right text-xs text-orange-400'>1500 Characters allowed ! </p>
                    </div>
                    <div className='flex flex-col p-2 w-full'>
                        <label className='text-xl'>Thumbnail :</label>
                        <div
                            onDragOver={(e) => {
                                e.preventDefault();
                                setIsDragging(true)
                            }}
                            onDragLeave={() => setIsDragging(false)}
                            onDrop={handleDrop}
                            className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center gap-5 p-4 min-h-60 ${isDragging ? "border-blue-600 bg-blue-400 bg-opacity-30" : "border-blue-400"}`}
                        >
                            <PermMediaIcon />
                            <h2>Browse or Drag and Drop image</h2>
                            <label className='bg-blue-500 rounded-lg px-5 py-2 cursor-pointer'>
                                Browse file
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleThumbnailChange}
                                    className='hidden'
                                />
                            </label>
                        </div>
                    </div>
                </div>

                <div>
                    <button type="submit" disabled={isUploading} className='bg-blue-500 rounded-lg px-5 py-2'>
                        {isUploading ? 'Uploading...' : 'Upload Video'}
                    </button>
                </div>

                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    );
}

export default PublishVideo;
