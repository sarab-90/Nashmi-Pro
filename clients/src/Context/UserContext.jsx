import { createContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import api from "../api.js";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);
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
            : (error.response?.data?.message || "فشل الاتصال");
            
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
      if (res.data.user.role === 'admin') {
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
  return (
    <UserContext.Provider value={{ register, user, login, logout, fetchCurrentUser }}>
        {children}
    </UserContext.Provider>
  );
}