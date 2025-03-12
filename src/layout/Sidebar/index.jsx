import { Drawer, List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={styles.sidebar}>
        <List>
          <ListItem button component={Link} to="/dashboard" onClick={onClose}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button component={Link} to="/dashboard/products" onClick={onClose}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
