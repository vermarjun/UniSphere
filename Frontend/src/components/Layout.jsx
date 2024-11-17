import Leftsidebar from "./Leftsidebar.styles.tw";
import Rightsidebar from "./Rightsidebar.styles.tw";
import styled from "styled-components";
import { Outlet } from "react-router-dom";
import EventPage from "./Event/EventPage";

function Layout() {
  return (
    <>
      <div className="flex justify-between items-center w-screen h-screen bg-black">
        <Leftsidebar />
        <Outlet />
        <Rightsidebar />
      </div>
    </>
  );
}

export default Layout;
