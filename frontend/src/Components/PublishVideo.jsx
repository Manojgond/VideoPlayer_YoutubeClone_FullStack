import React, { useState } from 'react';

function PublishVideo() {
    const [videoFile, setVideoFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState(null);

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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsUploading(true);
        setError(null);

        // Create FormData to send the files and text
        const formData = new FormData();
        formData.append('videoFile', videoFile); // append video file
        formData.append('title', title);
        formData.append('description', description); 
        if (thumbnail) formData.append('thumbnail', thumbnail); // append thumbnail file if selected

        try {
            // Using fetch to send the POST request
            const response = await fetch('http://localhost:8000/api/v1/videos/', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });

            // Check if the response is OK (status code 2xx)
            if (!response.ok) {
                throw new Error('Failed to upload video');
            }

            const data = await response.json(); // Get the response data
            console.log('Video uploaded successfully:', data);
            setIsUploading(false);
            // Optionally, reset form values here
        } catch (err) {
            console.error('Error uploading video:', err);
            setError('Failed to upload video. Please try again.');
            setIsUploading(false);
        }
    };

    return (
        <div>
            <h1>Upload Video</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={handleTitleChange}
                        placeholder="Enter video title"
                        required
                        className='text-black'
                    />
                </div>
                <div>
                    <label>Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={handleDescriptionChange}
                        placeholder="Enter video Description"
                        required
                        className='text-black'
                    />
                </div>

                <div>
                    <label>Video File</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        required
                    />
                </div>

                <div>
                    <label>Thumbnail</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailChange}
                    />
                </div>

                <div>
                    <button type="submit" disabled={isUploading} className='bg-green-400'>
                        {isUploading ? 'Uploading...' : 'Upload Video'}
                    </button>
                </div>

                {error && <div style={{ color: 'red' }}>{error}</div>}
            </form>
        </div>
    );
}

export default PublishVideo;

// http://localhost:8000/api/v1/videos/