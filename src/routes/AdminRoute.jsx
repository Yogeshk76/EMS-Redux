import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
  const admin = useSelector((state) => state.user.isAdmin);
  if (!admin) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
}

export default AdminRoute;