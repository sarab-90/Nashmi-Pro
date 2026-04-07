import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { UserContext } from '../Context/UserContext';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import CampaignIcon from '@mui/icons-material/Campaign';

const menuItems = [
  {
    text: 'الرئيسية',
    path: '/user/home',
    icon: <HomeIcon />,
    roles: ['user', 'admin']
  },
  {
    text: 'لوحة التحكم',
    path: '/admin/dashboard',
    icon: <DashboardIcon />,
    roles: ['admin']
  },
  {
    text: 'إدارة المستخدمين',
    path: '/admin/users',
    icon: <PeopleIcon />,
    roles: ['admin']
  },
  {
    text: 'المخيمات المهنية',
    path: '/camps',
    icon: <CampaignIcon />,
    roles: ['user', 'admin']
  }
];

const Sidebar = ({ drawerWidth = 240 }) => {
  const { user } = useContext(UserContext); 
  const navigate = useNavigate();
  const location = useLocation();

  const filteredMenu = menuItems.filter(item => item.roles.includes(user?.role));

  return (
    <Drawer
      variant="permanent"
      anchor="right"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          borderLeft: '1px solid #eee',
          borderRight: 'none'
        },
      }}
    >
      <Toolbar sx={{ justifyContent: 'center', py: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main', fontFamily: 'Cairo' }}>
          نشمي22 مهني
        </Typography>
      </Toolbar>
      
      <Box sx={{ overflow: 'auto' }}>
        <List sx={{ px: 1 }}>
          {filteredMenu.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ display: 'block', mb: 1 }}>
              <ListItemButton
                onClick={() => navigate(item.path)}
                selected={location.pathname === item.path}
                sx={{
                  borderRadius: 2,
                  justifyContent: 'right',
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    color: 'primary.main',
                    '& .MuiListItemIcon-root': { color: 'primary.main' },
                    '&:hover': { bgcolor: 'primary.light' }
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: 'inherit' }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  sx={{ textAlign: 'right' }}
                  primaryTypographyProps={{ fontFamily: 'Cairo', fontWeight: 600 }} 
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;