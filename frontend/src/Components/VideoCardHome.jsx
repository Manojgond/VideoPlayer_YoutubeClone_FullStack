import React from 'react'
import thumbnail from "../assets/Thumbnail_2.jpg"
import profilePic from "../assets/profilePic.jpg"

function VideoCardHome() {
    return (
        <div className='w-full'>
            {/* Thumbnail and duration */}
            <div className="rounded-md relative h-[23vh]">
                <img src={thumbnail} alt="" className="w-full h-full rounded-lg object-cover" />
                <p className="absolute bottom-2 right-2 bg-gray-900 bg-opacity-50 px-1 rounded-md">2:00:15</p>
            </div>
            {/* Profile picture and Title */}
            <div className='w-full h-[8vh] p-1 flex items-center'>
                <div className='w-[15%] h-4/5 rounded-full overflow-hidden'>
                    <img src={profilePic} alt="Prifile" className='object-cover' />
                </div>
                <div className='w-[80%] h-full p-3 leading-tight'>
                    <p className='overflow-hidden line-clamp-2'>This is the video title Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam fugit aut vel consequuntur optio deserunt obcaecati nihil molestiae tempore impedit quidem enim architecto!</p>
                </div>
            </div>
            {/* Channle name and views */}
            <div className='w-full h-[5vh] text-sm text-gray-400 flex'>
                <div className='w-[20%] h-full'></div>
                <div className='w-[80%] h-full'>
                    <p className='overflow-hidden truncate'>Channle name</p>
                    <p>785K views</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCardHome