import styled from "styled-components"

const Rfsb = styled.div.attrs({
    className:"w-1/4 border-l-2 border-gray-500 h-full"
})``;

export default function Rightsidebar(){
    return (
        <Rfsb>
            <div className="p-3 h-full">
                <div className="1/6">
                    <input type="text" placeholder="Search" className="bg-gray-600 rounded-full p-2 w-full placeholder:text-white"/>
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