import { Navigate } from "react-router-dom";
import Loading from "../components/Loading/Loading";
import { useAuthContext } from "../hooks/useAuthContext";
import type { ChildrenProps } from "../components/model/handler";

const GuestRoute = ({ children } : ChildrenProps) => {
    const { check, valid } = useAuthContext();

    if (check) return <Loading />;
    if (valid) return <Navigate to="/dashboard" replace />;

    return children;
};

export default GuestRoute;