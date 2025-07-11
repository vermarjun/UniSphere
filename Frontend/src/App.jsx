import { Route, Routes } from "react-router-dom";
import styled from "styled-components";

import Home from "./components/Home";
import EventPage from "./components/EventPage";
import Marketplace from "./components/Marketplace";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Leftsidebar from "./components/Leftsidebar.styles.tw";
import Rightsidebar from "./components/Rightsidebar.styles.tw";

export const API_URL = "/api";

// Time Ago Utility
export function timeAgo(dateString) {
  const givenDate = new Date(dateString);
  const now = new Date();

  const diffInMs = now - givenDate;
  const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  if (diffInDays < 7) return `${diffInDays} days ago`;

  return givenDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

// Main layout container
const MainLayout = styled.div.attrs({
  className: "sm:flex sm:w-screen sm:h-screen w-full h-full bg-black",
})``;

const MainContent = styled.div.attrs({
  className:
    "sm:h-full h-full overflow-y-auto w-full sm:ml-[20rem] sm:mr-[28rem]",
})``;

function App() {
  return (
    <MainLayout>
      {/* Top Navbar (Mobile Only) */}
      <div className="sm:hidden sticky top-0 h-16 w-full z-50 bg-[#00000f8] backdrop-blur-lg">
        <Navbar />
      </div>

      {/* Left Sidebar */}
      <Leftsidebar />

      {/* Main Page Content */}
      <MainContent>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/shop" element={<Marketplace />} />
          <Route path="/profile" element={<Profile />} />
          {/* Example future routes */}
          {/* <Route path="/leaderboard" element={<Leaderboard />} /> */}
          {/* <Route path="/confessions" element={<ConfessionPage />} /> */}
        </Routes>
      </MainContent>

      {/* Right Sidebar */}
      <Rightsidebar />

      {/* Bottom Footer (Mobile Only) */}
      <div className="sm:hidden sticky bottom-0 h-12 w-full z-50 bg-black border-t border-neutral-600">
        <Footer />
      </div>
    </MainLayout>
  );
}

export default App;
