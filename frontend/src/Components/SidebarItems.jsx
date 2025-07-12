import React from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import HistoryIcon from '@mui/icons-material/History';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import SmartDisplayOutlinedIcon from '@mui/icons-material/SmartDisplayOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';

export const SidebarItems = [
    {
        title: "Home",
        icon: <HomeOutlinedIcon />,
        link: "/"
    },
    {
        title: "Subscriptions",
        icon: <SubscriptionsOutlinedIcon />,
        link: "/Subscription"
    },
    {
        title: "History",
        icon: <HistoryIcon />,
        link: "/History"
    },
    {
        title: "Playlists",
        icon: <PlaylistPlayIcon />,
        link: "/Playlist"
    },
    {
        title: "Your videos",
        icon: <SmartDisplayOutlinedIcon />,
        link: "/Your-videos"
    },
    {
        title: "Liked videos",
        icon: <ThumbUpOutlinedIcon />,
        link: "/Liked-videos"
    },
]
