import Leftsidebar from "./Leftsidebar.styles.tw";
import Rightsidebar from "./Rightsidebar.styles.tw";
import styled from "styled-components";
import { Outlet } from "react-router-dom";

// The main content takes the remaining space between the sidebars
const MainContent = styled.div.attrs({
  className: "flex-1 h-full overflow-y-auto ml-1/4 mr-1/4", // Makes the content take the rest of the width and ensures scroll
})``;

function Layout() {
  return (
    <div className="flex w-screen h-screen bg-black">
      {/* Left Sidebar (Fixed) */}
      <Leftsidebar />

      {/* Main Content (Between the sidebars) */}
      <MainContent>
        <Outlet />
      </MainContent>

      {/* Right Sidebar (Fixed on right side) */}
      <Rightsidebar />
    </div>
  );
}

export default Layout;
