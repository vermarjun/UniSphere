import Leftsidebar from "./Leftsidebar.styles.tw";
import Rightsidebar from "./Rightsidebar.styles.tw";
import Footer from "./Footer";
import Navbar from "./Navbar";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Home from "./Home";

// The main content takes the remaining space between the sidebars
const MainContent = styled.div.attrs({
  className:"sm:h-full h-4/5 overflow-y-auto w-full sm:ml-80 sm:mr-96", // Makes the content take the rest of the width and ensures scroll
})``;

function Layout() {
  return (
    <>
      <div className="sm:flex sm:justify-between sm:items-center sm:w-screen sm:h-screen w-full h-full bg-black">
        <div className="sm:hidden sticky top-0 h-20 w-full z-50 bg-[#00000f8] backdrop-blur-lg rounded-lg">
          <Navbar/>
        </div>
        {/* Left Sidebar (Fixed) */}
        <Leftsidebar/>


        {/* Main Content (Between the sidebars) */}
        <MainContent>
          <Home/>
        </MainContent>

        {/* Right Sidebar (Fixed on right side) */}
        <Rightsidebar/>
        <div className="sm:hidden sticky bottom-0 h-12 w-full z-50 bg-black border-t border-neutral-600">
          <Footer/>
        </div>
      </div>
    </>
  );
}

export default Layout;
