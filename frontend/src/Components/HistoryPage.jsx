import React, { useState, useEffect } from 'react'
import VideoCardLessDetails from './VideoCardLessDetails'
import { useNavigate } from 'react-router-dom'

function HistoryPage({ currentVideo }) {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true)
    const getVideos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/users/history', {
          method: 'GET',
          credentials: 'include',
        });

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        // Parse the response data
        const data = await response.json();

        setVideos(data?.data);
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


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="w-full h-full pl-16">
      <p className='text-4xl font-bold pb-8'>Watch history</p>
      <div className='w-1/2 grid gap-3'>
        {videos.length === 0 ? (
          <p>No videos available</p> // Show a message if there are no videos
        ) : (
          <ul>
            {videos.map((video, index) => {
              if (video._id === currentVideo) return null;
              return (
                <li key={index}
                  className='py-2 mt-2'
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
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}

export default HistoryPage