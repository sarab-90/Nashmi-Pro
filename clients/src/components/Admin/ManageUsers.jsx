import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  Chip,
  IconButton,
  TextField,
  Stack,
  Container,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { toast } from "react-hot-toast";
import api from "../../api.js";
import { UserContext } from "../../Context/UserContext.jsx";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

const ManageUsers = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "user",
    password: "",
  });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await api.get("/users/all");
      setUsers(Array.isArray(res.data) ? res.data : res.data.users || []);
    } catch (error) {
      toast.error("فشل في جلب البيانات");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ name: "", email: "", role: "user", password: "" });
    setOpen(true);
  };
  const handleOpenEdit = (u) => {
    setEditMode(true);
    setSelectedUserId(u.userid);
    setFormData({ name: u.name, email: u.email, role: u.role, password: "" }); 
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    try {
      if (editMode) {
        await api.put(`/users/update/${selectedUserId}`, formData);
        toast.success("تم تحديث المستخدم");
      } else {
        await api.post("/auth/register", formData);
        toast.success("تمت إضافة المستخدم");
      }
      fetchUsers();
      handleClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ");
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("هل أنتِ متأكدة؟")) {
      try {
        await api.delete(`/users/delete/${id}`);
        setUsers(users.filter((u) => u.userid !== id));
        toast.success("تم الحذف");
      } catch (error) {
        toast.error("خطأ في الحذف");
      }
    }
  };
  const filteredUsers = users.filter(
    (u) =>
      u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  if (loading)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
        <CircularProgress />
      </Box>
    );
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 900, fontFamily: "Cairo" }}
          >
            إدارة المستخدمين
          </Typography>
          <Typography variant="body2" color="text.secondary">
            إجمالي المسجلين: {users.length}
          </Typography>
        </Box>

        <Stack direction="row" spacing={2}>
          <TextField
            size="small"
            placeholder="بحث..."
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: "gray" }} />,
            }}
          />
        </Stack>
        <Button
            variant="contained"
            onClick={handleOpenAdd}
            sx={{
                px: 3,
              borderRadius: "10px",
              bgcolor: "#0b0847",
              "&:hover": { bgcolor: "#220fee" },
            }}
          >
            إضافة مستخدم
          </Button>
      </Box>

      <TableContainer component={Paper} sx={{ borderRadius: "15px" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>
                المستخدم
              </TableCell>
              <TableCell sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>
                البريد
              </TableCell>
              <TableCell sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>
                الصلاحية
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontFamily: "Cairo", fontWeight: "bold" }}
              >
                الإجراءات
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((u) => (
              <TableRow key={u.userid}>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      sx={{
                        bgcolor: u.role === "admin" ? "#4f46e5" : "#16a34a",
                      }}
                    >
                      {u.name[0]}
                    </Avatar>
                    <Typography sx={{ fontWeight: 600 }}>{u.name}</Typography>
                  </Stack>
                </TableCell>
                <TableCell>{u.email}</TableCell>
                <TableCell>
                  <Chip
                    label={u.role}
                    color={u.role === "admin" ? "primary" : "default"}
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenEdit(u)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete(u.userid)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontFamily: "Cairo", fontWeight: "bold" }}>
          {editMode ? "تعديل مستخدم" : "إضافة مستخدم جديد"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <TextField
              label="الاسم"
              fullWidth
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <TextField
              label="البريد الإلكتروني"
              fullWidth
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {!editMode && (
              <TextField
                label="كلمة المرور"
                type="password"
                fullWidth
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            )}
            <FormControl fullWidth>
              <InputLabel>الصلاحية</InputLabel>
              <Select
                label="الصلاحية"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <MenuItem value="user">مستخدم عادي</MenuItem>
                <MenuItem value="admin">مدير نظام</MenuItem>
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={handleClose} color="inherit">
            إلغاء
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ bgcolor: "#4f46e5" }}
          >
            {editMode ? "حفظ التغييرات" : "إنشاء مستخدم"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageUsers;
