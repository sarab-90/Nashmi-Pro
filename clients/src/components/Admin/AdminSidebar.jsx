import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AssessmentIcon from '@mui/icons-material/Assessment';

const AdminSidebar = ({ open, drawerWidth }) => {
  const adminMenu = [
    
    { text: 'إدارة المعسكرات', icon: <MenuBookIcon />, path: '/admin/camps' },
    { text: 'إحصائيات النظام', icon: <AssessmentIcon />, path: '/admin' },
    { text: 'إدارة المستخدمين', icon: <PeopleIcon />, path: '/admin/users' },

  ];

  return (
    <Box sx={{ 
      width: drawerWidth,
      boxSizing: 'border-box',
      overflowY: 'auto',
      top: '85px',
      display: open ? 'block' : 'none', 
      position: 'fixed', 
      right: 0, 
      height: 'calc(120vh - 85px)',
      bgcolor: '#1e293b', 
      color: '#fff' ,
      zIndex: (theme) => theme.zIndex.appBar - 1,
    }}>
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'secondary.main' }}>
          لوحة الإدارة
        </Typography>
      </Box>
      <List>
        {adminMenu.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path} sx={{ color: '#fff' }}>
              <ListItemIcon sx={{ color: '#fff' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default AdminSidebar;