import { useState } from "react";
import { Box, Toolbar, useMediaQuery, useTheme } from "@mui/material";
import Navbar from "../../src/components/Shared/Navbar.jsx";
import Footer from "../../src/components/Shared/Footer.jsx";
import { Outlet } from "react-router-dom";
import UserSidebar from "../components/Users/UserSidebar.jsx";

const MainLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const drawerWidth = 260;
  const toggleDrawer = () => {
    setOpen(!open);
  };
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", direction: "rtl" }}>
      <Navbar
        toggleDrawer={toggleDrawer}
        drawerWidth={drawerWidth}
        isSidebarOpen={open}
      />
      <UserSidebar
        open={open}
        setOpen={setOpen}
        drawerWidth={drawerWidth}
        isMobile={isMobile}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          transition: theme.transitions.create(["margin", "width"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          mr: open && !isMobile ? { md: `${drawerWidth}px` } : 0,
        }}
      >
        <Toolbar />
        <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
          <Outlet />
        </Box>

        <Footer />
      </Box>
    </Box>
  );
};
export default MainLayout;