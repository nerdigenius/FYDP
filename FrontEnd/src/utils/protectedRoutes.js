import React, { useEffect } from "react";
import { useNavigate,Route } from "react-router-dom";
import { isAuthenticated } from "./auth";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [navigate]);

  return isAuthenticated ? <Route {...rest} element={Component} /> : null;
};

export default ProtectedRoute;
