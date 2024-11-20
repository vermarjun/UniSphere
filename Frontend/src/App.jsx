import Home from "./components/Home";
import EventPage from "./components/Event/EventPage";
import Marketplace from "./components/Marketplace";
import Leftsidebar from "./components/Leftsidebar.styles.tw";
import Rightsidebar from "./components/Rightsidebar.styles.tw";
import Profile from "./components/Profile"; 
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";

// The main content takes the remaining space between the sidebars
const MainContent = styled.div.attrs({
  className:
    "sm:h-full h-4/5 overflow-y-auto w-full sm:ml-80 sm:mr-96", // Makes the content take the rest of the width and ensures scroll
})``;

function App() {
  return (
    <div className="sm:flex sm:justify-between sm:items-center sm:w-screen sm:h-screen w-full h-full bg-black">
      {/* Navbar for mobile devices */}
      <div className="sm:hidden sticky top-0 h-20 w-full z-50 bg-[#00000f8] backdrop-blur-lg rounded-lg">
        <Navbar />
      </div>

      {/* Left Sidebar (Fixed) */}
      <Leftsidebar />

      {/* Main Content (Between the sidebars) */}
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/shop" element={<Marketplace />} />
          <Route path="/profile" element={<Profile />} /> {/* Added Profile Route */}
        </Routes>
      </MainContent>

      {/* Right Sidebar (Fixed on right side) */}
      <Rightsidebar />

      {/* Footer for mobile devices */}
      <div className="sm:hidden sticky bottom-0 h-12 w-full z-50 bg-black border-t border-neutral-600">
        <Footer />
      </div>
    </div>
  );
}

export default App;
