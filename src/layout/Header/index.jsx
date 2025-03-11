import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./Header.module.scss"

const Header = ({ onToggleSidebar }) => {
  return (
    <AppBar position="sticky" className={styles.header}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Product Management Dashboard
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
