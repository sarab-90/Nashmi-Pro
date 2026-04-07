import { useState, useContext } from 'react';
import { 
  Container, Box, Typography, TextField, Button, 
  Paper, Avatar, Grid, MenuItem 
} from '@mui/material';
import { UserContext } from '../../Context/UserContext.jsx';
import { Link } from 'react-router-dom';

const Register = () => {
  const { register } = useContext(UserContext);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user'
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
 const handleSubmit = async (e) => {
    e.preventDefault();
        console.log("إرسال بيانات التسجيل:", formData);
        
    try {
      await register(formData);
       } catch (err) {
      console.error("حدث خطأ أثناء التسجيل في الواجهة:", err);
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ marginTop: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={6} sx={{ p: 4, width: '100%', borderRadius: 3 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            </Avatar>
            <Typography component="h1" variant="h5" fontWeight="bold">
              إنشاء حساب جديد
            </Typography>
            <Typography variant="body2" color="text.secondary">
              انضم إلى عائلة نشمي مهني 
            </Typography>
          </Box>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}> 
                <TextField
                  required
                  fullWidth
                  id="name"
                  label="الاسم الكامل"
                  name="name" 
                  autoComplete="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="البريد الإلكتروني"
                  name="email"
                  type="email" 
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="كلمة المرور"
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  select
                  fullWidth
                  label="نوع الحساب"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                >
                  <MenuItem value="user">طالب </MenuItem>
                  <MenuItem value="admin"> أدمن</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              color="secondary"
              sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
            >
              إنشاء الحساب
            </Button>
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="body2">
                لديك حساب بالفعل؟{' '}
                <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>
                  سجل دخولك
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};
export default Register;