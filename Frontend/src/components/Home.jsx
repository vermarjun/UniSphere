import { useState } from "react";
import previousBtn from "/previous.png"
import nextBtn from "/next.png"
import view from "/view.png"
import like from "/like.png"
import share from "/share.png"
import comment from "/comment.png"

const slides1 = ["https://th.bing.com/th/id/OIP.MCLzVoExgXPyNi_V5gb1AwHaE7?rs=1&pid=ImgDetMain","https://th.bing.com/th/id/OIP.9r1JDiokxqQLHrj2a9XojAHaNK?rs=1&pid=ImgDetMain","https://th.bing.com/th/id/OIP.RDStdOWibsHTs0f08IQdUAHaEo?rs=1&pid=ImgDetMain","https://th.bing.com/th/id/OIP.7cRYFyLoDEDh4sRtM73vvwHaDg?rs=1&pid=ImgDetMain"]
const slides2 = ["https://pinchofglam.com/wp-content/uploads/2024/05/cinnamon-brown-haircolor-26-600x900.jpg","https://th.bing.com/th/id/OIP.n8eeUqmmEIKtzRxgzwaSLAHaK0?w=832&h=1216&rs=1&pid=ImgDetMain"]

function Carousel({slides}){
    const [currentIndex, setCurrentIndex] = useState(0);
    function prevSlide() {
        setCurrentIndex((prevIndex) => (prevIndex == 0) ? slides.length - 1 : prevIndex - 1);
    };

    function nextSlide() {
        setCurrentIndex((prevIndex) => (prevIndex == slides.length-1) ? 0 : prevIndex + 1);
    };
    return (
        <div className="relative max-h-80">
            {/* Slides */}
            <div className="overflow-hidden relative border-b border-neutral-800 ">
                <div className="flex transition-transform duration-500" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <img key={index} src={slide} alt="image" className="min-w-full object-contain h-full max-w-96 max-h-80" />
                ))}
                </div>
            </div>
            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-1 -translate-y-1/2 text-white p-2"
            >
                <img src={previousBtn} alt="" className="h-6"/>
            </button>
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-1 -translate-y-1/2 text-white p-2"
            >
                <img src={nextBtn} alt="" className="h-6"/>
            </button>

            {/* Indicators */}
            <div className="w-full flex justify-center items-center space-x-3">
                <div className="absolute bottom-3 space-x-3">
                    {slides.map((_, index) => (
                    <button key={index} onClick={() => setCurrentIndex(index)} className={`w-3 h-3 rounded-full ${currentIndex === index?"bg-gray-300":"bg-gray-800"}`}></button>
                    ))}
                </div>
            </div>
        </div>
    )
}

function Post({slides}){ 
    return (
        <div className="max-w-lg sm:mx-10 mx-2 border border-neutral-700 rounded-lg shadow-md">
            {/* Header */}
            <div className="flex items-center p-2 px-4 border-b border-neutral-700">
                <img src="https://cdn.pixabay.com/photo/2023/02/23/10/16/ai-generated-7808455_960_720.jpg" alt="Profile" className="w-12 h-12 rounded-full object-cover"/>
                <div className="ml-4 flex justify-between items-center w-full">
                    <div>
                        <h3 className="font-semibold">Username</h3>
                        <p className="text-sm text-gray-400">@userid</p>
                    </div>
                    <p className="text-xs">15Nov 2024</p>
                </div>
            </div>
        
            {/* Media */}
            <div className="w-full">
                <Carousel slides={slides}/>
            </div>
    
            {/* Title & Caption */}
            <div className="p-2 ">
                <p className="text-sm mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti du quos. Nulla, atque illo. More..</p>
            </div>

            {/* Footer */}
            <div className="mb-4 px-4 ">
                <div className="flex space-x-5 justify-start items-center text-gray-600">
                    <button className="items-center space-x-1 hover:text-red-500">
                        <div className="flex justify-center items-center">
                            <img src={like} alt=""  className="h-8"/>
                        </div>
                        {/* <span>10 Likes</span> */}
                    </button>
                    <button className="items-center space-x-1 hover:text-blue-500">
                        <div className="flex justify-center items-center">
                            <img src={comment} alt=""  className="h-8"/>
                        </div>
                        {/* <span>2 Comments</span> */}
                    </button>
                    <input type="text" className="w-5/6 p-2 bg-neutral-900 rounded-lg" placeholder="Comment"/>
                </div>
            </div>
        </div>
    );
}

function Home(){
    return (
        <>
        <div className="text-white h-full w-full sm:flex sm:justify-center">
            <div className="my-5 space-y-5">
                <Post slides={slides2}/>
                <Post slides={slides1}/>
            </div>
        </div>
        </>
    )
}

export default Home