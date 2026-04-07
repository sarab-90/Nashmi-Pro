import { useState } from "react";
import { Box, Toolbar, useMediaQuery, useTheme, CssBaseline, AppBar, Typography, Avatar, Stack, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import UserNavbar from "../../src/components/Users/UserNavbar.jsx"; 
import UserSidebar from "../components/Users/UserSidebar.jsx";

const DashboardLayout = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [open, setOpen] = useState(!isMobile);
  const drawerWidth = 280;

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f4f7fe", direction: "rtl" }}>
      <CssBaseline />
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
          mr: open && !isMobile ? `${drawerWidth}px` : 0,
        }}
      >
        <UserNavbar toggleDrawer={toggleDrawer} isSidebarOpen={open} />
        
        <AppBar position="static" elevation={0} sx={{ bgcolor: "white", borderBottom: "1px solid #eee", py: 1 }}>
          <Container maxWidth="xl">
            <Toolbar sx={{ justifyContent: "space-between" }}>
              <Typography variant="h6" sx={{ color: "primary.main", fontFamily: "Cairo", fontWeight: 700 }}>
                أهلاً بك في نشمي
              </Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ textAlign: "left", display: { xs: "none", sm: "block" } }}>
                  <Typography variant="body2" sx={{ fontWeight: 800, color: "#333" }}>Sarab Akash</Typography>
                  <Typography variant="caption" color="text.secondary">مشترك ذهبي</Typography>
                </Box>
                <Avatar sx={{ bgcolor: "secondary.main" }}>S</Avatar>
              </Stack>
            </Toolbar>
          </Container>
        </AppBar>

        <Box sx={{ p: { xs: 2, md: 4 }, flexGrow: 1 }}>
          <Outlet /> 
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;