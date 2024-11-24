import React from 'react'
import VideoCardLessDetails from './VideoCardLessDetails'


function PlaynextVideos() {
    return (
        <div className='w-full'>
            <ul className='mt-5'>
                <li className='py-2 h-[12vh]'>
                    <VideoCardLessDetails />
                </li>
            </ul>
        </div>
    )
}

export default PlaynextVideos