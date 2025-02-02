import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;

    return (
        <div className={`${isOpen ? "block" : "hidden"}`}>
            <div className='w-screen h-full bg-[#000000b3] fixed top-0 left-0 z-50 flex items-center justify-center'>
                <button className='fixed top-4 right-4 text-white'
                    onClick={onClose}>
                    <CloseIcon fontSize="large" />
                </button>
                <div className='p-5 w-full h-full flex items-center justify-center'>
                    {children}
                </div>
            </div>
        </div>

    )
}

export default Modal