import * as React from "react";
// Material UI
import {
  Box,
  List,
  Drawer,
  Toolbar,
  ListItem,
  IconButton,
  Typography,
  ListItemIcon,
  ListItemText,
  Avatar,
} from "@mui/material";

// Material UI Icons
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/fetures/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import { userProfile } from "../../redux/fetures/User/userSlice";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Sidebar(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const { user } = useAppSelector((state) => state.auth);
  const { user: userAfterUpdate } = useAppSelector((state) => state.user);

  const { window } = props;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      dispatch(userProfile(user.token));
    }
  }, [user, dispatch]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  // List of links
  const NavLinks = [
    {
      label: "Home",
      icon: <HomeIcon sx={{ fontSize: 30 }} />,
      path: "/",
    },
    {
      label: "Notifications",
      icon: <NotificationsIcon sx={{ fontSize: 30 }} />,
      path: "/notifications",
    },
    {
      label: "Saved",
      icon: <BookmarkIcon sx={{ fontSize: 30 }} />,
      path: "/saved",
    },
    {
      label: "Create Post",
      icon: <AddCircleIcon sx={{ fontSize: 30 }} />,
      path: "/create-post",
    },
    {
      label: "Profile",
      icon: (
        <Avatar sx={{ width: 30, height: 30 }} src={userAfterUpdate?.image} />
      ),
      path: "/profile",
    },
    {
      label: "Logout",
      icon: <LogoutIcon sx={{ fontSize: 30 }} />,
      path: "/login",
      onClick: handleLogout,
    },
  ];

  const drawer = (
    <Box component='div'>
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ fontFamily: "monospace" }}
        >
          Social Network
        </Typography>
      </Toolbar>

      {user &&
        NavLinks.map((link) => (
          <List
            sx={{
              ":hover": {
                backgroundColor: "#f5f5f5",
                transition: "background-color 300ms cubic-bezier(0.4,0,0.2,1)",
                borderRadius: "10px",
                cursor: "pointer",
                display: "block",
              },
            }}
            key={link.label}
            onClick={link.onClick}
          >
            <Link to={link.path}>
              <ListItem>
                <ListItemIcon>{link.icon}</ListItemIcon>
                <ListItemText
                  primary={link.label}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                />
              </ListItem>
            </Link>
          </List>
        ))}
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <Toolbar>
        <IconButton
          color='inherit'
          aria-label='open drawer'
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Box
        component='nav'
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 },
        }}
        aria-label='mailbox folders'
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
