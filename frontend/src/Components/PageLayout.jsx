import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from "./Sidebar";
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';

function PageLayout() {
    const isOpen = useSelector((state) => state.menuhide.isMenuOpen)
    const location = useLocation();
    const sidebarToHide = (location.pathname === '/VideoPlayer') || (location.pathname === '/login') || (location.pathname === '/register');
    const navbarToHide = (location.pathname === '/login') || (location.pathname === '/register');
    

    return (
        <>
            <div className='bg-[#181818] text-white min-h-screen'>
                {/* <!-- Navbar (Fixed at the top) --> */}
                <div className={`fixed top-0 left-0 right-0 h-16 z-10 ${navbarToHide ? "hidden" : "block" }`}>
                    <Navbar />
                </div>
                <div className={`relative w-full h-full`}>
                    {/* <!-- Sidebar (Fixed on the left) --> */}
                    <div className={`fixed top-16 bottom-0 left-0 text-white z-20 ${sidebarToHide ? "hidden" : isOpen ? "w-64" : "w-16"}`}>
                        <Sidebar />
                    </div>
                    <div className={`${navbarToHide ? "mt-0" : "mt-16" } overflow-auto h-screen ${sidebarToHide ? "" : isOpen ? "ml-64" : "ml-16"}`}>
                        <Outlet />
                    </div>
                </div>
            </div>
        </>
    )
}

export default PageLayout