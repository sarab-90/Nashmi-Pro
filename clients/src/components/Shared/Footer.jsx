import { Box, Container, Grid, Typography, Link, IconButton, Stack } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Footer = () => {
  return (
    <Box 
      component="footer" 
      sx={{ 
        bgcolor: 'primary.dark', 
        color: 'white', 
        pt: 8, 
        pb: 4, 
        mt: 'auto', 
        borderTop: '4px solid', 
        borderColor: 'secondary.main' 
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ direction: 'rtl' }}> 
            <Grid item xs={12} md={4}>
            <Typography variant="h6" color="secondary.main" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Cairo' }}>
              نشمي مهني
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1, fontFamily: 'Cairo' }}>
              • تدريب مهني متطور.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 1, fontFamily: 'Cairo' }}>
              • تمكين الشباب الأردني.
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, fontFamily: 'Cairo' }}>
              • جسر العبور نحو سوق العمل.
            </Typography>
          </Grid>

          <Grid item xs={6} md={2}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Cairo' }}>
            </Typography>
            <Stack spacing={1}>
              <Link href="/" color="inherit" underline="none" sx={{ fontSize: '0.9rem', '&:hover': { color: 'secondary.main' } }}>الرئيسية</Link>
              <Link href="/courses" color="inherit" underline="none" sx={{ fontSize: '0.9rem', '&:hover': { color: 'secondary.main' } }}>الدورات</Link>
              <Link href="/about" color="inherit" underline="none" sx={{ fontSize: '0.9rem', '&:hover': { color: 'secondary.main' } }}>من نحن</Link>
              <Link href="/contact" color="inherit" underline="none" sx={{ fontSize: '0.9rem', '&:hover': { color: 'secondary.main' } }}>اتصل بنا</Link>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Cairo' }}>
              تواصل معنا
            </Typography>
            <Stack spacing={1.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <PhoneIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                <Typography variant="caption">07XXXXXXXX</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <EmailIcon sx={{ fontSize: 18, color: 'secondary.main' }} />
                <Typography variant="caption">info@nashmi.jo</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontFamily: 'Cairo' }}>
              تابعنا
            </Typography>
            <Stack direction="row" spacing={1}>
              <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'secondary.main' } }}>
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'secondary.main' } }}>
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ bgcolor: 'rgba(255,255,255,0.1)', color: 'white', '&:hover': { bgcolor: 'secondary.main' } }}>
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
        <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', mt: 6, pt: 3, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ opacity: 0.5, letterSpacing: 1 }}>
            © {new Date().getFullYear()} NASHMI PRO | منصة نشمي مهني للتدريب
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
export default Footer;