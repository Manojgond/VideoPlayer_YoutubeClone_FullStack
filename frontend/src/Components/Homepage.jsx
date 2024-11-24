import { useState } from "react";
import { useSelector } from 'react-redux'
import VideosHome from "./VideosHome";

function Homepage() {
  const isOpen = useSelector((state) => state.menuhide.isMenuOpen)

  return (
    <div className="h-[2000px] p-2">
          {/* <!-- Example of large content that can scroll --> */}
          <VideosHome />
          <p>Scroll through this area...</p>
        </div>
  )
}

export default Homepage