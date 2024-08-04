/** @format */

import { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Box,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Menu as MenuIcon } from "@mui/icons-material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import { ColorModeContext, tokens } from "../../theme";
import MainMenu from "./MainMenu";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleMenuClick = () => {
    setMenuOpen(true);
  };

  const handleMenuClose = () => {
    setMenuOpen(false);
  };

  const handleUserMenuClick = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ backgroundColor: colors.primary["500"], boxShadow: "none" }}
      >
        <Toolbar>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            alignItems="center"
          >
            <IconButton
              edge="start"
              color={theme.palette.mode === "dark" ? "#fff" : "primary"}
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h4"
              component={RouterLink}
              to={"/"}
              sx={{
                flexGrow: 1,
                textAlign: "center",
                letterSpacing: "0.4em",
                textDecoration: "none",
              }}
              color={theme.palette.mode === "dark" ? "#fff" : "primary"}
            >
              AFIFA TRADERS
            </Typography>
            <Box>
              <IconButton onClick={colorMode.toggleColorMode}>
                {theme.palette.mode === "dark" ? (
                  <DarkModeOutlinedIcon />
                ) : (
                  <LightModeOutlinedIcon />
                )}
              </IconButton>
              <IconButton
                color={theme.palette.mode === "dark" ? "#fff" : "primary"}
                onClick={handleUserMenuClick}
              >
                <PersonOutlineOutlinedIcon />
              </IconButton>
              <Menu
                anchorEl={userMenuAnchorEl}
                open={Boolean(userMenuAnchorEl)}
                onClose={handleUserMenuClose}
                sx={{ top: "5px" }}
              >
                <MenuItem component={RouterLink} to="/profile">
                  <IconButton sx={{ fontSize: "15px" }} disableRipple={true}>
                    <LogoutOutlinedIcon /> Profile
                  </IconButton>
                </MenuItem>
                <MenuItem component={RouterLink} to="/logout">
                  <IconButton sx={{ fontSize: "15px" }} disableRipple={true}>
                    <LogoutOutlinedIcon /> Logout
                  </IconButton>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <MainMenu open={menuOpen} onClose={handleMenuClose} />
    </>
  );
};

export default Header;
