import { useState, useEffect } from "react";
import { useSelector } from 'react-redux'
import VideosHome from "./VideosHome";
import VideoCardHome from './VideoCardHome'
import { useNavigate } from 'react-router-dom'

function Homepage() {
  const isOpen = useSelector((state) => state.menuhide.isMenuOpen)
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate()

  useEffect(() => {
    const getVideos = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/videos', {
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
        setVideos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Call the getVideos function
    getVideos();
  }, [])


  const allVideos = videos?.data?.videos || [];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (

    <div className="p-2">
      {allVideos.length === 0 ? (
        <p>No videos available</p> // Show a message if there are no videos
      ) : (
        <ul className="grid grid-cols-4 gap-4">
          {allVideos.map((video, index) => {
            return (
              <li key={index}>
                <button onClick={()=>{
                  navigate(`/VideoPlayer/${video._id}`)
                }}>
                  <VideoCardHome
                    thumbnail={video.thumbnail}
                    duration={video.duration}
                    profilePic={video.owner.avatar}
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
  )
}

export default Homepage