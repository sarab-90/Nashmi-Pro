import { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../../components/Admin/AdminNavbar.jsx";
import AdminSidebar from "../../components/Admin/AdminSidebar.jsx";
import Footer from "../../components/Shared/Footer.jsx";

const AdminLayout = () => {
  const [open, setOpen] = useState(true); 
  const drawerWidth = 280;
  const navHeight = 85;

  const toggleDrawer = () => setOpen(!open);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f0f2f5", direction: "rtl",
      
     }}>
      <CssBaseline />
      
      <AdminNavbar toggleDrawer={toggleDrawer} />

      <Box
        component="nav"
        sx={{
          width: open ? drawerWidth : 0,
          flexShrink: 0,
          transition: "width 0.3s",
          "& > div": { 
            pt: `${navHeight}px !important`, 
            height: '100vh',
            boxSizing: 'border-box'
          }
        }}
      >
        <AdminSidebar open={open} drawerWidth={drawerWidth} />
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          mt: `${navHeight}px`,
          p: 3,
          transition: "margin 0.3s",
          mr: open ? `${drawerWidth}px` : 0, 
          width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
        }}
      >
        {/* <Toolbar sx={{ mb: 2 }} /> */}
         <Outlet /> 
        
        <Footer />
      </Box>
    </Box>
  );
};

export default AdminLayout;