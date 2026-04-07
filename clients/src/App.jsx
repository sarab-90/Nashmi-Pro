import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";

import Register from "./components/Auth/Register.jsx";
import Login from "./components/Auth/Login.jsx";
import Home from "./components/Home/Home.jsx";
import MainLayout from "./layouts/MainLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import UserHome from "./components/Users/UserHome.jsx";

import AdminLayout from "../src/components/Admin/AdminLayout.jsx";
import AdminHome from "../src/components/Admin/AdminHome.jsx";
import ManageUsers from "../src/components/Admin/ManageUsers.jsx";
import UserProfile from "./components/Users/UserProfile.jsx";
import ManageCamps from "./components/Admin/ManageCamps.jsx";
import Footer from "./components/Shared/Footer.jsx";
function App() {
  return (
    <>
      <Toaster position="top-center" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}></Route>
        {/* // Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="camps" element={<ManageCamps />} />
        </Route>
        {/* // User Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<UserHome />} />
          <Route index element={<UserProfile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}
export default App;
