import {Navigate, Route, Routes} from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import Cookies from "js-cookie";
import React from "react";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

// @ts-ignore
const PrivateRoute = ({ children }) => {
  const authToken = Cookies.get("userId");
  return authToken ? children : <Navigate to="/not-authorized" replace />;
};

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    )
};

/*
function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/register-location" element={<RegisterLocationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/not-authorized" element={<NotAuthorizedPage />} />
          <Route
              path="/user/info"
              element={
                <PrivateRoute>
                  <UserInfoPage />
                </PrivateRoute>
              }
          />
          <Route
              path="/user/donation"
              element={
                <PrivateRoute>
                  <UserDonationPage />
                </PrivateRoute>
              }
          />
          <Route
              path="/user/membership"
              element={
                <PrivateRoute>
                  <UserMembershipPage />
                </PrivateRoute>
              }
          />
          <Route
              path="/user/location"
              element={
                <PrivateRoute>
                  <UserLocationPage />
                </PrivateRoute>
              }
          />
          <Route
              path="/user/create-location"
              element={
                <PrivateRoute>
                  <CreateLocationPage />
                </PrivateRoute>
              }
          />
        </Routes>
      </Router>
  );
}
*/


export default App;
