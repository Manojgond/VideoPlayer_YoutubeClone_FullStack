import React from 'react'
import VideoCardHome from './VideoCardHome'


function VideosHome() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <VideoCardHome />
            <VideoCardHome />
            <VideoCardHome />
            <VideoCardHome />
        </div>
    )
}

export default VideosHome