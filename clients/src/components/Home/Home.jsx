import {
  Box,
  Typography,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  useTheme,
  keyframes,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Navbar from "../Shared/Navbar";
//  Animations
const floatAnimation = keyframes`
  0% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
  50% { transform: translateY(-30px) rotate(10deg); opacity: 0.4; }
  100% { transform: translateY(0px) rotate(0deg); opacity: 0.2; }
`;
const meshAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const Home = () => {
  const theme = useTheme();
  return (
    <Box sx={{ overflowX: "hidden", bgcolor: "#fff" }}>
      <Navbar />
      {/*  HERO   */}
      <Box
        sx={{
          background: `linear-gradient(-45deg, #0d1b2a, #1b263b, #0d1b2a, #16213e)`,
          backgroundSize: "400% 400%",
          animation: `${meshAnimation} 15s ease infinite`,
          color: "white",
          pt: { xs: 12, md: 22 },
          pb: { xs: 12, md: 22 },
          position: "relative",
          overflow: "hidden",
          textAlign: "center",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `radial-gradient(rgba(255,255,255,0.03) 1.5px, transparent 1.5px)`,
            backgroundSize: "40px 40px",
            zIndex: 1,
          },
        }}
      >
        {[
          {
            size: 500,
            top: "-15%",
            left: "-10%",
            color: theme.palette.secondary.main,
            delay: "0s",
          },
          {
            size: 400,
            bottom: "-10%",
            right: "0%",
            color: "#4a90e2",
            delay: "-7s",
          },
        ].map((blob, i) => (
          <Box
            key={i}
            sx={{
              position: "absolute",
              width: blob.size,
              height: blob.size,
              bgcolor: blob.color,
              borderRadius: "50%",
              filter: "blur(120px)",
              opacity: 0.12,
              top: blob.top,
              left: blob.left,
              right: blob.right,
              bottom: blob.bottom,
              animation: `${floatAnimation} 18s infinite ease-in-out`,
              animationDelay: blob.delay,
              zIndex: 0,
            }}
          />
        ))}
        <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2 }}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 900,
              mb: 3,
              fontSize: { xs: "2.5rem", md: "5rem" },
              fontFamily: "Cairo",
              lineHeight: 1.1,
              textShadow: "0 10px 30px rgba(0,0,0,0.5)",
            }}
          >
            احترافك يبدأ من <br />
            <Box
              component="span"
              sx={{
                color: theme.palette.secondary.main,
                position: "relative",
                display: "inline-block",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 10,
                  left: 0,
                  width: "100%",
                  height: "8px",
                  bgcolor: "rgba(245, 124, 0, 0.3)",
                  zIndex: -1,
                },
              }}
            >
              نشمي مهني
            </Box>
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              opacity: 0.85,
              lineHeight: 1.8,
              maxWidth: "800px",
              mx: "auto",
              fontFamily: "Cairo",
              fontSize: { xs: "1.1rem", md: "1.3rem" },
              fontWeight: 300,
            }}
          >
            نحن نمنحك المفاتيح لتصبح خبيراً في مجالك انضم إلى المجتمع الأكبر
            للمهنيين الطموحين واحصل على تدريب يواكب المستقبل
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              color="secondary"
              size="large"
              component={Link}
              to="/register"
              sx={{
                px: 6,
                py: 2,
                fontSize: "1.2rem",
                fontWeight: "bold",
                borderRadius: "50px",
                boxShadow: `0 10px 30px ${theme.palette.secondary.main}55`,
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: `0 15px 40px ${theme.palette.secondary.main}77`,
                },
              }}
              endIcon={<ArrowForwardIcon />}
            >
              ابدأ الآن
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              size="large"
              component={Link}
              to="/courses"
              sx={{
                px: 6,
                py: 2,
                borderRadius: "50px",
                border: "2px solid rgba(255,255,255,0.4)",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  border: "2px solid #fff",
                  bgcolor: "rgba(255,255,255,0.1)",
                },
              }}
            >
              اكتشف الدورات
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ mt: -8, position: "relative", zIndex: 3 }}>
        <Grid container spacing={3}>
          {[
            { label: "طالب متدرب", value: "5,000", color: "#1a237e" },
            { label: "دورة تدريبية", value: "120", color: "#f57c00" },
            { label: "شهادة معتمدة", value: "100%", color: "#2e7d32" },
          ].map((stat, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  boxShadow: "0 10px 40px rgba(0,0,0,0.05)",
                  borderBottom: `4px solid ${stat.color}`,
                }}
              >
                <Box sx={{ color: stat.color, mb: 1 }}>{stat.icon}</Box>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 800, fontFamily: "Cairo" }}
                >
                  {stat.value}
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontFamily: "Cairo" }}
                >
                  {stat.label}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Box sx={{ bgcolor: '#fcfcfc', py: 15, width: '100%' }}>
  <Container maxWidth="lg">
    <Box sx={{ textAlign: 'center', mb: 10, px: 2 }}>
      <Typography 
        variant="h3" 
        sx={{ 
          fontWeight: 900, 
          color: 'primary.main', 
          fontFamily: 'Cairo',
          fontSize: { xs: '1.8rem', md: '2.8rem' },
          mb: 2
        }}
      >
        ما الذي يميز تجربة نشمي ؟
      </Typography>
      <Box sx={{ width: '300px', height: '4px', bgcolor: 'secondary.main', mx: 'auto', borderRadius: 3 }} />
    </Box>
    <Grid container spacing={4} justifyContent="center" alignItems="stretch">
      {[
        { 
          title: "تطبيق عملي حقيقي", 
          desc: "لا نكتفي بالنظري، مشاريعنا تحاكي تحديات سوق العمل الحقيقية"
        },
        { 
          title: "إرشاد مهني متخصص", 
          desc: "تحصل على متابعة شخصية من خبراء الصناعة لتطوير مسارك الوظيفي"
        },
        { 
          title: "بوابة التوظيف", 
          desc: "نربط المتميزين من خريجينا بشبكة واسعة من الشركاء وأصحاب العمل"
        },
      ].map((feature, index) => (
        <Grid item xs={12} sm={6} md={4} key={index} sx={{ display: 'flex' }}>
          <Box 
            sx={{ 
              p: 5, 
              width: '100%',
              bgcolor: '#f1eeee',
              borderRadius: '24px', 
              border: '1px solid rgba(4, 11, 64, 0.88)',
              boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
              transition: 'all 0.3s ease-in-out',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center', 
              '&:hover': { 
                transform: 'translateY(-8px)',
                boxShadow: '8px 12px 30px rgba(0,0,0,0.08)',
                borderColor: 'secondary.dark',
              }
            }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 800, 
                mb: 3, 
                fontFamily: 'Cairo',
                color: 'primary.main' 
              }}
            >
              {feature.title}
            </Typography>

            <Typography 
              variant="body1" 
              sx={{ 
                lineHeight: 1.9, 
                fontFamily: 'Cairo',
                color: 'text.secondary',
                fontSize: '1.05rem'
              }}
            >
              {feature.desc}
            </Typography>
          </Box>
        </Grid>
      ))}
    </Grid>
  </Container>
</Box>
      <Box
        sx={{
          bgcolor: "primary.main",
          py: 12,
          color: "white",
          textAlign: "center",
          backgroundImage:
            "radial-gradient(circle at 20% 50%, rgba(245, 124, 0, 0.15) 0%, transparent 50%)",
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, mb: 3, fontFamily: "Cairo" }}
          >
            ابدأ رحلة النجاح اليوم
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, opacity: 0.8, fontFamily: "Cairo", fontWeight: 300 }}
          >
            انضم إلى آلاف النشامى الذين اختاروا التميز
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 6, opacity: 0.8, fontFamily: "Cairo", fontWeight: 300 }}
          >
             التسجيل يستغرق أقل من دقيقتين
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            component={Link}
            to="/register"
            sx={{
              px: 10,
              py: 2.5,
              borderRadius: "50px",
              fontWeight: "bold",
              fontSize: "1.2rem",
              boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
            }}
          >
            اشترك الآن
          </Button>
        </Container>
      </Box>
    </Box>
  );
};
export default Home;