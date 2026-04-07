import { 
  Box, 
  Grid, 
  Paper, 
  Typography, 
  Stack, 
  Avatar,
  Container
} from "@mui/material";
import React from "react";

import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import BarChartIcon from '@mui/icons-material/BarChart';
import StarIcon from '@mui/icons-material/Star';

const AdminHome = () => {
  const StatCard = ({ title, value, icon, color }) => (
    <Paper 
      elevation={0}
      sx={{ 
        p: 3, 
        borderRadius: "20px", 
        bgcolor: "#fff", 
        border: "1px solid #eef2f6",
        transition: "transform 0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: "0 10px 20px rgba(0,0,0,0.05)" }
      }}
    >
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar sx={{ bgcolor: `${color}.light`, color: `${color}.main`, width: 60, height: 60 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Cairo', fontWeight: 600 }}>
            {title}
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b' }}>
            {value}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  );

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: 'Cairo', color: '#1e293b' }}>
          مرحباً بك في لوحة الإدارة
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Cairo' }}>
          إليك ملخص سريع لأداء المنصة اليوم.
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {/* البطاقات الإحصائية */}
        <Grid item xs={12} sm={6} md={3} alignItems="center">
          <StatCard title="إجمالي المتدربين" value="850" icon={<PeopleAltIcon />} color="primary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} alignItems="center">
          <StatCard title="المسارات النشطة" value="12" icon={<MenuBookIcon />} color="secondary" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} alignItems="center">
          <StatCard title="نسبة الإكمال" value="75%" icon={<BarChartIcon />} color="success" />
        </Grid>
        <Grid item xs={12} sm={6} md={3} alignItems="center">
          <StatCard title="تقييم المنصة" value="4.9" icon={<StarIcon />} color="warning" />
        </Grid>

        {/* مساحة للرسوم البيانية أو المحتوى الإضافي مستقبلاً */}
        <Grid item xs={12}>
          <Paper sx={{ p: 4, mt: 2, borderRadius: "20px", height: "300px", display: 'flex', alignItems: 'center', justifyContent: 'center', border: "2px dashed #e0e0e0", bgcolor: "#fafafa" }}>
            <Typography color="text.secondary" sx={{ fontFamily: 'Cairo' }}>
              سيتم إضافة الرسوم البيانية (Charts) هنا قريباً...
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminHome;