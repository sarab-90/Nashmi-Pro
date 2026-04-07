import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Button,
  TextField,
  Avatar,
  Divider,
  Stack,
  Container,
  CircularProgress,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { UserContext } from "../../Context/UserContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      toast.error("يرجى ملء جميع الحقول الأساسية");
      return;
    }

    setLoading(true);
    try {
      const response = await put(
        `/users/update/${user.userid}`,
        {
          name: formData.name,
          email: formData.email,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      if (response.data) {
        const updatedData = {
          ...user,
          name: response.data.name,
          email: response.data.email,
        };
        setUser(updatedData);
        localStorage.setItem("user", JSON.stringify(updatedData));

        toast.success("تم تحديث بياناتك بنجاح");
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Update Error:", error);
      toast.error(error.response?.data?.message || "فشل تحديث البيانات");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/login");
    toast.success("تم تسجيل الخروج");
  };

  if (!user)
    return <CircularProgress sx={{ display: "block", mx: "auto", mt: 5 }} />;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 5, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            fontFamily: "Cairo",
            color: "primary.main",
            mb: 1,
          }}
        >
          إعدادات الحساب
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ fontFamily: "Cairo" }}
        >
          إدارة بياناتك في منصة نشمي مهني
        </Typography>
      </Box>

      <Grid container spacing={4}>
        {/* الكرت الجانبي */}
        <Grid item xs={12} md={4}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 5,
              border: "1px solid #eee",
              textAlign: "center",
            }}
          >
            <Avatar
              sx={{
                width: 100,
                height: 100,
                mx: "auto",
                mb: 2,
                bgcolor: "primary.main",
                fontSize: "2rem",
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
              }}
            >
              {user.name?.charAt(0).toUpperCase()}
            </Avatar>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, fontFamily: "Cairo" }}
            >
              {user.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {user.role === "admin" ? "مدير النظام" : "متدرب نشمي"}
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Button
              fullWidth
              variant="outlined"
              color="error"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{ borderRadius: 5, fontFamily: "Cairo" }}
            >
              تسجيل الخروج
            </Button>
          </Paper>
        </Grid>

        {/* كرت التعديل */}
        <Grid item xs={12} md={8}>
          <Paper
            elevation={0}
            sx={{ p: 4, borderRadius: 5, border: "1px solid #eee" }}
          >
            <Stack spacing={3}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, fontFamily: "Cairo" }}
                >
                  المعلومات الشخصية
                </Typography>
                {!isEditing && (
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => setIsEditing(true)}
                    sx={{ fontFamily: "Cairo" }}
                  >
                    تعديل
                  </Button>
                )}
              </Box>

              <TextField
                fullWidth
                label="الاسم"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{ sx: { borderRadius: 3, fontFamily: "Cairo" } }}
              />

              <TextField
                fullWidth
                label="البريد الإلكتروني"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                InputProps={{ sx: { borderRadius: 3, fontFamily: "Cairo" } }}
              />

              {isEditing && (
                <Stack direction="row" spacing={2} justifyContent="flex-end">
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                    sx={{ borderRadius: 5, px: 4, fontFamily: "Cairo" }}
                  >
                    {loading ? "جاري الحفظ..." : "حفظ التغييرات"}
                  </Button>
                  <Button
                    variant="text"
                    color="inherit"
                    onClick={() => setIsEditing(false)}
                    sx={{ fontFamily: "Cairo" }}
                  >
                    إلغاء
                  </Button>
                </Stack>
              )}
            </Stack>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserProfile;
