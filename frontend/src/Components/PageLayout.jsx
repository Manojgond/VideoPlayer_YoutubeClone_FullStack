import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from "./Sidebar";
import Navbar from './Navbar';
import { Outlet } from 'react-router-dom';

function PageLayout() {
    const isOpen = useSelector((state) => state.menuhide.isMenuOpen)

    return (
        <>
            <div className='bg-[#181818] text-white min-h-screen'>
                {/* <!-- Navbar (Fixed at the top) --> */}
                <div className="fixed top-0 left-0 right-0 h-16 z-10">
                    <Navbar />
                </div>
                <div className="relative w-full h-full">
                    {/* <!-- Sidebar (Fixed on the left) --> */}
                    <div className={`fixed top-16 bottom-0 left-0 text-white z-20 ${isOpen ? "w-64" : "w-16"}`}>
                        <Sidebar />
                    </div>
                    <div className={`mt-16 p-4 overflow-auto h-screen ${isOpen ? "ml-64" : "ml-16"}`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageLayout