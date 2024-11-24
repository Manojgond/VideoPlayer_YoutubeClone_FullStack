import React from 'react'
import thumbnail from "../assets/Thumbnail_2.jpg"
import profilePic from "../assets/profilePic.jpg"

function VideoCardLessDetails() {
    return (
        <div className='w-full grid grid-cols-[2fr_3fr] gap-2 h-full'>
            <div>
                <div className="relative overflow-hidden h-full">
                    <img src={thumbnail} alt="" className="object-cover h-full rounded-xl overflow-hidden" />
                    <p className="absolute bottom-2 right-2 bg-opacity-50 px-1 rounded-md">2:00:15</p>
                </div>
            </div>
            <div>
                <div className='leading-tight'>
                    <p className='overflow-hidden line-clamp-2'>This is the video title Lorem ipsum dolor sit amet consectetur adipisicing elit. Id, laboriosam fugit aut vel consequuntur optio deserunt obcaecati nihil molestiae tempore impedit quidem enim architecto!</p>
                </div>
                <div className='w-[80%] h-full text-xs py-2 text-gray-400'>
                    <p className='overflow-hidden truncate'>Channle name</p>
                    <p>785K views</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCardLessDetails