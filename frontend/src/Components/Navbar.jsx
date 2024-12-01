import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch } from 'react-redux'
import { toggleMenuHide } from "../features/youtube/youtubeSlice";
import logo from "../assets/Youtube_logo_NoBG.png"
import { useLocation } from 'react-router-dom';

function Navbar() {
  const dispatch = useDispatch()
  const location = useLocation();
  const menuIconToHide = location.pathname === '/VideoPlayer';

  return (
    <div className='w-full flex items-center pl-5 justify-between text-white h-full bg-[#181818]'>
      <div className='h-full flex items-center'>
        <button className={`p-3 ${menuIconToHide ? "hidden" : "block" }`} onClick={() => dispatch(toggleMenuHide())}>
          <MenuIcon fontSize="medium" />
        </button>
        <img src={logo} alt="Youtube logo" className='h-1/2' />
      </div>
      <div className='w-2/5'>
        <div className='w-full flex items-center border-[#3d3d3d] border-2 rounded-full'>
          <input type="text" placeholder='Search' className='w-full p-1 rounded-l-full outline-none pl-5 bg-transparent placeholder-gray-500' />
          <div className="px-5 bg-[#3d3d3d] rounded-r-full py-2">
            <button>
              <SearchOutlinedIcon />
            </button>
          </div>
        </div>
      </div>
      <div className='px-5'>
        <button>
          <AccountCircleIcon fontSize="large" />
        </button>
      </div>
    </div>
  )
}

export default Navbar