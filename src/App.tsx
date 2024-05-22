import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from "js-cookie";
import React from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import SessionAdminPage from "./pages/SessionAdminPage";
import SessionPage from "./pages/SessionPage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const authToken = Cookies.get("userId");
    return authToken ? <>{children}</> : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const authToken = Cookies.get("userId");
    return authToken ? <Navigate to="/employee" replace /> : <>{children}</>;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route
                    path="/register"
                    element={
                        <PublicRoute>
                            <RegisterPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/"
                    element={
                        <PublicRoute>
                            <SessionPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/login"
                    element={
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                    }
                />
                <Route
                    path="/employee"
                    element={
                        <PrivateRoute>
                            <EmployeePage />
                        </PrivateRoute>
                    }
                />
                <Route
                    path="/session-admin"
                    element={
                        <PrivateRoute>
                            <SessionAdminPage />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Router>
    )
};

export default App;