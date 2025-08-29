import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { NavLink, Link } from "react-router-dom";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useState } from "react";
import { MdClose } from "react-icons/md";
import MyBadge from "../../badge/Badge";
const pages = [
  { name: "Home", path: "/" },
  { name: "Movies", path: "/allMovies" },
  { name: "TV Series", path: "/allSeries" },
  { name: `favorite`, path: "/favorite" },
];

const topRated = [
  { name: "Top Movies", path: "/topRatedMovies" },
  { name: "Top Series", path: "/topRatedSeries" },
];

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDrawer = (open) => () => setDrawerOpen(open);
  const toggleDropdown = () => setDropdownOpen((prev) => !prev);

  return (
    <Box
      position="static"
      sx={{
        flexGrow: 1,
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 100,
      }}
    >
      <AppBar sx={{ backgroundColor: "var(--color-nav)" }}>
        <Toolbar>
          {/* Logo */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: { xs: "1.8rem", md: "1.9rem", lg: "2rem" },
              fontWeight: 600,
              color: "var(--color-main)",
              textTransform: "capitalize",
            }}
          >
            <Link to="/">netflix</Link>
          </Typography>

          {/* Desktop Pages */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              columnGap: "2rem",
              mr: 2,
            }}
          >
            {pages.map((page, idx) => (
              <NavLink
                key={idx}
                to={page.path}
                style={({ isActive }) => ({
                  color: isActive ? "red" : "white",
                  textDecoration: "none",
                  fontWeight: 500,
                  fontSize: "1.1rem",
                })}
                className="capitaliz"
              >
                {page.name === "favorite" ? (
                  <div className="flex items-center gap-1  hover:text-main transition-all duration-300">
                    {page.name}
                    <p className="text-[1.3rem] relative ">
                      <MyBadge />
                    </p>
                  </div>
                ) : (
                  <p className="hover:text-main transition-all duration-300">
                    {page.name}
                  </p>
                )}
              </NavLink>
            ))}

            {/* Top Rated Dropdown */}
            <Box sx={{ position: "relative" }}>
              <Typography
                onClick={toggleDropdown}
                sx={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  color: "white",
                  fontWeight: 500,
                }}
              >
                <span className="hover:text-main transition-all duration-300">
                  Top Rated <ArrowDropDownIcon />
                </span>
              </Typography>
              {dropdownOpen && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    backgroundColor: "var(--color-nav)",
                    borderRadius: "5px",
                    mt: 1,
                    boxShadow: 3,
                    zIndex: 200,
                  }}
                >
                  {topRated.map((item, idx) => (
                    <NavLink
                      key={idx}
                      to={item.path}
                      style={{ color: "white", textDecoration: "none" }}
                      onClick={toggleDropdown}
                    >
                      <Typography
                        sx={{
                          px: 3,
                          py: 1,
                          "&:hover": { color: "var(--color-main)" },
                          transition: "all .3s",
                          textTransform: "capitalize",
                        }}
                      >
                        {item.name}
                      </Typography>
                    </NavLink>
                  ))}
                </Box>
              )}
            </Box>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { backgroundColor: "var(--color-nav)", color: "#fff" },
        }}
      >
        <Box sx={{ position: "relative", height: 50 }}>
          <IconButton
            onClick={toggleDrawer(false)}
            sx={{ position: "absolute", top: 10, left: 10, color: "white" }}
          >
           <MdClose /> 
          </IconButton>
        </Box>

        <Box sx={{ width: 300 }} role="presentation">
          <List>
            {pages.map((page, idx) => (
              <NavLink key={idx} to={page.path} className={"capitalize"}>
                <ListItem disablePadding>
                  <ListItemButton onClick={toggleDrawer(false)}>
                    <ListItemText
                      primary={
                        page.name === "favorite" ? (
                          <div className="flex items-center gap-1">
                            {page.name}
                            <p className="text-[1.3rem]">
                              <MyBadge />
                            </p>
                          </div>
                        ) : (
                          page.name
                        )
                      }
                    />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
            {/* Top Rated Items */}
            {topRated.map((item, idx) => (
              <NavLink key={idx} to={item.path}>
                <ListItem disablePadding>
                  <ListItemButton onClick={toggleDrawer(false)}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                </ListItem>
              </NavLink>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}
