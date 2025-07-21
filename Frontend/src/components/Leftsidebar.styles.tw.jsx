import styled from "styled-components";
import { BiBell } from "react-icons/bi";
import { IconContext } from "react-icons";
import { FaShoppingCart } from "react-icons/fa";
import { MdEvent } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { HiDotsVertical } from "react-icons/hi";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { logout } from "./redux/authSlice";
import logo from "/logo.png";
import SignupPage from "./SignupPage";
import LoginPage from "./LoginPage";

const Lfsb = styled.div`
  @media (min-width: 640px) {
    border-right: 2px solid #404040;
    width: 20rem;
    position: fixed;
    height: 100%;
    background-color: black;
    display: block;
  }

  @media (max-width: 639px) {
    display: none;
  }
`;

export default function Leftsidebar() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/v1/users/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      dispatch(logout());
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err.response?.data || err.message);
    }
  };

  return (
    <Lfsb>
      <div className="text-white h-full w-full flex justify-center items-center">
        <div className="h-full w-5/6 flex flex-col justify-between py-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-14 rounded-full" />
            <div>
              <p className="font-bold text-2xl">GGV SOCIAL</p>
              <p className="font-extralight text-xs">What we do - tagline</p>
            </div>
          </div>

          <div className="flex flex-col space-y-4 mt-6">
            <SidebarItem
              icon={<IoHomeOutline />}
              label="Home"
              onClick={() => navigate("/")}
            />
            <SidebarItem
              icon={<MdEvent />}
              label="Events"
              onClick={() => navigate("/events")}
            />
            <SidebarItem
              icon={<FaShoppingCart />}
              label="Shop"
              onClick={() => navigate("/shop")}
            />
            <SidebarItem
              icon={<BiBell />}
              label="Notifications"
              onClick={() => navigate("/notifications")}
            />
          </div>

          <div className="mt-6">
            <button className="w-full bg-blue-500 hover:bg-blue-400 transition-all rounded-full p-2 font-semibold text-lg">
              Post
            </button>
          </div>

          <div className="mt-4 space-y-3">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full bg-[#2b2d2f] hover:bg-[#71767b] transition-all rounded-full p-2 font-semibold text-lg"
              >
                Logout
              </button>
            ) : (
              <>
                <button
                  onClick={() => setIsDialogOpen(true)}
                  className="w-full bg-[#2b2d2f] hover:bg-[#71767b] transition-all rounded-full p-2 font-semibold text-lg"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => setIsLoginDialogOpen(true)}
                  className="w-full bg-[#2b2d2f] hover:bg-[#71767b] transition-all rounded-full p-2 font-semibold text-lg"
                >
                  Login
                </button>
              </>
            )}
          </div>

          {isAuthenticated && (
            <div className="flex items-center p-2 mt-4 w-full border-2 rounded-full border-neutral-900 cursor-pointer hover:bg-neutral-900 transition-all">
              <Link to="/profile" className="flex items-center w-full">
                <img
                  src="https://th.bing.com/th/id/OIP.CG70mC-flvJIYFRVmR9FZwHaHa?rs=1&pid=ImgDetMain"
                  alt="Profile"
                  className="h-14 rounded-full"
                />
                <div className="flex justify-between items-center w-full ml-2">
                  <div>
                    <p className="hover:underline text-white">
                      {user?.name || "Username"}
                    </p>
                    <p className="text-sm font-light">@{user?.username}</p>
                  </div>
                  <div className="hover:bg-[#2b2d2f] transition-all rounded-xl p-2">
                    <HiDotsVertical />
                  </div>
                </div>
              </Link>
            </div>
          )}
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
    </Lfsb>
  );
}

function SidebarItem({ icon, label, onClick }) {
  return (
    <div
      onClick={onClick}
      className="flex gap-2 items-center hover:bg-[#2b2d2f] transition-all rounded-full p-2 cursor-pointer"
    >
      <IconContext.Provider value={{ color: "white", size: "25px" }}>
        {icon}
      </IconContext.Provider>
      <span className="text-white text-xl">{label}</span>
    </div>
  );
}
