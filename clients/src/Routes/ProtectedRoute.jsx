import { Navigate } from "react-router-dom";
import Cookie from "js-cookie";
import toast from "react-hot-toast"; 

function ProtectedRoutes({ children, adminOnly = false, userRole = "user" }) {
    const token = Cookie.get("accessToken");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    if (adminOnly && userRole !== "admin") {
        toast.error("ليس لديك صلاحية الوصول لهذه الصفحة");
        return <Navigate to="/" replace />;
    }
    return children;
}

export default ProtectedRoutes;