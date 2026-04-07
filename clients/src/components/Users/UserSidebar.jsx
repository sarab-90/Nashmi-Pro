import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, Divider } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import LogoutIcon from '@mui/icons-material/Logout';

const UserSidebar = ({ open, setOpen, drawerWidth, isMobile }) => {
  const location = useLocation();

  const menuItems = [
    { text: 'لوحة التحكم', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'دوراتي التعليمية', icon: <PlayCircleFilledIcon />, path: '/camps' },
    { text: 'الملف الشخصي', icon: <AccountCircleIcon />, path: '/profile' },
    { text: 'الفواتير والاشتراكات', icon: <ReceiptLongIcon />, path: '/dashboard/billing' },
  ];
  

  return (
    <Box sx={{ width: drawerWidth, 
        position: 'fixed',
        right: 0, 
        top: 0,
        height: '100vh',
        display: open ? 'flex' : 'none',
        flexDirection: 'column',
        bgcolor: '#fff',
        borderLeft: '1px solid #eee',
        zIndex: 1200}}>
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: 'Cairo', color: 'primary.main' }}>
          نشمي 
        </Typography>
      </Box>
      <Divider sx={{ mx: 2, opacity: 0.5 }} />

      <List sx={{ flexGrow: 1, px: 2, mt: 2 }}>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
              sx={{
                borderRadius: '12px',
                py: 1.5,
                '&.Mui-selected': {
                  bgcolor: 'secondary.light',
                  color: 'secondary.main',
                  '& disableTouchRipple': true,
                  '& .MuiListItemIcon-root': { color: 'secondary.main' }
                },
                '&:hover': { bgcolor: '#f5f5f5' }
              }}
            >
              <ListItemIcon sx={{ minWidth: 45 }}>{item.icon}</ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontFamily: 'Cairo', fontWeight: 600, fontSize: '0.95rem' }} 
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Box sx={{ p: 2 }}>
        <ListItemButton sx={{ borderRadius: '12px', color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}><LogoutIcon /></ListItemIcon>
          <ListItemText primary="تسجيل الخروج" primaryTypographyProps={{ fontFamily: 'Cairo', fontWeight: 600 }} />
        </ListItemButton>
      </Box>
    </Box>
  );
};
export default UserSidebar;
