import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Header from "../Header";
import { Box } from "@mui/material";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;