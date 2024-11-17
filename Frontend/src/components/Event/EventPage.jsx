import React from "react";
import Header from "./Header";
import EventDetails from "./EventDetails";
import Sidebar from "./Sidebar";

const EventPage = () => {
  return (
    <div style={styles.layout}>
      <Header />
      <main style={styles.main}>
        <div style={styles.content}>
          <EventDetails />
        </div>
        <div style={styles.sidebar}>
          <Sidebar />
        </div>
      </main>
    </div>
  );
};

const styles = {
  layout: {
    fontFamily: "'Roboto', sans-serif",
    background: "linear-gradient(180deg, #000000, #1C1C1C)",
    color: "#FFFFFF",
    height: "100vh",
    padding: "20px",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: "20px",
    marginTop: "20px",
  },
  content: {
    flex: 2,
  },
  sidebar: {
    flex: 1,
  },
};

export default EventPage;
