import React, { useState } from 'react'
import thumbnail from "../assets/Thumbnail_2.jpg"
import profilePic from "../assets/profilePic.jpg"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';

const menuListItems = [
    {
        icon: <WatchLaterOutlinedIcon />,
        title: "Save to watch later"
    },
    {
        icon: <BookmarkBorderOutlinedIcon />,
        title: "Save to Playlists"
    },
    {
        icon: <ReplyOutlinedIcon />,
        title: "Share"
    }];

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
    const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false)
    const [position, setPosition] = useState({ top: 0, left: 0 })

    const handleMoreBtnClick = (e) => {
        e.stopPropagation();

        if (isMoreMenuOpen) {
            setIsMoreMenuOpen(false)
        } else {
            const buttonPosition = e.currentTarget.getBoundingClientRect();
            setPosition({ top: buttonPosition.bottom, left: buttonPosition.left })
            setIsMoreMenuOpen(true)
        }
    }

    return (

        <div className='w-full relative'>
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
                <button onClick={handleMoreBtnClick}>
                    <MoreVertIcon />
                </button>
            </div>
            {/* Channle name and views */}
            <div className='w-full h-[5vh] text-sm text-gray-400 flex'>
                <div className='w-[20%] h-full'></div>
                <div className='w-[80%] h-full flex flex-col items-start'>
                    <p className='overflow-hidden truncate'>{channelName}</p>
                    <p>{views} views</p>
                </div>
            </div>
            {isMoreMenuOpen && <ul
                className="absolute shadow-lg rounded-lg border z-50 bg-[#212121] w-60 overflow-hidden"
                style={{ top: position.top, left: position.left }}
                onClick={(e)=>{
                    e.stopPropagation();
                }}
            >
                {menuListItems.map((listItem) => (<li
                    key={listItem}
                    className="px-4 py-2 hover:bg-[#282828] cursor-pointer flex gap-3"
                    onClick={() => setIsMoreMenuOpen(false)}
                >
                    <span>{listItem.icon}</span>
                    <span>{listItem.title}</span>
                </li>))}
            </ul>}
        </div>
    )
}

export default VideoCardHome