import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import React, { useContext } from "react";
import Login from "./pages/Login";
import { HomeAdmin } from "./pages/Home_Admin";
import AccountManagement from "./pages/Account_Management";
import AccountManagementHost from "./pages/Account_ManagementHost";
import UpdateAccount from "./pages/Update";
import UpdateAccountHost from "./pages/Update_Host";
import AddRenter from "./pages/AddRenter";
import AddHost from "./pages/AddHost";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="login" element={<Login />} />
          <Route
            index
            element={
              <RequireAuth>
                <HomeAdmin />
              </RequireAuth>
            }
          />

          <Route path="accountmanagement">
            <Route
              index
              element={
                <RequireAuth>
                  <AccountManagement />
                </RequireAuth>
              }
            />
            <Route
              path="add"
              element={
                <RequireAuth>
                  <AddRenter />
                </RequireAuth>
              }
            />
            <Route
              path="update/:id"
              element={
                <RequireAuth>
                  <UpdateAccount />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="accountmanagementhost">
            <Route
              index
              element={
                <RequireAuth>
                  <AccountManagementHost />
                </RequireAuth>
              }
            />
            <Route
              path="add"
              element={
                <RequireAuth>
                  <AddHost />
                </RequireAuth>
              }
            />
            <Route
              path="update/:id"
              element={
                <RequireAuth>
                  <UpdateAccountHost />
                </RequireAuth>
              }
            />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
