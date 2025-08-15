import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux'
import { toggleMenuHide } from "../features/youtube/youtubeSlice";
// import logo from "../assets/Youtube_logo_NoBG.png"
import { useLocation } from 'react-router-dom';
import Modal from 'react-modal'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const dispatch = useDispatch()
  const location = useLocation();
  const menuIconToHide = location.pathname === '/VideoPlayer';
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate()

  const modalStyles = {
    overlay: {
      zIndex: 9999,
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    content: {
      width: '500px',
      height: '150px',
      margin: 'auto',
      textAlign: 'center',
      borderRadius: '20px',
      backgroundColor: '#282828',
    },
  };

  const handleLogout = async () => {
    setIsModalOpen(false);
    // Add your logout logic here (e.g., clear session, redirect to login, etc.)
    const response = await fetch('http://localhost:8000/api/v1/users/logout', {
      method: 'POST',
      credentials: 'include'
    })

    if (response.status === 200) {
      console.log('logged out successfully')
      navigate('/login')
    }

  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='w-full flex items-center pl-5 justify-between text-white h-full bg-[#181818]'>
      <div className='h-full flex items-center'>
        <button className={`p-3 ${menuIconToHide ? "hidden" : "block"}`} onClick={() => dispatch(toggleMenuHide())}>
          <MenuIcon fontSize="medium" />
        </button>
        <button
          onClick={() => {
            navigate('/')
          }}
          className='w-full h-full'
        >
          {/* <img src={logo} alt="Youtube logo" className='h-1/2' /> */}
        </button>
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
        <button onClick={() => setIsModalOpen(true)}>
          <LogoutIcon fontSize="large" />
        </button>
      </div>

      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancel}
        style={modalStyles}
        contentLabel="Logout Confirmation"
        appElement={document.getElementById('root')}
      >
        <div className='flex items-center flex-col justify-center rounded-2xl overflow-hidden'>
          <div className='w-full grid place-items-end cursor-pointer'>
            <button onClick={handleCancel}>
              ✖
            </button>
          </div>
          <h3 className='pb-3 text-white'>Are you sure you want to log out?</h3>
          <div className='flex gap-5'>
            <button onClick={handleLogout} className='px-6 p-1 rounded-md bg-slate-500'>Yes</button>
            <button onClick={handleCancel} className='px-6 p-1 rounded-md bg-slate-500'>No</button>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Navbar