// import { Fragment } from "react";
// import { publicRoutes } from "./routes";
// import { DefaultLayout } from "./components/Layout";
// import db, { auth } from "./firebase/config";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import React, { useContext } from "react";
import Login from "./pages/Login";
import HomeAdmin from "./pages/Home_Admin";
import { AccountManagement } from "./pages/Account_Management";
import UpdateAccount from "./pages/Update";
import { AuthContext } from "./Context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <div>
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
                path="update"
                element={
                  <RequireAuth>
                    <UpdateAccount />
                  </RequireAuth>
                }
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>

    // <Router>
    //   <Routes>
    //     {publicRoutes.map((route, index) => {
    //       const Layout = route.layout === null ? Fragment : DefaultLayout;
    //       const Page = route.component;

    //       return (
    //         <Route
    //           key={index}
    //           path={route.path}
    //           element={
    //             <RequireAuth>
    //               <Layout>
    //                 <Page />
    //               </Layout>
    //             </RequireAuth>
    //           }
    //         />
    //       );
    //     })}
    //   </Routes>
    // </Router>
  );
}

export default App;
