import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from "js-cookie";
import React from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import SessionAdminPage from "./pages/SessionAdminPage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const authToken = Cookies.get("userId");
    return authToken ? <>{children}</> : <Navigate to="/" replace />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/" element={<LoginPage />} />
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