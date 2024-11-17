import styled from "styled-components"
import { FaSearch } from "react-icons/fa";
import { IconContext } from "react-icons/lib";

const Rfsb = styled.div.attrs({
    className:"w-1/4 border-l-2 border-gray-500 h-full"
})``;

export default function Rightsidebar(){
    return (
        <Rfsb>
            <div className="p-3 h-full">
                <div className="1/6">
                <div className="flex justify-center items-center">
                    <IconContext.Provider value={{color:'white', size:'25px'}}>
                        <FaSearch />
                    </IconContext.Provider>
                    <input  type="text" placeholder="Search" className="bg-[#202327] rounded-full p-2 w-full placeholder:text-white placeholder:p-3"/>
                </div>
                </div>
                <div className="h-5/6 space-y-5 mt-5">
                    <div className="border-2 border-gray-700 h-1/2 w-full rounded-2xl"> 
                        <p className="text-white text-center font-bold text-xl">Trending</p>
                    </div>
                    <div className="border-2 border-gray-700 h-1/2 w-full rounded-2xl"> 
                        <p className="text-white text-center font-bold text-xl">Aura</p>
                    </div>
                </div>
            </div>
        </Rfsb>
    )
}