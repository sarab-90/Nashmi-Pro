import { useContext } from 'react';
import { Box, Typography, Grid, Paper, Button, LinearProgress, Stack, Container } from '@mui/material';
import { UserContext } from '../../Context/UserContext.jsx'; 

const UserHome = () => {
  const { user } = useContext(UserContext); 
  const stats = [
    { label: 'ساعات التعلم', value: '0 ساعة', color: '#1a237e' },
    { label: 'الدورات المكتملة', value: '0 دورة', color: '#f57c00' },
    { label: 'الشهادات', value: '0 شهادة', color: '#2e7d32' },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
      <Box sx={{ mb: 5, textAlign: 'center' }}>
        <Typography variant="h4" sx={{ fontWeight: 800, fontFamily: 'Cairo', color: 'primary.main', mb: 1 }}>
          مرحباً  {user?.name || 'بطل نشمي'} 
        </Typography>
        <Typography variant="body1" color="text.secondary" fontWeight="bold" sx={{ fontFamily: 'Cairo' }}> لوحة المتابعة الخاصة بك </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ fontFamily: 'Cairo' }}>
           استمر في التعلم ، أنت تحقق تقدماً رائعاً 
        </Typography>
      </Box>
      <Grid container spacing={3} sx={{ mb: 6, justifyContent: 'center' }}>
        {stats.map((stat, i) => (
          <Grid item xs={12} md={4} key={i}>
            <Paper 
              elevation={0} 
              sx={{ 
                p: 3, borderRadius: 4, display: 'flex', alignItems: 'center', gap: 2,
                border: '1px solid #eee',
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }
              }}
            >
              <Box sx={{ 
                width: 50, height: 50, borderRadius: 2, 
                bgcolor: `${stat.color}15`, color: stat.color, 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.5rem'
              }}>
                {i === 0 ? '⏳' : i === 1 ? '📚' : '🎓'}
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'Cairo' }}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'Cairo' }}>{stat.label}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
      <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: 'Cairo', mb: 3, textAlign: 'center' }}>
        واصل التعلم
      </Typography>
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 2, md: 4 }, borderRadius: 5, border: '1px solid #eee',
          backgroundImage: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
          mb: 5
        }}
      >
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={3}>
            <Box 
              component="img"
              src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400"
              sx={{ width: '100%', borderRadius: 3, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" sx={{ fontWeight: 700, fontFamily: 'Cairo', mb: 1 }}>
              لم تبدأ أي دورة بعد
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, fontFamily: 'Cairo' }}>
              استكشف الدورات المتاحة وابدأ رحلتك المهنية الآن مع نشمي مهني.
            </Typography>
            <Box sx={{ mb: 1 }}>
              <Stack direction="row" justifyContent="space-between" sx={{ mb: 1 }}>
                <Typography variant="caption" sx={{ fontWeight: 'bold' }}>البداية</Typography>
                <Typography variant="caption">0%</Typography>
              </Stack>
              <LinearProgress variant="determinate" value={0} color="secondary" sx={{ height: 8, borderRadius: 5 }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3} sx={{ textAlign: 'center' }}>
            <Button 
              variant="contained" 
              color="primary" 
              size="large"
              sx={{ borderRadius: '50px', px: 4, fontFamily: 'Cairo', fontWeight: 'bold' }}
            >
              تصفح الدورات
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};
export default UserHome;