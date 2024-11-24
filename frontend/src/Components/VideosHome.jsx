import React from 'react'
import VideoCardHome from './VideoCardHome'
import thumbnail from "../assets/Thumbnail_2.jpg"
import profilePic from "../assets/profilePic.jpg"


function VideosHome() {
    const video = {
        thumbnail: thumbnail,
        duration: "2:00:15",
        profilePic: profilePic,
        title: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis praesentium reiciendis, enim suscipit rem saepe natus facilis quo eum quisquam!",
        channelName: "Channel name",
        views: "785K",
    }

    return (
        <div className="grid grid-cols-4 gap-4">
            <VideoCardHome
                thumbnail = {video.thumbnail}
                duration = {video.duration}
                profilePic = {video.profilePic}
                title = {video.title}
                channelName = {video.channelName}
                views = {video.views}
            />
            <VideoCardHome
                thumbnail = {video.thumbnail}
                duration = {video.duration}
                profilePic = {video.profilePic}
                title = {video.title}
                channelName = {video.channelName}
                views = {video.views}
            />
            <VideoCardHome
                thumbnail = {video.thumbnail}
                duration = {video.duration}
                profilePic = {video.profilePic}
                title = {video.title}
                channelName = {video.channelName}
                views = {video.views}
            />
            <VideoCardHome
                thumbnail = {video.thumbnail}
                duration = {video.duration}
                profilePic = {video.profilePic}
                title = {video.title}
                channelName = {video.channelName}
                views = {video.views}
            />
        </div>
    )
}

export default VideosHome