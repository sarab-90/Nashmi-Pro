import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Avatar,
  IconButton,
  Stack,
} from "@mui/material";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import MenuIcon from "@mui/icons-material/Menu";

const UserNavbar = ({ toggleDrawer }) => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{ 
        width: "100%", 
        zIndex: (theme) => theme.zIndex.drawer + 1, 
        bgcolor: "primary.main", 
        elevation: 3,
        minHeight: { xs: '70px', md: '85px' },
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", px: { xs: 0, md: 2 } }}>
          
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              edge="start"
              sx={{ 
                mr: 1, 
                color: "#fff",
                "&:hover": { bgcolor: "rgba(255,255,255,0.1)" } 
              }}
            >
              <MenuIcon fontSize="large" />
            </IconButton>

            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                textDecoration: "none",
                color: "secondary.main",
                fontWeight: "bold",
                fontFamily: "Cairo",
                fontSize: { xs: "1.2rem", md: "1.6rem" },
                transition: "0.3s",
                "&:hover": { opacity: 0.9 }
              }}
            >
              نشمي <span style={{ color: "#fff" }}>مهني</span>
            </Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: { xs: 1, md: 3 } }}>
            {user && (
              <>
                <Stack 
                  direction="row" 
                  spacing={1.5} 
                  alignItems="center" 
                  sx={{ display: { xs: "none", sm: "flex" } }}
                >
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography 
                      variant="body1" 
                      sx={{ color: "#fff", fontWeight: "bold", fontFamily: "Cairo", lineHeight: 1 }}
                    >
                      {user.name}
                    </Typography>
                    <Typography 
                      variant="caption" 
                      sx={{ color: "secondary.main", fontWeight: 600 }}
                    >
                      {user.role === 'admin' ? 'مدير النظام' : 'متدرب نشط'}
                    </Typography>
                  </Box>
                  
                  <Avatar
                    sx={{ 
                      bgcolor: "secondary.main", 
                      cursor: "pointer",
                      width: 45,
                      height: 45,
                      border: "2px solid rgba(255,255,255,0.2)",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
                      fontSize: "1.2rem",
                      fontWeight: "bold"
                    }}
                    onClick={() => navigate("/dashboard/profile")}
                  >
                    {user.name.charAt(0).toUpperCase()}
                  </Avatar>
                </Stack>

                <Button
                  variant="outlined"
                  onClick={logout}
                  sx={{ 
                    borderColor: "rgba(255,255,255,0.4)", 
                    color: "#fff",
                    fontFamily: "Cairo",
                    borderRadius: "10px",
                    px: 3,
                    "&:hover": {
                      borderColor: "#fff",
                      bgcolor: "rgba(255,255,255,0.1)"
                    }
                  }}
                >
                  خروج
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default UserNavbar;