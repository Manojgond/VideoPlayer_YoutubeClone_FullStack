import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import VideosHome from "./VideosHome";
import { useSelector } from 'react-redux'

function Homepage() {
    const isOpen = useSelector((state) => state.menuhide.isMenuOpen)

  return (
    <div className="relative w-full h-full">
        {/* <!-- Sidebar (Fixed on the left) --> */}
        <div className={`fixed top-16 bottom-0 left-0 text-white z-20 ${isOpen ? "w-64" : "w-16"}`}>
          <Sidebar />
        </div>

        {/* <!-- Main Content (scrollable) --> */}
        <div className={`mt-16 p-4 overflow-auto h-screen ${isOpen ? "ml-64" : "ml-16"}`}>
          <div className="h-[2000px] p-2"> 
            {/* <!-- Example of large content that can scroll --> */}
            <VideosHome />
            <p>Scroll through this area...</p>
          </div>
        </div>
      </div>
  )
}

export default Homepage