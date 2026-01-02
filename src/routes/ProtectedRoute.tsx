import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import type { ChildrenProps } from "../components/model/handler";
import { useAuthContext } from "../hooks/useAuthContext";

const ProtectedRoute = ({ children } : ChildrenProps) => {
  const { check, valid } = useAuthContext();

  if (check) return <Loading />;
  if (!valid) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;