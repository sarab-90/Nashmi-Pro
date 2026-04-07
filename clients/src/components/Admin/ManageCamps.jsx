import React, { useState, useEffect } from 'react';
import { 
  Box, Typography, Paper, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, IconButton, Tooltip, 
  TextField, Stack, Container, CircularProgress, Button, Dialog, 
  DialogTitle, DialogContent, DialogActions, Grid
} from "@mui/material";
import { toast } from "react-hot-toast";
import api from "../../api.js"; 
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';

const ManageCamps = () => {
  const [camps, setCamps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  
  const [formData, setFormData] = useState({
    title: '', description: '', location: '', 
    age_range: '', mentor: '', category: '', capacity: 10
  });

  const fetchCamps = async () => {
    setLoading(true);
    try {
      const res = await api.get("/camps/all");
      setCamps(Array.isArray(res.data) ? res.data : (res.data.camps || []));
    } catch (error) {
      toast.error("فشل في جلب المعسكرات");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { fetchCamps(); }, []);
  const handleOpenAdd = () => {
    setEditMode(false);
    setFormData({ title: '', description: '', location: '', age_range: '', mentor: '', category: '', capacity: 10 });
    setOpen(true);
  };
  const handleOpenEdit = (camp) => {
    setEditMode(true);
    setSelectedId(camp.campid);
    setFormData({ ...camp });
    setOpen(true);
  };
  const handleSubmit = async () => {
    try {
      if (editMode) {
        await api.put(`/camps/update/${selectedId}`, formData);
        toast.success("تم التعديل بنجاح");
      } else {
        await api.post("/camps/create", formData);
        toast.success("تم إنشاء المعسكر");
      }
      fetchCamps();
      setOpen(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ");
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("هل أنتِ متأكدة من حذف هذا المعسكر؟")) {
      try {
        await api.delete(`/camps/delete/${id}`);
        setCamps(camps.filter(c => c.campid !== id));
        toast.success("تم الحذف بنجاح");
      } catch (error) {
        toast.error("فشل الحذف");
      }
    }
  };
  if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}><CircularProgress /></Box>;
  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 900, fontFamily: 'Cairo' }}>إدارة المعسكرات</Typography>
        <Button variant="contained" onClick={handleOpenAdd} sx={{ bgcolor: '#4f46e5' , px: 3}}>
          إضافة معسكر
        </Button>
      </Stack>

      <TableContainer component={Paper} sx={{ borderRadius: "15px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
        <Table>
          <TableHead sx={{ bgcolor: "#f8fafc" }}>
            <TableRow>
              <TableCell sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>المعسكر</TableCell>
              <TableCell sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>الموقع</TableCell>
              <TableCell sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>الفئة العمرية</TableCell>
              <TableCell sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>الموجه</TableCell>
              <TableCell align="center" sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>الإجراءات</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {camps.map((c) => (
              <TableRow key={c.campid} hover>
                <TableCell sx={{ fontWeight: 600 }}>{c.title}</TableCell>
                <TableCell>{c.location}</TableCell>
                <TableCell>{c.age_range}</TableCell>
                <TableCell>{c.mentor}</TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => handleOpenEdit(c)} color="primary"><EditIcon /></IconButton>
                  <IconButton onClick={() => handleDelete(c.campid)} color="error"><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog للإضافة والتعديل */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontFamily: 'Cairo', fontWeight: 'bold' }}>
          {editMode ? "تعديل المعسكر" : "إضافة معسكر جديد"}
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField label="العنوان" fullWidth value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="الفئة (Category)" fullWidth value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="الموقع" fullWidth value={formData.location} onChange={(e) => setFormData({...formData, location: e.target.value})} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="الفئة العمرية" fullWidth value={formData.age_range} onChange={(e) => setFormData({...formData, age_range: e.target.value})} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="الموجه (Mentor)" fullWidth value={formData.mentor} onChange={(e) => setFormData({...formData, mentor: e.target.value})} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField label="السعة" type="number" fullWidth value={formData.capacity} onChange={(e) => setFormData({...formData, capacity: e.target.value})} />
            </Grid>
            <Grid item xs={12}>
              <TextField label="الوصف" multiline rows={3} fullWidth value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpen(false)} color="inherit">إلغاء</Button>
          <Button onClick={handleSubmit} variant="contained" sx={{ bgcolor: '#4f46e5' }}>
            {editMode ? "حفظ التعديلات" : "إضافة المعسكر"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageCamps;