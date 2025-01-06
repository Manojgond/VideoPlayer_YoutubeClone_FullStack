import React from 'react'

function VideoCardLessDetails(
    {
        thumbnail,
        duration,
        title,
        channelName,
        views
    }
) {

    function formatNumbers(numbers) {
        if ((numbers / 1000000000) > 1) {
            return `${Math.floor((numbers / 1000000000) * 10) / 10}B`;
        } else if ((numbers / 1000000) > 1) {
            return `${Math.floor((numbers / 1000000) * 10) / 10}M`;
        } else if ((numbers / 1000) > 1) {
            return `${Math.floor((numbers / 1000) * 10) / 10}K`;
        } else return numbers
    }


    return (
        <div className='w-full grid grid-cols-[2fr_3fr] gap-2 h-[12vh]'>
            <div className="relative overflow-hidden h-full">
                <img src={thumbnail} alt="" className="object-cover h-full w-full rounded-xl overflow-hidden" />
                <p className="absolute bottom-2 right-2 bg-opacity-50 px-1 rounded-md">{duration}</p>
            </div>
            <div className='flex flex-col items-start text-left pl-2'>
                <div className='leading-tight'>
                    <p className='overflow-hidden line-clamp-2'>{title}</p>
                </div>
                <div className=' h-full text-sm py-2 text-gray-400'>
                    <p className='overflow-hidden truncate'>{channelName}</p>
                    <p>{`${formatNumbers(views)} views    ·    2 days ago`}</p>
                </div>
            </div>
        </div>
    )
}

export default VideoCardLessDetails