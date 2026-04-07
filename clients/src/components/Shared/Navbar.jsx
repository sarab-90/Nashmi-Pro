import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar
      position="sticky"
      sx={{ 
        bgcolor: "primary.main", 
        elevation: 0, 
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        py: 0.5, 
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" ,py: 2, }}>
          
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "secondary.main",
              fontWeight: "bold",
              fontSize: "1.6rem",
              fontFamily: "Cairo",
              transition: "transform 0.3s ease",
              "&:hover": { transform: "scale(1.02)" }
            }}
          >
            نشمي <span style={{ color: "#fff" }}>مهني</span>
          </Typography>
          <Stack 
            direction="row" 
            spacing={1} 
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            {["الرئيسية", "المسارات", "عن المنصة"].map((item) => (
              <Button
                key={item}
                sx={{
                  color: "#fff",
                  fontFamily: "Cairo",
                  fontSize: "1rem",
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    width: "0%",
                    height: "2px",
                    bottom: 5,
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "secondary.main",
                    transition: "width 0.3s ease-in-out",
                  },
                  "&:hover::after": {
                    width: "60%",
                  },
                  "&:hover": { bgcolor: "transparent" }
                }}
              >
                {item}
              </Button>
            ))}
          </Stack>

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button 
              component={Link} 
              to="/login" 
              sx={{ 
                color: "#fff", 
                fontFamily: "Cairo",
                fontWeight: 600,
                transition: "color 0.3s",
                "&:hover": { color: "secondary.main" }
              }}
            >
              دخول
            </Button>
            
            <Button
              component={Link}
              to="/register"
              variant="contained"
              color="secondary"
              sx={{ 
                borderRadius: "12px", 
                px: 4, 
                py: 1,
                fontFamily: "Cairo",
                fontWeight: "bold",
                fontSize: "0.95rem",
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: "secondary.dark",
                  transform: "translateY(-3px)", 
                  boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                },
                "&:active": {
                  transform: "translateY(0)",
                }
              }}
            >
              ابدأ الآن
            </Button>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;