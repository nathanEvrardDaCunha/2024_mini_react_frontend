import { Navigate, Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from "js-cookie";
import React from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import EmployeePage from "./pages/EmployeePage";
import SessionAdminPage from "./pages/SessionAdminPage";
import SessionPage from "./pages/SessionPage";
import ContactPage from "./pages/ContactPage";

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const authToken = Cookies.get("userId");
    return authToken ? <>{children}</> : <Navigate to="/" replace />;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const authToken = Cookies.get("userId");
    return authToken ? <Navigate to="/employee" replace /> : <>{children}</>;
};



//TODO : Quand une session a un groupe, ne plus l'afficher dans la liste des session
//TODO : Quand une session a un group, la mettre en "reserved" dans la database
//TODO : Transformer encore plus de html en composant react pour chaque component (label, input field...)



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
                    path="/contact"
                    element={
                        <PublicRoute>
                            <ContactPage />
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