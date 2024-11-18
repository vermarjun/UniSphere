import styled from "styled-components"
import { BiBell } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { FaShoppingCart } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import logo from "/logo.png"

const Lfsb = styled.div.attrs({
    className: "border-r-2 border-neutral-700 w-80 h-full bg-black fixed sm:block hidden", // Sidebar is fixed on left
  })``;
export default function Leftsidebar(){
    // const [settings, setSettings] = useState(false); //pip settings ke liye tha not using rn
    return (
        <Lfsb>
            <div className="text-white h-full w-full flex justify-center items-center">
                <div className="h-full w-5/6">
                    <div className="h-1/6 flex items-center">
                        {/* Logo add kardena yaha jo bhi apni app ka logo ho */}
                        <img src={logo} alt="" className="h-16 rounded-full"/>
                        <div className="ml-2">
                            <p className="font-bold text-2xl">GGV SOCIAL</p>
                            <p className="font-extralight text-xs">what we do - tagline</p>
                        </div>
                    </div>
                    <div className="h-2/6 w-full space-y-3">
                        <div className="flex gap-2 w-full justify-center items-center transition-all hover:bg-[#2b2d2f] rounded-full p-2">
                            <IconContext.Provider value={{color:'white', size:'25px'}}>
                                <IoHomeOutline />
                            </IconContext.Provider>
                            <button className=" w-full text-xl text-left">Home</button>
                        </div>
                        <div className="flex gap-2 justify-center items-center transition-all hover:bg-[#2b2d2f] rounded-full p-2">
                            <IconContext.Provider value={{color:'white', size:'25px'}}>
                                <MdEvent />
                            </IconContext.Provider>
                            <button className="w-full text-xl text-left">Events</button>
                        </div>
                        <div className="flex gap-2 justify-center items-center transition-all hover:bg-[#2b2d2f] rounded-full p-2">
                            <IconContext.Provider value={{color:'white', size:'25px'}}>
                                <FaShoppingCart/>
                            </IconContext.Provider>
                            <button className="w-full text-xl text-left">Shop</button>
                        </div>
                        <div className="flex gap-2 justify-center items-center transition-all hover:bg-[#2b2d2f] rounded-full p-2">
                            <IconContext.Provider value={{color:'white', size:'25px'}}>
                                <BiBell/>
                            </IconContext.Provider>
                            <button className="w-full text-xl text-left">Notifications</button>
                        </div>
                    </div>
                    <div className="h-2/6 w-full space-y-3 mt-2">
                        <div>
                            <button className="w-full bg-blue-500 text-lg hover:bg-blue-400 transition-all rounded-full p-2 font-semibold">Post</button>
                        </div>
                        <div>
                            <button className="w-full hover:bg-[#71767b] text-lg bg-[#2b2d2f] transition-all rounded-full p-2 font-semibold">Sign up</button>
                        </div>
                        <div>
                            <button className="w-full hover:bg-[#71767b] text-lg bg-[#2b2d2f] transition-all rounded-full p-2 font-semibold">login</button>
                        </div>
                    </div>
                    <div className="flex items-center p-1 w-full border-2 rounded-full border-neutral-900 cursor-pointer hover:bg-neutral-900 transition-all">
                        <img src="https://th.bing.com/th/id/OIP.CG70mC-flvJIYFRVmR9FZwHaHa?rs=1&pid=ImgDetMain" alt="" className="h-16 rounded-full" />
                        <div className="flex justify-between items-center w-4/6 ml-2">
                            <div>
                                <button className="">Username</button>
                                <p className="text-sm font-light">@username</p>
                            </div>
                            <div className={`hover:bg-[#2b2d2f] transition-all rounded-xl hover:cursor-pointer p-2`} onMouseOver={()=>setSettings(true)} onMouseLeave={()=>setSettings(false)}>
                                <HiDotsVertical />
                                {/* <div className={`${settings?"absolute":"hidden"} bottom-20 h-96 bg-green-900 transform w-48 border border-neutral-900 shadow-lg rounded-lg p-4`} onMouseOver={()=>setSettings(true)} onMouseLeave={()=>setSettings(false)}>
        hi
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Lfsb>
    )
}
