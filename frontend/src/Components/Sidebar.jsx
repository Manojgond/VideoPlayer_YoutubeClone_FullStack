import { useState, useEffect } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { useSelector } from 'react-redux'
import { SidebarItems } from './SidebarItems'


function Sidebar() {
    const isOpen = useSelector((state) => state.menuhide.isMenuOpen)

    return (
        <div className="flex h-full">
            <div
                className={`h-full bg-[#181818] text-white w-full ${isOpen ? "block" : "hidden"}`}
            >
                <ul className="space-y-4 px-2 w-full">
                    {SidebarItems.map((sidebarItem, index) => {
                        return (
                            <li key={index}>
                                <div className="flex hover:bg-[#212121] p-3 rounded w-full">
                                    <div className="w-1/4 grid items-center">
                                        {sidebarItem.icon}
                                    </div>
                                    <div className={`w-3/4`}>
                                        <a href="#">
                                            {sidebarItem.title}
                                        </a>
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>

            {/* Only Icons in sidebar */}
            <div
                className={`h-full bg-[#181818] text-white w-full ${isOpen ? "hidden" : "block"}`}
            >
                <ul className="space-y-4 px-2 w-full">
                    {SidebarItems.map((sidebarItem, index) => {
                        return (
                            <li key={index}>
                                <div className="grid hover:bg-[#212121] p-3 rounded w-full">
                                    {sidebarItem.icon}
                                </div>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
