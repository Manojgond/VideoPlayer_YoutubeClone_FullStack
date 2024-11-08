import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { useSelector } from 'react-redux'

function Sidebar() {
    const isOpen = useSelector((state)=>state.menuhide.isMenuOpen)

    return (
        <div className="flex fixed left-0 h-[90%] top-[10%]">
            <div
                className={`h-full bg-[#181818] text-white transition-transform duration-500 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} w-52`}
            >
                <ul className="space-y-4 px-2 w-full">
                    <li>
                        <div className="flex hover:bg-[#212121] p-3 rounded w-full">
                            <div className="w-1/4 grid">
                                <HomeOutlinedIcon />
                            </div>
                            <div className="w-3/4">
                                <a href="#">
                                    Home
                                </a>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
