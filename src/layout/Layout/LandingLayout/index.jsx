import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Box, Button, Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import styles from "./LandingLayout.module.scss";

const LandingLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", flexDirection: "column" }}>
      <Drawer anchor="left" open={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
        <Box className={styles.sidebar}>
          <List>
            <ListItem button onClick={() => navigate("/")}>
              <ListItemIcon><HomeIcon /></ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button onClick={() => navigate("/login")}>
              <ListItemIcon><LoginIcon /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      <IconButton
        sx={{
          position: "absolute",
          top: "1rem",
          left: "1rem",
          backgroundColor: "primary.main",
          color: "white",
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          "&:hover": { backgroundColor: "primary.dark" },
        }}
        onClick={() => setSidebarOpen(true)}
      >
        <MenuIcon />
      </IconButton>

      <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default LandingLayout;
