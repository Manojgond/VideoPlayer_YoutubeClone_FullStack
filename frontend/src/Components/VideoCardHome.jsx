import React from 'react'
import thumbnail from "../assets/Thumbnail_2.jpg"
import profilePic from "../assets/profilePic.jpg"

function VideoCardHome(
    {
        thumbnail,
        duration,
        profilePic,
        title,
        channelName,
        views
    }
) {
    return (
        <div className='w-full'>
            {/* Thumbnail and duration */}
            <div className="rounded-md relative h-[23vh]">
                <img src={thumbnail} alt="" className="w-full h-full rounded-lg object-cover" />
                <p className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-50 px-1 rounded-md">{duration}</p>
            </div>
            {/* Profile picture and Title */}
            <div className='w-full h-[8vh] p-1 flex items-center'>
                <div className='w-[15%] h-4/5 rounded-full overflow-hidden'>
                    <img src={profilePic} alt="Prifile" className='object-cover' />
                </div>
                <div className='w-[80%] h-full p-3 leading-tight text-left'>
                    <p className='overflow-hidden line-clamp-2'>{title}</p>
                </div>
            </div>
            {/* Channle name and views */}
            <div className='w-full h-[5vh] text-sm text-gray-400 flex'>
                <div className='w-[20%] h-full'></div>
                <div className='w-[80%] h-full flex flex-col items-start'>
                    <p className='overflow-hidden truncate'>{channelName}</p>
                    <p>{views} views</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCardHome