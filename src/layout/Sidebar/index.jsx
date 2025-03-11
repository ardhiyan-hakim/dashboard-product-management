import { Drawer, List, ListItem, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import styles from "./Sidebar.module.scss";

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div className={styles.sidebar}>
        <List sx={{ width: 250 }}>
          <ListItem component={Link} to="/dashboard" onClick={onClose}>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem component={Link} to="/dashboard/products" onClick={onClose}>
            <ListItemText primary="Products" />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default Sidebar;
