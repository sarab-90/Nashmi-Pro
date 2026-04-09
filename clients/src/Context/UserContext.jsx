import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCurrentUser = async () => {
    setLoading(true);
    try {
      const res = await api.get("/auth/currentUser");
      if (res.data && res.data.user) {
        setUser(res.data.user);
      }
    } catch (error) {
      console.log(" Info : No user logged in yet.");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCurrentUser();
  }, []);
  //  التسجيل
  const register = async (userData) => {
    setLoading(true);
    try {
      const res = await api.post("/auth/register", userData);
      toast.success("تم إنشاء الحساب بنجاح!");
      navigate("/login");
    } catch (error) {
      const errorMsg = error.response?.data?.errors
        ? error.response.data.errors.join(" - ")
        : error.response?.data?.message || "فشل الاتصال";

      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };
  //  تسجيل الدخول
  const login = async (userData) => {
    try {
      const res = await api.post("/auth/login", userData);
      console.log("Login response:", res.data);
      setUser(res.data.user);
      toast.success("Welcome back!");
      if (res.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed";
      toast.error(errorMsg);
    }
  };
  // تسجيل الخروج
  const logout = async () => {
    try {
      await api.post("/auth/logout", {}, { withCredentials: true });

      setUser(null);
      toast.success("تم تسجيل الخروج بنجاح");
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("فشل تسجيل الخروج");
    }
  };
  // all users
  const allUsers = async () => {
    try {
      const res = await api.get("/users/all");
      if (res.data.users.length === 0) {
        toast.success(res.data.message || "No users Yet");
      }
      setUsers(res.data.users);
      console.log(res.data.users);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  // add user
  const addUser = async (userData) => {
    try {
      if (!userData.name || !userData.email || !userData.password) {
        toast.error("All fields are required");
        return;
      }
      const res = await api.post("/auth/register", userData);
      await allUsers();
      toast.success("User Added Successfully Successful");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  // delete user
  const deleteUser = async (userid) => {
    try {
      const res = await api.delete(`/users/delete/${userid}`);
      toast.success(res.data.message || "User Deleted Successfully");
      await allUsers();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  // update user
  const updateUserProfile = async (userData) => {
    try {
      if (!userData.name) {
        userData.name = user.name; // Use current name if not provided
      }
      if (!userData.email) {
        userData.email = user.email;
      }
      const res = await api.put("/users/update", userData);
      toast.success(res.data.message || "Profile Updated Successfully");
      await fetchCurrentUser();
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  // change user password
  const changeUserPassword = async (passwords) => {
    try {
      // تاكد من أن جميع الحقول موجودة
      if (
        !passwords.oldPassword ||
        !passwords.newPassword ||
        !passwords.confirmNewPassword
      ) {
        toast.error("All fields are required");
        return;
      }
      // تاكد من أن كلمة المرور الجديدة وتأكيدها متطابقان
      if (passwords.newPassword !== passwords.confirmNewPassword) {
        toast.error("New password and confirmation do not match");
        return;
      }
      const res = await api.put("/users/update-password", passwords);
      toast.success(res.data.message || "Password Updated Successfully");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <UserContext.Provider
      value={{
        register,
        user,
        login,
        logout,
        fetchCurrentUser,
        allUsers,
        users,
        addUser,
        deleteUser,
        updateUserProfile,
        loading,
        changeUserPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
