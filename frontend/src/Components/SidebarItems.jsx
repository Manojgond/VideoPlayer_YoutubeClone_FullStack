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
    },
    {
        title: "Subscriptions",
        icon: <SubscriptionsOutlinedIcon />,
    },
    {
        title: "History",
        icon: <HistoryIcon />,
    },
    {
        title: "Playlists",
        icon: <PlaylistPlayIcon />,
    },
    {
        title: "Your videos",
        icon: <SmartDisplayOutlinedIcon />,
    },
    {
        title: "Liked videos",
        icon: <ThumbUpOutlinedIcon />,
    },
]
