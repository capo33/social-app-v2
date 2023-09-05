import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
// Material UI
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Badge from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ListItemIcon from "@mui/material/ListItemIcon";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Icons
import LoginIcon from "@mui/icons-material/Login";
import MoreIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircle from "@mui/icons-material/AccountCircle";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import NotificationsIcon from "@mui/icons-material/Notifications";

import { logout } from "../../redux/fetures/Auth/authSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";

const darkTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#fefefe",
    },
  },
});

export default function Header() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);

  const { user } = useAppSelector((state) => state.auth);

  const open = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to='/profile'>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            Profile
          </MenuItem>
        </Link>
        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      onClick={handleMobileMenuClose}
      slotProps={{
        paper: {
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        },
      }}
      transformOrigin={{ horizontal: "right", vertical: "top" }}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      {user ? (
        <Box component={"div"}>
          <Link to='/profile'>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              Profile
            </MenuItem>
          </Link>

          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Badge badgeContent={17} color='error'>
                <NotificationsIcon />
              </Badge>
            </ListItemIcon>
            Notifications
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Box>
      ) : (
        <Box component={"div"}>
          <Link to={"/login"} onClick={handleClose}>
            <MenuItem>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              Login
            </MenuItem>
          </Link>
          <Link to={"/register"} onClick={handleClose}>
            <MenuItem>
              <ListItemIcon>
                <PersonAddAltIcon />
              </ListItemIcon>
              Register
            </MenuItem>
          </Link>
        </Box>
      )}
    </Menu>
  );

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Container maxWidth='xl'>
            <Toolbar>
              <Typography variant='h6' noWrap component='div'>
                Social Network
              </Typography>

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {user ? (
                  <>
                    <IconButton
                      size='large'
                      aria-label='show 17 new notifications'
                      color='inherit'
                    >
                      <Badge badgeContent={17} color='error'>
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                    <IconButton
                      size='large'
                      edge='end'
                      aria-label='account of current auth'
                      aria-controls={menuId}
                      aria-haspopup='true'
                      onClick={handleProfileMenuOpen}
                      color='inherit'
                    >
                      <AccountCircle sx={{ fontSize: 30 }} />
                    </IconButton>
                  </>
                ) : (
                  <>
                    <Link to={"/login"}>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <LoginIcon />
                        </ListItemIcon>
                        Login
                      </MenuItem>
                    </Link>
                    <Link to={"/register"}>
                      <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                          <PersonAddAltIcon />
                        </ListItemIcon>
                        Register
                      </MenuItem>
                    </Link>
                  </>
                )}
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size='large'
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </ThemeProvider>
  );
}
