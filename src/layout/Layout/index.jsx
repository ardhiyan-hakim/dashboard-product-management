import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "@mui/material";
import Header from "../Header";
import Sidebar from "../Sidebar";
import { useState } from "react";

const Layout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Header onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <Sidebar open={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
