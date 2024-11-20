import styled from "styled-components";
import { BiBell } from "react-icons/bi";
import { IconContext } from "react-icons/lib";
import { FaShoppingCart } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import SignupPage from "./SignupPage"; // Import SignupPage
import LoginPage from "./LoginPage"; // Import LoginPage

const Lfsb = styled.div.attrs({
  className:
    "border-r-2 border-neutral-700 w-[20rem] h-full bg-black fixed sm:block hidden", // Sidebar is fixed on left
})``;

export default function Leftsidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for controlling Signup modal
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false); // State for controlling Login modal
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false); // State for controlling Post modal
  const [postContent, setPostContent] = useState({ text: "", image: null });
  const navigate = useNavigate();

  const handlePostSubmit = () => {
    // Handle the logic to submit the post (for example, API call)
    console.log(postContent);
    setIsPostDialogOpen(false);
  };

  return (
    <Lfsb>
      <div className="text-white h-full w-full flex justify-center items-center">
        <div className="h-full w-5/6">
          <div className="h-1/6 flex items-center">
            {/* Logo */}
            <img src={logo} alt="" className="h-16 rounded-full" />
            <div className="ml-2">
              <p className="font-bold text-2xl">GGV SOCIAL</p>
              <p className="font-extralight text-xs">What we do - tagline</p>
            </div>
          </div>

          {/* Main Sidebar Content */}
          <div className="h-2/6 w-full space-y-3">
            <div
              onClick={() => navigate("/")}
              className="flex gap-2 w-full justify-center items-center transition-all hover:bg-[#2b2d2f] rounded-full p-2"
            >
              <IconContext.Provider value={{ color: "white", size: "25px" }}>
                <IoHomeOutline />
              </IconContext.Provider>
              <button className="w-full text-xl text-left">Home</button>
            </div>
            <div
              onClick={() => navigate("/events")}
              className="flex gap-2 justify-center items-center transition-all hover:bg-[#2b2d2f] rounded-full p-2"
            >
              <IconContext.Provider value={{ color: "white", size: "25px" }}>
                <MdEvent />
              </IconContext.Provider>
              <button className="w-full text-xl text-left">Events</button>
            </div>
            <div
              onClick={() => navigate("/shop")}
              className="flex gap-2 justify-center items-center transition-all hover:bg-[#2b2d2f] rounded-full p-2"
            >
              <IconContext.Provider value={{ color: "white", size: "25px" }}>
                <FaShoppingCart />
              </IconContext.Provider>
              <button className="w-full text-xl text-left">Shop</button>
            </div>
            <div className="flex gap-2 justify-center items-center transition-all hover:bg-[#2b2d2f] rounded-full p-2">
              <IconContext.Provider value={{ color: "white", size: "25px" }}>
                <BiBell />
              </IconContext.Provider>
              <button className="w-full text-xl text-left">
                Notifications
              </button>
            </div>
          </div>

          {/* Signup and Login Buttons */}
          <div className="h-2/6 w-full space-y-3 mt-2">
            <button
              onClick={() => setIsPostDialogOpen(true)}
              className="w-full bg-blue-500 text-lg hover:bg-blue-400 transition-all rounded-full p-2 font-semibold"
            >
              Post
            </button>
            <button
              onClick={() => setIsDialogOpen(true)}
              className="w-full hover:bg-[#71767b] text-lg bg-[#2b2d2f] transition-all rounded-full p-2 font-semibold"
            >
              Sign Up
            </button>
            <button
              onClick={() => setIsLoginDialogOpen(true)}
              className="w-full hover:bg-[#71767b] text-lg bg-[#2b2d2f] transition-all rounded-full p-2 font-semibold"
            >
              Login
            </button>
          </div>

          {/* User Profile */}
          <div className="flex items-center p-1 w-full border-2 rounded-full border-neutral-900 cursor-pointer hover:bg-neutral-900 transition-all">
            <Link to="/profile" className="flex items-center w-full">
              <img
                src="https://th.bing.com/th/id/OIP.CG70mC-flvJIYFRVmR9FZwHaHa?rs=1&pid=ImgDetMain"
                alt="Profile Avatar"
                className="h-16 rounded-full"
              />
              <div className="flex justify-between items-center w-4/6 ml-2">
                <div>
                  <button className="hover:underline text-white">
                    Username
                  </button>
                  <p className="text-sm font-light">@username</p>
                </div>
                <div className="hover:bg-[#2b2d2f] transition-all rounded-xl hover:cursor-pointer p-2">
                  <HiDotsVertical />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isDialogOpen && (
        <SignupPage
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
        />
      )}
      {isLoginDialogOpen && (
        <LoginPage
          isOpen={isLoginDialogOpen}
          onClose={() => setIsLoginDialogOpen(false)}
        />
      )}

      {/* Post Dialog */}
      {isPostDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="relative w-[450px] bg-black text-white p-6 rounded-xl shadow-xl transform transition-transform duration-500 scale-110 hover:scale-100">
            <h2 className="text-2xl font-extrabold text-center mb-6">
              Create Your Post
            </h2>

            {/* Image Upload */}
            <div className="relative w-full mb-4">
              <label className="block text-sm font-light text-gray-200 mb-2">
                Upload Image
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setPostContent({
                    ...postContent,
                    image: URL.createObjectURL(e.target.files[0]),
                  })
                }
                className="w-full bg-transparent border-2 border-gray-500 text-gray-200 p-2 rounded-lg cursor-pointer hover:bg-gray-600 focus:ring focus:ring-blue-300 transition-all"
              />
              <p className="text-xs text-center text-gray-300 mt-2">
                Click to choose an image
              </p>
            </div>

            {/* Display Image */}
            {postContent.image && (
              <div className="relative mb-6">
                <img
                  src={postContent.image}
                  alt="Uploaded"
                  className="w-full h-40 object-cover rounded-lg shadow-lg mb-4"
                />
              </div>
            )}

            {/* Text Area */}
            <div className="mb-6">
              <label className="block text-sm font-light text-gray-200 mb-2">
                Caption
              </label>
              <textarea
                rows="4"
                placeholder="Write something..."
                value={postContent.text}
                onChange={(e) =>
                  setPostContent({ ...postContent, text: e.target.value })
                }
                className="w-full bg-transparent border-2 border-gray-500 text-gray-200 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all placeholder-gray-300"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-4">
              <button
                type="button"
                onClick={() => setIsPostDialogOpen(false)}
                className="px-6 py-2 bg-red-500 rounded-lg text-white hover:bg-red-600 transition-all shadow-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                onClick={handlePostSubmit}
                className="px-6 py-2 bg-blue-500 rounded-lg text-white hover:bg-blue-600 transition-all shadow-md"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </Lfsb>
  );
}
