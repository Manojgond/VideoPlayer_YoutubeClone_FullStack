import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux'
import { toggleMenuHide } from "../features/youtube/youtubeSlice";

function Navbar() {
  const dispatch = useDispatch()

  return (
    <div className='w-full h-[10%] fixed top-0 left-0 right-0 z-10 bg-slate-400'>
      <h1>Navbar</h1>
      <button className="text-white" onClick={()=> dispatch(toggleMenuHide())}>
        <MenuIcon />
      </button>
    </div>
  )
}

export default Navbar