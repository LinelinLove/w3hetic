import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

interface ProtectedRouteProps {
  children: ReactNode;
  public?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  public: isPublic,
}) => {
  const { authToken } = useAuth();

  if (isPublic || authToken) {
    return <>{children}</>;
  }

  return <Navigate to="/login" />;
};

export default ProtectedRoute;
