import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  Avatar,
  IconButton,
  Stack,
  Badge,
  Button,
  Chip,
  Tooltip
} from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import LanguageIcon from "@mui/icons-material/Language"; 

const AdminNavbar = ({ toggleDrawer }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{ 
        width: "100%", 
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "#1e293b",
        elevation: 4,
        
        minHeight: '85px',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              color="inherit"
              onClick={toggleDrawer}
              sx={{ bgcolor: "rgba(255,255,255,0.05)", "&:hover": { bgcolor: "rgba(255,255,255,0.15)" } }}
            >
              <MenuIcon />
            </IconButton>

            <Stack spacing={0.5}>
              <Typography
                variant="h6"
                sx={{
                  color: "secondary.main",
                  fontWeight: "bold",
                  fontFamily: "Cairo",
                  lineHeight: 1
                }}
              >
                نشمي <span style={{ color: "#fff" }}>الأدمن</span>
              </Typography>
              <Chip 
                label="وضع الإدارة" 
                size="small" 
                color="error" 
                sx={{ fontSize: '10px', height: '18px', fontWeight: 'bold' }} 
              />
            </Stack>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            
            <Stack direction="row" spacing={1} sx={{ display: { xs: "none", md: "flex" }, mr: 2 }}>
              <Tooltip title="عرض الموقع العام">
                <IconButton color="inherit" onClick={() => navigate("/")}>
                  <LanguageIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="تنبيهات النظام">
                <IconButton color="inherit">
                  <Badge badgeContent={4} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>

              <Tooltip title="إعدادات النظام">
                <IconButton color="inherit">
                  <SettingsIcon />
                </IconButton>
              </Tooltip>
            </Stack>

            <Stack direction="row" spacing={2} alignItems="center" sx={{ borderRight: "1px solid rgba(255,255,255,0.1)", pr: 2 }}>
              <Box sx={{ textAlign: 'left', display: { xs: "none", sm: "block" } }}>
                <Typography variant="subtitle2" sx={{ color: "#fff", fontWeight: "bold", fontFamily: "Cairo" }}>
                  {user?.name || "المدير العام"}
                </Typography>
                <Typography variant="caption" sx={{ color: "grey.400", display: 'block' }}>
                  Super Admin
                </Typography>
              </Box>
              
              <Avatar
                sx={{ 
                  bgcolor: "error.main", 
                  width: 45, 
                  height: 45,
                  boxShadow: "0 0 10px rgba(255,0,0,0.2)"
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || "A"}
              </Avatar>
            </Stack>

            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={logout}
              sx={{ 
                fontFamily: "Cairo", 
                fontWeight: "bold",
                borderRadius: "8px",
                display: { xs: "none", sm: "flex" }
              }}
            >
              خروج 
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AdminNavbar;