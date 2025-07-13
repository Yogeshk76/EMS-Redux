import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const AdminRoute = ({children}) => {
  const user = useSelector((state) => state.auth.currentUser);

  if (!user || user.role !== "admin") {
    return <Navigate to="/dashboard" replace/>;
  }

  return children;
}

export default AdminRoute;